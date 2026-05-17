# Design: Improve Collection Usability

## Context

The GUI collection interface needs usability improvements:

1. **Search is view-only**: Users can search stickers but cannot mark them as owned/duplicated from search results. Must navigate to ViewCollection to perform actions.

2. **No sorting in Collection**: ViewCollection displays stickers in CSV order. Users who want alphabetical sorting have no option.

3. **Inconsistent sticker IDs**: Current IDs like `COL8`, `COL9`, `COL10` don't sort alphabetically (COL10 comes before COL8). Need zero-padding (`COL08`, `COL09`, `COL10`) for proper sorting.

4. **Collection state storage**: Both CLI and GUI persist collection state. CLI uses `~/.config/panini-stickers/collection.json` (Conf), GUI uses localStorage via Zustand persist.

**Stakeholders**: End users managing their sticker collection via GUI.

## Goals / Non-Goals

**Goals:**
- Enable sticker actions (add/remove/mark duplicate) directly from Search screen
- Add sorting dropdown to ViewCollection (Álbum order, Cromo alphabetical)
- Zero-pad all sticker IDs to consistent format for proper sorting
- Migrate existing collection state to new ID format on startup

**Non-Goals:**
- CLI changes (only GUI affected)
- Backend/API changes (no server component)
- Export functionality changes
- Additional search filters beyond current capabilities
- Bulk operations (mark multiple at once)

## Decisions

### D1: Sticker ID Format

**Decision:** Use zero-padded format for numeric suffixes.

Examples:
| Type | Old ID | New ID |
|------|--------|--------|
| Team player | `COL8` | `COL08` |
| Team player | `COL10` | `COL10` |
| FWC special | `FWC1` | `FWC01` |
| Logo | `LOGO` | `LOGO` (no change) |

**Format rule:** 2-digit zero-padding for single-digit numbers (01-09), no padding for 10+.

**Rationale:** Maintains readability while enabling alphabetical sort. `COL08 < COL09 < COL10` ✓

**Alternative considered:** 3-digit padding (`COL008`) — Too verbose, reduces readability.

### D2: Migration Strategy

**Decision:** Migrate collection state on app startup.

```typescript
// Detect old format by checking for non-padded IDs
const needsMigration = Object.keys(owned).some(id => /^[A-Z]+[0-9]$/.test(id));

if (needsMigration) {
  const migrated = migrateIds(owned); // COL8 → COL08
  // Save to storage with new format
}
```

**Rationale:** One-time migration on startup is transparent to users. No manual steps required.

### D3: Sort Preference Persistence

**Decision:** Store sort preference in collection store, default to "Álbum".

```typescript
interface CollectionStore {
  // ... existing fields
  sortOrder: 'album' | 'cromo'; // default: 'album'
}
```

**Rationale:** Persist user's preference across sessions. Default to album order maintains familiarity.

### D4: Search Actions UI

**Decision:** Add action buttons to search results panel, mirroring ViewCollection.

Layout:
```
┌────────────────────────────────────┐
│  Search results                    │
│  ┌─────────────────────────────┐   │
│  │ COL08 - Jhon Lucumí         │   │
│  │ Colombia | 1 repetida       │   │
│  │ [Añadir] [Quitar] [Repetir] │   │
│  └─────────────────────────────┘   │
│  ...more results...                 │
└────────────────────────────────────┘
```

**Rationale:** Consistent UX across screens. Users learn one pattern for all sticker actions.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Migration fails | User loses collection data | Test migration logic, add fallback |
| Old collection state not migrated | Sticker states appear lost | Detect on every startup, migrate if needed |
| Data file update corrupts stickers | Album becomes unusable | Validate JSON/CSV after update, backup original |
| Zero-padding causes ID lookup failures | "Sticker not found" errors | Update all lookup paths, cross-check CLI and GUI |

## Migration Plan

### Phase 1: Data Files
1. Update `src/data/stickers.csv` with new zero-padded IDs
2. Regenerate `src/gui/src/data/stickers.json` from updated CSV

### Phase 2: GUI Code
1. Update `collectionStore.ts` with migration logic
2. Update `Search.tsx` with action buttons
3. Update `ViewCollection.tsx` with sort dropdown

### Phase 3: Verification
1. Run tests (`bun test`)
2. TypeScript check (`bun run typecheck`)
3. Manual testing: search → mark → verify in collection

### Rollback
- If migration fails, keep old ID format in code
- Restore from backup of stickers.csv if needed

## Open Questions

1. **Should CLI also migrate IDs?** Yes — both CLI and GUI share the same data, so CLI must also use new IDs. CLI collection state (`~/.config/panini-stickers/collection.json`) also needs migration.

2. **Backward compatibility?** After migration, old ID format will no longer work. This is a breaking change documented in the proposal.