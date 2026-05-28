## Why

The project needs a coordinated v1.2.0 release that packages the latest GUI theme system, FIFA multicolor navigation polish, country flag toggle, and Android startup crash fix into distributable artifacts for GitHub.

## What Changes

- Bump project version from 1.1.0 to 1.2.0 across CLI, GUI, and Tauri backend
- Publish the current unreleased changelog entries as the 1.2.0 release
- Prepare official release notes in docs/RELEASE-v1.2.0.txt
- Build and verify CLI, desktop GUI, and Android release artifacts

## Capabilities

### Modified Capabilities
- theme-system
- fifa-colors
- country-flag-toggle

## Impact

- package.json
- src/config/appVersion.ts
- src/gui/src/components/Header.tsx
- src/gui/src-tauri/Cargo.toml
- src/gui/src-tauri/tauri.conf.json
- docs/CHANGELOG.md
- docs/RELEASE-v1.2.0.txt
