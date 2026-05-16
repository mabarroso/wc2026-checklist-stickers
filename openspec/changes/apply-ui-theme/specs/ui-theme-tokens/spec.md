## ADDED Requirements

### Requirement: CSS tokens match ui_theme.md
The GUI SHALL use CSS custom properties that match the tokens defined in docs/ui_theme.md.

#### Scenario: Token definitions
- **WHEN** CSS is loaded
- **THEN** tokens SHALL be defined as:
  - --bg-main: #0f172a
  - --bg-card: #1e293b
  - --green: #22c55e
  - --yellow: #facc15
  - --orange: #f97316
  - --red: #ef4444
  - --blue: #3b82f6
  - --text-main: #ffffff
  - --text-muted: #94a3b8
  - --radius: 20px

### Requirement: Background with geometric shapes
The GUI SHALL display background with geometric shapes as defined in ui_theme.md.

#### Scenario: Green circle shape
- **WHEN** body loads
- **THEN** there SHALL be a fixed green circle (#22c55e, 500px diameter) at top-left corner with opacity 0.15

#### Scenario: Orange geometric shape
- **WHEN** body loads
- **THEN** there SHALL be a fixed orange shape (#f97316, 400px) at bottom-right corner with 40% border-radius and opacity 0.15

### Requirement: Poppins font
The GUI SHALL use Poppins font family for all text.

#### Scenario: Font loading
- **WHEN** app loads
- **THEN** Poppins font SHALL be loaded from Google Fonts
- **AND** --font-body SHALL be set to 'Poppins', sans-serif
- **AND** all text SHALL use Poppins font

### Requirement: Badge status system
The GUI SHALL provide status badges that match the ui_theme.md status system.

#### Scenario: Badge variants
- **WHEN** a badge needs to show completed status
- **THEN** it SHALL use background color green (#22c55e) with black text

- **WHEN** a badge needs to show in-progress status
- **THEN** it SHALL use background color orange (#f97316) with black text

- **WHEN** a badge needs to show pending status
- **THEN** it SHALL use background color gray (#334155) with white text

### Requirement: Button styles match ui_theme.md
The GUI SHALL use button styles that match the ui_theme.md button component.

#### Scenario: Primary button
- **WHEN** a primary button is rendered
- **THEN** it SHALL have background color blue (#3b82f6)
- **AND** border-radius 12px
- **AND** font-weight 600
- **AND** white text color

### Requirement: Card styles match ui_theme.md
The GUI SHALL use card styles that match the ui_theme.md card component.

#### Scenario: Card component
- **WHEN** a card is rendered
- **THEN** it SHALL have background color --bg-card (#1e293b)
- **AND** border-radius 20px (--radius)
- **AND** padding 16px
- **AND** position relative with overflow hidden