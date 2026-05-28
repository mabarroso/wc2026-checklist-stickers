## Why

The GUI currently uses a generic Tailwind blue (#3b82f6) as its primary accent color, which does not reflect the FIFA World Cup 2026 or Panini brand identity. Applying brand-aligned colors will make the app feel more cohesive with the sticker collection theme and improve the overall visual identity.

## What Changes

- Update `--color-blue` from `#3b82f6` to `#1d4ed8` (deeper FIFA-inspired blue)
- Update `--color-cyan` from `#3b82f6` to `#0891b2` (vibrant FIFA cyan)
- Keep existing accent colors (green, yellow, orange, red) unchanged
- Keep background/surface colors unchanged
- Update Sidebar active state to use new blue
- No changes to component structure or behavior

## Capabilities

### New Capabilities
- `fifa-colors`: FIFA/Panini brand color palette definition for the GUI

### Modified Capabilities
<!-- No existing specs require requirement-level changes — colors are cross-cutting CSS variables -->

## Impact

- `src/gui/src/index.css`: Update CSS custom properties
- `src/gui/src/components/Sidebar.tsx`: Verify color references (likely uses variables, no change needed)
- No API, dependency, or behavioral changes
