## Context

Flag emojis rely on regional indicator symbols (U+1F1E6–U+1F1FF) which require an emoji font with color bitmap support. Linux WebKitGTK does not reliably render these without `Noto Color Emoji` installed. Additionally, not all Linux distributions ship this font by default. The better solution is to use inline SVG flags, which work everywhere without any system font dependency. Separately, the Statistics "Por equipo" accordion only supports one-at-a-time section expansion, with no bulk toggle.

## Goals / Non-Goals

**Goals:**
- Render country flags on Linux desktop without any system font dependency
- Ensure consistent flag rendering across Android, desktop, and all platforms
- Add a persisted user toggle (default ON) to show/hide flags
- Add "Desplegar todo / Colapsar todo" button to Statistics "Por equipo" section
- Show ball fallback for stickers without a country code

**Non-Goals:**
- No system font dependencies (`fonts-noto-color-emoji` removed from bundle config)
- Keep flag rendering purely in frontend (no Rust backend changes)

## Decisions

1. **SVG instead of emoji**: Use the `country-flag-icons` npm package for inline SVG strings. Render via `<img>` tags with `data:image/svg+xml;utf8` URIs. This eliminates the need for `Noto Color Emoji` or any system emoji font.

2. **Flag utility**: New `src/gui/src/lib/flag-utils.ts` maps FIFA 3-letter codes → ISO 3166-1 alpha-2 codes. Import from `country-flag-icons/string/3x2` which provides individual named SVG string exports. SVG data URIs use `encodeURIComponent()` to avoid broken images.

3. **Persisted toggle**: New `src/gui/src/stores/flagStore.ts` using zustand persist middleware (key: `show-flags`). Default state: `true` (show flags). Exposed via `useFlagStore` with `showFlags` selector and `toggleFlags()` action.

4. **Statistics expand all**: Leverage existing `expandedSections` Set state. Derive `allExpanded` from `expandedSections.size === sections.length`. Add a single button next to the "Por equipo" heading that toggles all sections at once. No new state or stores needed.

5. **Duplicate minus button**: Remove the `disabled` condition on the minus button. When qty reaches 0 in the store, the entry is automatically removed.

6. **Batch bar clearance**: Changed from `bottom-20` to `bottom-28` to prevent overlap with flag toggle area in the collection view.

## Risks / Trade-offs

- **Bundle size**: Adding `country-flag-icons` increases the JS bundle (all 260+ country SVGs). Tree-shaking only includes imports for countries in the FIFA-to-ISO map (48 nations).
- **England/Scotland**: Both map to `GB` (Union Jack) since `country-flag-icons` doesn't support subdivision flags.
- **Button placement**: "Desplegar todo" button next to the heading may wrap on narrow screens. Use `flex-shrink-0` to prevent layout breakage.
