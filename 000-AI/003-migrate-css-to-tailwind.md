# Migrate app UI to Tailwind utilities (remove legacy CSS)

Goal: Replace remaining custom CSS with Tailwind v4 utilities and tokens, then delete unused CSS files.

## Acceptance criteria
- All UI styling comes from Tailwind utilities (and shadcn tokens/utilities) with minimal/zero bespoke CSS.
- The following files are no longer required and removed (once fully migrated):
  - `app/styles/reset.css` (already unused/removed from head)
  - `app/styles/app.css` (only if no selectors remain in use)
- Visual parity (or intentional improvements) across home, collections, product, cart, account, and blog routes in both light and dark mode.
- Typecheck, lint, and build pass.

## Strategy
- Use Tailwind v4 utilities + shadcn tokens:
  - Colors: `bg-background`, `text-foreground`, `border-border`, `ring-ring`, `bg-primary`, etc.
  - Spacing/layout: `p-*`, `m-*`, `grid`, `flex`, responsive prefixes `sm:`, `md:`, `lg:`.
  - Typography: `text-sm|base|lg`, `font-medium|semibold|bold`, `leading-*`, `tracking-*`.
  - Effects: `shadow`, `rounded`, `transition-*`, `hover:*`, `focus:*`.
- Replace legacy classes from `app/styles/app.css` with inline utilities in JSX.
- Where variables still make sense (e.g., aside width), convert to semantic utilities (e.g., `w-[400px]`) or compose with responsive classes.
- If a style is hard to express or repeated, consider a tiny component wrapper rather than re-adding global CSS.

## Prep
- Ensure Tailwind v4 and tokens are active (DONE):
  - Tailwind entry: `app/styles/tailwind.css` with `@import "tailwindcss";` and `@plugin "tailwindcss-animate";`
  - Light/dark token sets via `@theme` and `.dark { ... }`
  - Base layer applies `border-border` and `bg-background text-foreground` to body.

## File-by-file checklist

### Components (app/components)
- [ ] `Header.tsx` (partially tokenized)
- [ ] `Footer.tsx`
- [ ] `Aside.tsx`
- [ ] `AddToCartButton.tsx`
- [ ] `CartLineItem.tsx`
- [ ] `CartMain.tsx`
- [ ] `CartSummary.tsx`
- [ ] `PageLayout.tsx`
- [ ] `PaginatedResourceSection.tsx`
- [ ] `ProductForm.tsx`
- [ ] `ProductImage.tsx`
- [ ] `ProductItem.tsx`
- [ ] `ProductPrice.tsx`
- [ ] `SearchForm.tsx`
- [ ] `SearchFormPredictive.tsx`
- [ ] `SearchResults.tsx`
- [ ] `SearchResultsPredictive.tsx`
- [x] `shadcn/button.tsx` (utilities)
- [x] `shadcn/dialog.tsx` (utilities)
- [x] `shadcn/mode-toggle.tsx` (utilities)

### Routes (app/routes)
- [ ] `_index.tsx` (demo uses utilities; convert featured/product grids)
- [ ] `blogs._index.tsx`
- [ ] `blogs.$blogHandle._index.tsx`
- [ ] `blogs.$blogHandle.$articleHandle.tsx`
- [ ] `cart.$lines.tsx`
- [ ] `cart.tsx`
- [ ] `collections._index.tsx`
- [ ] `collections.$handle.tsx`
- [ ] `collections.all.tsx`
- [ ] `discount.$code.tsx`
- [ ] `pages.$handle.tsx`
- [ ] `policies._index.tsx`
- [ ] `policies.$handle.tsx`
- [ ] `products.$handle.tsx`
- [ ] `search.tsx`
- [ ] `sitemap.$type.$page[.xml].tsx` (layout bits if any)
- [ ] `account.tsx`
- [ ] `account._index.tsx`
- [ ] `account.$.tsx`
- [ ] `account.profile.tsx`
- [ ] `account.addresses.tsx`
- [ ] `account.orders._index.tsx`
- [ ] `account.orders.$id.tsx`
- [ ] `account_.authorize.tsx`
- [ ] `account_.login.tsx`
- [ ] `account_.logout.tsx`

### Styles (app/styles)
- [ ] `app.css` (migrate selectors -> utilities, then delete file)
- [x] `reset.css` (not linked; can delete once confirmed unused)
- [x] `tailwind.css` (keep)

## Migration guide (patterns)
- Header:
  - Replace `.header` with: `sticky top-0 z-10 flex h-[var(--header-height)] items-center px-4 bg-background text-foreground`.
  - Menus: desktop `hidden md:flex gap-4`, mobile `flex flex-col gap-4 md:hidden`.
- Footer:
  - `bg-foreground text-background` (or define footer-specific tokens if needed), padding via `p-4`, grid/flex utilities for layout.
- Grids:
  - `.recommended-products-grid` → `grid gap-6 grid-cols-2 md:grid-cols-4`.
  - Collections grid → `grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(355px,1fr))]` or use responsive breakpoints.
- Aside/overlays:
  - Overlay visibility → `opacity-0 pointer-events-none` toggled to `opacity-100 pointer-events-auto`.
  - Transitions via `transition-opacity duration-400`.
- Inputs/buttons:
  - Use shadcn `Button`, compose variants + size.
  - Inputs: Tailwind classes for borders, focus, radius (or import shadcn input component).

## Steps to execute
1) Header and Footer first (high visibility)
   - Header: replace `.header` usages with utilities; remove related CSS from `app.css`.
   - Footer: migrate background/text/link colors to tokens and utilities.
2) Grids and common layouts
   - Convert product/blog/collection grids.
   - Replace spacing/margin helpers (e.g., `margin-bottom`) with utilities.
3) Cart and Aside
   - Migrate background/borders and sticky/height behaviors to utilities.
   - Keep critical CSS variables (like `--aside-width`) as inline width utilities, e.g., `w-[400px]`, until refactored.
4) Search and Predictive Search
   - Migrate sticky form background/borders and list layouts.
5) Account pages
   - Standardize headings, spacing, and borders with utilities.
6) Remove unused selectors from `app/styles/app.css` progressively
   - Each time a component is migrated, delete its corresponding CSS block.
7) Final cleanup
   - When `app.css` no longer has used selectors, remove its `<link>` from `app/root.tsx` and delete the file.
   - Delete `reset.css` if still present (not linked).

## Verification
- For each route after migration:
  - Light and dark mode visual check (use ModeToggle).
  - Devtools: ensure Tailwind CSS is loaded; no 404s for styles.
- Run quality gates:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build` and `npm run preview`

## Rollout & commits
- Work in small PRs by feature/area (header/footer, grids, cart, search, account).
- Commit message format examples:
  - `refactor(ui): migrate header/footer to Tailwind utilities`
  - `refactor(ui): convert collection/product grids to Tailwind`
  - `chore: remove unused styles from app.css`

## Notes
- Prefer utilities and shadcn components over reintroducing global CSS.
- If you need custom tokens, extend `@theme` in `app/styles/tailwind.css`.
- Keep import order: external, then `~/` aliases, then relative.
