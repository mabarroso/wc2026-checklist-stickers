## Why

Users currently export missing stickers as a single set, which makes it harder to share or print only the subset they need. Adding a source selector improves usability for exchanges and event-specific workflows.

## What Changes

- Add source-scope selection before exporting missing stickers to PDF, CSV, and TXT.
- Support exactly these export scopes: `Panini`, `Extra`, `Coca cola`, `McDonald's`, and `Todos`.
- Apply the selected scope consistently to all supported formats (PDF/CSV/TXT).
- Keep backup actions separated from checklist generation so source selection does not affect backup contents.
- Keep current export behavior when `Todos` is selected.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `export-missing`: export result set must support source-based filtering for missing stickers.
- `export`: export flow must expose source selection options for users before generating files.

## Impact

- Affected code: CLI export menu, GUI export screen, missing-sticker query/filter logic, and exporters.
- Affected tests: export format tests and filtering tests for each source option.
- No new external dependencies expected.