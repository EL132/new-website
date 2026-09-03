# Personal Website

```bash
npm run start
```

This repo contains the source for my personal website. It is a React app with pages for my home/definition-style landing page, about page, travel map, photography, education, things I have done, and projects/making-things archive.

The site is built around personal storytelling: large editorial typography, interactive visual sections, project and experience data, image assets, travel flight data, and page-specific CSS modules. Static assets live in `public/`, reusable data lives in `src/data/`, shared components live in `src/components/`, page components live in `src/pages/`, and utility code lives in `src/utils/`.

Note for future reference: the domain is linked through Squarespace.

## Blog database and comments

Blog posts and public comments are served by the Node API in `server/`. In production, that same
server also serves the React build, so the frontend and API can run as one Render web service.

1. Copy the Supabase session-pooler connection string into `SUPABASE_DATABASE_URL` in `.env`.
2. Run `npm run db:setup` once to create the tables and seed the existing posts.
3. Run `npm run server` for the API on port 3001 and `npm start` for the React development server.
4. For production, run `npm run build` followed by `npm run serve`.

The checked-in `server/data/blog-posts.json` file is the migration source and local fallback. Blog
images stay in `public/assets/` and only their repository paths are stored in Supabase. The browser
never receives the database connection string.
