## Context

Currently the app exports only missing stickers ("faltantes") via a linear flow: format → source scope → sort → (PDF mode) → destination. Exporters produce content with hardcoded "Faltantes" in filenames and titles. The GUI uses Tauri Rust commands that also hardcode `faltantes` as filename prefix and title text.

The `CollectionState` entity already tracks `duplicates: Record<string, number>` and provides `getDuplicateQuantity(id)`. The Zustand store in the GUI also tracks `duplicates`. No data model changes are needed.

## Goals / Non-Goals

**Goals:**
- Allow users to choose between exporting "faltantes" (missing) or "repetidos" (duplicates) in both CLI and GUI
- Reuse existing export infrastructure (formats, source scope filter, sorting, destination selection)
- Generated files for duplicates use `repetidos_<date>.ext` naming and appropriate titles
- All existing functionality remains unchanged when "faltantes" is selected

**Non-Goals:**
- No changes to the data model or persistence layer
- No changes to backup/restore functionality
- No changes to how duplicates are tracked or displayed (stats, view)
- No new export formats

## Decisions

### Decision 1: Export type selection as first step in flow
**Chosen**: Add a new initial prompt/control before the existing flow. In CLI, a new inquirer list prompt. In GUI, a two-button toggle segment.
**Alternatives considered:**
- Separate menu items ("Exportar faltantes" / "Exportar repetidos"): Duplicates the entire export flow code.
- Single unified export with automatic file labeling: Harder for user to understand what they're exporting.

### Decision 2: Exporter content labeling via `label` option
**Chosen**: Add optional `label: string` to `ExporterOptions` in `BaseExporter`. Default to `'Faltantes'`. Both `PdfExporter` and `TxtExporter` use this instead of hardcoded strings. The filename generation uses lowercase label as prefix when no custom `filename` is provided.
**Alternatives considered:**
- Separate exporter subclasses (`DuplicatePdfExporter`, etc.): Too much duplication.
- Passing the full filename only: Doesn't fix hardcoded content titles.

### Decision 3: Rust backend uses `export_type` parameter
**Chosen**: Add `export_type: Option<String>` parameter to each Tauri command (`export_pdf`, `export_csv`, `export_txt`). Default: `"faltantes"`. Used for both filename prefix and content titles.
**Alternatives considered:**
- Separate Rust commands (`export_duplicates_pdf`, etc.): More Rust code, harder to maintain.
- Compute type from data (e.g., check if any sticker has duplicates): Ambiguous and fragile.

### Decision 4: GUI export type as React state toggle
**Chosen**: Add `exportType` state (`'faltantes' | 'repetidos'`) to `ExportScreen`. Conditionally compute `stickerList` as either missing or duplicate stickers. Pass to `invoke()` calls.
**Alternatives considered:**
- Multiple screens or routes: Overkill for a simple toggle.
- Separate component: Unnecessary abstraction for this scope.

## Risks / Trade-offs

- **Risk**: Adding a parameter to Tauri commands could break the GUI if frontend and backend versions are out of sync. → **Mitigation**: Parameter is `Option<String>` in Rust, so old frontend calls (without the param) default to `"faltantes"` gracefully.
- **Risk**: The `label` option in exporters changes a published interface. → **Mitigation**: It's optional with a default, fully backward compatible.
- **Trade-off**: The `MainMenu` changes from "📤 Exportar faltantes" to "📤 Exportar". Users accustomed to the old label may initially look for "faltantes". The new sub-prompt makes the choice explicit.
