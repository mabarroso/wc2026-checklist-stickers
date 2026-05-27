# search Specification - Delta

## ADDED Requirements

### Requirement: Bottom sheet detail view on mobile
The Search screen SHALL display a bottom sheet for sticker details on mobile viewports instead of the hidden side panel.

#### Scenario: Sticker tapped on mobile
- **WHEN** the user taps a search result on a viewport narrower than 1024px
- **THEN** a bottom sheet slides up from the bottom showing the sticker detail
- **AND** the sheet shows: sticker ID, name, team, ownership status, and three action buttons (Añadir/Quitar/Repetir)

#### Scenario: Drag to dismiss bottom sheet
- **WHEN** the bottom sheet is open on mobile
- **THEN** the user can drag it downward to dismiss
- **AND** tapping the backdrop also dismisses it

#### Scenario: Desktop preview remains unchanged
- **WHEN** the viewport is 1024px or wider
- **THEN** the existing side preview panel is shown (current behavior)

### Requirement: Debounced search input
The search input SHALL debounce queries to prevent excessive re-renders on fast typing.

#### Scenario: Debounce at 150ms
- **WHEN** the user types in the search input
- **THEN** result filtering is delayed by 150ms after the user stops typing
- **AND** intermediate keystrokes do not trigger filtering
- **AND** the search feels responsive (no visible lag)

### Requirement: Action buttons equal width in search results
The three action buttons (Añadir, Quitar, Repetir) inside each search result card SHALL have equal width.

#### Scenario: Equal width action buttons
- **WHEN** search results display action buttons
- **THEN** each button occupies equal width within the button group
- **AND** each button has a minimum height of 44px for touch targets

### Requirement: Double-tap prevention on search actions
The system SHALL prevent double-tap on markOwned/markDuplicate actions in search results.

#### Scenario: Debounce at 300ms
- **WHEN** the user taps "Añadir", "Quitar", or "Repetir" in search results
- **THEN** the action is executed immediately
- **AND** subsequent taps on the same button are ignored for 300ms
