# Phase 0 — Team and tools setup

## Outcome

Everyone can clone the repository, run the project, and communicate using the same toolchain.

## Recommended roles

- **Product owner:** scope, acceptance criteria, priorities.
- **Frontend owner:** Next.js pages, components, accessibility.
- **Backend owner:** Node routes, validation, authorization.
- **Data owner:** Supabase schema, migrations, RLS.
- **Quality owner:** tests, CI, release checklist.

One person may hold multiple roles, but every pull request still needs a second reviewer.

## Install once

- Git and GitHub account
- VS Code with ESLint, Prettier, and Error Lens
- Node.js LTS and pnpm
- Supabase project
- Firebase project

```bash
# FILE: terminal
node --version
pnpm --version
git --version
```

## Create a team agreement

Write `CONTRIBUTING.md` with the Node version, package manager, scripts, branch naming, commit format, review rules, and secret policy. Add a `CODEOWNERS` file when ownership becomes clear.

## Checklist

- [ ] Every contributor has repository access.
- [ ] Node and pnpm versions match the repository.
- [ ] Local `.env` files are ignored by Git.
- [ ] Everyone can run lint, test, and dev scripts.
- [ ] The team has a single issue tracker and communication channel.
