# Festival Mariana Bracetti

Next.js site for the Festival Mariana Bracetti in Comunidad Blondet, Río Piedras, PR.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- React 19
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the bright theme, or [http://localhost:3000/vintage](http://localhost:3000/vintage) for the vintage theme.

## Static export

This project is configured for static export — no Node server required in production.

```bash
npm run build
```

This generates an `out/` folder with plain HTML, CSS, and JS:

```
out/
  index.html      → /
  vintage.html      → /vintage
  _next/            → bundled assets
  logos/            → public assets
```

Preview the static build locally:

```bash
npx serve out
```

## Deploy

Upload the contents of `out/` to any static host:

- [Netlify](https://www.netlify.com) — drag-and-drop the `out/` folder, or connect the repo and set build command to `npm run build` and publish directory to `out`
- [Cloudflare Pages](https://pages.cloudflare.com) — build command `npm run build`, output directory `out`
- [GitHub Pages](https://pages.github.com) — upload `out/` or use a GitHub Action
- [Vercel](https://vercel.com) — detects Next.js static export automatically

## Project structure

```
src/
  app/
    (bright)/      # Bright theme at /
    vintage/       # Vintage theme at /vintage
  components/
  lib/             # Shared page content
  styles/          # Theme stylesheets
public/
  logos/
reference/         # Original HTML mockups
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — static export to `out/`
- `npm run lint` — run ESLint

## Reference designs

Static HTML mockups live in `reference/`:

- `bright.html` — modern bright theme (matches `/`)
- `vintage.html` — vintage paper theme (matches `/vintage`)
