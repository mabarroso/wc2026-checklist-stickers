# pdf-compact-mode Specification

## Purpose
PDF export with ID-only compact format using maximum columns per page.

## ADDED Requirements

### Requirement: PDF export supports full and ID-only modes
The system SHALL support two PDF export modes: `full` (current behavior with ID, name, team) and `ids-only` (just ID with checkbox).

#### Scenario: Default mode is full
- **WHEN** the user opens the PDF export without selecting a mode
- **THEN** the export uses `full` mode with ID, name, and team in 2-column layout

#### Scenario: ID-only mode renders compact layout
- **WHEN** the user selects ID-only mode and exports PDF
- **THEN** the PDF contains only checkboxes with sticker IDs
- **AND** the layout uses the maximum number of columns that fit the page width

### Requirement: PDF ID-only mode uses maximum columns
The system SHALL calculate the maximum number of columns that fit A4 page width for ID-only mode.

#### Scenario: ID-only mode renders 8+ columns on A4
- **WHEN** the user exports in ID-only mode
- **THEN** the PDF renders 8 or more columns per page
- **AND** each column width is at least 17mm to fit checkbox + ID text

#### Scenario: ID-only mode header shows mode label
- **WHEN** the PDF is generated in ID-only mode
- **THEN** the header includes "(Solo IDs)" label
- **AND** the total sticker count is still displayed

### Requirement: CLI export offers mode selection
The system SHALL prompt the user to choose between full and ID-only mode when exporting PDF from the CLI.

#### Scenario: CLI mode selection prompt
- **WHEN** the user selects PDF format in the CLI export menu
- **THEN** the system prompts "¿Incluir nombres?" with options: "Sí (formato completo)" and "No (solo IDs, más columnas)"
- **AND** the selected mode is applied to the PDF generation

### Requirement: GUI export offers mode toggle
The system SHALL provide a toggle switch for full/ID-only mode in the GUI export screen when PDF is selected.

#### Scenario: GUI mode toggle visible for PDF
- **WHEN** the user is on the export screen in GUI and selects PDF format
- **THEN** a toggle "Solo IDs" / "Formato completo" is displayed
- **AND** the user can switch between modes before exporting

#### Scenario: Mode toggle hidden for CSV/TXT
- **WHEN** the user selects CSV or TXT format
- **THEN** the mode toggle is not displayed
