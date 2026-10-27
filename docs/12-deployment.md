# Phase 11 — Production deployment

## GitHub Pages for this guide

This guide is static: `index.html`, `assets/`, and `docs/` are published from the repository root. In GitHub, open **Settings → Pages → Deploy from a branch**, choose `main` and `/(root)`, then save. Do not use root-relative URLs such as `/assets/style.css`; relative URLs keep project pages working.

## Deploying the product

Host the Next.js frontend on a platform that supports its runtime and the Node API on a serverless or container host. Point the frontend to the API URL, configure production environment variables, and enable CORS only for approved origins.

- [ ] Production variables exist outside Git.
- [ ] Database migrations ran successfully.
- [ ] Health endpoint and logs are observable.
- [ ] Custom domain, HTTPS, redirects, and rollback are tested.
- [ ] The team has a release and incident contact.
