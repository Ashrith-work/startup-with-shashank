# StartupWithShashank — official marketing site

A production-ready, single-scroll marketing site for **StartupWithShashank** (founder
education in Telugu). Vite + React + TypeScript, Tailwind, Framer Motion, lucide-react.
Fully static — deploys to Vercel with zero config.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks + builds to /dist
npm run preview  # serve the production build locally
```

## Content

**Every visible string and media reference lives in `src/data/site.ts`** — the single
source of truth. No copy is hardcoded in components. Edit that file to change anything.

### The 3 things to fill in

1. **Brand accent hex** — `brand.accent` in `src/data/site.ts` (currently `#F5A623`).
   It flows everywhere via the `--accent` CSS variable.
2. **Flagship course name + price** — `flagship.title`, `flagship.priceNow`,
   `flagship.priceWas`.
3. **Intro video (optional MP4)** — see below.

### Intro video

The intro plays full-screen on load.

- **YouTube mode (default):** uses `intro.youtubeId`. NOTE: YouTube embeds are blocked
  in sandboxed editor previews, so the video only plays on a real host (Vercel) or a
  live preview — not inside an in-editor sandbox.
- **MP4 mode (recommended, guaranteed playback):** drop a file at `public/intro.mp4`
  and set `intro.mp4 = "/intro.mp4"` in `src/data/site.ts`. Optionally add a poster at
  `public/intro-poster.jpg` and set `intro.poster = "/intro-poster.jpg"`.

### Flagship image

Drop a file in `public/` (e.g. `public/flagship.jpg`) and set
`flagship.image = "/flagship.jpg"`. If left empty, a styled gradient card renders.

## Deploy to Vercel

**Option A — CLI**

```bash
npm i -g vercel
vercel          # from the project root; accept the defaults
vercel --prod   # promote to production
```

**Option B — Git**

Push to GitHub/GitLab, then "Import Project" on vercel.com. Vercel auto-detects Vite
(build `npm run build`, output `dist`). No extra config needed.
