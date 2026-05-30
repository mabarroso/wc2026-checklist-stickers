# gui-ios-build Specification

## Purpose
Capability for building the WC 2026 Checklist app as an iOS IPA via Tauri Mobile (requires macOS + Xcode).

## Requirements

### Requirement: iOS build pipeline via Tauri Mobile
The system SHALL provide the capability to build an iOS IPA using `npx tauri ios build`.

#### Scenario: iOS project initialized
- **WHEN** `npx tauri ios init` is executed
- **THEN** an `ios/` directory is created under `src-tauri/` with Xcode project structure

#### Scenario: iOS IPA builds successfully
- **WHEN** `npx tauri ios build` is executed on macOS
- **THEN** a signed IPA is generated in `src-tauri/gen/apple/build/`

#### Scenario: iOS dev server runs
- **WHEN** `npx tauri ios dev` is executed on macOS
- **THEN** the app launches on a connected iOS device/simulator with hot reload

### Requirement: tauri.conf.json iOS configuration
The system SHALL include iOS-specific configuration in `tauri.conf.json`.

#### Scenario: iOS bundle target configured
- **WHEN** tauri.conf.json is loaded for an iOS build
- **THEN** the `bundle.targets` includes the `ipa` target

### Requirement: iOS icons
The system SHALL provide iOS-compatible app icons.

#### Scenario: iOS xcassets icons exist
- **WHEN** an iOS build runs
- **THEN** required xcassets icons are present in `src-tauri/icons/`
