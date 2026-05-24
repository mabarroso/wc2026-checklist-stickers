## 1. Panini scope filter update

- [x] 1.1 Remove `StickerType.PANINI_EXTRA` from `PANINI_TYPES` in `src/infrastructure/exporters/export-source-filter.ts`
- [x] 1.2 Update Panini scope test in `tests/infrastructure/export-source-filter.test.ts` to verify PANINI_EXTRA is excluded

## 2. Export sort order

- [x] 2.1 Add sort prompt in `ExportMenu.execute()` after source scope selection and before destination prompt, with options "ID (orden de álbum)" and "Nombre (alfabético)"
- [x] 2.2 Sort `filteredMissingStickers` array by ID or by name based on user selection before passing to exporter constructors
- [x] 2.3 Verify sort works across all three formats (PDF, CSV, TXT)

## 3. Verify

- [x] 3.1 Run `bun test` — all tests pass
- [x] 3.2 Run `bun run typecheck` — no type errors
- [x] 3.3 Run `bun run lint` — no lint errors
