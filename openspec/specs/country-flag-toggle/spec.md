## ADDED Requirements

### Requirement: User can toggle country flag display
The system SHALL provide a persisted toggle to show or hide country flag SVG on sticker cards. The toggle SHALL be accessible from the header 3-dot menu. The default state SHALL be enabled (show flag SVG).

#### Scenario: Toggle enabled via menu
- **WHEN** user opens the 3-dot menu and clicks "Mostrar bandera países"
- **THEN** the toggle state SHALL change to enabled, the menu SHALL close, and sticker cards SHALL display the country flag SVG instead of the ball icon

#### Scenario: Toggle disabled via menu
- **WHEN** user opens the 3-dot menu and clicks "Ocultar bandera países" while it is enabled
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

### Requirement: Flag SVG derived from sticker country code
The system SHALL derive the sticker's country code (first 3 uppercase characters of the sticker `id`) and look up the corresponding ISO 3166-1 alpha-2 code via a FIFA-to-ISO mapping, then render the flag as an inline SVG string from `country-flag-icons/string/3x2`.

#### Scenario: Valid country code renders flag SVG
- **WHEN** a sticker has id "MEX-01" (Mexico)
- **THEN** the system SHALL render the Mexican flag as an `<img>` element with a `data:image/svg+xml;utf8` URI containing the SVG

#### Scenario: Unknown code falls back to ball
- **WHEN** a sticker has no recognizable country code (e.g., "FWC-01", "LOGO-01")
- **THEN** the system SHALL display the ball icon (⚽)

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

### Requirement: Flags render as inline SVG (no system font dependency)
Flags SHALL be rendered via `<img>` tags with inline SVG data URIs so they work on any platform without requiring a system emoji font.

#### Scenario: SVG flag on desktop
- **WHEN** viewing any sticker with a valid country code on Linux desktop
- **THEN** the flag SHALL render as an `<img>` element with an inline SVG `data:image/svg+xml;utf8` source

#### Scenario: SVG flag on mobile
- **WHEN** viewing any sticker with a valid country code on Android
- **THEN** the flag SHALL render identically without requiring any system font

### Requirement: Import uses correct path with TypeScript declarations
The `country-flag-icons` package SHALL be imported from the `country-flag-icons/string/3x2` subpath which includes its own type declarations.

#### Scenario: Build succeeds
- **WHEN** running `tsc -b` or `npx tauri build`
- **THEN** the build SHALL succeed without TS2307 errors for the flag module
