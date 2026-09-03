# Personal Website

```bash
npm run start
```

This repo contains the source for my personal website. It is a React app with pages for my home/definition-style landing page, about page, travel map, photography, education, things I have done, and projects/making-things archive.

The site is built around personal storytelling: large editorial typography, interactive visual sections, project and experience data, image assets, travel flight data, and page-specific CSS modules. Static assets live in `public/`, reusable data lives in `src/data/`, shared components live in `src/components/`, page components live in `src/pages/`, and utility code lives in `src/utils/`.

Note for future reference: the domain is linked through Squarespace.

## Blog comments

Blog posts and images remain part of the React application in this repository. Only public comments
are stored in Supabase. The Node API in `server/` provides the comment endpoints, and `api/index.js`
exposes it as a Vercel Function so the frontend and API run on the same domain.

1. Copy the Supabase session-pooler connection string into `SUPABASE_DATABASE_URL` in `.env`.
2. Run `npm run db:setup` once to create or update the comments schema.
3. Run `npm run server` for the API on port 3001 and `npm start` for the React development server.
4. In Vercel, add `SUPABASE_DATABASE_URL` using Supabase's transaction-pooler connection string
   (port 6543) for Production and any Preview environments that should use the database.
5. Redeploy after adding or changing the Vercel environment variable.

The checked-in post data provides the comment API's allowed list of post slugs. The browser never
receives the database connection string.
