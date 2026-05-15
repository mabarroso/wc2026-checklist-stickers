## Context

The CLI menus use the term "figurita" to refer to stickers throughout the UI. This change renames all occurrences to "cromo" for consistency with Spanish (Spain) terminology while maintaining compatibility with other Spanish-speaking regions.

## Goals / Non-Goals

**Goals:**
- Replace all UI text "figurita"/"figuritas" with "cromo"/"cromos"
- Maintain all existing functionality
- Keep code logic unchanged

**Non-Goals:**
- Changing any code variable names or function names
- Modifying any business logic
- Updating tests (text is UI-only)
- Changing any terminology beyond "figurita"/"figuritas"

## Decisions

| File | Changes |
|------|---------|
| `MainMenu.ts` | 3 menu items: "Marcar figurita como obtenida" → "Marcar cromo como obtenido", etc. |
| `ViewCollectionMenu.ts` | 2 text strings: "Ver todas las figuritas" → "Ver todos los cromos", "Total figuritas" → "Total cromos" |
| `MarkOwnedMenu.ts` | 8 text strings in headers, prompts, and messages |
| `MarkDuplicateMenu.ts` | 4 text strings in headers and prompts |
| `StatisticsDisplay.ts` | 2 text strings: "Total figuritas", "No tienes figuritas repetidas aún" |
| `SearchInterface.ts` | 3 text strings: "Buscar figuritas", results messages |
| `ExportMenu.ts` | 3 text strings: "Exportar figuritas faltantes", success messages |

## Risks / Trade-offs

- **Low risk**: Pure text replacement with no logic changes
- **No migration needed**: Immediate deployment
- **No rollback concerns**: Easy to revert if needed