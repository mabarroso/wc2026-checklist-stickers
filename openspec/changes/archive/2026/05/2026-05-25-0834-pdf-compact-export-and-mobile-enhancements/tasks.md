## 1. PDF Compact Mode — CLI Exporter

- [x] 1.1 Add `mode: 'full' | 'ids-only'` to `PdfExporterOptions` in `src/infrastructure/exporters/PdfExporter.ts`
- [x] 1.2 Implement compact render logic in `PdfExporter.renderContent()`: when `ids-only`, render 8+ columns with checkbox + ID only, no name/team
- [x] 1.3 Add "Incluir nombres?" prompt to `ExportMenu.ts` after format selection: "Sí (formato completo)" / "No (solo IDs, más columnas)"
- [x] 1.4 Pass the selected mode to `PdfExporter` constructor

## 2. PDF Compact Mode — GUI Rust Backend

- [x] 2.1 Add `mode: String` parameter to `export_pdf` command in `src/gui/src-tauri/src/lib.rs`
- [x] 2.2 Implement ID-only render path: when `mode == "ids-only"`, use 6+ columns with checkbox + ID only
- [x] 2.3 Add "Solo IDs" header label in compact mode

## 3. PDF Compact Mode — GUI Export Screen

- [x] 3.1 Add `compactMode` state to `Export.tsx`
- [x] 3.2 Add toggle "Solo IDs" / "Formato completo"
- [x] 3.3 Pass `mode` to the `export_pdf` invoke call

## 4. Mobile Search Autocomplete

- [x] 4.1 Add `useRef` and `useEffect` for autocomplete dropdown visibility in `Search.tsx`
- [x] 4.2 Implement autocomplete logic: filter all stickers by query (2+ chars), group results by type (ID, name, team), limit to 8 suggestions
- [x] 4.3 Render autocomplete dropdown below search input on mobile (viewport < 768px)
- [x] 4.4 On team selection: replace results grid with all stickers from that team, show count
- [x] 4.5 On ID/name selection: show single sticker card with full details and action buttons
- [x] 4.6 Ensure touch targets are 44px+ for suggestion items
- [x] 4.7 Hide right preview panel on mobile when autocomplete is visible

## 5. Mobile Share Plugin Setup

- [x] ~~5.1 Add `tauri-plugin-share = "2"` to `src/gui/src-tauri/Cargo.toml`~~ *(reverted: npm package not available, using `openPath` from `tauri-plugin-opener` instead)*
- [x] ~~5.2 Register `.plugin(tauri_plugin_share::init())` in `lib.rs`~~ *(reverted)*
- [x] ~~5.3 Add share permissions to `src/gui/src-tauri/capabilities/default.json`~~ *(reverted)*
- [x] 5.4 Installed `@tauri-apps/plugin-opener@^2` for openPath-based sharing

## 6. Mobile copy_to_documents Rust Command

- [x] 6.1 Add `copy_to_documents` command in `lib.rs` that copies a file to device Documents on Android
- [x] 6.2 Register `copy_to_documents` in the invoke handler (mobile-only)
- [x] 6.3 On desktop: return original path as no-op

## 7. Mobile Post-Export Share Dialog

- [x] 7.1 Add share dialog state management to `Export.tsx` (showShareDialog, shareBusy, lastExportPath)
- [x] 7.2 Render share dialog after successful export on mobile with 3 buttons: Compartir, Guardar en documentos, Cerrar
- [x] 7.3 Implement "Compartir" handler using `openPath` from `@tauri-apps/plugin-opener`
- [x] 7.4 Implement "Guardar en documentos" handler calling `copy_to_documents` Tauri command
- [x] 7.5 Ensure share dialog only appears when isMobile is true (viewport < 768px)

## 8. Tests and Verification

- [x] 8.1 Run `bun test` and fix any failures — 133 pass, 0 fail
- [x] 8.2 Run `bun run typecheck` and fix any type errors — clean
- [x] 8.3 Run `cargo check` in `src/gui/src-tauri/` and fix any Rust compilation errors — clean (fixed unused variable warning)
- [x] 8.4 Run `bun run lint` and fix any lint issues — clean (fixed setState-in-effect warnings)
