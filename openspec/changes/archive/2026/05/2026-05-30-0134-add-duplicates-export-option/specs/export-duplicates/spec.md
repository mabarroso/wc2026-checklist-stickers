## ADDED Requirements

### Requirement: Export duplicate stickers by source scope
The system SHALL allow users to export duplicate stickers (those marked as "repetidos") filtered by selected source scope.

#### Scenario: Duplicate export with Panini scope
- **WHEN** user selects export type "repetidos" and source scope `Panini`
- **THEN** exported list includes only Panini duplicate stickers

#### Scenario: Duplicate export with Extra scope
- **WHEN** user selects export type "repetidos" and source scope `Extra`
- **THEN** exported list includes only Extra duplicate stickers

#### Scenario: Duplicate export with Coca cola scope
- **WHEN** user selects export type "repetidos" and source scope `Coca cola`
- **THEN** exported list includes only Coca cola duplicate stickers

#### Scenario: Duplicate export with McDonald's scope
- **WHEN** user selects export type "repetidos" and source scope `McDonald's`
- **THEN** exported list includes only McDonald's duplicate stickers

#### Scenario: Duplicate export with Todos scope
- **WHEN** user selects export type "repetidos" and source scope `Todos`
- **THEN** exported list includes all duplicate stickers from every source

### Requirement: Export duplicate stickers determines duplicates from collection state
The system SHALL consider a sticker as duplicate when its recorded duplicate quantity is greater than zero.

#### Scenario: Sticker with duplicate quantity > 0 is included
- **WHEN** user exports duplicates and a sticker has `duplicates["ARG01"] = 3`
- **THEN** that sticker is included in the export

#### Scenario: Sticker with duplicate quantity 0 is excluded
- **WHEN** user exports duplicates and a sticker has `duplicates["MEX05"] = 0` (or is absent from duplicates)
- **THEN** that sticker is excluded from the export

### Requirement: Duplicate export uses expected filenames and titles
The system SHALL use "repetidos" as the filename prefix and content label when exporting duplicates.

#### Scenario: Duplicate PDF filename
- **WHEN** user exports duplicates to PDF on 2026-05-30
- **THEN** the filename is `repetidos_2026-05-30.pdf`

#### Scenario: Duplicate CSV filename
- **WHEN** user exports duplicates to CSV on 2026-05-30
- **THEN** the filename is `repetidos_2026-05-30.csv`

#### Scenario: Duplicate TXT filename
- **WHEN** user exports duplicates to TXT on 2026-05-30
- **THEN** the filename is `repetidos_2026-05-30.txt`

#### Scenario: Duplicate PDF title
- **WHEN** user exports duplicates to PDF
- **THEN** the PDF title includes "Repetidos" instead of "Faltantes"

#### Scenario: Duplicate TXT header
- **WHEN** user exports duplicates to TXT
- **THEN** the TXT header reads "LISTA DE FIGURITAS REPETIDAS" instead of "FALTANTES"
- **AND** the footer shows "Total repetidas" instead of "Total faltantes"

### Requirement: Duplicate export respects empty state
The system SHALL handle the case where no stickers are duplicated.

#### Scenario: Export with no duplicate stickers
- **WHEN** user exports duplicates and has 0 duplicate stickers
- **THEN** an appropriate message is shown indicating there are no duplicates to export
- **AND** no file is created

### Requirement: Duplicate export uses same destination selection
The system SHALL use the same export destination selection (Downloads, Desktop, Current directory) for duplicate exports as for missing exports.

#### Scenario: Duplicate export destination
- **WHEN** user exports duplicates and selects "Downloads"
- **THEN** the file is saved to `~/Downloads/repetidos_<date>.ext`
