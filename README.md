# NBA Fan Map — Vercel edition

The charcoal-and-orange NBA Fan Map, including the interactive world map, country names, all 30 NBA teams, fan dashboard, city search, and editable city-level pins.

## Deploy from GitHub

1. Extract the ZIP. Open the `nba-fan-map-vercel` folder.
2. Create a new repository on GitHub named `nba-fan-map`.
3. On the empty repository page, click **uploading an existing file** (or **Add file → Upload files**).
4. Upload the CONTENTS of this folder: `app`, `lib`, `public`, `scripts`, and the root configuration files. Do not upload the ZIP itself or an extra enclosing folder. `package.json` must be at the repository root.
5. Click **Commit changes**.
6. Go to https://vercel.com/new, import that GitHub repository, leave **Framework Preset: Next.js**, and click **Deploy**.
7. In the Vercel project, open **Storage** and choose **Create Database → Neon**. Connect the database to this project. Select the available free plan if it suits your usage. Ensure the integration adds an environment variable named `DATABASE_URL` for Production and Preview. If a prefix was selected, add `DATABASE_URL` with the same connection value in project environment settings.
8. Open **Deployments**, use the latest deployment's **… → Redeploy** action. This build creates the `fans` table automatically and preserves existing rows on later builds.
9. Open your `.vercel.app` address and add your first fan pin.

The first deployment can display the interface without a database. Fan counts and saving become available after connecting Neon and redeploying. The production build checks connectivity whenever DATABASE_URL is set.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
```

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your Neon Postgres connection string. Keep the real value private; do not commit it to GitHub.

```sh
npm run db:setup
npm run dev
```

Open http://localhost:3000.

## Commands

- `npm run dev`: local development.
- `npm run build`: production Next.js build without database provisioning.
- `npm run vercel-build`: initialize the database if configured, then build. Vercel uses this command via `vercel.json`.
- `npm run typecheck`: TypeScript validation.
- `npm start`: run the production build locally.

## Data and map

- Fan submissions are stored in Neon PostgreSQL; they are shared across visitors and survive deployments.
- One editable pin is associated with a browser-generated identifier. This is a community census, not verified unique-person voting.
- Approximate coordinates are rounded to one decimal place. Only team, city label, and approximate coordinates are returned by the public fan endpoint.
- Geography and country-label anchors are bundled in `public/`, so there is no map-tile API key. Geometry: Natural Earth (`world-atlas`) and US Census (`us-atlas`).
- The interface loads Leaflet from unpkg, fonts from Google Fonts, and team logos from ESPN's CDN. City search is proxied through the server to Open-Meteo Geocoding.
- The Vercel edition starts with its own database. Existing submissions on the original hosted site are not automatically imported. Browser pin preferences are scoped to each site's domain.
- This is an independent fan project, not affiliated with the NBA.

## Reference documentation

- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/git
- https://vercel.com/marketplace/neon/neon
- https://github.com/neondatabase/serverless
