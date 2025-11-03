**Build/Lint/Run**

- Use Node >=18; install deps with `npm ci`.
- Build: `npm run build` (Hydrogen build + codegen).
- Dev: `npm run dev`; Preview: `npm run preview`.
- Lint: `npm run lint`; Typecheck: `npm run typecheck`.
- Codegen (GraphQL + React Router types): `npm run codegen`.

**Tests**

- No test runner is configured in `package.json`.
- If you add Vitest: `npm i -D vitest @vitest/ui jsdom`.
- Run a single test (example): `npx vitest run path/to/foo.test.ts -t "case name"`.

**Imports**

- Cursor rule: use `react-router`, NEVER `react-router-dom`; adapt Remix imports to React Router v7 equivalents.
- Prefer alias `~/` for internal modules; avoid deep relative paths.
- Use `import type` for type-only imports; keep imports side-effect free.

**Formatting & CSS**

- Prettier uses `@shopify/prettier-config`; format with `npx prettier --write .`.
- Tailwind v4 is used with `@tailwindcss/vite`. Entry CSS: `app/styles/tailwind.css` with `@import "tailwindcss";` and optional plugins (e.g., `@plugin "tailwindcss-animate";`). Theme tokens via `@theme`.

**Types & Naming**

- TS strict mode; JSX runtime `react-jsx`; path alias `~/` -> `app/`.
- Naming via ESLint: camelCase, PascalCase, UPPER_CASE; interfaces/types PascalCase.
- Promises: handle explicitly (`no-floating-promises`/`no-misused-promises`); log only `console.warn`/`console.error`.
