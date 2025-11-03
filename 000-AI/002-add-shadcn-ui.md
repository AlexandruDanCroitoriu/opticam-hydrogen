# Add shadcn/ui components under `app/components/shadcn`

## Acceptance criteria
- Components from shadcn/ui live in `app/components/shadcn` and compile with Tailwind v4.
- A small demo (Button + Dialog) renders without runtime errors in dev/preview.
- No Tailwind v3 config files are introduced (stay on Tailwind v4; no `tailwind.config.*` unless explicitly needed).
- Build, lint, and typecheck pass.

## Steps

- [x] Decide component set and paths
  - Directory for components: `app/components/shadcn`.
  - Utility helper (cn): `app/lib/shadcn/utils.ts`.
  - Import alias to use in generated files: `~/`.

- [x] Install dependencies used by shadcn/ui components
  - Required utilities:
    - `npm i class-variance-authority clsx tailwind-merge lucide-react`
  - Most components also require Radix UI primitives (install as needed when adding specific components):
    - Example: `npm i @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs` (expand as you add components).
  - Animations plugin for Tailwind v4:
    - `npm i -D tailwindcss-animate`

- [x] Enable Tailwind animations plugin (Tailwind v4 style)
  - Edit `app/styles/tailwind.css` and add the plugin after the Tailwind import:
    ```css
    @import "tailwindcss";
    @plugin "tailwindcss-animate";
    ```
  - Keep this above your custom styles to ensure utility generation.

- [ ] Initialize shadcn (CLI) without altering Tailwind config
  - Run the interactive CLI:
    - `npx shadcn@latest init`
    - When prompted:
      - Components directory: `app/components/shadcn`
      - Import alias: `~/`
      - Global CSS file path: `app/styles/tailwind.css`
      - Tailwind config changes: choose options that DO NOT create/modify a Tailwind config file (we're on v4). If the CLI insists, cancel and proceed with manual add below.
  - The CLI may create a `components.json` file to remember your choices (OK to keep).

- [x] Add a minimal component set
  - Using the CLI (preferred):
    - `npx shadcn@latest add button input label card dialog dropdown-menu`
  - If the CLI balks due to Tailwind v4 config:
    - Use the shadcn/ui site to copy the components manually into `app/components/shadcn` and adjust imports to use `~/`.
  - Implemented manually in this repo:
    - `app/components/shadcn/button.tsx`
    - `app/components/shadcn/dialog.tsx`
    - `app/components/shadcn/mode-toggle.tsx`

- [x] Add a shared `cn` helper
  - Create `app/lib/shadcn/utils.ts` with:
    ```ts
    import {clsx, type ClassValue} from "clsx";
    import {twMerge} from "tailwind-merge";

    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }
    ```
  - Update shadcn components to import from `~/lib/shadcn/utils` if needed.

- [x] Theme tokens
  - shadcn/ui starter defines CSS variables (e.g., `--background`, `--foreground`) in a global stylesheet.
  - With Tailwind v4 you can either:
    - Add `:root` and `.dark` CSS variables to `app/styles/app.css`, or
    - Use Tailwind v4 `@theme` in `app/styles/tailwind.css` to declare tokens. Example structure:
      ```css
      /* inside app/styles/tailwind.css */
      @theme {
        --color-background: hsl(0 0% 100%);
        --color-foreground: hsl(222 84% 4%);
        /* add more tokens to match shadcn/ui variables */
      }
      ```
  - Map shadcn component classes to your tokens as you adopt them. You can iterate and refine later.
  - Implemented light tokens in `app/styles/tailwind.css` using `@theme` to define `--color-*` values (primary, secondary, background, foreground, etc.).
  - Implemented dark-mode overrides using `.dark { --color-* }` in `app/styles/tailwind.css` to match shadcn dark theme guidance.

- [x] Dark mode initialization
  - Add inline script in `app/root.tsx` `<head>` to set `document.documentElement.classList` based on `localStorage.theme` or system preference, to prevent flash.
  - Add `ModeToggle` component to toggle and persist the theme.

- [x] Quick demo wiring
  - Add a temporary snippet to an existing route (e.g., `app/routes/_index.tsx`) to render `<Button>Test</Button>` and a simple `<Dialog>`.
  - Verify utilities like `rounded-md`, `shadow`, `bg-primary` (if themed) render as expected.
  - Implemented demo in `app/routes/_index.tsx`.

- [x] Project hygiene
  - `npm run dev` to test locally.
  - `npm run lint` and `npm run typecheck`.
  - `npm run build` and `npm run preview`.

- [ ] Documentation
  - Note the shadcn path and Tailwind v4 plugin usage in `.github/copilot-instructions.md` and/or `AGENTS.md` if helpful for future work.

- [ ] Commit
  - `chore(ui): add shadcn components under app/components/shadcn and Tailwind v4 animate plugin`

## Try it (commands)
- Install deps:
  ```bash
  npm i class-variance-authority clsx tailwind-merge lucide-react
  npm i -D tailwindcss-animate
  ```
- Initialize and add components (interactive):
  ```bash
  npx shadcn@latest init
  npx shadcn@latest add button input label card dialog dropdown-menu
  ```

## Notes
- If the CLI insists on creating a Tailwind config file, cancel the init and add components manually; Tailwind v4 works fine without a config when using `@plugin` in CSS.
- Some components bring Radix peer dependencies; install only what you use to keep bundle size lean.
- Keep imports ordered: external, then `~/` aliased, then relative, to match repo conventions.
