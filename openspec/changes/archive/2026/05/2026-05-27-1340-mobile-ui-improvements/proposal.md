## Why

The GUI mobile experience on Android (tested on P80) has significant usability issues: buttons are misaligned, text overflows card containers, and scrolls are excessively long without pagination. This makes the app feel unpolished and difficult to use on mobile devices.

## What Changes

- **Responsive layout overhaul**: Improve breakpoints, add collapsible filters on mobile, increase bottom tab touch targets
- **Button alignment standardization**: Equal-width action buttons in cards, size variants in Button component, unified quantity controls
- **Text overflow prevention**: Add truncate to all text elements in cards (name, team, ID)
- **Pagination in ViewCollection**: 50 items per page with page controls
- **Collapsible team progress in Statistics**: Group team bars into expandable sections
- **Bottom sheet for sticker detail on mobile**: Replaces hidden preview panel in Search
- **Toast notification system**: Cross-cutting feedback for success/error/info
- **Touch target compliance**: All interactive elements >=44x44px
- **Double-tap prevention**: Debounce on markOwned/markDuplicate actions
- **prefers-reduced-motion support**: Disable animations when user prefers reduced motion
- **Empty states with icons**: Replace plain text empty state messages
- **Accessibility**: aria-labels on icon-only buttons, focus-visible styles

## Capabilities

### New Capabilities
- `toast-notifications`: Cross-cutting toast/snackbar system for non-intrusive user feedback
- `mobile-pagination`: Page-based navigation for large lists on mobile viewports

### Modified Capabilities
- `gui-mobile-ui`: Touch target minimums, responsive breakpoints, safe-area handling, prefers-reduced-motion
- `view-collection`: Pagination, text overflow fixes, button alignment, filter collapse on mobile, batch selection, long-press menu
- `search`: Bottom sheet detail view on mobile, button alignment, debounce, search filters by section
- `statistics`: Collapsible team progress sections, responsive grid for stat cards and progress rings
- `export`: Responsive 1-column layout on mobile, toast feedback instead of inline panels
- `mark-owned`: Unified quantity controls, undo snackbar replacing recent list
- `collection-action-buttons`: Standardized button sizing and alignment across all screens

## Impact

- `src/gui/src/` -- All screen components, shared components, and CSS will be modified
- `src/gui/src/components/Button.tsx` -- New `size` prop
- `src/gui/src/index.css` -- New responsive breakpoints and utility classes
- `src/gui/src/index.html` -- theme-color meta tag
- New component: `src/gui/src/components/Toast.tsx`
- New component: `src/gui/src/hooks/useDebounce.ts`
- No API changes, no new dependencies required
