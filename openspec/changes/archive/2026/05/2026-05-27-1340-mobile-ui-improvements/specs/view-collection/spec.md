# view-collection Specification - Delta

## ADDED Requirements

### Requirement: Pagination with 50 items per page
The ViewCollection screen SHALL paginate the sticker grid to 50 items per page on all viewport sizes.

#### Scenario: Pagination controls
- **WHEN** the filtered sticker count exceeds 50
- **THEN** the grid shows only the current page of stickers
- **AND** Previous/Next controls are displayed below the grid
- **AND** a page counter shows "Mostrando X-Y de Z"

#### Scenario: Pagination resets on filter
- **WHEN** the user changes filter type, section, team, or sort order
- **THEN** pagination resets to page 1

### Requirement: Text overflow prevention in sticker cards
All text elements inside sticker cards SHALL be truncated to prevent overflow.

#### Scenario: Long name truncated
- **WHEN** a sticker name exceeds the card width
- **THEN** the text is truncated with an ellipsis
- **AND** the full name is available via the HTML title attribute

#### Scenario: Long team name truncated
- **WHEN** a sticker team name exceeds the card width
- **THEN** the team name text is truncated with an ellipsis

#### Scenario: Sticker ID truncated
- **WHEN** a sticker ID exceeds the card width
- **THEN** the ID uses a smaller font and is truncated if needed

### Requirement: Action buttons equal width inside selected card
The three action buttons (Añadir, Quitar, Repetida) SHALL have equal widths when displayed inside a selected sticker card.

#### Scenario: Equal width buttons
- **WHEN** a sticker is selected and action buttons are shown
- **THEN** each button occupies equal width within the button group
- **AND** each button has a minimum height of 44px

### Requirement: Filter controls collapsible on mobile
The filter bar (filter type buttons + section/team/sort selects) SHALL be collapsible on mobile viewports.

#### Scenario: Filters collapsed by default on mobile
- **WHEN** the viewport is narrower than 1024px
- **THEN** the filter controls are hidden behind a "Filtros" toggle button
- **AND** the sticker count ("N cromos") is always visible

#### Scenario: Toggle filters
- **WHEN** the user taps "Filtros" on mobile
- **THEN** the filter controls expand with a smooth animation
- **AND** tapping "Filtros" again collapses them

### Requirement: Batch selection mode
The ViewCollection SHALL support a batch selection mode for bulk operations.

#### Scenario: Enter batch mode
- **WHEN** the user taps and holds a sticker card for 500ms
- **THEN** the app enters batch selection mode
- **AND** a floating action bar appears at the bottom with "Añadir seleccionados" and "Cancelar" buttons

#### Scenario: Select multiple stickers
- **WHEN** in batch mode, the user taps additional sticker cards
- **THEN** each tapped card toggles its selection state
- **AND** selected cards show a checkmark overlay
- **AND** the action bar updates the count ("3 seleccionados")

#### Scenario: Execute batch action
- **WHEN** the user taps "Añadir seleccionados" in batch mode
- **THEN** all selected stickers are marked as owned
- **AND** batch mode exits
- **AND** a toast confirms the action

#### Scenario: Exit batch mode
- **WHEN** the user taps "Cancelar" in batch mode
- **THEN** batch mode exits
- **AND** all selections are cleared
- **AND** the floating action bar disappears
