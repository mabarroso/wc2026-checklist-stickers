# export Specification

## Purpose
Professional export center for generating missing sticker lists in multiple formats.

## Requirements

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
- **AND** the selected export type or source does not change backup contents

### Requirement: Responsive single-column layout on mobile
The Export screen SHALL adapt to a single-column layout on mobile viewports.

#### Scenario: Single column on mobile
- **WHEN** the viewport is narrower than 1024px
- **THEN** the export controls stack in a single column (full width)
- **AND** the preview panel is hidden (it is desktop-only)

#### Scenario: Two-column layout on desktop
- **WHEN** the viewport is 1024px or wider
- **THEN** the existing two-column layout with preview panel is shown

### Requirement: Toast feedback replaces inline error panel
Export success and error messages SHALL use the toast notification system instead of inline panels.

#### Scenario: Export success toast
- **WHEN** an export completes successfully on mobile
- **THEN** a success toast appears with the message "Exportación completa"
- **AND** the previous inline success panel with "Abrir Carpeta" button is hidden on mobile

#### Scenario: Export error toast
- **WHEN** an export fails on any device
- **THEN** an error toast appears with the error message
- **AND** the previous inline error panel is replaced by the toast

### Requirement: Format export cards responsive
The three format export cards (PDF, CSV, TXT) SHALL adapt to mobile viewports.

#### Scenario: Full-width cards on mobile
- **WHEN** the viewport is narrower than 640px
- **THEN** the format cards stack vertically (single column)

#### Scenario: Three-column grid on desktop
- **WHEN** the viewport is 640px or wider
- **THEN** the format cards display in a 3-column grid (current behavior)
