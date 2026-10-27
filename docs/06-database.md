# Phase 5 — Supabase database

## Design before coding

Write entities, relationships, ownership, indexes, and lifecycle rules first. Prefer migrations committed to Git over manual dashboard-only changes.

```sql
-- FILE: supabase/migrations/001_tasks.sql
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  title text not null check (char_length(title) between 1 and 200),
  status text not null default 'todo' check (status in ('todo','doing','done')),
  created_at timestamptz not null default now()
);
create index tasks_owner_created_idx on public.tasks(owner_id, created_at desc);
```

Enable RLS and write policies for every user-owned table. Keep the service role key on the server only. Use parameterized queries and select only needed columns.

- [ ] Schema is represented by a migration.
- [ ] Constraints protect invalid states.
- [ ] RLS policies are tested for owner and non-owner access.
- [ ] Indexes match real filters and sorts.
- [ ] Backups and rollback plans are documented.
