## ADDED Requirements

### Requirement: User can expand all team groups in Statistics
The system SHALL provide a button to expand or collapse all team group sections in the "Por equipo" accordion at once.

#### Scenario: Expand all sections
- **WHEN** user clicks "Desplegar todo" button
- **THEN** all team group sections SHALL be expanded

#### Scenario: Collapse all sections
- **WHEN** user clicks "Colapsar todo" button while all sections are expanded
- **THEN** all team group sections SHALL be collapsed

#### Scenario: Toggle text reflects current state
- **WHEN** some sections are collapsed
- **THEN** the button SHALL display "Desplegar todo"
- **WHEN** all sections are expanded
- **THEN** the button SHALL display "Colapsar todo"

### Requirement: Flags render as inline SVG (no system font dependency)
The system SHALL render country flags as inline SVG via `<img>` elements with `data:image/svg+xml;utf8` URIs, sourced from the `country-flag-icons/string/3x2` package. This SHALL work on all platforms without requiring `Noto Color Emoji` or any system emoji font.

#### Scenario: SVG flag on ViewCollection card
- **WHEN** viewing a sticker with a valid country code in the collection
- **THEN** the flag SHALL render as an `<img>` element with class `w-8 h-6 object-cover` and an SVG data URI source

#### Scenario: SVG flag on Search preview
- **WHEN** viewing a sticker preview in Search
- **THEN** the flag SHALL render as an `<img>` element with class `w-16 h-12 object-cover` and an SVG data URI source

#### Scenario: SVG flag on Statistics team header
- **WHEN** viewing Statistics "Por equipo" section
- **THEN** the flag SHALL render as an `<img>` element with class `w-6 h-4 object-cover inline-block` and an SVG data URI source
