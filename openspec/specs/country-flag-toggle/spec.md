## ADDED Requirements

### Requirement: User can toggle country flag display
The system SHALL provide a persisted toggle to show or hide country flag emoji on sticker cards. The toggle SHALL be accessible from the header 3-dot menu. The default state SHALL be disabled (show ball icon).

#### Scenario: Toggle enabled via menu
- **WHEN** user opens the 3-dot menu and clicks "Mostrar bandera países"
- **THEN** the toggle state SHALL change to enabled, the menu SHALL close, and sticker cards SHALL display the country flag emoji instead of the ball icon

#### Scenario: Toggle disabled via menu
- **WHEN** user opens the 3-dot menu and clicks "Mostrar bandera países" while it is enabled
- **THEN** the toggle state SHALL change to disabled, the menu SHALL close, and sticker cards SHALL display the ball icon

#### Scenario: State persists across page navigation
- **WHEN** user enables the toggle and navigates to another screen
- **THEN** the toggle state SHALL remain enabled

#### Scenario: State persists after app restart
- **WHEN** user enables the toggle, closes the app, and reopens it
- **THEN** the toggle state SHALL remain enabled

#### Scenario: Non-country stickers show ball icon
- **WHEN** a sticker has no associated country (logo, special type)
- **THEN** the ball icon SHALL be shown regardless of toggle state

### Requirement: Flag emoji derived from sticker country code
The system SHALL convert the sticker's country code (first 3 alphanumeric characters of the sticker `id`) to a flag emoji using a FIFA-to-ISO code mapping.

#### Scenario: Valid country code renders flag
- **WHEN** a sticker has id "MEX01" (Mexico)
- **THEN** the system SHALL display the Mexican flag emoji (🇲🇽)

#### Scenario: Unknown code falls back to ball
- **WHEN** a sticker has no recognizable country code (e.g., logo or special sticker)
- **THEN** the system SHALL display the ball icon

### Requirement: Batch mode bar clears navigation
The batch action bar in the collection view SHALL be positioned so it does not overlap the bottom navigation tab bar.

#### Scenario: Batch mode active
- **WHEN** user activates batch mode in the collection view
- **THEN** the batch action bar SHALL appear above the bottom navigation with sufficient clearance

### Requirement: Minus button removes last duplicate
When a duplicate sticker has quantity 1, clicking the minus button SHALL remove the duplicate entry entirely instead of being disabled.

#### Scenario: Minus at qty=1
- **WHEN** a duplicate sticker has quantity 1 and the user clicks the minus button
- **THEN** the duplicate entry SHALL be removed from the list

#### Scenario: Minus at qty>1
- **WHEN** a duplicate sticker has quantity greater than 1 and the user clicks the minus button
- **THEN** the quantity SHALL decrease by 1
