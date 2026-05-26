# Canari

Three surfaces of the Canari product:

- **Project hub** — `index.html`
- **Marketing site** — `website.html`
- **Artist Studio** — `studio.html` *(stem upload + triggers + per-song performance dashboard + catalog-level insights)*
- **Listener prototype (interactive)** — `listener-app.html` *(single phone, fully clickable: feed → now playing → engine view → clip & share with Canari sting)*
- **Listener design canvas** — `listener.html` *(all nine iOS screens side-by-side for design review)*

All four are static HTML — no build step, no server. They render directly when opened.

---

## Host on GitHub Pages

1. Create a new GitHub repository (public or private with Pages enabled).
2. Drop the contents of this folder at the **root** of the repo.
3. Push to `main`.
4. In the repo settings → **Pages** → **Source**, choose `Deploy from a branch` → `main` → `/ (root)` → Save.
5. After ~30 seconds, the site will be live at `https://<your-username>.github.io/<repo-name>/`.

The `.nojekyll` file in this folder tells GitHub Pages to serve every file as-is (no Jekyll processing).

The Canari hub (`index.html`) is the default landing page. All cross-links between pages use relative paths so the site works on any subpath.

---

## What's inside

```
index.html             — Project hub
website.html           — Marketing site (single SPA with multiple pages)
studio.html            — Artist Studio
listener.html          — Listener — design canvas (all screens)
listener-app.html      — Listener — interactive prototype (single phone)

ios-frame.jsx          — iOS device chrome (status bar, dynamic island, etc.)
design-canvas.jsx      — Pan/zoom canvas component
tweaks-panel.jsx       — In-page tweaks panel

listener-shared.jsx    — Brand tokens + shared components
listener-screens-a.jsx — Onboarding, Home, Now Playing variants (canvas)
listener-screens-b.jsx — Context drawer, Song detail, Library, Search, Profile (canvas)
listener-motion.jsx    — Live-motion Now Playing (canvas)
listener-app.jsx       — Interactive shell: navigation + Now Playing
listener-app-screens.jsx — Interactive feed/search/library/profile screens
listener-clip.jsx      — Clip maker + Share sheet
listener-ambient.jsx   — Context-aware ambient particles (rain / sun / stars / motes)
```

JSX files load through Babel in-browser (slow first paint, no build step required). Fine for a prototype. For production, precompile with esbuild or vite.

---

## Notes

- The fonts (Poppins, DM Serif Display, JetBrains Mono) load from Google Fonts.
- React + ReactDOM + Babel load from unpkg with pinned versions and integrity hashes.
- No analytics, no tracking, no backend. The "Join waitlist" form has a mock success state — wire it to a real email service (Buttondown / ConvertKit / a simple Formspree endpoint) before going live.
