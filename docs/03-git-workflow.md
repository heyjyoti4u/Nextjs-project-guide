# Phase 2 — Git workflow: branch, PR, merge

## Daily workflow

```bash
# FILE: terminal
git switch main
git pull --ff-only origin main
git switch -c feat/task-list
# edit, test, then inspect
git status
git diff
 git add .
git commit -m "feat: add task list API"
git push -u origin feat/task-list
```

Use `feat/`, `fix/`, `docs/`, or `chore/` prefixes. Keep commits focused and explain intent.

## Pull request template

Include: problem, solution, changed files, screenshots or API examples, tests run, environment changes, migration notes, and known follow-ups. Link the issue. Request one reviewer.

## Review rules

Review behavior, security, accessibility, tests, and maintainability—not personal style. Ask questions instead of silently rewriting. The author resolves comments and pushes follow-up commits. Squash only when the team agrees.

## Merge policy

Protect `main`, require CI, require one approval, and disable force pushes. After merge, delete the branch and tell the team what changed.

- [ ] Branch started from updated `main`.
- [ ] PR is focused and linked to an issue.
- [ ] CI is green and review is approved.
- [ ] Merge and deployment status were recorded.
