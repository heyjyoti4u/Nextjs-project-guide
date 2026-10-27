# Phase 4 — Node.js backend API

## Request pipeline

Route → authentication → validation → service → database → response. Keep HTTP concerns in routes and business rules in services.

```js
// FILE: src/routes/tasks.js
router.post('/', requireAuth, validate(taskSchema), async (req, res, next) => {
  try { res.status(201).json(await tasks.create(req.user.id, req.body)) }
  catch (error) { next(error) }
})
```

Return consistent JSON: `{ data, error, requestId }`. Use correct status codes, pagination, timeouts, structured logs, and centralized error middleware. Never trust IDs, roles, or prices sent by the client.

- [ ] Health endpoint is public and useful.
- [ ] Protected routes verify the Firebase token.
- [ ] Body, params, and query values are validated.
- [ ] User-owned queries filter by authenticated user ID.
- [ ] Errors do not leak stack traces or secrets.
