# Phase 9 — Testing and code quality

Test the contract at the lowest useful level. Unit tests cover pure validation and services. Integration tests cover API plus a test database. Browser tests cover the critical user journey.

```bash
# FILE: terminal
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Use deterministic fixtures, isolate test data, and test failures—not only snapshots of success. Format automatically and make lint/typecheck mandatory before review.

- [ ] New behavior has a regression test.
- [ ] Tests cover authorization and invalid input.
- [ ] CI uses the same commands as local development.
- [ ] No debug logs, secrets, or skipped tests remain.
