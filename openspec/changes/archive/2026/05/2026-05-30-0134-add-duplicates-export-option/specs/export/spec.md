## MODIFIED Requirements

### Requirement: Export flow allows type and source selection
The system SHALL first prompt users to select the type of export (faltantes or repetidos), then require users to select a source scope before generating the export.

#### Scenario: Export type options are shown
- **WHEN** the user opens the export flow
- **THEN** the system shows export type options: `Cromos faltantes` and `Cromos repetidos`

#### Scenario: Export source options are shown after type selection
- **WHEN** the user selects an export type
- **THEN** the system shows these source options: `Panini`, `Extra`, `Coca cola`, `McDonald's`, and `Todos`

#### Scenario: Source selection is applied to export action
- **WHEN** the user selects a source option and confirms export
- **THEN** the selected source scope is used for file generation
- **AND** only stickers matching the selected export type (faltantes or repetidos) and source scope are included

### Requirement: Source selection applies only to checklist export
The system SHALL keep source selection scoped to checklist generation and SHALL NOT use it for backup operations.

#### Scenario: Backup remains full collection
- **WHEN** the user saves a backup from the same screen where source selection is shown
- **THEN** the backup contains the full collection state
- **AND** the selected export type or source does not change backup contents
