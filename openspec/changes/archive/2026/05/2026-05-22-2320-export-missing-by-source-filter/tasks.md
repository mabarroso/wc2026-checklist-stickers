## 1. Export Source Model

- [x] 1.1 Define canonical source values for export scope (`panini`, `extra`, `coca_cola`, `mcdonalds`, `todos`)
- [x] 1.2 Add mapping helper from sticker classification to export source scope
- [x] 1.3 Add guard/default behavior for unknown scope fallback to `todos`

## 2. CLI and GUI Export Flow

- [x] 2.1 Add source selector to CLI export flow with labels Panini, Extra, Coca cola, McDonald's, Todos
- [x] 2.2 Add source selector to GUI export screen with same options
- [x] 2.3 Ensure selected source is passed into export execution for all formats

## 3. Format Output Consistency

- [x] 3.1 Apply source filter before exporter invocation (single filtered list)
- [x] 3.2 Verify PDF output uses filtered missing list
- [x] 3.3 Verify CSV/TXT outputs use the same filtered missing list

## 4. Tests and Verification

- [x] 4.1 Add tests for each scope option and `todos` in missing export logic
- [x] 4.2 Add tests for format parity (same filtered set in PDF/CSV/TXT)
- [x] 4.3 Run `bun test`, `bun run typecheck`, and `openspec validate export-missing-by-source-filter`