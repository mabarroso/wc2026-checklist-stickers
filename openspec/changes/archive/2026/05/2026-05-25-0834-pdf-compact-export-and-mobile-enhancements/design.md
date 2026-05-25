## Context

The app is deployed on Android (APK) with Tauri 2. Current state:

- PDF export uses 2-column layout with `[id] name - team` in both CLI (PDFKit) and GUI (printpdf)
- Search is real-time filter with no autocomplete; results display in a 4-column grid + right preview panel
- Export has no sharing capability; files stay in app data dir (mobile) or Downloads (desktop)
- Backup import/export uses native file dialogs

No iOS-specific changes are needed in this change (requires macOS/Xcode).

## Goals / Non-Goals

**Goals:**
- Add ID-only mode to PDF export (CLI + GUI) with maximum columns per page
- Add autocomplete dropdown to mobile search for ID/name/team queries
- Enable sharing exported files via Android share sheet (email, WhatsApp, documents)
- Enable importing `.fwc26` from device documents folder

**Non-Goals:**
- iOS-specific features or build verification (requires macOS)
- Changing CSV or TXT export formats
- Desktop-specific sharing (desktop keeps "Abrir Carpeta" behavior)
- Changing the domain model, entities, or persistence layer

## Decisions

### D1: PDF compact mode — single `mode` parameter over separate command
- **Choice**: Add `mode: 'full' | 'ids-only'` to `PdfExporterOptions` (CLI) and `export_pdf` command args (GUI)
- **Rationale**: Minimal API surface, single code path with conditional layout logic. Avoids duplicating PDF generation code.
- **Alternative considered**: Separate `export_pdf_compact` command — rejected as redundant.

### D2: PDF ID-only layout — dynamic columns based on available width
- **CLI (PDFKit)**: `ids-only` mode: 8 columns × 45 rows = 360/page (checkbox 8pt + ID text 7pt, 17mm/col, 6mm/row)
- **GUI (printpdf)**: `ids-only` mode: 6 columns × 50 rows = 300/page (same density logic)
- **Rationale**: A4 210mm with 30mm margins = 150mm usable. Each column needs ~4mm checkbox + ~13mm ID text + 2mm gap = ~19mm → 7-8 cols. Row height drops from 7mm to 5.5mm since no name/team text.
- **Alternative considered**: Fixed column count — rejected; dynamic is more robust across paper sizes.

### D3: Search autocomplete — inline dropdown in same component, no new screen
- **Choice**: Add autocomplete list below the existing search input in `Search.tsx`, conditionally shown on mobile
- **Rationale**: Single component maintains state coherence; no route/state duplication. Desktop keeps existing behavior (real-time filter + preview panel).
- **Behavior**:
  - Typing shows autocomplete dropdown (max 8 suggestions)
  - Each suggestion shows icon + matched text with highlighted match
  - On select: if team → replace results with grid of all team stickers; if ID/name → show sticker card
  - Team selection auto-fills query with `team:<team_name>` tag
- **Alternative considered**: Separate mobile search screen/route — rejected (routes too many edge cases, hard to sync state).

### D4: Sharing via `tauri-plugin-share` over custom Android Intent
- **Choice**: Add `tauri-plugin-share = "2"` to Cargo.toml, use `@tauri-apps/plugin-share` `share()` from TypeScript
- **Rationale**: Official Tauri 2 plugin, handles Android share sheet invocation, works cross-platform (future iOS). File URI sharing works with scoped storage on Android 10+.
- **Alternative considered**: Custom Rust `#[command]` with `android.content.Intent` — more complex, platform-specific, no iOS path.
- **Alternative considered**: Web Share API (`navigator.share()`) — available in Android WebView but cannot share files reliably across Android versions.

### D5: "Guardar en documentos" — `copy_to_documents` command via Rust
- **Choice**: Custom Tauri command `copy_to_documents` that copies file from `app_data_dir` to device public Documents folder using `tauri-plugin-fs`
- **Rationale**: `tauri-plugin-share` covers email/WhatsApp but doesn't guarantee the user saves a copy. A dedicated "save to documents" action gives explicit control.
- **Implementation**: On Android, use app's external files dir `Environment.getExternalStoragePublicDirectory(DIRECTORY_DOCUMENTS)`. On desktop, no-op (files already in Downloads).

### D6: Import from documents — file picker dialog over folder scanning
- **Choice**: Use existing `@tauri-apps/plugin-dialog` `open()` which shows native file picker on Android. User navigates to Documents and picks `.fwc26`.
- **Rationale**: Already implemented and working. No need for custom folder scanning command. File picker is standard Android UX.
- **Alternative considered**: Custom `list_documents_fwc26` Rust command scanning Documents dir — rejected as unnecessary complexity.

## Risks / Trade-offs

- **[Android 10+ scoped storage]** `tauri-plugin-share` may need `content://` URI instead of file path → Use `FileProvider` (already configured in AndroidManifest.xml) to serve files via content URI
- **[Plugin availability]** `tauri-plugin-share` v2 may not be published yet on crates.io → Fallback: implement custom share via `#[command]` with `tauri::Scope` + Android Intent
- **[Mobile search UX]** Autocomplete on mobile may feel cramped at 320-360px width → Suggestions rendered as compact chips + text, scrollable list with max 8 items
- **[PDF ID-only too dense]** 300-360 stickers per page may be hard to check off → Each row gets a 8-10pt checkbox + 7pt ID text; clear alternating row shading

## Open Questions

- None
