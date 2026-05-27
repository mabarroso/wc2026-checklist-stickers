# statistics Specification - Delta

## ADDED Requirements

### Requirement: Team progress collapsible sections
The team progress bars in Statistics SHALL be organized into collapsible sections.

#### Scenario: Sections collapsed by default
- **WHEN** the user opens the Statistics screen
- **THEN** team progress bars are grouped into collapsible sections (e.g., by group letter range)
- **AND** only the first section is expanded by default
- **AND** all other sections are collapsed

#### Scenario: Expand/collapse section
- **WHEN** the user taps a section header
- **THEN** the section expands with a smooth animation
- **AND** tapping the same header again collapses it

#### Scenario: Section header shows summary
- **WHEN** a section is collapsed
- **THEN** the section header shows the section name and total count of teams in that section

### Requirement: Responsive stat summary cards
The four summary stat cards (Total, En el album, Faltantes, Duplicadas) SHALL adapt to mobile viewports.

#### Scenario: 2x2 grid on mobile
- **WHEN** the viewport is narrower than 768px
- **THEN** the stat cards display in a 2-column grid (2x2)

#### Scenario: 4-column grid on desktop
- **WHEN** the viewport is 768px or wider
- **THEN** the stat cards display in a 4-column grid (current behavior)

### Requirement: Responsive progress rings
The progress rings (Total + per-section) SHALL adapt to mobile viewports.

#### Scenario: 2x3 grid on mobile
- **WHEN** the viewport is narrower than 768px
- **THEN** the progress rings display in a 2 or 3-column grid

#### Scenario: 6-column grid on desktop
- **WHEN** the viewport is 768px or wider
- **THEN** the progress rings display in a 6-column grid (current behavior)
