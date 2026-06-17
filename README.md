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

Open [http://localhost:3000](http://localhost:3000) for the bright theme, [http://localhost:3000/vintage](http://localhost:3000/vintage) for the vintage theme, or [http://localhost:3000/divedco](http://localhost:3000/divedco) for the DIVEDCO poster theme.

## Static export

This project is configured for static export — no Node server required in production.

```bash
npm run build
```

This generates an `out/` folder with plain HTML, CSS, and JS:

```
out/
  index.html      → /
  vintage.html    → /vintage
  divedco.html    → /divedco
  _next/            → bundled assets
  logos/            → public assets
```

Preview the static build locally:

```bash
npx serve out
```

## Deploy to GitHub Pages

This repo deploys automatically via GitHub Actions (Option A). The workflow lives at [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

### One-time setup

1. **Create a GitHub repo** (e.g. `festival-mb`) at [github.com/new](https://github.com/new).

2. **Push this project to `main`:**

   ```bash
   git remote add origin https://github.com/YOUR_USER/festival-mb.git
   git push -u origin main
   ```

3. **Enable GitHub Pages** in the repo:
   - Go to **Settings → Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**

4. **Push the workflow** (if not already on `main`):

   ```bash
   git add .github/workflows/deploy-pages.yml
   git commit -m "Add GitHub Pages deploy workflow"
   git push
   ```

### How deployment works

Every push to `main` triggers the workflow:

```
push to main
    │
    ▼
┌─────────┐     npm ci + npm run build     ┌──────────────┐
│  build  │ ─────────────────────────────► │  out/ folder │
└─────────┘                                └──────┬───────┘
                                                  │
                                                  ▼ upload artifact
                                           ┌─────────────┐
                                           │   deploy    │ ──► GitHub Pages
                                           └─────────────┘
```

| Step | What happens |
|------|----------------|
| **Trigger** | Push to the `main` branch |
| **Build job** | Checks out code, installs deps with `npm ci`, runs `npm run build` |
| **Artifact** | Uploads the `out/` folder as a Pages artifact |
| **Deploy job** | Publishes the artifact to GitHub Pages |

You do **not** commit the `out/` folder — GitHub builds it on each deploy.

### Check a deploy

1. Open the repo **Actions** tab
2. Click the latest **Deploy to GitHub Pages** run
3. When both jobs are green, go to **Settings → Pages** for the live URL

### Live URLs

For a project repo named `festival-mb`:

| Page | URL |
|------|-----|
| Bright theme | `https://YOUR_USER.github.io/festival-mb/` |
| Vintage theme | `https://YOUR_USER.github.io/festival-mb/vintage` |
| DIVEDCO theme | `https://YOUR_USER.github.io/festival-mb/divedco` |

If your repo is named `YOUR_USER.github.io` (a user site), the bright theme is at `https://YOUR_USER.github.io/` instead.

### Project sites and asset paths

GitHub Pages serves this repo at `https://JonelEM.github.io/festival-mb/` (note the `/festival-mb/` prefix). The build sets `GITHUB_PAGES=true` in the workflow so Next.js uses `basePath: /festival-mb` for CSS, JS, and fonts.

Local builds omit the prefix — run `GITHUB_PAGES=true npm run build` to match production output.

### Other hosts

The same `out/` folder from `npm run build` can also go to Netlify, Cloudflare Pages, or Vercel — build command `npm run build`, output directory `out`.

## Project structure

```
src/
  app/
    (bright)/      # Bright theme at /
    vintage/       # Vintage theme at /vintage
    divedco/       # DIVEDCO poster theme at /divedco
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
- DIVEDCO theme at `/divedco` — mid-century Puerto Rican cartel/serigraphy style
