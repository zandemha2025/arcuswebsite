# usearcus.ai

Marketing site for Arcus: your data team, without building one.

Static Astro site. Pages are React components, rendered to HTML at build time
(so search engines and answer engines read the full copy) and hydrated in the
browser for the WebGL hero, sample report, booking flow and forms.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
npm run check      # schema, keywords, and axe on every page at desktop and phone width (after a build)
```

`npm run check` launches the Playwright browser from `node_modules`. If that
browser isn't installed (a "Executable doesn't exist" error), point the check
at a Playwright that has one: `PLAYWRIGHT_PATH=/path/to/playwright/index.mjs npm run check`.

To get files you can open by double-clicking (no server), run
`npm run build:standalone`. It writes `standalone/`, with CSS and JS inlined.

Deploys anywhere that serves static files (Vercel, Netlify, Cloudflare Pages).
Build command `npm run build`, output directory `dist`.

## Layout

| Path | What it is |
| --- | --- |
| `src/pages/index.astro` | Homepage, plus FAQ and Service structured data |
| `src/pages/free-ad-report.astro` | Free ad double-counting report landing page |
| `src/pages/trust.astro` | Security and data handling |
| `src/pages/404.astro` | Not found |
| `src/layouts/Base.astro` | Title, description, canonical, Open Graph, Organization JSON-LD |
| `src/components/*.jsx` | Page bodies (hero field, sample report, booking, forms) |
| `src/styles/global.css` | Tokens, buttons, responsive breakpoints (1441 / 1100 / 760px) |
| `public/llms.txt` | How AI assistants should describe Arcus |
| `docs/growth-layer.md` | Page map, events, lead routing, what's still to confirm |

## Responsive note

Layout lives in inline styles; breakpoints in `global.css` override them with
`[style*="..."]` selectors. Each selector exists in two spellings, `prop: value`
(browser) and `prop:value` (React server render), so keep both when adding one.

## Before launch

Search the components for `[` placeholders (`[N]`, `[X]`, `[Confirm ...]`,
`[Photo of ...]`) and replace them with confirmed facts. See
`docs/growth-layer.md` for the full list.
