## Why

The project uses trademarked names "Panini", "FIFA", and "FIFA World Cup 2026" as its application name, binary name, package names, app identifiers, and product titles. This creates legal exposure. The application name must be changed to avoid trademark infringement while preserving the ability to reference these brands in user-facing text and disclaimers.

## What Changes

Rename all application/project identifiers to use `wc2026-checklist-stickers` (base name) or `wc26-checklist` (short form for binaries, packages, and identifiers):

- CLI binary: `panini-stickers` → `wc26-checklist`
- npm package: `panini-stickers` → `wc26-checklist`
- Rust crate: `panini-wc-2026` → `wc26-checklist`
- Tauri product name: `Panini WC 2026` → `WC 2026 Checklist`
- Tauri app identifier: `com.panini.wc2026.checklist` → `com.wc26.checklist`
- Android package: `com.panini.wc2026.checklist` → `com.wc26.checklist`
- Storage namespace: `panini-stickers` → `wc26-checklist`
- Documentation titles and build output paths: updated accordingly
- Root directory: `fifa-world-cup-2026-checklist` → `wc2026-checklist-stickers`

User-facing reference text (CLI output, legal disclaimers, changelog) is NOT changed.

## Capabilities

### New Capabilities

None. This change does not introduce new features.

### Modified Capabilities

None. No spec-level requirements are changing — the behavior of the application remains identical. The rename affects only project configuration, build artifacts, identifiers, and documentation.

## Impact

- All configuration files (package.json, Cargo.toml, tauri.conf.json, build scripts)
- Android project structure (package directories, Kotlin files, Gradle config, manifest, themes, ProGuard)
- HTML title and storage persistence keys
- Documentation files (README, docs/, AGENTS.md, INSTRUCTIONS.md)
- Build output filenames and release artifact names
- **BREAKING**: Config storage path changes from `~/.config/panini-stickers/` to `~/.config/wc26-checklist/`. Existing user data will need migration or manual copy.
- **BREAKING**: Android app identifier changes, causing a fresh install (existing data lost)
