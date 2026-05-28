## Context

The app currently has a single dark theme hardcoded in `src/gui/src/index.css` via `:root` CSS custom properties. Navigation items all use the same `--blue` color for active highlights. The user wants:

1. A light theme with white background alongside the existing dark theme
2. All 6 FIFA palette colors visible on every screen
3. The current blue (`#3b82f6`) already updated to `#1d4ed8` in code

There is no existing theme infrastructure — no ThemeProvider, no localStorage preference, no CSS class toggling.

## Goals / Non-Goals

**Goals:**
- Dark and light themes with full CSS variable sets
- Theme toggle accessible from every screen
- Theme preference persisted in localStorage
- All 6 FIFA colors displayed on navigation at all times
- Theme-aware button, card, badge, border, and shape styles
- No regressions in existing functionality

**Non-Goals:**
- Per-screen or per-component custom colors (the 6 FIFA colors are fixed globally)
- Animated theme transitions (deferred — can be added later)
- System preference detection (`prefers-color-scheme` — out of scope)

## Decisions

### Decision 1: CSS class toggle on `<html>` element
Use a `data-theme` attribute on `<html>` (e.g., `<html data-theme="dark">` / `<html data-theme="light">`). CSS variables are scoped to `:root[data-theme="dark"]` and `:root[data-theme="light"]`.

**Rationale:**
- Attribute selectors are faster and more specific than classes for theming
- Allows CSS-only switching without JS re-renders for most elements
- Easy to inspect in devtools
- Common pattern (used by DaisyUI, shadcn, etc.)

**Alternatives considered:**
- React Context with inline styles: More complex, requires re-renders, harder to maintain
- CSS class on wrapper div: Works but limits theme scope and complicates body-level styles

### Decision 2: React Context + localStorage for state
Create a `ThemeContext` with `{ theme: 'dark' | 'light', toggleTheme: () => void }`. On mount, read from `localStorage('theme')`, default to `'dark'`. On toggle, write to localStorage and update the `data-theme` attribute on `<html>`.

**Rationale:**
- Minimal API surface (one context, one hook)
- No new dependencies
- Works before React hydration (CSS reads attribute immediately)

### Decision 3: Nav colors as CSS variables
Define `--nav-color-0` through `--nav-color-5` in `:root` (shared across themes). The Sidebar component uses `var(--nav-color-<index>)` for each item's active color.

**Rationale:**
- Single source of truth in CSS
- Nav component stays simple — no color logic in JSX
- Easy to reassign colors later by editing CSS only

**Color assignment (by nav index):**
0. Colección → blue (#1d4ed8)
1. En el álbum → green (#22c55e)
2. Repetidas → yellow (#facc15)
3. Estadísticas → orange (#f97316)
4. Buscar → cyan (#0891b2)
5. Exportar → red (#ef4444)

### Decision 4: 3-dot menu in Header for theme, disclaimer, and about
Add a `MoreVertical` (⋮) button in the top-right of the Header component. Clicking opens a small dropdown with three options:
1. **Tema** — toggle between Claro/Oscuro (Sun/Moon icon)
2. **Aviso legal** — re-shows the DisclaimerModal
3. **Acerca de** — simple modal with app version/info (e.g., "Panini WC 2026 v1.0.0")

Uses a useState + click-outside detection for the dropdown. No new dependencies (lucide-react already included).

**Rationale:**
- Keeps the header and sidebar clean
- Follows mobile-friendly kebab menu pattern
- Centralizes settings in one place
- Works on both desktop and mobile

## Risks / Trade-offs

### Risk: Light theme contrast
Some FIFA colors (especially yellow #facc15 and green #22c55e) may have insufficient contrast on white backgrounds.
**Mitigation:** Use dark text (`color: black` or `#0f172a`) on those colored backgrounds; already handled in Badge component.

### Risk: Third-party colors in Tailwind
Tailwind classes like `bg-[var(--bg-main)]` already use CSS vars, so they'll pick up the theme automatically. But hardcoded Tailwind colors (e.g., `bg-slate-800`) would not adapt.
**Mitigation:** Audit all JSX files for hardcoded Tailwind color classes and replace with CSS variable references where needed.

### Risk: Box-shadow hardcoded values
Current `index.css` has hardcoded `rgba(59, 130, 246, 0.2)` in `.btn-secondary:hover` and `.input-gui:focus`.
**Mitigation:** Replace with `color-mix(in srgb, var(--blue) 20%, transparent)` or define a `--color-blue-shadow` variable using oklch or similar technique.

## Migration Plan

1. Rewrite `index.css` with `:root[data-theme="dark"]` and `:root[data-theme="light"]` blocks
2. Create `ThemeContext` and `ThemeProvider` in a new file
3. Wrap app in `ThemeProvider`
4. Update `Sidebar.tsx` to use `--nav-color-*` CSS variables
5. Add 3-dot kebab menu to Header with theme toggle, disclaimer trigger, and about modal
6. Audit all screens for hardcoded colors
7. Update specs (ui-theme-tokens delta)
8. Run tests, typecheck, lint
