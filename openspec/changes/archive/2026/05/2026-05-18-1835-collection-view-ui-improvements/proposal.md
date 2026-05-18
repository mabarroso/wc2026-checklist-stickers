## Why

Currently, the View Collection screen displays action buttons (add, remove, mark as duplicate) in a side panel that remains visible even after selecting different stickers. This creates a poor UX where the panel is disconnected from the selected sticker. Additionally, there is no way to filter stickers by team/group when viewing duplicates. These issues reduce usability and make it harder for users to manage their collection efficiently.

## What Changes

- **Move action buttons inside the selected sticker card**: The three action buttons (Añadir al álbum, Quitar del álbum, Marcar como repetida) will appear within the selected sticker card at the bottom, replacing the current side panel. The panel disappears when no sticker is selected.
- **Add team filter dropdown**: A new dropdown will be added to the right of the "Repetidas" filter button, allowing users to filter stickers by team. The dropdown shows unique ID_FIX-TEAM combinations (e.g., "ARG - Argentina", "BRA - Brasil"). The filter persists globally across all views (Todas/Faltantes/En el álbum/Repetidas).
- **Update click behavior**: Clicking on a missing sticker will only select it (not auto-mark as owned).

## Capabilities

### New Capabilities
- `collection-action-buttons`: Display add/remove/duplicate action buttons directly inside the selected sticker card instead of a side panel.
- `team-filter-dropdown`: Filter stickers by team using a dropdown with ID_FIX-TEAM combinations.

### Modified Capabilities
- None. The existing collection management functionality remains unchanged; only the UI presentation is being improved.

## Impact

- **Modified files**:
  - `src/gui/src/screens/ViewCollection.tsx` - Main UI changes for buttons and dropdown
  - `src/gui/src/stores/collectionStore.ts` - May need to add team filter state (optional, can be local state)
- **No breaking changes**: The underlying collection data model and storage remain the same.
- **Dependencies**: No new dependencies required - using existing React state hooks and UI components.