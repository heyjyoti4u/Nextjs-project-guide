# Phase 10 — CI/CD with GitHub Actions

Run checks on pull requests and pushes to `main`. Keep workflows small and cache dependencies using the repository's package manager.

```yaml
# FILE: .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

- [ ] Pull requests cannot merge with failing checks.
- [ ] Secrets are configured in GitHub environments.
- [ ] Deployments identify the commit that shipped.
