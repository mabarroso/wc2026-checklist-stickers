## 1. Cross-cutting Components and Hooks

- [x] 1.1 Add `size` prop (`sm` | `md` | `lg`) to Button component with corresponding Tailwind classes
- [x] 1.2 Create `useDebounce` hook at `src/gui/src/hooks/useDebounce.ts`
- [x] 1.3 Create Toast notification component at `src/gui/src/components/Toast.tsx` with Zustand store
- [x] 1.4 Integrate Toast into AppLayout so it renders above bottom tabs on mobile

## 2. Global Styling and HTML

- [x] 2.1 Add `theme-color` meta tag to `index.html`
- [x] 2.2 Update `index.css`: add `sm:` breakpoint utility classes, scroll behavior, prefers-reduced-motion media query
- [x] 2.3 Add CSS `:focus-visible` styles for keyboard navigation
- [x] 2.4 Add `active:` pseudo-class styles (scale feedback) to btn-primary and btn-secondary

## 3. Bottom Tabs (Sidebar.tsx)

- [x] 3.1 Increase icon size from 22 to 24, label font from 10px to 11px, min-height from 56px to 64px
- [x] 3.2 Add `active:` touch feedback class to bottom tab buttons
- [x] 3.3 Update breakpoint from 80rem (1280px) to 64rem (1024px) in both sidebar-desktop and bottom-tabs

## 4. ViewCollection Screen

- [x] 4.1 Add pagination state (`page`, `ITEMS_PER_PAGE = 50`) with Previous/Next controls
- [x] 4.2 Reset pagination to page 1 when filter/section/team/sort changes
- [x] 4.3 Add `truncate` to sticker name, team name, and ID text elements in cards
- [x] 4.4 Add `title` attribute to truncated text elements for full text on hover
- [x] 4.5 Make action buttons (Plus/Trash/Repeat) equal width with `flex-1` and `min-h-[44px]`
- [x] 4.6 Add collapsible filter bar on mobile (<1024px) with "Filtros" toggle button
- [x] 4.7 Add long-press handler (onMouseDown/onTouchStart with 500ms timer) for batch selection mode
- [x] 4.8 Add floating action bar for batch mode with "A&ntilde;adir seleccionados" and "Cancelar"
- [x] 4.9 Add checkmark overlay on selected cards during batch mode

## 5. Search Screen

- [x] 5.1 Create BottomSheet component using Framer Motion with drag-to-dismiss
- [x] 5.2 Integrate BottomSheet for sticker detail on mobile (<1024px) replacing hidden preview
- [x] 5.3 Add debounce (150ms) to search input using useDebounce hook
- [x] 5.4 Make action buttons (A&ntilde;adir/Quitar/Repetir) equal width with `flex-1` and `min-h-[44px]`
- [x] 5.5 Add 300ms debounce prevention on action button clicks
- [x] 5.6 Add `truncate` to sticker name, team, and ID in search result cards

## 6. Statistics Screen

- [x] 6.1 Group team progress bars into collapsible sections with AnimatePresence
- [x] 6.2 Add section headers showing team count summary, collapsed by default (first section expanded)
- [x] 6.3 Change stat summary cards to `grid-cols-2` on mobile (<768px) and `grid-cols-4` on desktop
- [x] 6.4 Change progress rings to responsive grid (2-3 columns mobile, 6 columns desktop)
- [x] 6.5 Add `truncate` to team name labels in progress bars

## 7. Export Screen

- [x] 7.1 Make format export cards (PDF/CSV/TXT) stack vertically on mobile (<640px)
- [x] 7.2 Replace inline success/error panels with Toast notifications
- [x] 7.3 Change main layout to single column on mobile (<1024px)
- [x] 7.4 Hide "Abrir Carpeta" button on mobile (already hidden, verify)

## 8. MarkOwned Screen

- [x] 8.1 Replace "A&ntilde;adidos Recientemente" side panel with undo snackbar on mobile (<768px)
- [x] 8.2 Unify quantity controls to use Lucide Minus/Plus icons and Button size="sm"
- [x] 8.3 Add empty state with icon (FilePlus) when no stickers have been added
- [x] 8.4 Add `inputMode="numeric"` to quantity input for mobile numeric keyboard

## 9. MarkDuplicate Screen

- [x] 9.1 Unify quantity controls to use Lucide Minus/Plus icons and Button size="sm" (match MarkOwned)
- [x] 9.2 Add empty state with icon (Repeat) when no duplicates exist

## 10. Accessibility and Polish

- [x] 10.1 Add `aria-label` to all icon-only buttons across all screens
- [x] 10.2 Add `title` attribute to icon-only buttons for desktop tooltip
- [x] 10.3 Verify prefers-reduced-motion disables Framer Motion animations in ProgressRing, Card, Toast, and BottomSheet
- [x] 10.4 Add double-tap prevention (300ms debounce) to markOwned and markDuplicate in collectionStore actions

## 11. Verification

- [x] 11.1 Run `bun test` and fix any failures
- [x] 11.2 Run `bun run typecheck` and fix any type errors
- [x] 11.3 Run `bun run lint` and fix any lint issues
- [x] 11.4 Test on Android P80 device: verify touch targets, text truncation, pagination, bottom sheet, toasts
