## MODIFIED Requirements

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

### Requirement: "Abrir Carpeta" button hidden on mobile
The system SHALL hide the "Abrir Carpeta" button on mobile platforms where opening the system file explorer is not supported.

#### Scenario: Button hidden on mobile
- **WHEN** user completes an export on Android or iOS
- **THEN** the "Abrir Carpeta" button is not displayed
- **AND** only the success message is shown
