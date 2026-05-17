# Spec: Collection Sorting

Add sorting options to the collection view, allowing users to sort stickers by album order or alphabetically by ID.

## ADDED Requirements

### Requirement: Sort dropdown in collection view

The system SHALL display a sort dropdown in the ViewCollection screen with options for "Álbum" and "Cromo" sorting.

#### Scenario: Display sort dropdown
- **WHEN** user navigates to ViewCollection screen
- **THEN** system displays sort dropdown with options "Álbum" and "Cromo"
- **AND** default selected option is "Álbum"

### Requirement: Sort by album order

The system SHALL sort stickers by album order (CSV order) when user selects "Álbum" from the sort dropdown.

#### Scenario: Album order sorting
- **WHEN** user selects "Álbum" from sort dropdown
- **THEN** system displays stickers in original CSV sequence
- **AND** stickers appear in same order as they appear in stickers.csv

### Requirement: Sort by cromo alphabetical order

The system SHALL sort stickers alphabetically by sticker ID when user selects "Cromo" from the sort dropdown.

#### Scenario: Alphabetical sorting with zero-padded IDs
- **WHEN** user selects "Cromo" from sort dropdown
- **THEN** system sorts stickers alphabetically by ID
- **AND** zero-padded format ensures COL08 < COL09 < COL10

#### Scenario: Cross-team alphabetical sorting
- **WHEN** user selects "Cromo" from sort dropdown
- **THEN** system sorts across all teams: AUT18 < COL08 < COL09 < COL10 < MEX01

### Requirement: Persist sort preference

The system SHALL persist the user's sort preference and restore it on subsequent app launches.

#### Scenario: Restore sort preference on reload
- **WHEN** user has selected "Cromo" sort and reloads the app
- **THEN** system restores "Cromo" as selected sort option

#### Scenario: Default sort on first launch
- **WHEN** user launches app for the first time
- **THEN** system defaults to "Álbum" sort

### Requirement: Sort affects all filtered views

The system SHALL apply the current sort order to all filtered views (All, Missing, Owned, Duplicated).

#### Scenario: Sort persists across filter changes
- **WHEN** user changes sort to "Cromo" while viewing "All"
- **AND** switches filter to "Missing"
- **THEN** system displays missing stickers sorted alphabetically by ID