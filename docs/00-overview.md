# From idea to production

<div class="hero">
  <h1>Launchpad Engineering Guide</h1>
  <p class="lead">A practical playbook for student teams building a scalable web product with Next.js, Tailwind CSS, Node.js, Supabase, and Firebase.</p>
  <div class="chips"><span class="chip">16 phases</span><span class="chip">GitHub-first workflow</span><span class="chip">Production habits</span></div>
</div>

> [!NOTE]
> This is a static documentation site. It works on GitHub Pages because the browser loads Markdown files directly; no server or build step is required.

## How to use this guide

1. Read the phases in order.
2. Create the repository and branch rules before writing feature code.
3. Complete each checklist on the page; progress is saved in this browser.
4. Use the reference implementation in `reference/` as a learning baseline, not as a substitute for review.
5. Every feature ends with tests, a pull request, review, and a documented merge.

## The delivery path

<div id="roadmap-grid"></div>

## Team contract

- **Small branches:** one issue, one branch, one pull request.
- **Visible work:** link every PR to an issue and describe changed files.
- **Protected quality:** no direct pushes to `main`; all checks must pass.
- **Safe secrets:** environment variables only; never commit credentials.
- **Ownership:** every feature has an owner and a reviewer.

## Definition of done

- [ ] The feature works locally on a clean checkout.
- [ ] Loading, empty, error, and permission states are handled.
- [ ] Validation and authorization are enforced on the server.
- [ ] Tests cover the important path and failure cases.
- [ ] The PR explains what changed, why, how it was tested, and what remains.
- [ ] The mentor reviewed and merged the PR.
