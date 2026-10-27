# Phase 12 — Scalability and security

Start with measurements, not premature infrastructure. Add indexes for measured slow queries, paginate lists, cache stable reads, queue slow notifications, and enforce rate limits on expensive or public endpoints.

## Security baseline

- Validate every input on the server.
- Apply least privilege to database and Firebase credentials.
- Use secure cookies where sessions are used.
- Configure CORS, security headers, request size limits, and timeouts.
- Redact tokens and personal data from logs.
- Review dependencies and rotate credentials after exposure.

## Reliability

Add request IDs, structured logs, error alerts, backups, migration rollback notes, and a simple runbook. Define SLOs only after you can measure latency and errors.

- [ ] Threat model covers auth, data access, uploads, and abuse.
- [ ] Load-sensitive endpoints have limits and pagination.
- [ ] Recovery steps have been tested, not only written.
