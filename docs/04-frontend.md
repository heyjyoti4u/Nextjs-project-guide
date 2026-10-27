# Phase 3 — Next.js and Tailwind frontend

## Build the UI in layers

Start with semantic page structure, then reusable components, then data states. Use Server Components for static and server-fetched UI; add `use client` only for interaction. Keep API calls in `lib/api.ts`, not inside random components.

```tsx
// FILE: app/tasks/page.tsx
import { TaskList } from '@/components/tasks/task-list'

export default function TasksPage() {
  return <main><h1>Tasks</h1><TaskList /></main>
}
```

## Required states

Every data view needs loading, empty, error, unauthorized, and success states. Use labels, keyboard focus, visible validation, responsive layouts, and meaningful `alt` text.

## Tailwind rules

Use design tokens and existing utility patterns. Avoid arbitrary values unless they represent a real design decision. Keep components small: `Button`, `Input`, `FormField`, `TaskCard`, and `ErrorMessage` should be reusable.

- [ ] Page works at mobile and desktop widths.
- [ ] Keyboard navigation and focus are visible.
- [ ] API errors are understandable to users.
- [ ] No secret or privileged logic lives in the browser.
