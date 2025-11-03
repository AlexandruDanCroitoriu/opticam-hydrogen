## GitHub Copilot instructions

Keep responses concise and make small, focused diffs. See `AGENTS.md` for details; this file is the short version.

- Stack: Hydrogen + React Router v7 (data router). Node >= 18.
- CSS: Tailwind v4 via @tailwindcss/vite. Entry CSS: `app/styles/tailwind.css` (uses `@import "tailwindcss";` and `@plugin "tailwindcss-animate";`). Theme tokens via `@theme`.
- Do NOT use `react-router-dom` or Remix APIs. Import from `react-router` only.
- Commands: `npm run dev` | `build` | `preview` | `lint` | `typecheck` | `codegen`.
	- Run `typecheck` and `lint` after edits. Run `codegen` after GraphQL or route changes.

Routing & imports
- File-system routes live in `app/routes/*`.
- Use alias `~/` for internal modules. Order imports: external, then internal (`~/`), then relative.

Types & style
- Strict TypeScript, `verbatimModuleSyntax`.
- Use `import type {T}` for types; avoid `any`. Prefer generated GraphQL types.
- Prettier: `@shopify/prettier-config`. Keep diffs small.

Promises & errors
- No floating promises: always `await`/`void` and handle rejections.
- In loaders/actions, return `redirect(...)` or `new Response(json, {status})`.
- Only `console.warn`/`console.error` (no `console.log`).

GraphQL
- Documents live under `app/**`. Use Hydrogen utilities before custom wiring.
- After changing queries/mutations, run `npm run codegen` and fix resulting types.

UI & a11y
- Tailwind v4 + shadcn/ui components (in `app/components/shadcn`). Fix a11y violations rather than disabling rules.

Tests
- No runner configured. If adding tests, prefer Vitest (`vitest`, `@vitest/ui`).

General
- Mirror existing patterns in `app/`. Keep changes deterministic for Oxygen deploys.
- If unsure, follow `AGENTS.md` guidance and project conventions.

## Maintenance

**Keep documentation up-to-date:** If the stack, scripts, routing, GraphQL setup, or conventions change, promptly update both `AGENTS.md` and `.github/copilot-instructions.md` to stay accurate.


## Task Tracking

**Task files:** Create a numbered file `000-<Work description>.md` file at the 000-AI folder from root.
- List all necessary tasks with checkboxes (`- [ ] Task description`).
- Update checkboxes to `- [x]` as tasks are completed.
- Keep the file current: add new tasks, mark done tasks, remove obsolete ones.
- For detailed work breakdown, create numbered task files in `000-AI/` folder: `<next number>-<Work description>.md`.