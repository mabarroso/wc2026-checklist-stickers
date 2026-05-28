## Why

Three UI improvements needed: the batch mode bottom bar overlaps the navigation tab, the minus button in MarkDuplicate is disabled at qty=1 instead of removing the entry, and users want the option to show country flags instead of the generic ball icon on sticker cards.

## What Changes

1. **Batch mode bar position**: Change `bottom-20` to `bottom-28` in ViewCollection.tsx so the batch action bar clears the bottom navigation
2. **MarkDuplicate minus button**: Remove `disabled` state when qty=1; clicking minus at qty=1 removes the duplicate entry entirely (store already handles `newDuplicates === 0`)
3. **Country flag toggle**: Add "Mostrar bandera países" option to the 3-dot kebab menu (persisted toggle, disabled by default). When enabled, sticker cards show the country flag emoji instead of the ball icon

## Capabilities

### New Capabilities
- `country-flag-toggle`: Persisted toggle to show/hide country flag emoji on sticker cards, accessible from the header 3-dot menu

### Modified Capabilities
- (none — existing specs unchanged)

## Impact

- `src/gui/src/screens/ViewCollection.tsx` — batch bar `bottom-20` → `bottom-28`; conditional flag rendering in sticker card
- `src/gui/src/screens/Search.tsx` — conditional flag rendering in sticker card (two places)
- `src/gui/src/screens/MarkDuplicate.tsx` — minus button behavior change
- `src/gui/src/components/Header.tsx` — new menu item in 3-dot kebab
- `src/gui/src/stores/flagStore.ts` — new zustand store (NEW)
- `src/gui/src/lib/flag-utils.ts` — FIFA code → flag emoji mapping (NEW)
