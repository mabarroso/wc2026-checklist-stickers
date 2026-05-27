# mobile-pagination Specification

## Purpose
Page-based navigation for large sticker lists on mobile viewports, ensuring manageable scroll lengths.

## Requirements

### Requirement: ViewCollection displays 50 stickers per page
The system SHALL display a maximum of 50 stickers per page in the collection grid.

#### Scenario: First page load
- **WHEN** the user opens the ViewCollection screen
- **THEN** the grid displays stickers 1-50 (or all stickers if fewer than 50 match the filter)
- **AND** a page counter shows "Mostrando 1-50 de N"

#### Scenario: Page navigation controls
- **WHEN** the filtered sticker count exceeds 50
- **THEN** Previous and Next buttons are displayed below the grid
- **AND** the Previous button is disabled on the first page
- **AND** the Next button is disabled on the last page

### Requirement: Pagination controls meet touch targets
The system SHALL ensure pagination controls have minimum 44px touch targets.

#### Scenario: Pagination button size
- **WHEN** Previous/Next buttons are rendered on mobile
- **THEN** each button has a minimum height of 44px
- **AND** buttons show the page number text ("Anterior" / "Siguiente")

### Requirement: Pagination resets on filter change
The system SHALL reset to page 1 whenever the filter, section, team, or sort order changes.

#### Scenario: Filter change resets pagination
- **WHEN** the user changes any filter (filter type, section, team, sort order)
- **THEN** the current page resets to 1

### Requirement: Pagination count updates dynamically
The system SHALL update the page count based on the current filtered result set.

#### Scenario: Dynamic page count
- **WHEN** the user applies a filter that reduces results to fewer than 50
- **THEN** no pagination controls are displayed
- **AND** the page counter shows "Mostrando todos (N)"
