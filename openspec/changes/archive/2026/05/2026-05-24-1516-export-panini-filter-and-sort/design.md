## Context

The export flow currently filters missing stickers by source scope (Panini, Extra, Coca-Cola, McDonald's, Todos) via `export-source-filter.ts`, then generates files through format-specific exporters (PDF, CSV, TXT). The Panini scope includes `PANINI_EXTRA` type stickers, which are promotions/extras not part of the basic album. The sticker list is always rendered in CSV-load order with no sort control.

## Goals / Non-Goals

**Goals:**
- Panini export scope excludes PANINI_EXTRA stickers (only basic collection)
- User can choose sort order (by ID or by name) during export
- Sort applies consistently across PDF, CSV, and TXT formats
- Minimal, backward-compatible changes

**Non-Goals:**
- No changes to Extra, Coca-Cola, McDonald's, or Todos scopes
- No persistence of sort preference (session-only)
- No sort in backup/restore functionality

## Decisions

### Decision 1: Remove PANINI_EXTRA from the type set (not ID-pattern filter)
- **Chosen**: Remove `StickerType.PANINI_EXTRA` from `PANINI_TYPES` in `export-source-filter.ts`
- **Rationale**: Type-based filtering is already in place and proven. Adding an ID-pattern regex (`/^[A-Z]{3}\d{2}$/`) would be redundant since the type system correctly classifies all stickers. Simpler, fewer edge cases.
- **Alternative considered**: ID regex filter — rejected because it would incorrectly exclude legitimate stickers like logo `0` or `FWC01`.

### Decision 2: Sort applied in the export menu before passing to exporters
- **Chosen**: Sort the `filteredMissingStickers` array in `ExportMenu.execute()` after filtering and before passing to exporter constructors
- **Rationale**: No changes needed to the exporter hierarchy (`BaseExporter` remains untouched). The exporters receive a pre-sorted array, so they work as-is.
- **Alternative considered**: Adding `sortOrder` to `ExporterOptions`/`BaseExporter` — rejected for simplicity. Sorting at the caller level is sufficient and avoids spreading sort logic across all exporter subclasses.

### Decision 3: Sort prompt placed after source scope selection
- **Chosen**: Insert sort prompt between the source-scope prompt and the destination prompt
- **Rationale**: Logical flow — first pick what to export (scope), then how to order it (sort), then where to save it (destination).
- **Alternative considered**: Sort as part of source prompt — rejected; keeps concerns separate.

## Risks / Trade-offs

- **[Low] Sort for large collections**: With ~1200 stickers, sorting in-memory is negligible in JavaScript. No performance concern.
- **[Low] ID format variance**: Sticker IDs have varying formats (`0`, `FWC01`, `CC-US01`, `LM-b`). Sorting alphabetically by ID is consistent with existing view-collection sort behavior.
- **[None] Backward compatibility**: Removing PANINI_EXTRA from the Panini set is effectively a no-op since no sticker currently uses that type.
