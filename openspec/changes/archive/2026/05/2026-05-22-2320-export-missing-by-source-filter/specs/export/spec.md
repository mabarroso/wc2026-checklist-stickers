## ADDED Requirements

### Requirement: Export flow allows source selection
The system SHALL require users to select a source scope before exporting missing stickers.

#### Scenario: Export source options are shown
- **WHEN** the user opens the export flow
- **THEN** the system shows these source options: `Panini`, `Extra`, `Coca cola`, `McDonald's`, and `Todos`

#### Scenario: Source selection is applied to export action
- **WHEN** the user selects one source option and confirms export
- **THEN** the selected source scope is used for file generation

### Requirement: Source selection is format-independent
The system SHALL apply the same selected source scope across PDF, CSV, and TXT export formats.

#### Scenario: Same scope works for PDF export
- **WHEN** user exports in PDF with source `Panini`
- **THEN** only missing Panini stickers are included in the PDF

#### Scenario: Same scope works for CSV export
- **WHEN** user exports in CSV with source `Coca cola`
- **THEN** only missing Coca cola stickers are included in the CSV

#### Scenario: Same scope works for TXT export
- **WHEN** user exports in TXT with source `McDonald's`
- **THEN** only missing McDonald's stickers are included in the TXT

### Requirement: Source selection applies only to checklist export
The system SHALL keep source selection scoped to checklist generation and SHALL NOT use it for backup operations.

#### Scenario: Backup remains full collection
- **WHEN** the user saves a backup from the same screen where source selection is shown
- **THEN** the backup contains the full collection state
- **AND** the selected export source does not change backup contents