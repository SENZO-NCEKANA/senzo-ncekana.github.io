# Senzo Ncekana — Portfolio

Personal portfolio site for **Senzo Ncekana** — AI/ML Engineer & Data Scientist based in Johannesburg, South Africa.

🔗 **Live site:** https://senzo-ncekana.github.io

## About

A fast, responsive, single-page portfolio with intro, about, skills, experience, projects, and contact sections. Built as a static site with vanilla HTML, CSS, and JavaScript — no frameworks and no build step.

## Features

- Responsive, mobile-friendly layout
- Dark / light theme toggle (remembers your choice)
- Project cards rendered from a single data list in `script.js`
- Subtle scroll-reveal animations (respects "reduce motion")
- Contact form that opens a pre-filled email in the visitor's mail app

## Tech stack

- HTML, CSS (custom properties, `@layer`), vanilla JavaScript
- Google Fonts: Inter + Space Grotesk
- Hosted on GitHub Pages

## Run locally

No build tools needed — just open the file:

```bash
open index.html        # macOS (or double-click it in your file explorer)
```

To change the projects, edit the `defaultProjects` array in `script.js`.

## Deploy (GitHub Pages)

This repo is named `senzo-ncekana.github.io`, so GitHub serves it at the root URL:

1. Push your changes to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, Branch `main` / `(root)`.
3. The site publishes at **https://senzo-ncekana.github.io** (the first build takes 1–2 minutes).

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup |
| `styles.css` | Styles and theme tokens |
| `script.js` | Theme toggle, mobile menu, project rendering, contact form, scroll reveal |
| `Senzo_Ncekana_CV_New.pdf` | Downloadable résumé |
| `hero.jpg`, `avatar.jpg` | Photos (optimised for web) |
