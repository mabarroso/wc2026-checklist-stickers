# persistence Specification

## Purpose
Legacy synchronized capability specification for persistence.

## Requirements
### Requirement: persistence capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

## Legacy Notes

## ADDED Requirements

### Requirement: Automatic storage initialization
The system SHALL automatically create the storage directory and file on first launch.

#### Scenario: First launch creates storage file
- **WHEN** the application starts for the first time
- **THEN** the directory `~/.config/wc26-checklist/` is created
- **AND** the file `~/.config/wc26-checklist/collection.json` is created with empty `owned: {}` and `duplicates: {}`

#### Scenario: Subsequent launches load existing data
- **WHEN** the application starts and `collection.json` exists
- **THEN** the existing `owned` and `duplicates` maps are loaded

### Requirement: Immediate persistence
The system SHALL persist all changes to disk immediately after each modification.

#### Scenario: Mark owned triggers save
- **WHEN** user marks a sticker as owned
- **THEN** the change is saved to `collection.json` immediately

#### Scenario: Mark duplicate triggers save
- **WHEN** user marks a sticker as duplicate
- **THEN** the change is saved to `collection.json` immediately

#### Scenario: Reset triggers save
- **WHEN** user resets the collection
- **THEN** the empty state is saved to `collection.json` immediately

### Requirement: Storage file format
The system SHALL store collection data as JSON with the following structure: `{ "owned": { ... }, "duplicates": { ... } }`.

#### Scenario: Storage file format is valid JSON
- **WHEN** the storage file is read
- **THEN** it parses as valid JSON with `owned` and `duplicates` fields

#### Scenario: Storage contains sticker ID keys
- **WHEN** stickers are marked as owned
- **THEN** the `owned` object contains keys matching the sticker IDs with numeric values

### Requirement: Cross-platform storage path
The system SHALL use the appropriate config directory for each operating system (Linux/macOS: `~/.config/`, Windows: `%APPDATA%`).

#### Scenario: Linux storage path
- **WHEN** the application runs on Linux
- **THEN** the storage file is at `~/.config/wc26-checklist/collection.json`

#### Scenario: macOS storage path
- **WHEN** the application runs on macOS
- **THEN** the storage file is at `~/Library/Application Support/wc26-checklist/collection.json`

### Requirement: Atomic writes
The system SHALL write data atomically to prevent data corruption on crashes.

#### Scenario: Write uses temporary file
- **WHEN** data is saved
- **THEN** a temporary file is written first, then renamed to the final location

### Requirement: Data migration on schema changes
The system SHALL handle schema migrations when the data model changes.

#### Scenario: Missing fields get defaults
- **WHEN** a storage file is loaded with missing fields
- **THEN** missing fields default to empty objects `{}`