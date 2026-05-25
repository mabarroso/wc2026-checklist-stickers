# gui-android-build Specification

## Purpose
Capability for building the Panini WC 2026 app as an Android APK via Tauri Mobile.

## Requirements

### Requirement: Android build pipeline via Tauri Mobile
The system SHALL provide the capability to build an Android APK using `npx tauri android build`.

#### Scenario: Android project initialized
- **WHEN** `npx tauri android init` is executed
- **THEN** an `android/` directory is created under `src-tauri/` with Gradle project structure
- **AND** the project targets Android API 34+

#### Scenario: Android APK builds successfully
- **WHEN** `npx tauri android build` is executed
- **THEN** a signed APK is generated in `src-tauri/gen/android/app/build/outputs/apk/`

#### Scenario: Android dev server runs
- **WHEN** `npx tauri android dev` is executed
- **THEN** the app launches on a connected Android device/emulator with hot reload

### Requirement: tauri.conf.json Android configuration
The system SHALL include Android-specific configuration in `tauri.conf.json`.

#### Scenario: Android bundle target configured
- **WHEN** tauri.conf.json is loaded for an Android build
- **THEN** the `bundle.targets` includes the `apk` target

#### Scenario: Android app identifier used
- **WHEN** the Android APK is built
- **THEN** the package name is derived from `identifier` in `tauri.conf.json`

### Requirement: Android icons
The system SHALL provide Android-compatible app icons.

#### Scenario: Android mipmap icons from docs/icons/android
- **WHEN** an Android build runs
- **THEN** mipmap icons (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) are present in `gen/android/app/src/main/res/`
- **AND** the source icons come from `docs/icons/android/` (copied for each density)
- **AND** `ic_launcher.png`, `ic_launcher_round.png`, and `ic_launcher_foreground.png` all use the same source image

#### Scenario: Adaptive icon uses new foreground PNG
- **WHEN** the app runs on API 26+
- **THEN** `mipmap-anydpi-v26/ic_launcher.xml` uses `@mipmap/ic_launcher_foreground` (new icon) on a white background

#### Scenario: Store icons in docs/
- **WHEN** preparing for app store submission
- **THEN** `docs/playstore.png` and `docs/appstore.png` are available
- **AND** their sources are in `docs/icons/playstore.png` and `docs/icons/appstore.png`
