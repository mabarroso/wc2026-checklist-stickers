## Why

When exporting missing stickers with the "Panini" source scope, the list currently includes promotional extras (PANINI_EXTRA) that are not part of the basic collection album. Users need a clean export of only the base album. Additionally, export lists lack sort control — they always appear in CSV order with no option to sort by name or ID for easier reference.

## What Changes

1. **Panini scope excludes extras**: The `PANINI_EXTRA` type is removed from the Panini source filter so only basic collection stickers (players, team badges, logos, FIFA specials) are included.
2. **Export sort option**: After selecting source scope and before choosing destination, the user picks a sort order: by ID (album order) or by name (alphabetical).

## Capabilities

### New Capabilities
- `export-sorting`: Sort order selector for export lists (by ID or by name).

### Modified Capabilities
- `export-missing`: Update Panini scope requirement to exclude PANINI_EXTRA from the basic collection filter.

## Impact

- `src/infrastructure/exporters/export-source-filter.ts` — remove `PANINI_EXTRA` from `PANINI_TYPES`
- `src/infrastructure/exporters/BaseExporter.ts` — accept sort option in constructor/options
- `src/infrastructure/cli/ExportMenu.ts` — add sort prompt before destination
- All exporter implementations (PDF, CSV, TXT) — apply sort before rendering
- `tests/infrastructure/export-source-filter.test.ts` — update Panini filter test
