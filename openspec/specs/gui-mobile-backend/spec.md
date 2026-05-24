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
