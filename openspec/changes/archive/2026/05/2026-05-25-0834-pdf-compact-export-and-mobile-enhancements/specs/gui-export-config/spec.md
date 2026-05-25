# gui-export-config Specification

## Purpose
Legacy synchronized capability specification for gui-export-config.

## Requirements
### Requirement: gui-export-config capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

# Spec: GUI Export Configuration

Fix Tauri plugin configuration and permissions for proper file exports.

## ADDED Requirements

### Requirement: Tauri plugin permissions

The system SHALL have proper file system permissions configured for export operations.

#### Scenario: fs permission for file writing
- **WHEN** Tauri app starts
- **THEN** fs plugin has write permissions for Downloads folder
- **AND** export operations can save files

#### Scenario: Permissions in capabilities
- **WHEN** capabilities are loaded
- **THEN** fs:default and dialog:default permissions are included
- **AND** export commands can execute

### Requirement: Export file path uses app data dir on mobile
The system SHALL use the app's document directory (via `app.path()`) on mobile platforms instead of `dirs::download_dir()`.

#### Scenario: Export saved to app data dir on Android
- **WHEN** user exports on Android
- **THEN** the export file is saved to the app's document directory
- **AND** the system does not attempt to use `dirs::download_dir()`

#### Scenario: Export saved to app data dir on iOS
- **WHEN** user exports on iOS
- **THEN** the export file is saved to the app's document directory
- **AND** the system does not attempt to use `dirs::download_dir()`

### Requirement: "Abrir Carpeta" button functionality

The system SHALL open the Downloads folder when user clicks "Abrir Carpeta" button.

#### Scenario: Open folder on button click
- **WHEN** user clicks "Abrir Carpeta" button in Export screen
- **THEN** system opens the Downloads folder in system file explorer

#### Scenario: Button shows after successful export
- **WHEN** export completes successfully
- **THEN** "Abrir Carpeta" button is visible and clickable

#### Scenario: Button hidden on mobile
- **WHEN** user completes an export on Android or iOS
- **THEN** the "Abrir Carpeta" button is not displayed
- **AND** only the success message is shown

## ADDED Requirements

### Requirement: PDF export supports ID-only mode in GUI
The system SHALL provide a toggle for ID-only mode when exporting PDF in the GUI.

#### Scenario: Toggle visible for PDF format
- **WHEN** the user selects PDF as export format
- **THEN** a "Solo IDs" / "Formato completo" toggle is displayed
- **AND** the toggle is set to "Formato completo" by default

#### Scenario: ID-only mode sent to Tauri command
- **WHEN** the user selects ID-only mode and clicks export
- **THEN** the `export_pdf` command is invoked with `mode: "ids-only"`
- **AND** the generated PDF contains only IDs with checkboxes

### Requirement: Post-export share options on mobile
The system SHALL show share options after successful export on Android.

#### Scenario: Share dialog on mobile after export
- **WHEN** an export completes successfully on Android
- **THEN** a dialog with "Compartir", "Guardar en documentos", and "Cerrar" options is displayed
- **AND** the "Abrir Carpeta" button is hidden

## Breaking Changes

None — this is a bug fix for missing configuration.
