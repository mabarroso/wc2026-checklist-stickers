# Proposal: Improve Collection Usability

## Why

The GUI collection interface lacks basic usability features. Search results are view-only (no actions), and the collection view has no sorting options. Additionally, sticker IDs use inconsistent formats (e.g., `COL8` vs `COL10`) which prevents proper alphabetical sorting.

## What Changes

### 1. Search Enhancement
- Add action buttons to search results: "Añadir al álbum", "Quitar del álbum", "Marcar como repetida"
- Enable mark/unmark operations directly from search results
- Consistent UX with ViewCollection screen

### 2. Collection Sorting
- Add sort dropdown with options:
  - **Álbum**: Current CSV order (default)
  - **Cromo**: Alphabetical by sticker ID
- Persist sort preference in collection state

### 3. Sticker ID Zero-Padding **BREAKING**
- Normalize all sticker IDs to zero-padded format (e.g., `COL08`, `COL09`, `COL10`)
- Affects all stickers with numeric suffixes (1-20 per team)
- Migration needed for existing collection state

## Capabilities

### New Capabilities
- `search-actions`: Enable sticker actions (add/remove/mark duplicate) from search results
- `collection-sorting`: Sorting options for collection view (album order, alphabetical)
- `sticker-id-normalization`: Zero-padded sticker ID format for consistent sorting

### Modified Capabilities
- `sticker-entity`: Sticker ID format change (breaking) - requires migration
- `collection-state`: Add sort preference to persisted state

## Impact

### Affected Files
- `src/data/stickers.csv` — Renumber all sticker IDs
- `src/gui/src/data/stickers.json` — Mirror changes from CSV
- `src/gui/src/screens/Search.tsx` — Add action buttons
- `src/gui/src/screens/ViewCollection.tsx` — Add sort dropdown
- `src/gui/src/stores/collectionStore.ts` — Persist sort preference + ID migration
- `src/domain/entities/Sticker.ts` — Sticker ID format documentation
- `openspec/specs/sticker-entity/spec.md` — Update ID format requirements

### Breaking Changes
- Sticker IDs change format: `COL8` → `COL08`, `FWC1` → `FWC01`
- Existing collection state (`~/.config/panini-stickers/collection.json`) requires migration
- Any external references to sticker IDs must be updated

### Migration Strategy
- On app startup, migrate collection state from old IDs to new format
- One-time migration: detect old format, convert, save
- Both CLI and GUI must implement same migration logic