## Why

Two improvements: flag emojis are invisible on the Linux desktop GUI due to font rendering, and the Statistics screen requires expanding team groups one-by-one instead of showing all at once.

## What Changes

1. **Desktop flag rendering**: Replace emoji regional indicators with inline SVG flags from `country-flag-icons` npm package. Flags render as `<img>` elements with `data:image/svg+xml;utf8` URIs, eliminating any system font dependency. Add persisted flag toggle (default ON) in the 3-dot menu.
2. **Statistics expand all**: Add a "Desplegar todo / Colapsar todo" button to the "Por equipo" section that expands or collapses all team group sections at once.

## Capabilities

### New Capabilities
- `expand-all-teams`: Toggle to expand or collapse all team group sections in Statistics

### Modified Capabilities
- `country-flag-toggle`: Updated to use SVG rendering instead of emoji, default enabled

## Impact

- `src/gui/src/lib/flag-utils.ts` — new file, FIFA-to-ISO code map + `getFlagSvg()` function
- `src/gui/src/stores/flagStore.ts` — new file, zustand persist store for flag toggle
- `src/gui/src/stores/index.ts` — re-export `useFlagStore`
- `src/gui/src/components/Header.tsx` — "Mostrar/Ocultar bandera países" toggle in 3-dot menu
- `src/gui/src/screens/ViewCollection.tsx` — flag SVG on sticker cards; batch bar `bottom-28`
- `src/gui/src/screens/Search.tsx` — flag SVG in preview + bottom sheet
- `src/gui/src/screens/Statistics.tsx` — flag SVG in team headers; expand-all button
- `src/gui/src/screens/MarkDuplicate.tsx` — minus button always enabled (removes at qty=1)
- `src/gui/package.json` — added `country-flag-icons` dependency
