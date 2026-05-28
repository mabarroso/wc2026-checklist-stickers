# fifa-colors Specification

## ADDED Requirements

### Requirement: Primary brand blue uses FIFA-inspired deep blue
The system SHALL use a deep blue (`#1d4ed8`) as the primary brand color instead of the generic Tailwind blue.

#### Scenario: CSS variable defines primary blue
- **WHEN** the app loads
- **THEN** the `--color-blue` CSS variable is set to `#1d4ed8`
- **AND** all Tailwind utilities derived from `--color-blue` (e.g., `bg-blue`, `text-blue`, `border-blue`) use this value

#### Scenario: Primary blue applies to navigation
- **WHEN** the sidebar or bottom tab bar is displayed
- **THEN** the active item uses the FIFA blue (`#1d4ed8`) for its highlight color

#### Scenario: Primary blue applies to action buttons
- **WHEN** a primary action button is rendered
- **THEN** the button background uses the FIFA blue (`#1d4ed8`)

### Requirement: Cyan accent uses vibrant FIFA cyan
The system SHALL use a vibrant cyan (`#0891b2`) for accent elements, distinct from the primary blue.

#### Scenario: CSS variable defines cyan accent
- **WHEN** the app loads
- **THEN** the `--color-cyan` CSS variable is set to `#0891b2`
- **AND** all Tailwind utilities derived from `--color-cyan` use this value

#### Scenario: Cyan applies to decorative accents
- **WHEN** a badge, border, or decorative accent uses cyan
- **THEN** the color is the vibrant cyan (`#0891b2`) rather than the primary blue

### Requirement: Status colors remain unchanged
The system SHALL preserve existing status accent colors: green (`#22c55e`), yellow (`#facc15`), orange (`#f97316`), and red (`#ef4444`).

#### Scenario: Status colors preserved
- **WHEN** the app renders completion (green), in-progress (orange), FIFA (yellow), or error (red) indicators
- **THEN** the colors match their existing values

### Requirement: Background and surface colors remain unchanged
The system SHALL preserve the existing dark theme background (`#0f172a`) and surface (`#1e293b`, `#334155`) colors.

#### Scenario: Background preserved
- **WHEN** the app renders the main background
- **THEN** it uses `#0f172a`

#### Scenario: Surface colors preserved
- **WHEN** the app renders card or panel surfaces
- **THEN** they use the existing surface colors (`#1e293b` and `#334155`)
