# Phase 1 — Repository and project structure

## Recommended layout

```text
project/
├─ apps/web/                 # Next.js frontend
├─ apps/api/                 # Node.js API
├─ packages/config/          # shared lint and TypeScript config
├─ docs/                     # team decisions and runbooks
├─ .github/workflows/        # CI checks
├─ .env.example
└─ README.md
```

If the team is not ready for a monorepo, keep `web/` and `api/` as two repositories. The important rule is that ownership and deployment boundaries remain obvious.

## Naming rules

Use PascalCase for React components, camelCase for functions, kebab-case for route segments, and singular resource names in code. Keep feature code together rather than scattering one feature across unrelated folders.

## Environment variables

Commit names and safe examples in `.env.example`; never values.

```env
# FILE: .env.example
NEXT_PUBLIC_API_URL=http://localhost:4000
SUPABASE_URL=
SUPABASE_ANON_KEY=
FIREBASE_PROJECT_ID=
```

## Checklist

- [ ] The README explains setup in under ten minutes.
- [ ] Build output and secrets are ignored.
- [ ] Each app has a clear start, test, and build command.
- [ ] Shared types have one source of truth.
