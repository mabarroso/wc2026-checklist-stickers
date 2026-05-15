## Why

The CLI application uses the term "figurita" (common in Latin American Spanish) to refer to stickers. However, in Spain, the standard term is "cromo" (singular) / "cromos" (plural). Since the application targets Spanish speakers and uses terms like "faltantes", it should use consistent terminology that works across all Spanish-speaking regions.

## What Changes

- **Rename UI text**: Replace all occurrences of "figurita", "figuritas", and "figurita(s)" with "cromo", "cromos", and "cromo(s)" in all CLI menus and messages
- **24 text replacements** across 7 files in `src/infrastructure/cli/`
- No code logic changes — only display text updates
- All other terminology remains unchanged (faltantes, obtenidos, repetidos, etc.)

## Capabilities

### New Capabilities
- None (terminology fix only)

### Modified Capabilities
- `cli-menus`: Update all user-facing text from "figurita" to "cromo" in menus and prompts

## Impact

- **Files affected**: 7 files in `src/infrastructure/cli/`
- **No breaking changes**: Only display text, no API or data model changes
- **Tests**: No test changes required (tests use mocks, no text assertions)
- **Build**: No impact