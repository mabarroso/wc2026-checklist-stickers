# collection-section-filtering Specification

## Purpose
TBD - created by archiving change sectioned-collection-by-source. Update Purpose after archive.
## Requirements
### Requirement: Section classification rules for cromos
The system SHALL classify each cromo into exactly one section using these rules:
- `Panini`: IDs matching the pattern `/^[A-Za-z]{3}\d{2}$/` (3 letters + 2 digits, e.g., `ARG01`, `MEX05`, `FWC01`)
- `Coca Cola`: IDs starting with `CC-` (including subgroups `CC-US`, `CC-LAM`, `CC-RW`, `CC-EU`)
- `McDonald's`: IDs ending with `mc`
- `Extras`: all remaining IDs

#### Scenario: Classify Panini cromo by ID pattern
- **WHEN** a cromo ID matches the pattern `/^[A-Za-z]{3}\d{2}$/`
- **THEN** the system classifies it as `Panini`
- **AND** the cromo MUST NOT be assigned to any other section

#### Scenario: Reject non-matching IDs from Panini
- **WHEN** a cromo ID is `0`, has a suffix (e.g., `ARG01S`), or contains special characters (e.g., `CC-US01`)
- **THEN** the system classifies it as `Extras` (or appropriate section) instead of `Panini`

#### Scenario: Classify Coca Cola cromo by prefix
- **WHEN** a cromo ID begins with `CC-`
- **THEN** the system classifies it as `Coca Cola`
- **AND** the cromo MUST NOT be assigned to any other section

#### Scenario: Classify McDonald's cromo by suffix
- **WHEN** a cromo ID ends with `mc`
- **THEN** the system classifies it as `McDonald's`
- **AND** the cromo MUST NOT be assigned to any other section

#### Scenario: Classify fallback cromo as Extras
- **WHEN** a cromo ID does not satisfy Panini, Coca Cola, or McDonald's rules
- **THEN** the system classifies it as `Extras`

### Requirement: Section dropdown in collection view
The collection view SHALL provide a section dropdown to the right of `Repetidas` with values:
`Todas`, `Panini`, `Coca Cola`, `McDonald's`, `Extras`.

#### Scenario: Default section selection is Panini
- **WHEN** the collection view is opened
- **THEN** the selected section is `Panini`

#### Scenario: Section dropdown filters visible cromos
- **WHEN** a user selects a section value other than `Todas`
- **THEN** the cromo list displays only IDs classified in that section

#### Scenario: Todas shows all sections
- **WHEN** a user selects `Todas`
- **THEN** the cromo list includes cromos from all sections

### Requirement: Team dropdown options are section-scoped
The existing `<ID_FIX> - <TEAM>` dropdown SHALL only show options that exist within the currently selected section.

#### Scenario: Team options restricted by selected section
- **WHEN** section `Panini` is selected
- **THEN** `<ID_FIX> - <TEAM>` options only include Panini-classified cromos

#### Scenario: Team options updated after section change
- **WHEN** the user changes section from one value to another
- **THEN** the `<ID_FIX> - <TEAM>` options are recalculated for the new section before rendering results

