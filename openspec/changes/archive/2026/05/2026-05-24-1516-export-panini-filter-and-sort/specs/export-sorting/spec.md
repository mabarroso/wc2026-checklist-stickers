## ADDED Requirements

### Requirement: Export sort order selection
The system SHALL prompt the user to select a sort order before generating the export file, with options to sort by ID or by name.

#### Scenario: Sort options are displayed
- **WHEN** the user selects the source scope in the export flow
- **THEN** the system displays a sort order prompt with options "ID (orden de álbum)" and "Nombre (alfabético)"

#### Scenario: Default sort is by ID
- **WHEN** the sort prompt is shown
- **THEN** the default selected option is "ID (orden de álbum)"

### Requirement: Export sorts by ID
The system SHALL sort stickers by their ID in ascending alphanumeric order when the user selects sort by ID.

#### Scenario: Export list sorted by ID
- **WHEN** the user selects sort by "ID"
- **THEN** the exported list is sorted by sticker ID in ascending order
- **AND** the sort is applied consistently across all export formats (PDF, CSV, TXT)

### Requirement: Export sorts by name
The system SHALL sort stickers alphabetically by their name when the user selects sort by name.

#### Scenario: Export list sorted by name
- **WHEN** the user selects sort by "Nombre"
- **THEN** the exported list is sorted alphabetically by sticker name in ascending order
- **AND** stickers with the same name are then sorted by ID

### Requirement: Sort is applied before export generation
The system SHALL apply the selected sort order to the sticker list after filtering by source scope and before rendering the export file.

#### Scenario: Sort applies to filtered list
- **WHEN** the user selects source scope "Panini" and sort by "Nombre"
- **THEN** the exported list contains only Panini stickers sorted alphabetically by name

#### Scenario: Sort applies to all formats uniformly
- **WHEN** the user selects sort by "ID"
- **THEN** the sticker order is identical regardless of whether the format is PDF, CSV, or TXT
