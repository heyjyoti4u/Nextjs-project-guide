# Phase 8 — First full feature: task creation

Use one small feature to prove the complete path.

## 1. Define acceptance criteria

A signed-in user can create a task with a title from 1–200 characters, sees validation errors, and sees the new task after a successful response. Another user cannot read or edit it.

## 2. Implement in order

1. Add the database migration and RLS policy.
2. Add schema validation and a service method.
3. Add `POST /tasks` and `GET /tasks` routes.
4. Add API client functions.
5. Add form, pending state, error state, and success refresh.
6. Add unit, integration, and browser tests.

## 3. PR evidence

List every changed file and why. Include the migration, endpoint example, test command, screenshot, and security notes. A reviewer should be able to reproduce the feature from the PR alone.

- [ ] Happy path works.
- [ ] Invalid input is rejected on client and server.
- [ ] Unauthorized and cross-user access are tested.
- [ ] Database, API, UI, and tests are in one focused PR.
