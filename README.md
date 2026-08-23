# Senzo Ncekana — Portfolio

Personal portfolio for **Senzo Ncekana** — AI Engineer (Agentic AI, LLMs &
Backend Systems), based in Parktown, Johannesburg, South Africa.

🔗 **Live site:** https://senzo-ncekana.github.io

## About

A scroll-driven single-page portfolio. Scroll is the timeline: sections pin
while their argument advances, copy arrives on cue, and the page ground changes
by chapter. Static site — no framework, no build step.

| | Chapter | What it does |
| --- | --- | --- |
| 00 | Senzo Ncekana | Name, role, summary, CV and contact — above the fold |
| 01 | What I build | Agentic assistants · RAG & vector search · Python backends |
| 02 | Experience | Five posts, most recent first |
| 03 | Why PharmaGuard exists | The look-alike test |
| 04 | Projects & toolkit | Eight projects, source public, plus skills and certifications |
| 05 | Get in touch | Email, phone, CV |

## The look-alike test

Chapter three sets two real medicine names — **hydralazine** and
**hydroxyzine** — in identical type. They are the same length and differ in
exactly three characters. As you scroll, the characters that differ lift and
take the accent colour while the ones that match recede.

That is not decoration. It is an animated version of **Tall Man lettering**, the
real pharmaceutical convention for preventing look-alike / sound-alike (LASA)
dispensing errors — and the reason PharmaGuard exists.

## Tech stack

- Vanilla HTML and CSS, tokenised: six colour roles, one accent hue
- [scrollcraft](https://github.com/nateherkai/scroll-craft) engine for the
  scroll timeline (`scrollcraft.js` / `scrollcraft.css`, used unmodified)
- Google Fonts: Archivo (display) + Source Serif 4 (text)
- Hosted on GitHub Pages

## Accessibility

- Body contrast ≥ 4.5:1, measured on the composited render at every scroll
  position — including the dark closing plate, which carries a second accent
  lightness so it clears the same floor
- `prefers-reduced-motion` honoured: motion stops, meaning does not. The
  look-alike distinction still resolves without any travel
- Every project is real markup with a real link, so the page does not need
  JavaScript to be readable or crawlable
- `focus-visible` outlines on every interactive element

## Verification

Walked by headless real Chrome at every scroll position — desktop (1440×900),
phone (390×844) and reduced-motion — checking for dead scroll, cues that never
reach full opacity, and per-line contrast measured over whatever passes beneath
them. All three passes clean.

## Run locally

Serve over http rather than opening the file directly:

```bash
python3 -m http.server 4500
# then open http://localhost:4500
```

## Deploy (GitHub Pages)

The repo is named `senzo-ncekana.github.io`, so GitHub serves it at the root URL:

1. Merge to `main`.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   Branch `main` / `(root)`.
3. Publishes at **https://senzo-ncekana.github.io** (first build takes 1–2 min).

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page: markup, tokens, and the look-alike test |
| `scrollcraft.css` / `scrollcraft.js` | Scroll engine — do not edit per project |
| `assets/portrait.webp` | Portrait (880×1174, 45 KB) |
| `og-image.png` | Link-preview card for LinkedIn, WhatsApp, X |
| `cv_preview.pdf` | Downloadable CV |
