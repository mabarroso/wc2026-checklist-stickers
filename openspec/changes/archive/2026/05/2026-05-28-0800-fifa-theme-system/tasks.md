## 1. CSS Variables — Dark & Light Themes

- [ ] 1.1 Restructure `index.css`: move FIFA palette colors (blue, cyan, green, yellow, orange, red) into shared `:root` block
- [ ] 1.2 Create `:root[data-theme="dark"]` block with current dark theme variables
- [ ] 1.3 Create `:root[data-theme="light"]` block with light background (#ffffff), light cards (#f1f5f9), dark text (#0f172a), muted text (#64748b), light surface-2 (#e2e8f0)
- [ ] 1.4 Define `--nav-color-0` through `--nav-color-5` CSS variables mapped to the 6 FIFA colors
- [ ] 1.5 Replace hardcoded `rgba(59, 130, 246, 0.2)` box-shadows with theme-aware values (use `color-mix` or CSS variable)
- [ ] 1.6 Adjust decorative background shapes opacity for light theme (0.08)

## 2. Theme Context & Provider

- [ ] 2.1 Create `src/gui/src/stores/ThemeContext.tsx` with ThemeContext, ThemeProvider, and useTheme hook
- [ ] 2.2 ThemeProvider reads from `localStorage('theme')` on mount (default: 'dark')
- [ ] 2.3 ThemeProvider sets `data-theme` attribute on `<html>` on mount and on toggle
- [ ] 2.4 ThemeProvider persists theme preference to localStorage on toggle
- [ ] 2.5 Wrap app in ThemeProvider in `AppProviders.tsx`

## 3. Sidebar — Multicolor Navigation

- [ ] 3.1 Update `Sidebar.tsx` to use `var(--nav-color-<index>)` for each nav item's active state (background tint, border, text, icon)
- [ ] 3.2 Ensure inactive nav items use neutral colors (not blue) to let active color stand out

## 4. 3-dot Menu in Header

- [ ] 4.1 Add `MoreVertical` button to Header component (top-right corner)
- [ ] 4.2 Implement dropdown with three items: Tema (Claro/Oscuro), Aviso legal, Acerca de
- [ ] 4.3 Implement click-outside-to-close behavior for dropdown
- [ ] 4.4 Wire "Tema" option to ThemeContext toggle, show Sun/Moon icon based on current theme
- [ ] 4.5 Wire "Aviso legal" to trigger DisclaimerModal from AppLayout (via custom event or store)
- [ ] 4.6 Create simple "Acerca de" modal showing app name and version
- [ ] 4.7 Style dropdown for both dark and light themes

## 5. Audit Hardcoded Colors

- [ ] 5.1 Audit all `.tsx` files in `src/gui/src/screens/` for hardcoded Tailwind color classes (e.g., `bg-slate-800`) and replace with CSS variable references
- [ ] 5.2 Audit `src/gui/src/components/` for hardcoded colors
- [ ] 5.3 Update `.btn-secondary` and `.input-gui` focus/hover to use theme-aware variables
- [ ] 5.4 Update `AppLayout.tsx` `bg-[var(--bg-main)]` already uses vars (verify)

## 6. Light Theme Polish

- [ ] 6.1 Verify secondary button background/border look correct in light theme
- [ ] 6.2 Verify input-gui looks correct in light theme
- [ ] 6.3 Verify `.status.pending` badge uses `--color-surface-2` in light theme
- [ ] 6.4 Verify sidebar bottom-tab border color uses transparent dark in light theme

## 7. Verify

- [ ] 7.1 Run `bun test`
- [ ] 7.2 Run `bun run typecheck`
- [ ] 7.3 Run `bun run lint`
- [ ] 7.4 Run `bun run build` (GUI Vite build succeeds)
