# Troubleshooting and FAQ

## GitHub Pages shows a blank page

Check that Pages publishes the branch and root folder. Open browser DevTools and verify `assets/style.css`, `assets/app.js`, and `docs/00-overview.md` return 200. Use relative paths, not `/assets/...`.

## Markdown page fails to load

The browser cannot fetch local files opened with `file://`. Run a local static server, then open its HTTP URL. On GitHub Pages, check filename case and the Network tab.

## API returns 401

Confirm the `Authorization: Bearer` header exists, the token is fresh, Firebase project IDs match, and the server clock is correct. Never “fix” this by trusting decoded client data.

## Supabase returns permission denied

Check the authenticated user ID, RLS policy, table ownership, and whether the query filters by owner. Test both an owner and a different user.

## Build works locally but not CI

Compare Node and package-manager versions, run with a clean install, check environment variable names, and inspect the first failing command—not only the final error.

> [!TIP]
> Reproduce the smallest failure first, document the cause, then add a regression test so the team does not rediscover it.
