# Tasks: rename-project-remove-trademarks

## Phase A: Root & Project Configuration

- [x] Rename root directory from `fifa-world-cup-2026-checklist` to `wc2026-checklist-stickers`
- [x] Update `package.json` name (`panini-stickers` → `wc26-checklist`), description, and `bin` entry
- [x] Update `build.mjs` output path (`dist/panini-stickers.js` → `dist/wc26-checklist.js`)
- [x] Update `rollup.config.ts` output path
- [x] Run `bun install` to sync `bun.lock`

## Phase B: GUI Configuration

- [x] Update `src/gui/src-tauri/Cargo.toml` (name, description)
- [x] Update `src/gui/src-tauri/tauri.conf.json` (productName, identifier, title)
- [x] Update `src/gui/src-tauri/src/lib.rs` (Android plugin identifier `com.panini.wc2026.checklist` → `com.wc26.checklist`, PDF/TXT export titles)
- [x] Update `src/gui/index.html` `<title>`

## Phase C: Android

- [x] Regenerate Android project with `npx tauri android init`
- [x] Reapply `SharePlugin.kt` to new package location
- [x] Update `strings.xml`, `themes.xml` (day/night), `AndroidManifest.xml`, `proguard-tauri.pro`
- [x] Verify `build.gradle.kts` namespace and applicationId

## Phase D: CLI & Export Content Names

- [x] Update `src/infrastructure/cli/MainMenu.ts` header (`ALBUM PANINI FIFA WORLD CUP 2026` → `ALBUM WC 2026`) and goodbye message (`Panini WC 2026 Checklist` → `WC 2026 Checklist`)
- [x] Update `src/infrastructure/exporters/TxtExporter.ts` title (`ALBUM PANINI FIFA WORLD CUP 2026` → `WC 2026 CHECKLIST`)
- [x] Update `src/infrastructure/exporters/PdfExporter.ts` title (`Album Panini FIFA World Cup 2026` → `WC 2026`)

## Phase E: Storage & State

- [x] Update `src/infrastructure/storage/ConfStorageAdapter.ts` namespace (`panini-stickers` → `wc26-checklist`)
- [x] Update `src/gui/src/stores/collectionStore.ts` persist key (`panini-collection` → `wc26-collection`)

## Phase F: Documentation

- [x] Update `README.md` (title, build paths, storage paths)
- [x] Update `docs/index.md` and `docs/index-es.md` (titles, build paths, storage paths)
- [x] Update `docs/STYLE-GUIDE.md` title
- [x] Update `docs/release-workflow.md` (artifact filenames)
- [x] Update `AGENTS.md` and `INSTRUCTIONS.md` (binary name, storage path)
- [x] Update `openspec/specs/persistence/spec.md` (storage path references)

## Phase G: Verification

- [x] Run `bun test`, `bun run typecheck`, `bun run lint` — all pass
- [x] Build CLI binary (`bun run build`) — verify output path
- [x] Build Android APK (`npx tauri android build --debug`) — verify app identifier
