# section-statistics Specification

## Purpose
TBD - created by archiving change sectioned-collection-by-source. Update Purpose after archive.
## Requirements
### Requirement: Statistics shall include completion by section
The statistics screen SHALL show completion progress for all of these datasets:
- Total (existing global completion)
- Panini
- Extras
- Coca Cola
- McDonald's

Each completion metric SHALL be computed as unique owned cromos over total cromos in that dataset.

#### Scenario: Render all required completion charts
- **WHEN** the statistics screen is displayed
- **THEN** completion charts are visible for Total, Panini, Extras, Coca Cola, and McDonald's

#### Scenario: Compute section completion percentage
- **WHEN** section totals and owned unique counts are available
- **THEN** the displayed percentage for each section equals `(owned_unique / section_total) * 100`

### Requirement: Por Grupo shall extract prefix from Panini IDs dynamically
The `Por Grupo` widget SHALL compute progress only for stickers classified as Panini (matching `/^[A-Za-z]{3}\d{2}$/`). The 3-letter prefix SHALL be extracted from the ID (e.g., `ARG01` → `ARG`), and groups SHALL be built dynamically from the actual sticker data.

#### Scenario: Exclude non-Panini IDs from Por Grupo
- **WHEN** a cromo ID belongs to Coca Cola, McDonald's, or Extras
- **THEN** it is not counted in any Por Grupo bucket

#### Scenario: Group percentage is based on owned over total per Panini prefix
- **WHEN** a Panini prefix bucket has `owned` and `total`
- **THEN** the displayed group percentage equals `(owned / total) * 100`

### Requirement: Por Grupo ordering shall be alphabetical
The `Por Grupo` output SHALL be sorted alphabetically by group key.

#### Scenario: Render groups in alphabetical order
- **WHEN** Por Grupo rows are generated
- **THEN** rows are displayed in ascending alphabetical order by group key

