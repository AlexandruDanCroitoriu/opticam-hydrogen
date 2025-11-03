# Integrate Tailwind CSS v4

Purpose: add Tailwind utilities (e.g., `p-20`) and enable future utility-based styling across the app using Tailwind v4 with Vite.

## Acceptance criteria
- `p-20` on `app/components/Header.tsx` compiles and styles in dev and preview builds.
- No React Router import issues (still import from `react-router`).
- Hydrogen dev/build still work: `npm run dev`, `build`, `preview`.
- Lint and typecheck pass (`npm run lint` and `npm run typecheck`).

## Steps

- [x] Install dev dependencies (Tailwind v4 + Vite plugin)
  - `npm i -D tailwindcss @tailwindcss/vite`

- [x] Add the Tailwind plugin to Vite (put it first)
  - Edit `vite.config.ts`:
    - `import tailwind from '@tailwindcss/vite';`
    - Update `plugins:` to include `tailwind()` at the beginning, e.g.
      `plugins: [tailwind(), hydrogen(), oxygen(), reactRouter(), tsconfigPaths()]`

- [x] Create Tailwind entry stylesheet
  - Create `app/styles/tailwind.css` with:
    ```css
    @import "tailwindcss";
    /* Place custom layers/tokens here later if needed (v4):
       e.g. @theme { --color-brand: #0ea5e9; } */
    ```

- [x] Load Tailwind CSS in the app (before `app.css`)
  - In `app/root.tsx`:
    - Add: `import tailwindStyles from '~/styles/tailwind.css?url';`
    - In `<head>`, add `<link rel="stylesheet" href={tailwindStyles} />` before `app.css`.

- [x] Decide on preflight vs existing reset
  - Chosen: Option A (remove `reset.css` and rely on Tailwind Preflight). Updated `app/root.tsx` to remove `reset.css` link.
  - Monitor for regressions and adjust if needed. If conflicts arise, switch to Option B.

- [ ] Verify in dev
  - `npm run dev`
  - Navigate to a page with the header. Confirm padding from `p-20` is applied.
  - If not applied, ensure:
    - `@tailwindcss/vite` is present at the start of the plugin list.
    - `tailwind.css` is requested in Network tab and present in `<head>`.

- [x] Verify production build
  - `npm run build && npm run preview`
  - Check UI still has Tailwind utilities applied (e.g., `p-20`).

- [ ] Clean up test styling if desired
  - If `p-20` was only a probe, remove it from `app/components/Header.tsx`.

- [x] Project hygiene
  - `npm run lint`
  - `npm run typecheck`
  - Update docs if needed:
    - `.github/copilot-instructions.md` (stack already mentions Tailwind; ensure Vite plugin note is clear if you add it)
    - `AGENTS.md` if Tailwind usage conventions are added.

- [ ] Commit
  - Commit focused changes with message like:
    - `chore: integrate Tailwind CSS v4 via @tailwindcss/vite`

## Notes
- Tailwind v4 doesn’t need a config file by default; use one only if customizing (e.g., disabling preflight, adding plugins, or theming).
- Keep import order: external, then `~/` aliases, then relative. Keep style links stable to avoid the Remix/Vite dev HMR stylesheet insertion bug (we already link via `?url`).
- If you later add component libraries (e.g., shadcn/ui), ensure their styles build on Tailwind and verify a11y.
