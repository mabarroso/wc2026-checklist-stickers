# theme-system Specification

## Purpose
Theme switching system with dark (current) and light modes, persisted preference, and UI toggle.

## Requirements
### Requirement: ui-theme-tokens capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## ADDED Requirements

### Requirement: Theme switching
The GUI SHALL support switching between two themes: dark (default) and light.

#### Scenario: Theme toggle
- **WHEN** the user activates the theme toggle
- **THEN** the GUI SHALL switch from the current theme to the other theme
- **AND** all visual elements SHALL update immediately to match the selected theme

#### Scenario: Default theme
- **WHEN** the application loads for the first time
- **THEN** the GUI SHALL use the dark theme as the default theme

#### Scenario: Persisted preference
- **WHEN** the user selects a theme
- **THEN** the preference SHALL be persisted in localStorage
- **AND** on subsequent loads, the GUI SHALL apply the persisted theme preference

### Requirement: All FIFA colors always visible
The GUI SHALL ensure all 6 Panini/FIFA colors (blue, cyan, green, yellow, orange, red) are visible on every screen in both themes.

#### Scenario: Navigation items use all 6 colors
- **WHEN** the sidebar or bottom tab navigation is rendered
- **THEN** each of the 6 nav items SHALL use a distinct FIFA color
- **AND** the 6 nav items SHALL collectively display all 6 FIFA colors (blue, cyan, green, yellow, orange, red)

#### Scenario: Colors visible regardless of active screen
- **WHEN** navigating to any route
- **THEN** all 6 FIFA colors SHALL remain visible on the navigation elements
- **AND** the active nav item SHALL be highlighted with its assigned FIFA color

### Requirement: Light theme visual tokens
The light theme SHALL use distinct CSS custom properties from the dark theme.

#### Scenario: Light theme background
- **WHEN** the light theme is active
- **THEN** `--bg-main` SHALL be `#ffffff`
- **AND** `--bg-card` SHALL be `#f1f5f9`
- **AND** `--color-surface-2` SHALL be `#e2e8f0`

#### Scenario: Light theme text colors
- **WHEN** the light theme is active
- **THEN** `--text-main` SHALL be `#0f172a`
- **AND** `--text-muted` SHALL be `#64748b`

#### Scenario: Light theme border colors
- **WHEN** the light theme is active
- **THEN** borders and dividers SHALL use semi-transparent dark colors (e.g. `rgba(0,0,0,0.1)`) instead of `rgba(255,255,255,0.1)`

### Requirement: 3-dot menu in Header
The GUI SHALL provide a kebab menu (⋮) in the top-right of the Header with app options.

#### Scenario: Menu trigger
- **WHEN** any screen is displayed
- **THEN** a `MoreVertical` button SHALL be visible in the top-right corner of the Header
- **AND** clicking it SHALL open a dropdown menu

#### Scenario: Menu items order
- **WHEN** the dropdown menu is open
- **THEN** the menu SHALL show these items in order:
  1. Tema (theme toggle — Claro/Oscuro)
  2. Aviso legal (re-open DisclaimerModal)
  3. Acerca de (app information modal)

#### Scenario: Click outside closes menu
- **WHEN** the dropdown menu is open
- **AND** the user clicks outside the menu
- **THEN** the menu SHALL close

### Requirement: Theme toggle in menu
The theme toggle SHALL be accessible from the 3-dot menu.

#### Scenario: Toggle via menu
- **WHEN** the user clicks "Tema" in the 3-dot menu
- **THEN** the theme SHALL switch between Claro (light) and Oscuro (dark)
- **AND** the label SHALL show the current option (e.g. "Tema: Oscuro" when in light mode)
- **AND** a Sun/Moon icon SHALL reflect the current theme

### Requirement: About modal
The GUI SHALL provide an "Acerca de" modal with app information.

#### Scenario: About modal content
- **WHEN** the user clicks "Acerca de" in the 3-dot menu
- **THEN** a modal SHALL display with:
  - App name: "Panini WC 2026"
  - Version number
  - Brief description

### Requirement: Background shapes adapt to theme
The decorative background shapes SHALL adapt their appearance to the current theme.

#### Scenario: Dark theme shapes
- **WHEN** the dark theme is active
- **THEN** the green circle (top-left) and orange shape (bottom-right) SHALL be visible with opacity 0.15

#### Scenario: Light theme shapes
- **WHEN** the light theme is active
- **THEN** the green circle (top-left) and orange shape (bottom-right) SHALL be visible with reduced opacity (0.08)
