# gui-mobile-backend Specification

## Purpose
Rust backend adaptations for mobile platforms (Android/iOS), including file path resolution, command gating, and capabilities.

## Requirements

### Requirement: Mobile-safe file paths for exports
The system SHALL use `app.path()` to resolve the app document directory on mobile platforms instead of `dirs::download_dir()`.

#### Scenario: App data dir used on Android
- **WHEN** `export_pdf`, `export_csv`, or `export_txt` is invoked on Android
- **THEN** the file is saved to the app's document directory via `app.path().app_data_dir()`

#### Scenario: App data dir used on iOS
- **WHEN** `export_pdf`, `export_csv`, or `export_txt` is invoked on iOS
- **THEN** the file is saved to the app's document directory via `app.path().app_data_dir()`

### Requirement: open_downloads_folder guarded on mobile
The system SHALL disable the `open_downloads_folder` command on mobile platforms where system file explorer is not accessible.

#### Scenario: Command returns error on mobile
- **WHEN** `open_downloads_folder` is invoked on Android or iOS
- **THEN** the command returns an error message indicating the feature is not available on mobile

### Requirement: Mobile-compatible capabilities
The system SHALL use mobile-compatible capability schemas for Android and iOS.

#### Scenario: Android capability schema
- **WHEN** the app runs on Android
- **THEN** the capability uses the `android-schema.json` or a platform-agnostic schema
- **AND** `fs:default` and `dialog:default` permissions are granted

#### Scenario: iOS capability schema
- **WHEN** the app runs on iOS
- **THEN** the capability uses the `ios-schema.json` or a platform-agnostic schema
- **AND** `fs:default` and `dialog:default` permissions are granted

## ADDED Requirements

### Requirement: PDF export command accepts mode parameter
The system SHALL accept a `mode` parameter in the `export_pdf` Tauri command to switch between full and ID-only output.

#### Scenario: Full mode generates 2-column layout
- **WHEN** `export_pdf` is called with `mode: "full"`
- **THEN** the PDF uses 2 columns with `[id] name - team` format
- **AND** the layout matches current behavior

#### Scenario: ID-only mode generates compact layout
- **WHEN** `export_pdf` is called with `mode: "ids-only"`
- **THEN** the PDF uses maximum columns (6+) with only checkbox + ID text

### Requirement: Custom SharePlugin for Android ACTION_SEND
The system SHALL provide a custom Kotlin plugin (`SharePlugin.kt`) for sharing files via `Intent.ACTION_SEND` on Android.

#### Scenario: SharePlugin registered in Rust
- **WHEN** the Tauri app starts
- **THEN** `SharePlugin.kt` is registered as an Android plugin via `tauri::plugin::Builder` in `share_plugin_init()`
- **AND** the plugin handle is stored in `SharePluginState<R>` with a `PluginHandle<R>` field (mobile only)

#### Scenario: share_file command delegates to SharePlugin
- **WHEN** the `share_file` Rust command is invoked on Android
- **THEN** it calls `state.handle.run_mobile_plugin("share", { path })` on the SharePlugin
- **AND** the Kotlin `SharePlugin.share()` method creates an `Intent.ACTION_SEND` with the file via FileProvider
- **AND** the intent chooser is launched with `Intent.createChooser()`

#### Scenario: build and install app icons

### Requirement: Export uses app_cache_dir on mobile
The export directory on mobile SHALL use `app_cache_dir()` instead of `app_data_dir()` for FileProvider compatibility.

#### Scenario: get_export_dir returns cache dir on mobile
- **WHEN** `get_export_dir()` is called on Android or iOS
- **THEN** it returns `app.path().app_cache_dir()`
- **AND** the file is accessible via FileProvider's `<cache-path>` in `file_paths.xml`

#### Scenario: copy_to_documents also uses cache dir
- **WHEN** `copy_to_documents` is called on mobile
- **THEN** it copies to `{cache_dir}/documents/` instead of `{app_data_dir}/documents/`

### Requirement: capbilidades for content:// URL sharing
The system SHALL allow `content://` URLs in the opener plugin scope for Android sharing.

#### Scenario: content:// URL scope allowed
- **WHEN** the app runs on Android
- **THEN** `opener:allow-open-url` permission has `{ "url": "content://*" }` scope

### Requirement: copy_to_documents command for mobile
The system SHALL provide a `copy_to_documents` Tauri command that copies a file to the device's documents folder on Android.

#### Scenario: File copied to documents
- **WHEN** `copy_to_documents` is called with a valid file path on Android
- **THEN** the file is copied to `{cache_dir}/documents/`
- **AND** the destination path is returned

#### Scenario: copy_to_documents desktop fallback
- **WHEN** `copy_to_documents` is called on desktop (Linux/Windows/macOS)
- **THEN** the command returns the original path without copying
