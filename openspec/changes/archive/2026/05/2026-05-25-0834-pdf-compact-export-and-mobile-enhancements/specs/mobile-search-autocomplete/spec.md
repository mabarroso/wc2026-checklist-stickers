# mobile-search-autocomplete Specification

## Purpose
Mobile search with autocomplete by ID, name, and team.

## ADDED Requirements

### Requirement: Search shows autocomplete suggestions
The system SHALL display an autocomplete dropdown below the search input as the user types.

#### Scenario: Autocomplete shows after 2 characters
- **WHEN** the user types 2 or more characters in the search input on mobile
- **THEN** an autocomplete dropdown appears with up to 8 matching suggestions
- **AND** suggestions are grouped by type: IDs, names, and teams

#### Scenario: Empty query hides autocomplete
- **WHEN** the search input is empty or has fewer than 2 characters
- **THEN** the autocomplete dropdown is hidden

### Requirement: Autocomplete suggests by ID, name, and team
The system SHALL search across three fields for autocomplete suggestions: sticker ID, sticker name, and team name.

#### Scenario: ID suggestions shown
- **WHEN** the user types a partial ID (e.g., "MEX")
- **THEN** autocomplete shows matching sticker IDs (e.g., "MEX01", "MEX02")
- **AND** each suggestion shows the ID with the matched portion highlighted

#### Scenario: Name suggestions shown
- **WHEN** the user types a partial name (e.g., "Lop")
- **THEN** autocomplete shows matching sticker names
- **AND** each suggestion shows the name with the matched portion highlighted

#### Scenario: Team suggestions shown
- **WHEN** the user types a partial team name (e.g., "Mex")
- **THEN** autocomplete shows team name suggestions
- **AND** each team suggestion includes a count of stickers for that team

### Requirement: Selecting a team shows all team stickers
The system SHALL display all stickers for a selected team in a grid.

#### Scenario: Team selection replaces results
- **WHEN** the user selects a team from the autocomplete
- **THEN** the search input is filled with "equipo: <team_name>"
- **AND** the results area shows all stickers from that team in a grid
- **AND** the total count of team stickers is displayed

#### Scenario: ID/name selection shows sticker card
- **WHEN** the user selects an ID or name from the autocomplete
- **THEN** the search input is filled with the selected ID/name
- **AND** a single sticker card is displayed with full details and action buttons

### Requirement: Mobile autocomplete is touch-friendly
The system SHALL ensure the autocomplete dropdown is usable on mobile touchscreens.

#### Scenario: Suggestions are tappable
- **WHEN** the user taps a suggestion in the autocomplete dropdown
- **THEN** the corresponding action (show sticker/team) is triggered
- **AND** the dropdown closes

#### Scenario: Tapping outside closes autocomplete
- **WHEN** the user taps outside the autocomplete dropdown
- **THEN** the dropdown closes
- **AND** the current query text remains in the input
