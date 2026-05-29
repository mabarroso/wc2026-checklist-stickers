## Why

The app currently only exports missing stickers (those not yet in the album). Users who trade stickers also need a list of their duplicate stickers to know what they can offer in trades. Adding this feature completes the trading cycle: know what is missing and what is spare.

## What Changes

- A new initial step in the export flow (CLI and GUI) to choose between exporting **missing stickers** or **duplicate stickers**.
- When "duplicates" is selected, stickers with duplicate quantity > 0 are filtered and exported in the chosen format (PDF/CSV/TXT) with the same source scope, sort order, and destination flow.
- Generated filenames for duplicates use `repetidos_<YYYY-MM-DD>.pdf|csv|txt` (instead of `faltantes_<...>`).
- File content (titles, headers) reflects whether it is a duplicate or missing list.
- The CLI main menu changes from "📤 Exportar faltantes" to "📤 Exportar" to reflect multiple export types.

## Capabilities

### New Capabilities
- `export-duplicates`: Export duplicate stickers in PDF, CSV, and TXT formats, with the same source scope filter, sort order, and destination selection as the missing sticker export.

### Modified Capabilities
- `export`: The export flow now requires an initial step to select the export type (faltantes/repetidos) before continuing with source scope, format, sort, and destination.

## Impact

- **CLI**: `ExportMenu.ts` — new type selection step. `MainMenu.ts` — updated menu label.
- **Exporters**: `BaseExporter.ts`, `PdfExporter.ts`, `TxtExporter.ts` — support for dynamic label ("Faltantes"/"Repetidos") in content and filenames.
- **GUI**: `ExportScreen.tsx` — new export type toggle, conditional filtering logic.
- **Rust backend**: `lib.rs` — `export_pdf`, `export_csv`, `export_txt` commands accept `export_type` parameter for filename and titles.
