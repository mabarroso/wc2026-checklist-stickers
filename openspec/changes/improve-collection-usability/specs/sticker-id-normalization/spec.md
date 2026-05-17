# Spec: Sticker ID Normalization

Normalize all sticker IDs to zero-padded format for consistent alphabetical sorting.

## ADDED Requirements

### Requirement: Zero-pad single-digit numeric suffixes

The system SHALL use zero-padded format for sticker IDs with single-digit numbers (1-9).

#### Scenario: Zero-pad single digits
- **WHEN** system displays sticker with ID `COL8`
- **THEN** system converts to `COL08` for display and storage

#### Scenario: Preserve double-digit IDs
- **WHEN** system displays sticker with ID `COL10`
- **THEN** system keeps as `COL10` (no change needed)

#### Scenario: FWC special stickers padding
- **WHEN** system displays sticker with ID `FWC1`
- **THEN** system converts to `FWC01`

### Requirement: Migration of collection state

The system SHALL migrate existing collection state from old ID format to new zero-padded format on app startup.

#### Scenario: Detect old format on startup
- **WHEN** app starts and finds collection state with old-format IDs (e.g., `COL8`)
- **THEN** system migrates to new format (`COL08`) before loading collection

#### Scenario: No migration needed
- **WHEN** app starts and finds collection state already in new format
- **THEN** system loads collection without modification

#### Scenario: Partial migration
- **WHEN** app starts and finds some stickers in old format and some in new format
- **THEN** system migrates only the old-format stickers

### Requirement: Data files use zero-padded IDs

The system SHALL use zero-padded IDs in all data files (CSV, JSON).

#### Scenario: Update stickers.csv
- **WHEN** system processes stickers.csv
- **THEN** all sticker IDs with single-digit numbers are zero-padded

#### Scenario: Regenerate stickers.json for GUI
- **WHEN** system regenerates stickers.json from stickers.csv
- **THEN** all sticker IDs reflect zero-padded format

### Requirement: Sticker ID format validation

The system SHALL validate that all sticker IDs in data files follow the zero-padded format.

#### Scenario: Valid ID format
- **WHEN** system loads sticker `COL08`
- **THEN** system accepts as valid (no zero-padding needed)

#### Scenario: Invalid ID format
- **WHEN** system loads sticker `COL8`
- **THEN** system flags as invalid or auto-corrects to `COL08`

## Breaking Changes

All sticker IDs with numeric suffixes (1-9) change from single-digit to zero-padded format.
Migration on startup ensures backward compatibility with existing collection state.