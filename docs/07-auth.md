# Phase 6 — Firebase authentication

## Flow

The frontend signs in with Firebase Auth, obtains an ID token, and sends it as `Authorization: Bearer <token>`. The Node API verifies it with the Firebase Admin SDK and creates a request user context.

```ts
// FILE: lib/api.ts
export async function api(path: string, token: string, init: RequestInit = {}) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init, headers: { ...init.headers, Authorization: `Bearer ${token}` }
  })
}
```

Do not treat a decoded client token as trusted. Verify signature, expiry, issuer, and audience on the server. Return 401 for missing or invalid credentials and 403 for valid credentials without permission.

- [ ] Sign-in, sign-out, and expired-session states work.
- [ ] Admin credentials never reach the browser.
- [ ] Protected API routes verify tokens centrally.
- [ ] User identity is used for every owned query.
