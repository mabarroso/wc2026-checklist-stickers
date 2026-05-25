## Why

The PDF export currently always includes full sticker details (ID + name + team) in a 2-column layout, which wastes space when collectors only need a compact checklist. On mobile, search lacks autocomplete for quick lookup, and exported files cannot be shared directly to email, WhatsApp, or device documents. These gaps reduce usability on Android devices where the app is now deployed.

## What Changes

- **PDF compact mode**: New "solo IDs" option in both CLI and GUI that prints only sticker IDs with checkboxes, using the maximum possible columns per page (8+ instead of 2)
- **Mobile search autocomplete**: Search screen gains autocomplete suggestions for ID, name, and team. Selecting a team shows all stickers from that team
- **Mobile export sharing**: After any export (PDF/CSV/TXT/backup), offer share via Android share sheet (email, WhatsApp) or save to documents
- **Mobile import from documents**: Import `.fwc26` backup files from the device documents folder with file scanning

## Capabilities

### New Capabilities
- `pdf-compact-mode`: PDF export with ID-only layout maximizing columns per page
- `mobile-search-autocomplete`: Mobile search with autocomplete by ID, name, and team
- `mobile-export-sharing`: Share exported files via Android share sheet or save to device documents

### Modified Capabilities
- `gui-export-config`: Add ID-only mode selector and post-export share options to GUI export screen
- `gui-mobile-ui`: Add autocomplete dropdown component to mobile search and share dialog after export
- `gui-mobile-backend`: Add `tauri-plugin-share`, register share command, add `copy_to_documents` command

## Impact

- `src/infrastructure/exporters/PdfExporter.ts` — Add `mode` to options, new compact render logic
- `src/infrastructure/cli/ExportMenu.ts` — Add prompt for ID-only / full mode
- `src/gui/src/screens/Export.tsx` — Add mode toggle, post-export share dialog (mobile)
- `src/gui/src/screens/Search.tsx` — Add autocomplete dropdown, team results grid
- `src/gui/src-tauri/src/lib.rs` — Add `mode` param to `export_pdf`, register share plugin, add `copy_to_documents` command
- `src/gui/src-tauri/Cargo.toml` — Add `tauri-plugin-share` dependency
- `src/gui/src-tauri/capabilities/default.json` — Add share permissions
- `src/gui/src-tauri/gen/android/app/src/main/AndroidManifest.xml` — Add share-related permissions if required
