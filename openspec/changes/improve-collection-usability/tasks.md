# Tasks: Improve Collection Usability

## 1. Update Sticker Data (Zero-Padding)

- [x] 1.1 Update `src/data/stickers.csv` with zero-padded IDs (COL8 → COL08, FWC1 → FWC01, etc.)
- [x] 1.2 Regenerate `src/gui/src/data/stickers.json` from updated CSV
- [x] 1.3 Verify all 1195 stickers have correct zero-padded format

## 2. Update GUI Collection Store

- [x] 2.1 Add `sortOrder` field to CollectionStore interface (`'album' | 'cromo'`)
- [x] 2.2 Add `migrateIds()` function to convert old IDs to zero-padded format
- [x] 2.3 Add `migrateStickerIds()` on app startup (detect old format, migrate, save)
- [x] 2.4 Add `setSortOrder()` action to update sort preference
- [x] 2.5 Ensure migration handles partial migration (some old, some new IDs)

## 3. Update Search Screen

- [x] 3.1 Add action buttons section to Search.tsx (Añadir, Quitar, Repetir)
- [x] 3.2 Wire buttons to collectionStore actions (markOwned, unmarkOwned, markDuplicate)
- [x] 3.3 Disable/enable buttons based on current sticker state
- [x] 3.4 Update UI badges when actions are performed
- [x] 3.5 Add quantity controls (increment/decrement) for owned stickers

## 4. Update ViewCollection Screen

- [x] 4.1 Add sort dropdown component with options "Álbum" and "Cromo"
- [x] 4.2 Connect sort dropdown to collectionStore.sortOrder
- [x] 4.3 Implement alphabetical sorting function for stickers by ID
- [x] 4.4 Apply sort to filtered views (All, Missing, Owned, Duplicated)
- [x] 4.5 Default sort to "Álbum" on first launch
- [x] 4.6 Persist sort preference across sessions

## 5. Update CLI (ID Migration)

- [x] 5.1 Add migration logic to CLI StorageAdapter
- [x] 5.2 Update CLI sticker lookup to handle zero-padded IDs
- [x] 5.3 Test CLI with existing collection state (migration scenario)

## 6. Verification

- [x] 6.1 Run `bun test` — ensure all tests pass
- [x] 6.2 Run `bun run typecheck` — ensure no TypeScript errors
- [x] 6.3 Run `bun run lint` — ensure no linting errors
- [x] 6.4 Build GUI: `cd src/gui && bun run tauri build`
- [x] 6.5 Manual test: Search sticker → Add to album → Verify in Collection
- [x] 6.6 Manual test: Sort by Cromo → Verify COL08 < COL09 < COL10 ordering
- [x] 6.7 Manual test: Reload app → Verify sort preference persisted