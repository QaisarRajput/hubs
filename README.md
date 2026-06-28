# Hubs

A modern landing site and launcher for the `hubs.dpdns.org` network. This repository includes:

- `apps/web` — Next.js web app for the launcher, blog, FAQ, and legal pages
- `etl` — scraper that builds static subdomain metadata from registered apps
- `config` — central site configuration for branding, SEO, analytics, and monetization
- `packages/schema` — shared Zod schema definitions used by the ETL and frontend
- `data` — generated metadata and index files consumed by the web app
- `content` — source blog and content files

## What this repo does

`Hubs` is a static launcher website for a portfolio of utility subdomains. It:

- collects metadata for each registered subdomain
- exposes a searchable directory of apps
- renders featured cards with title, description, and preview data
- provides blog, FAQ, and legal pages
- supports a static build for deployment

## Local setup

### Option A: Use npm (recommended)

From the repo root:

```bash
cd /home/qaisar/Code/repo/hubs
npm install
```

If npm workspaces are supported, this installs dependencies for the workspace packages. If you encounter workspace install limitations, install from package directories individually:

```bash
cd apps/web && npm install
cd ../../etl && npm install
```

### Option B: Use pnpm (if available)

```bash
cd /home/qaisar/Code/repo/hubs
pnpm install
```

## Run the web app locally

From the repo root, run the web app workspace:

```bash
cd /home/qaisar/Code/repo/hubs
npm --workspace apps/web run dev
```

Then open `http://localhost:3000` in your browser.

If you use `pnpm`, run:

```bash
pnpm --filter apps-web dev
```

## Run the ETL scraper

The ETL scraper generates metadata under `data/` and can be used to refresh app listings.

```bash
cd /home/qaisar/Code/repo/hubs/etl
npm run scrape
```

If `npm install` was run from the root and workspaces worked, you may also run:

```bash
npm --workspace etl run scrape
```

## Build for production

To build the web app for a static production deployment:

```bash
cd /home/qaisar/Code/repo/hubs
npm --workspace apps/web run build
```

If the `pnpm` workspace is available:

```bash
pnpm --filter apps-web build
```

## Project structure

- `apps/web` — Next.js app shell, homepage, blog, FAQ, legal pages, metadata routes
- `etl/src` — scraper script and registry definitions
- `config/site.ts` — site metadata, analytics, and advertising settings
- `packages/schema` — shared Zod schema types for subdomain data
- `data` — scraped output consumed by the UI
- `content/blog` — source blog content
- `.github/workflows` — CI/CD workflow files

## Notes

- The web app currently uses `Next.js 14` and is configured for static route generation.
- The cookie consent banner only appears when analytics are configured for GA4.
- If you want to inspect the generated launcher data, check `data/index.json`.
