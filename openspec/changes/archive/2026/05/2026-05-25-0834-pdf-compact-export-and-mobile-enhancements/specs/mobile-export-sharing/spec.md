# mobile-export-sharing Specification

## Purpose
Share exported files via Android share sheet or save to device documents.

## ADDED Requirements

### Requirement: Post-export share dialog on mobile
The system SHALL display a share dialog after any successful export on mobile platforms (Android).

#### Scenario: Share dialog shown after PDF export
- **WHEN** a PDF export completes successfully on Android
- **THEN** a dialog is displayed with 3 options: "Compartir", "Guardar en documentos", "Cerrar"

#### Scenario: Share dialog shown after backup save
- **WHEN** a backup (.fwc26) save completes successfully on Android
- **THEN** a dialog is displayed with 3 options: "Compartir", "Guardar en documentos", "Cerrar"

#### Scenario: Share dialog NOT shown on desktop
- **WHEN** an export completes successfully on desktop (Linux/Windows/macOS)
- **THEN** the existing success panel is shown without the share dialog
- **AND** the "Abrir Carpeta" button is displayed

### Requirement: Share uses Android share sheet (Intent.ACTION_SEND)
The system SHALL open the Android system share sheet when the user chooses "Compartir".

#### Scenario: Share sheet opens with file via custom SharePlugin
- **WHEN** the user taps "Compartir" after an export
- **THEN** the JS code calls `invoke('share_file', { path: lastExportPath })`
- **AND** the Rust `share_file` command delegates to a custom Kotlin `SharePlugin` registered as a Tauri Android plugin
- **AND** the Kotlin plugin creates an `Intent.ACTION_SEND` with the file via `FileProvider.getUriForFile()`
- **AND** the Android share sheet opens with the exported PDF attached
- **AND** the user can choose email, WhatsApp, or any other sharing app

#### Scenario: share_file uses app_cache_dir for FileProvider compatibility
- **WHEN** `share_file` is called on Android
- **THEN** the export directory is `app_cache_dir()` (not `app_data_dir()`)
- **AND** `file_paths.xml` includes `<cache-path>` so FileProvider can serve the file

#### Scenario: Export uses cache dir on mobile
- **WHEN** `get_export_dir()` is called on mobile
- **THEN** it returns `app_cache_dir()` instead of `app_data_dir()` for FileProvider URI compatibility

### Requirement: Save to device documents folder
The system SHALL copy the exported file to the device's documents folder when the user chooses "Guardar en documentos".

#### Scenario: File copied to documents
- **WHEN** the user taps "Guardar en documentos"
- **THEN** the exported file is copied to `{cache_dir}/documents/`
- **AND** a success message is shown confirming the save location
