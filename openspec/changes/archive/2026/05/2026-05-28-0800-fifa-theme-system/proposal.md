## Why

The app currently has a single dark theme but needs a light theme option with white background, and both themes must always display all 6 Panini/FIFA colors (blue, cyan, green, yellow, orange, red) visible somewhere on every screen. This ensures the FIFA branding identity is always present regardless of theme choice.

## What Changes

- Add a light theme with white (#ffffff) background alongside the existing dark theme
- Create a theme toggle mechanism (persisted preference)
- Assign each navigation item a distinct FIFA color (blue, cyan, green, yellow, orange, red) so all 6 colors are visible at all times
- Update the `--blue` token from `#3b82f6` to `#1d4ed8` across specs (already done in CSS)
- Ensure status badges, buttons, and UI elements use the correct theme-aware colors
- Background decorative shapes (green circle, orange shape) adapt to theme context

## Capabilities

### New Capabilities
- `theme-system`: Theme switching system with dark (current) and light modes, persisted preference, and UI toggle

### Modified Capabilities
- `ui-theme-tokens`: Add light theme token definitions; require all 6 FIFA colors visible on every screen in both themes; update --blue to #1d4ed8

## Impact

- `src/gui/src/index.css`: Complete rewrite with `:root.dark` / `:root.light` CSS variable blocks
- `src/gui/src/components/Sidebar.tsx`: Assign one FIFA color per nav item; adapt active/hover states
- `src/gui/src/components/Header.tsx`: Maybe add theme toggle or color indicators
- `src/gui/src/AppLayout.tsx`: Possibly add theme toggle
- `src/gui/src/AppProviders.tsx`: Add theme provider context
- `src/gui/src/components/Badge.tsx`: Already color-aware, may need tweaks
- `src/gui/src/components/Button.tsx`: Verify theme compatibility
- `openspec/specs/ui-theme-tokens/spec.md`: Add delta for theme system and --blue update
