"""AI Portfolio Server."""
from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


# ================== CONFIG ==================
BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "projects.json"
MESSAGES_FILE = BASE_DIR / "messages.json"

SESSION_COOKIE = "ai_portfolio_session"
SESSION_VALUE = "admin"

# ================== APP ==================
app = FastAPI(title="AI Portfolio API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")


# ================== HELPERS ==================
def read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        write_json(path, default)
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")


def normalize_tags(value: Any) -> list[str]:
    if isinstance(value, list):
        return [str(tag).strip() for tag in value if str(tag).strip()]
    if not value:
        return []
    return [t.strip() for t in str(value).split(",") if t.strip()]


def get_user(request: Request) -> dict[str, str] | None:
    if request.cookies.get(SESSION_COOKIE) == SESSION_VALUE:
        return {"name": "Admin"}
    return None


def require_admin(request: Request) -> None:
    if not get_user(request):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


# ================== STATIC FILES ==================
@app.get("/")
def home() -> FileResponse:
    return FileResponse(BASE_DIR / "index.html")


@app.get("/styles.css")
def styles() -> FileResponse:
    return FileResponse(BASE_DIR / "styles.css")


@app.get("/script.js")
def script() -> FileResponse:
    return FileResponse(BASE_DIR / "script.js")


# ================== AUTH ==================
@app.get("/auth/login")
def login_page() -> HTMLResponse:
    return HTMLResponse(
        """
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Admin Login</title>
<style>
body{font-family:sans-serif;background:#0b0e14;color:#fff;
display:grid;place-items:center;height:100vh}
.card{background:#121722;padding:32px;border-radius:16px}
button{padding:12px 18px;border:0;border-radius:10px;
background:#6b4cff;color:#fff;font-weight:600;cursor:pointer}
</style>
</head>
<body>
<div class="card">
<h2>Admin Login</h2>
<form method="post">
<button>Login</button>
</form>
</div>
</body>
</html>
"""
    )


@app.post("/auth/login")
def login() -> RedirectResponse:
    response = RedirectResponse("/", status_code=303)
    response.set_cookie(
        SESSION_COOKIE,
        SESSION_VALUE,
        httponly=True,
        samesite="lax",
    )
    return response


@app.post("/auth/logout")
def logout() -> RedirectResponse:
    response = RedirectResponse("/", status_code=303)
    response.delete_cookie(SESSION_COOKIE)
    return response


@app.get("/api/me")
def api_me(request: Request) -> dict[str, Any]:
    return {"user": get_user(request)}


# ================== PROJECTS ==================
@app.get("/api/projects")
def get_projects() -> list[dict[str, Any]]:
    return read_json(DATA_FILE, [])


@app.post("/api/projects")
async def create_project(request: Request) -> dict[str, Any]:
    require_admin(request)
    payload = await request.json()

    projects = read_json(DATA_FILE, [])
    project = {
        "id": os.urandom(8).hex(),
        "title": payload.get("title", "").strip(),
        "description": payload.get("description", "").strip(),
        "tags": normalize_tags(payload.get("tags")),
        "image": payload.get("image", "").strip(),
        "link": payload.get("link", "").strip(),
    }

    if not project["title"]:
        raise HTTPException(400, "Title is required")

    projects.insert(0, project)
    write_json(DATA_FILE, projects)
    return project


@app.put("/api/projects/{project_id}")
async def update_project(project_id: str, request: Request) -> dict[str, Any]:
    require_admin(request)
    payload = await request.json()
    projects = read_json(DATA_FILE, [])

    for p in projects:
        if p["id"] == project_id:
            p["title"] = payload.get("title", p["title"]).strip()
            p["description"] = payload.get(
                "description",
                p["description"],
            ).strip()
            p["tags"] = normalize_tags(payload.get("tags", p["tags"]))
            p["image"] = payload.get("image", p["image"]).strip()
            p["link"] = payload.get("link", p["link"]).strip()
            write_json(DATA_FILE, projects)
            return p

    raise HTTPException(404, "Project not found")


@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str, request: Request) -> dict[str, str]:
    require_admin(request)
    projects = [p for p in read_json(DATA_FILE, []) if p["id"] != project_id]
    write_json(DATA_FILE, projects)
    return {"deleted": project_id}


# ================== MESSAGES ==================
@app.get("/api/messages")
def get_messages() -> list[dict[str, Any]]:
    messages = read_json(MESSAGES_FILE, [])
    return sorted(
        messages,
        key=lambda m: (m.get("pinned", False), m.get("created_at", "")),
        reverse=True,
    )


@app.post("/api/messages")
async def create_message(request: Request) -> dict[str, Any]:
    payload = await request.json()
    messages = read_json(MESSAGES_FILE, [])

    if not payload.get("name") or not payload.get("message"):
        raise HTTPException(400, "Invalid message")

    msg = {
        "id": os.urandom(8).hex(),
        "name": payload["name"].strip(),
        "message": payload["message"].strip(),
        "created_at": datetime.utcnow().isoformat(),
        "pinned": False,
        "reply": "",
    }

    messages.insert(0, msg)
    write_json(MESSAGES_FILE, messages)
    return msg


@app.patch("/api/messages/{message_id}")
async def update_message(
    message_id: str, request: Request
) -> dict[str, Any]:
    require_admin(request)
    payload = await request.json()
    messages = read_json(MESSAGES_FILE, [])

    for m in messages:
        if m["id"] == message_id:
            m.update(
                {
                    "message": payload.get("message", m["message"]).strip(),
                    "pinned": bool(payload.get("pinned", m["pinned"])),
                    "reply": payload.get("reply", m["reply"]).strip(),
                }
            )
            write_json(MESSAGES_FILE, messages)
            return m

    raise HTTPException(404, "Message not found")


@app.delete("/api/messages/{message_id}")
def delete_message(message_id: str, request: Request) -> dict[str, str]:
    require_admin(request)
    messages = [
        m for m in read_json(MESSAGES_FILE, []) if m["id"] != message_id
    ]
    write_json(MESSAGES_FILE, messages)
    return {"deleted": message_id}


# ================== STATIC ASSETS ==================
# Serve images, PDF, etc. from project root (must be last route)
ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".gif", ".svg", ".pdf", ".ico", ".webp"}


@app.get("/{path:path}")
def serve_asset(path: str) -> FileResponse:
    if not path or path.startswith("api/") or path.startswith("auth/"):
        raise HTTPException(status_code=404)
    fp = (BASE_DIR / path).resolve()
    if not fp.is_relative_to(BASE_DIR) or not fp.exists() or not fp.is_file():
        raise HTTPException(status_code=404)
    if fp.suffix.lower() not in ALLOWED_EXT:
        raise HTTPException(status_code=404)
    return FileResponse(fp)
