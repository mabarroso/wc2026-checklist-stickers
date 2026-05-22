## Context

The export flow currently generates files from the complete set of missing stickers. Users requested a source-level selection to export only a subset (`Panini`, `Extra`, `Coca cola`, `McDonald's`, `Todos`) regardless of output format.

## Goals / Non-Goals

**Goals:**
- Add a mandatory source selector for export operations.
- Ensure selected source scope is applied uniformly across PDF, CSV, and TXT exports.
- Keep `Todos` as the default behavior equivalent to current full export.

**Non-Goals:**
- Introducing multi-select source combinations.
- Changing existing file naming conventions.
- Redefining sticker classification rules.

## Decisions

1. Reuse existing sticker section/category classification.
- Decision: map stickers to export sources using existing domain/category logic.
- Rationale: avoids duplicate classification rules and minimizes regression risk.

2. Apply filtering before format-specific rendering.
- Decision: derive filtered missing-sticker list once, then pass the same list to PDF/CSV/TXT exporters.
- Rationale: guarantees parity between formats.

3. Use explicit source option values in UI and command flow.
- Decision: define canonical values for `panini`, `extra`, `coca_cola`, `mcdonalds`, `todos` while keeping Spanish labels in UI.
- Rationale: stable internal identifiers simplify tests and branching.

4. Keep backup actions outside source-scoped export behavior.
- Decision: the source selector applies only to missing-sticker checklist generation, while backup continues to save the full collection.
- Rationale: avoids conflating portability backups with partial checklist exports.

## Risks / Trade-offs

- [Classification mismatch between screens and export] -> Mitigation: centralize mapping helper and cover with tests.
- [Format parity regressions] -> Mitigation: assert filtered counts/content equivalence in exporter tests.
- [User confusion about scope] -> Mitigation: show selected source in export confirmation/success state.
- [User confusion between backup and export filter] -> Mitigation: separate backup UI from checklist export UI and document that backup always includes the full collection.

## Migration Plan

1. Add source selection in export flow entry points (CLI and GUI).
2. Add filtered missing-list derivation based on source option.
3. Route filtered data into all exporters.
4. Update tests and validate OpenSpec artifacts.

Rollback strategy:
- Revert to current `Todos`-only export path while preserving existing exporters.

## Open Questions

- None.