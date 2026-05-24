# export-missing Specification

## Purpose
Legacy synchronized capability specification for export-missing.
## Requirements
### Requirement: export-missing capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

### Requirement: Export missing stickers by source scope
The system SHALL filter missing stickers by selected source scope before export generation.

#### Scenario: Panini scope includes only Panini missing stickers
- **WHEN** source scope is `Panini`
- **THEN** exported missing list includes only Panini stickers that are missing

#### Scenario: Extra scope includes only Extra missing stickers
- **WHEN** source scope is `Extra`
- **THEN** exported missing list includes only Extra stickers that are missing

#### Scenario: Coca cola scope includes only Coca cola missing stickers
- **WHEN** source scope is `Coca cola`
- **THEN** exported missing list includes only Coca cola stickers that are missing

#### Scenario: McDonald's scope includes only McDonald's missing stickers
- **WHEN** source scope is `McDonald's`
- **THEN** exported missing list includes only McDonald's stickers that are missing

#### Scenario: Todos scope preserves existing behavior
- **WHEN** source scope is `Todos`
- **THEN** exported missing list includes all missing stickers from every source

## Legacy Notes

## MODIFIED Requirements

### Requirement: Panini scope uses ID pattern filter
The system SHALL filter Panini scope using the ID pattern `/^[A-Za-z]{3}\d{2}$/` (3 letters + 2 digits), instead of type-based filtering, to ensure only basic album stickers are included.

#### Scenario: Panini scope matches ID pattern
- **WHEN** source scope is `Panini`
- **THEN** exported missing list includes only stickers whose ID matches the pattern `/^[A-Za-z]{3}\d{2}$/` (e.g., `ARG01`, `MEX05`, `FWC01`)

#### Scenario: Panini scope excludes non-matching IDs
- **WHEN** source scope is `Panini`
- **THEN** stickers like `0` (logo), `ARG01S` (extra), `CC-US01` (Coca Cola), or `LM-b` (Extra Bronze) are excluded from the export

## ADDED Requirements

### Requirement: Export missing stickers to PDF
The system SHALL export all missing stickers to a PDF file with a printable checklist layout (2 stickers per row).

#### Scenario: PDF export creates file
- **WHEN** user exports missing stickers to PDF
- **THEN** a PDF file is created with all missing stickers

#### Scenario: PDF filename includes date
- **WHEN** user exports missing stickers to PDF on 2026-05-14
- **THEN** the filename is `faltantes_2026-05-14.pdf`

#### Scenario: PDF layout with 2 columns
- **WHEN** the PDF is generated
- **THEN** the layout shows 2 stickers per row with checkbox, ID, and name

#### Scenario: PDF includes sticker details
- **WHEN** a sticker row is rendered in the PDF
- **THEN** it includes: empty checkbox square, sticker ID, sticker name, and team name

#### Scenario: PDF header and footer
- **WHEN** the PDF is generated
- **THEN** it includes a header ("Panini FIFA World Cup 2026 - Lista de Falta") and page numbers

### Requirement: Export missing stickers to CSV
The system SHALL export all missing stickers to a CSV file with columns: numero, nombre, equipo.

#### Scenario: CSV export creates file
- **WHEN** user exports missing stickers to CSV
- **THEN** a CSV file is created with all missing stickers

#### Scenario: CSV filename includes date
- **WHEN** user exports missing stickers to CSV on 2026-05-14
- **THEN** the filename is `faltantes_2026-05-14.csv`

#### Scenario: CSV columns
- **WHEN** the CSV is generated
- **THEN** the first line is `numero,nombre,equipo`

#### Scenario: CSV data format
- **WHEN** a sticker row is written
- **THEN** it contains the sticker ID, name, and full team name separated by commas

### Requirement: Export missing stickers to TXT
The system SHALL export all missing stickers to a human-readable TXT file.

#### Scenario: TXT export creates file
- **WHEN** user exports missing stickers to TXT
- **THEN** a TXT file is created with all missing stickers

#### Scenario: TXT filename includes date
- **WHEN** user exports missing stickers to TXT on 2026-05-14
- **THEN** the filename is `faltantes_2026-05-14.txt`

#### Scenario: TXT format
- **WHEN** the TXT is generated
- **THEN** each sticker appears on a new line in the format `[ID] Name - Team`

#### Scenario: TXT grouped by team
- **WHEN** the TXT is generated
- **THEN** stickers are grouped by team with a team header line (e.g., `--- Mexico ---`)

### Requirement: Export destination selection
The system SHALL ask the user to select the export destination (desktop, downloads, or current directory).

#### Scenario: User selects export directory
- **WHEN** user chooses export destination
- **THEN** the file is saved to the selected directory

### Requirement: Export respects filters
The system SHALL export only the stickers that match the current active filter (if any).

#### Scenario: Export filtered missing stickers
- **WHEN** user has a filter active (e.g., Group A only) and exports
- **THEN** only missing stickers matching the filter are exported

### Requirement: Export with zero missing stickers
The system SHALL handle the case where no stickers are missing (collection is complete).

#### Scenario: Export with no missing stickers
- **WHEN** user exports and has 0 missing stickers
- **THEN** a success message is shown and no file is created