## 1. Exporter Base Layer — Dynamic content labeling

- [x] 1.1 Add `label?: string` to `ExporterOptions` in `BaseExporter.ts` with default `'Faltantes'`
- [x] 1.2 Update `generateFilename()` in `BaseExporter.ts` to use lowercase label as prefix when no custom `filename` is provided
- [x] 1.3 Update `PdfExporter.ts` to use `this.label` in `renderHeader()` instead of hardcoded `'Faltantes'`
- [x] 1.4 Update `TxtExporter.ts` to use `this.label` in header title and footer total count instead of hardcoded `'faltantes'`

## 2. CLI — Export type selection

- [x] 2.1 Change `MainMenu.ts` option from `'📤 Exportar faltantes'` to `'📤 Exportar'`
- [x] 2.2 Add export type selection step in `ExportMenu.ts` (`show()` method) prompting `Cromos faltantes` / `Cromos repetidos`
- [x] 2.3 Update `ExportMenu.execute()` to compute sticker list based on type: `state.getOwnedQuantity(s.id) === 0` for faltantes, `state.getDuplicateQuantity(s.id) > 0` for repetidos
- [x] 2.4 Pass `filename` (`'repetidos_<date>'`) and `label` (`'Repetidos'`) to exporter constructors when type is repetidos
- [x] 2.5 Update empty-state message and count labels conditionally based on export type

## 3. Rust backend — Dynamic export type support

- [x] 3.1 Add `export_type: Option<String>` parameter to `export_pdf` in `lib.rs`, using it for filename and title
- [x] 3.2 Add `export_type: Option<String>` parameter to `export_csv` in `lib.rs`, using it for filename
- [x] 3.3 Add `export_type: Option<String>` parameter to `export_txt` in `lib.rs`, using it for filename and content title

## 4. GUI — Export type selection

- [x] 4.1 Add `exportType` state (`'faltantes' | 'repetidos'`) and UI toggle in `ExportScreen.tsx`
- [x] 4.2 Compute sticker list conditionally: `missing` for faltantes, `duplicate` (where `(duplicates[s.id] || 0) > 0`) for repetidos
- [x] 4.3 Pass `exportType` parameter to `invoke('export_pdf')`, `invoke('export_csv')`, `invoke('export_txt')` calls
- [x] 4.4 Update preview, count, and empty-state labels conditionally based on export type
- [x] 4.5 Update panel title and description text conditionally

## 5. Verify

- [x] 5.1 Run `bun test` and fix any failures
- [x] 5.2 Run `bun run typecheck` and fix any failures
- [x] 5.3 Run `bun run lint` and fix any failures
