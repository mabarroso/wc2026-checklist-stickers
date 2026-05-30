## Overview

This is a cross-cutting rename affecting every layer of the project. The approach is a find-and-replace strategy with manual adjustments for Android package restructuring.

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
