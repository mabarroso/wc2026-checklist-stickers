# gui-mobile-ui Specification

## Purpose
Responsive UI adaptations for mobile viewports, including bottom tab navigation and touch-friendly interaction targets.

## Requirements

### Requirement: Responsive sidebar converts to bottom tabs on mobile
The system SHALL display a bottom tab navigation bar on mobile viewports instead of the fixed left sidebar.

#### Scenario: Sidebar hidden on mobile
- **WHEN** the viewport width is less than 768px
- **THEN** the left sidebar is hidden
- **AND** a bottom tab bar is displayed with the same navigation items

#### Scenario: Bottom tab bar shows all navigation items
- **WHEN** the bottom tab bar is displayed
- **THEN** it shows all 6 navigation items: Colección, En el álbum, Repetidas, Estadísticas, Buscar, Exportar
- **AND** the active tab is visually highlighted

#### Scenario: Tapping a tab navigates to the screen
- **WHEN** the user taps a tab in the bottom bar
- **THEN** the app navigates to the corresponding route
- **AND** the tab becomes active

### Requirement: All screens are touch-friendly
The system SHALL ensure all interactive elements have minimum touch targets of 44x44px for mobile usability.

#### Scenario: Touch targets meet minimum size
- **WHEN** any button, select, or interactive element is rendered on mobile
- **THEN** it has a minimum touch target of 44x44px

### Requirement: Min-width constraint removed for mobile
The system SHALL remove or disable the `minWidth` window constraint on mobile platforms.

#### Scenario: No min-width on mobile
- **WHEN** the app runs on Android or iOS
- **THEN** there is no minimum width restriction
- **AND** the app uses the full screen width

## ADDED Requirements

### Requirement: Search screen shows autocomplete dropdown on mobile
The system SHALL display an autocomplete dropdown below the search input when the user types on mobile viewports.

#### Scenario: Autocomplete visible after typing
- **WHEN** the viewport width is less than 768px
- **THEN** the search input has an autocomplete dropdown
- **AND** suggestions appear after 2+ characters are typed
- **AND** the right preview panel is hidden

#### Scenario: Desktop continues with existing behavior
- **WHEN** the viewport width is 768px or greater
- **THEN** the search screen retains the existing real-time filter and right preview panel
- **AND** no autocomplete dropdown is shown

### Requirement: Autocomplete suggestions are touch-friendly
The system SHALL ensure autocomplete suggestions have adequate touch targets on mobile.

#### Scenario: Suggestion items have 44px minimum height
- **WHEN** autocomplete suggestions are rendered on mobile
- **THEN** each suggestion item is at least 44px tall
- **AND** the tap target covers the full width of the suggestion

### Requirement: Post-export share dialog on mobile
The system SHALL display a share options dialog after successful export on mobile viewports.

#### Scenario: Share dialog visible on mobile after export
- **WHEN** the viewport width is less than 768px and an export completes successfully
- **THEN** a dialog with "Compartir", "Guardar en documentos", and "Cerrar" buttons is displayed
- **AND** the "Abrir Carpeta" button is not shown

#### Scenario: Share dialog NOT rendered on desktop
- **WHEN** the viewport width is 768px or greater and an export completes successfully
- **THEN** the share dialog is not displayed
- **AND** the "Abrir Carpeta" button is shown instead
