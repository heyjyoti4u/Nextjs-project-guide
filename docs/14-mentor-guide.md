# Mentor guide — review and merge

## Review sequence

1. Confirm the PR has a clear issue and acceptance criteria.
2. Check the diff for scope, naming, and architecture.
3. Run the documented test commands.
4. Inspect authorization, validation, migrations, and error states.
5. Leave specific, teachable comments.
6. Approve only when the author has responded to all required changes.

## Merge checklist

- [ ] CI is green.
- [ ] Required reviewer approved.
- [ ] No unresolved security or data issues.
- [ ] Migration and environment changes are documented.
- [ ] Release note or team update is ready.

Prefer coaching questions such as “What happens when this token expires?” over vague comments such as “make this better.”
