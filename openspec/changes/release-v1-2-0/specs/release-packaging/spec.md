## ADDED Requirements

### Requirement: Coordinated GitHub release package
The project SHALL provide a coordinated GitHub release package for version 1.2.0 that aligns the CLI, GUI, and Tauri backend version metadata and includes official release notes.

#### Scenario: Version metadata aligned
- **WHEN** version 1.2.0 is prepared
- **THEN** the CLI package version, app version constant, GUI-visible version, Rust crate version, and Tauri config version SHALL all be set to 1.2.0

#### Scenario: Official release notes published
- **WHEN** the release is prepared
- **THEN** the repository SHALL include docs/RELEASE-v1.2.0.txt describing the release scope and artifacts

### Requirement: Verified release artifacts generated
The project SHALL generate verified local artifacts for GitHub distribution for version 1.2.0.

#### Scenario: CLI artifact built
- **WHEN** the release build process is executed
- **THEN** a CLI artifact and bundled sticker data SHALL be generated for distribution

#### Scenario: Desktop artifacts built
- **WHEN** the desktop GUI release build is executed
- **THEN** Debian and RPM artifacts SHALL be generated for version 1.2.0

#### Scenario: Android artifact built
- **WHEN** the Android release build is executed
- **THEN** a universal Android APK artifact SHALL be generated for version 1.2.0

#### Scenario: Checksums generated
- **WHEN** release artifacts are consolidated for GitHub publication
- **THEN** a SHA256SUMS.txt file SHALL be generated for the packaged assets
