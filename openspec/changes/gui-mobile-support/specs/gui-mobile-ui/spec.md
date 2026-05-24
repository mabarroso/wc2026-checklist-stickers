## ADDED Requirements

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
