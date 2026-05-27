# gui-mobile-ui Specification - Delta

## MODIFIED Requirements

### Requirement: Responsive sidebar converts to bottom tabs on mobile (updated breakpoint)
The system SHALL display a bottom tab navigation bar on mobile viewports instead of the fixed left sidebar. The breakpoint SHALL be 1024px instead of 768px to better match common tablet viewports.

#### Scenario: Sidebar hidden on mobile
- **WHEN** the viewport width is less than 1024px
- **THEN** the left sidebar is hidden
- **AND** a bottom tab bar is displayed with the same navigation items

#### Scenario: Bottom tab bar shows all navigation items
- **WHEN** the bottom tab bar is displayed
- **THEN** it shows all 6 navigation items: Colecci&oacute;n, En el &aacute;lbum, Repetidas, Estad&iacute;sticas, Buscar, Exportar
- **AND** the active tab is visually highlighted

#### Scenario: Tapping a tab navigates to the screen
- **WHEN** the user taps a tab in the bottom bar
- **THEN** the app navigates to the corresponding route
- **AND** the tab becomes active

### Requirement: All screens are touch-friendly (updated target size)
The system SHALL ensure all interactive elements have minimum touch targets of 44x44px for mobile usability.

#### Scenario: Touch targets meet minimum size
- **WHEN** any button, select, or interactive element is rendered on mobile
- **THEN** it has a minimum touch target of 44x44px
- **AND** icon-only buttons include an `aria-label` attribute for accessibility

### Requirement: Min-width constraint removed for mobile
The system SHALL remove or disable the `minWidth` window constraint on mobile platforms.

#### Scenario: No min-width on mobile
- **WHEN** the app runs on Android or iOS
- **THEN** there is no minimum width restriction
- **AND** the app uses the full screen width

## ADDED Requirements

### Requirement: Bottom tabs increased touch target
The bottom tab navigation items SHALL have enlarged touch targets for comfortable mobile use.

#### Scenario: Bottom tab size
- **WHEN** the bottom tab bar is displayed on mobile
- **THEN** each tab has a minimum height of 64px
- **AND** icons are 24px and labels are 11px font size

### Requirement: prefers-reduced-motion support
The system SHALL respect the user's motion accessibility preference by disabling non-essential animations.

#### Scenario: Animations disabled
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** all Framer Motion animations are skipped
- **AND** CSS transitions are set to `0ms` or `instant`

### Requirement: theme-color meta tag
The HTML SHALL include a `theme-color` meta tag matching the app background color.

#### Scenario: theme-color set
- **WHEN** the app loads on a mobile browser
- **THEN** the browser chrome matches the app background color (#0f172a)
