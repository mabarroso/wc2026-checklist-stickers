## Context

The GUI is a React 19 + Tailwind CSS v4 app inside a Tauri v2 shell, deployed on Android (P80 device for testing). The current responsive strategy is binary: one breakpoint at 1280px switches between desktop sidebar and mobile bottom tabs. No other breakpoints are used. All screens share a single `<main>` scroll container in `AppLayout`. There is no pagination, toast system, or debounce mechanism. Touch targets vary from 22px (icon buttons) to 56px (bottom tabs).

## Goals / Non-Goals

**Goals:**
- Achieve minimum 44x44px touch targets on all interactive elements
- Eliminate text overflow in sticker cards (name, team, ID)
- Add pagination (50 items/page) to ViewCollection
- Add toast notification system for feedback
- Add bottom sheet for sticker detail on mobile (Search screen)
- Standardize button sizing and alignment across all screens
- Add prefers-reduced-motion support
- Add double-tap prevention on markOwned/markDuplicate
- Make Statistics team progress collapsible
- Add empty states with icons
- Add aria-labels and focus-visible styles

**Non-Goals:**
- Virtual scrolling / infinite scroll (pagination is simpler and sufficient)
- Pull-to-refresh (data is local, no server to refresh from)
- Offline detection (already works offline)
- Dark/light mode toggle (already dark-only)
- Swipe gestures (requires gesture library or significant Framer Motion work; deferred)

## Decisions

1. **Pagination over virtual scrolling**: ViewCollection will use page-based navigation (50 items/page) with Previous/Next controls and page counter. Simpler to implement, sufficient for ~1196 stickers, and avoids the complexity of virtual scrolling. Virtual scrolling could be revisited if users report performance issues.

2. **Custom Toast component over library**: A lightweight `Toast.tsx` component with Zustand store for state. No external dependency needed (no react-hot-toast, etc.). Toasts appear at bottom-center on mobile and top-right on desktop, auto-dismiss after 3s.

3. **CSS-based touch targets over JS enforcement**: Use Tailwind classes (`min-h-[44px] min-w-[44px]`) rather than runtime checks. Simpler, more reliable, and follows existing patterns. Framer Motion `whileTap` animations remain as visual feedback but are supplemented with CSS `:active` pseudo-classes for reliability.

4. **Debounce hook over inline setTimeout**: Create `useDebounce` custom hook for reuse across Search and action buttons. Consistent 300ms debounce for actions (prevents double-tap) and 150ms for search input (keeps UI responsive).

5. **Bottom sheet via Framer Motion over portal library**: Use existing Framer Motion dependency with `AnimatePresence` + drag to dismiss. Avoids adding a bottom-sheet library. Sheet appears from bottom on mobile (<1024px) and as centered modal on desktop.

6. **Collapsible sections via Framer Motion**: Team progress bars in Statistics grouped under expandable section headers (e.g., by group prefix letter range). Uses `AnimatePresence` for smooth expand/collapse. Collapsed by default, only first section pre-expanded.

7. **Delta specs over rewriting existing specs**: Each modified capability gets a delta spec file at `openspec/changes/mobile-ui-improvements/specs/<name>.md` containing only the changed/new requirements, referencing the base spec. This keeps the change scoped and reviewable.

## Risks / Trade-offs

- [Pagination navigation] Users on mobile may find Previous/Next less fluid than infinite scroll → Mitigation: Keep pagination controls large enough (44px) and show item count ("Mostrando 1-50 de 300")
- [Toast overlay] Toasts could overlap bottom tabs on mobile → Mitigation: Toasts appear 16px above the bottom tab bar using `bottom-20`
- [Performance] React.memo on sticker cards increases memory per card but reduces re-renders → Trade-off accepted given 1196 cards
- [Scope] 7 modified capabilities + 2 new ones is a large change → Mitigation: Tasks will be ordered by dependency, starting with cross-cutting concerns (Button, Toast, hooks) before screen-specific work
