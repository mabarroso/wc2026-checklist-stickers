# Plan: rename-project-remove-trademarks

## Context

Remove trademarked names (Panini, FIFA, FIFA World Cup 2026) from application/project identifiers while preserving reference usage in user-facing text.

## Artifacts to Create

The following files need to be created in `openspec/changes/rename-project-remove-trademarks/`:

### 1. `proposal.md`

```markdown
## Why

The project uses trademarked names "Panini", "FIFA", and "FIFA World Cup 2026" as its application name,
binary name, package names, app identifiers, and product titles. This creates legal exposure.
The application name must be changed to avoid trademark infringement while preserving the ability
to reference these brands in user-facing text and disclaimers.

## What Changes

Rename all application/project identifiers to use `wc2026-checklist-stickers` (base name) or
`wc26-checklist` (short form for binaries, packages, and identifiers):

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

None. No spec-level requirements are changing — the behavior of the application remains identical.
The rename affects only project configuration, build artifacts, identifiers, and documentation.

## Impact

- All configuration files (package.json, Cargo.toml, tauri.conf.json, build scripts)
- Android project structure (package directories, Kotlin files, Gradle config, manifest, themes, ProGuard)
- HTML title and storage persistence keys
- Documentation files (README, docs/, AGENTS.md, INSTRUCTIONS.md)
- Build output filenames and release artifact names
- **BREAKING**: Config storage path changes from `~/.config/panini-stickers/` to `~/.config/wc26-checklist/`.
  Existing user data will need migration or manual copy.
- **BREAKING**: Android app identifier changes, causing a fresh install (existing data lost)
```

### 2. `design.md`

```markdown
## Overview

This is a cross-cutting rename affecting every layer of the project. The approach is a
find-and-replace strategy with manual adjustments for Android package restructuring.

## Key Decisions

### Naming Convention
- Base name: `wc2026-checklist-stickers` (root directory, long form)
- Short form: `wc26-checklist` (binaries, packages, npm, Cargo, identifiers)
- Display name: `WC 2026 Checklist` (GUI product name, window title, Android app name)
- App identifier: `com.wc26.checklist` (Android/Tauri reverse-domain)

### Android Strategy
1. Update `identifier` in `tauri.conf.json` to `com.wc26.checklist`
2. Regenerate Android project with `npx tauri android init`
3. Manually reapply `SharePlugin.kt` and any custom Android code
4. Update `lib.rs` Android plugin reference

### Storage Migration
- The config path changes from `~/.config/panini-stickers/` to `~/.config/wc26-checklist/`
- No automatic migration — this is a breaking change documented in release notes

### Preserved References
- CLI output strings containing "Panini" (e.g., menu labels, export headers)
- Legal disclaimers in README, LICENSE, and CLI/GUI
- CHANGELOG.md (historical entries)
- Archive files in `openspec/changes/archive/`

## Implementation Plan

### Phase A: Root & Project Configuration
1. Rename root directory
2. Update `package.json` (name, description, bin)
3. Update `build.mjs` and `rollup.config.ts` (output paths)
4. Update `bun.lock` via `bun install`

### Phase B: GUI Configuration
5. Update `src/gui/src-tauri/Cargo.toml` (name, description)
6. Update `src/gui/src-tauri/tauri.conf.json` (productName, identifier, title)
7. Update `src/gui/src-tauri/src/lib.rs` (Android plugin reference)
8. Update `src/gui/index.html` (title)

### Phase C: Android (regenerate + reapply)
9. Regenerate Android project
10. Reapply SharePlugin.kt
11. Update strings.xml, themes.xml, manifest, ProGuard

### Phase D: Storage & State
12. Update `ConfStorageAdapter.ts` (namespace)
13. Update `collectionStore.ts` (persist key)

### Phase E: Documentation
14. Update README.md (title, build paths, storage paths)
15. Update docs/index.md and docs/index-es.md
16. Update docs/STYLE-GUIDE.md
17. Update docs/release-workflow.md
18. Update AGENTS.md and INSTRUCTIONS.md
19. Update openspec/specs/persistence/spec.md (storage paths)

### Phase F: Final
20. Run `bun test`, `bun run typecheck`, `bun run lint`
21. Build CLI binary to verify output path
22. Build Android APK to verify app identifier

## Breaking Changes
- Config path: `~/.config/panini-stickers/` → `~/.config/wc26-checklist/`
- Android app identifier: fresh install required
- CLI binary name: `panini-stickers` → `wc26-checklist`
- Cargo crate name: `panini-wc-2026` → `wc26-checklist`
```

### 3. `specs/` — No spec files needed

No new capabilities and no modified capabilities. This change is purely configuration/structure,
not behavior. No spec files are required.

### 4. `tasks.md`

```markdown
# Tasks: rename-project-remove-trademarks

Total: 22 tasks

## Phase A: Root & Project Configuration

- [ ] Rename root directory from `fifa-world-cup-2026-checklist` to `wc2026-checklist-stickers`
- [ ] Update `package.json` name (`panini-stickers` → `wc26-checklist`), description, and bin entry
- [ ] Update `build.mjs` output path (`dist/panini-stickers.js` → `dist/wc26-checklist.js`)
- [ ] Update `rollup.config.ts` output path
- [ ] Run `bun install` to sync `bun.lock`

## Phase B: GUI Configuration

- [ ] Update `src/gui/src-tauri/Cargo.toml` (name, description)
- [ ] Update `src/gui/src-tauri/tauri.conf.json` (productName, identifier, title)
- [ ] Update `src/gui/src-tauri/src/lib.rs` (Android plugin reference `com.panini.wc2026.checklist` → `com.wc26.checklist`)
- [ ] Update `src/gui/index.html` `<title>`

## Phase C: Android

- [ ] Regenerate Android project with `npx tauri android init`
- [ ] Reapply `SharePlugin.kt` to new package location
- [ ] Update `strings.xml`, `themes.xml` (day/night), `AndroidManifest.xml`, `proguard-tauri.pro`
- [ ] Verify `build.gradle.kts` namespace and applicationId

## Phase D: Storage & State

- [ ] Update `src/infrastructure/storage/ConfStorageAdapter.ts` namespace (`panini-stickers` → `wc26-checklist`)
- [ ] Update `src/gui/src/stores/collectionStore.ts` persist key (`panini-collection` → `wc26-collection`)

## Phase E: Documentation

- [ ] Update `README.md` (title, build paths, storage paths)
- [ ] Update `docs/index.md` and `docs/index-es.md` (titles, build paths, storage paths)
- [ ] Update `docs/STYLE-GUIDE.md` title
- [ ] Update `docs/release-workflow.md` (artifact filenames)
- [ ] Update `AGENTS.md` and `INSTRUCTIONS.md` (binary name, storage path)
- [ ] Update `openspec/specs/persistence/spec.md` (storage path references)

## Phase F: Verification

- [ ] Run `bun test`, `bun run typecheck`, `bun run lint` — all pass
- [ ] Build CLI binary and Android APK — verify output paths and identifiers
```

## Implementation Order

1. First apply all the file edits (Phases A-E)
2. Then regenerate Android project and reapply custom code
3. Finally verify with tests, typecheck, lint, and builds
