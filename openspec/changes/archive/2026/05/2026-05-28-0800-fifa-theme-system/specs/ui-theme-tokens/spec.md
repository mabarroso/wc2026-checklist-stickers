## MODIFIED Requirements

### Requirement: CSS tokens match ui_theme.md
The GUI SHALL use CSS custom properties with themed token definitions.

#### Scenario: Dark theme token definitions
- **WHEN** the dark theme is active
- **THEN** tokens SHALL be defined as:
  - `--bg-main: #0f172a`
  - `--bg-card: #1e293b`
  - `--green: #22c55e`
  - `--yellow: #facc15`
  - `--orange: #f97316`
  - `--red: #ef4444`
  - `--blue: #1d4ed8`
  - `--color-cyan: #0891b2`
  - `--text-main: #ffffff`
  - `--text-muted: #94a3b8`
  - `--radius: 20px`

#### Scenario: Light theme token definitions
- **WHEN** the light theme is active
- **THEN** tokens SHALL be defined as:
  - `--bg-main: #ffffff`
  - `--bg-card: #f1f5f9`
  - `--green: #22c55e`
  - `--yellow: #facc15`
  - `--orange: #f97316`
  - `--red: #ef4444`
  - `--blue: #1d4ed8`
  - `--color-cyan: #0891b2`
  - `--text-main: #0f172a`
  - `--text-muted: #64748b`
  - `--radius: 20px`

### Requirement: Background with geometric shapes
The GUI SHALL display background with geometric shapes that adapt to the current theme.

#### Scenario: Green circle shape (dark theme)
- **WHEN** the dark theme is active
- **THEN** there SHALL be a fixed green circle (#22c55e, 500px diameter) at top-left corner with opacity 0.15

#### Scenario: Green circle shape (light theme)
- **WHEN** the light theme is active
- **THEN** there SHALL be a fixed green circle (#22c55e, 500px diameter) at top-left corner with opacity 0.08

#### Scenario: Orange geometric shape (dark theme)
- **WHEN** the dark theme is active
- **THEN** there SHALL be a fixed orange shape (#f97316, 400px) at bottom-right corner with 40% border-radius and opacity 0.15

#### Scenario: Orange geometric shape (light theme)
- **WHEN** the light theme is active
- **THEN** there SHALL be a fixed orange shape (#f97316, 400px) at bottom-right corner with 40% border-radius and opacity 0.08

### Requirement: Badge status system
The GUI SHALL provide status badges with theme-aware backgrounds.

#### Scenario: Badge variants (both themes)
- **WHEN** a badge needs to show completed status
- **THEN** it SHALL use background color green (#22c55e) with black text

- **WHEN** a badge needs to show in-progress status
- **THEN** it SHALL use background color orange (#f97316) with black text

- **WHEN** a badge needs to show pending status
- **THEN** it SHALL use background color `--color-surface-2` with `--text-main` text

### Requirement: Button styles match ui_theme.md
The GUI SHALL use button styles that match the theme.

#### Scenario: Primary button
- **WHEN** a primary button is rendered
- **THEN** it SHALL have background color blue (#1d4ed8)
- **AND** border-radius 12px
- **AND** font-weight 600
- **AND** white text color

#### Scenario: Secondary button (dark theme)
- **WHEN** the dark theme is active and a secondary button is rendered
- **THEN** it SHALL have background `rgba(255, 255, 255, 0.04)` and border `1px solid rgba(255, 255, 255, 0.1)`

#### Scenario: Secondary button (light theme)
- **WHEN** the light theme is active and a secondary button is rendered
- **THEN** it SHALL have background `rgba(0, 0, 0, 0.04)` and border `1px solid rgba(0, 0, 0, 0.1)`

### Requirement: Card styles match ui_theme.md
The GUI SHALL use theme-aware card styles.

#### Scenario: Card component
- **WHEN** a card is rendered
- **THEN** it SHALL have background color `--bg-card`
- **AND** border-radius 20px (--radius)
- **AND** padding 16px
- **AND** position relative with overflow hidden

## ADDED Requirements

### Requirement: Nav-item color distribution
The navigation items SHALL be assigned distinct FIFA colors to ensure all 6 colors are always visible.

#### Scenario: Color assignment by index
- **WHEN** the sidebar or bottom tab navigation renders
- **THEN** nav items SHALL be assigned colors by index:
  - Item 1 (Colección): blue (#1d4ed8)
  - Item 2 (En el álbum): green (#22c55e)
  - Item 3 (Repetidas): yellow (#facc15)
  - Item 4 (Estadísticas): orange (#f97316)
  - Item 5 (Buscar): cyan (#0891b2)
  - Item 6 (Exportar): red (#ef4444)

#### Scenario: Active state uses assigned color
- **WHEN** a nav item is the active route
- **THEN** it SHALL use its assigned FIFA color for the active indicator (background tint, border, icon, and text)
- **AND** the color SHALL be consistent in both themes

### Requirement: Secondary button hover shadows
The secondary button hover effects SHALL use theme-aware shadow colors instead of hardcoded rgba values.

#### Scenario: Dark theme hover shadow
- **WHEN** the dark theme is active and a secondary button is hovered
- **THEN** the box-shadow SHALL use the current `--blue` color with appropriate transparency

#### Scenario: Light theme hover shadow
- **WHEN** the light theme is active and a secondary button is hovered
- **THEN** the box-shadow SHALL use the current `--blue` color with appropriate transparency
