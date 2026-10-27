# Phase 7 — Firebase notifications

## Plan notifications as events

Create a notification service that accepts an event, resolves recipients, and sends through Firebase Cloud Messaging. Store a notification record so users can view history and retry safely.

Use device tokens with an owner, platform, last-seen timestamp, and revoked flag. Remove invalid tokens. Do not send credentials or sensitive data in a notification payload; send an ID and fetch details after opening the app.

```js
// FILE: src/services/notifications.service.js
await messaging.send({ token, notification: { title, body }, data: { taskId } })
```

- [ ] Permission is requested at an appropriate user moment.
- [ ] Tokens are scoped to the signed-in user.
- [ ] Duplicate events are idempotent.
- [ ] Invalid tokens are removed and failures are logged safely.
