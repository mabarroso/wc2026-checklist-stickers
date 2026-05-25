# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.1] - 2026-05-17

### Fixed

- GUI PDF export now generates valid PDF files (was plain text before)
- Added printpdf crate for proper PDF generation in Tauri backend

### Added

- `bun run gui:web` — Run GUI web in development
- `bun run gui:desktop` — Run GUI desktop in development

## [Unreleased]

### Added

- Android mobile support: APK build via `npx tauri android build`, app data dir for exports, hidden "Abrir Carpeta" button on mobile
- iOS placeholder: scaffolding structure created (requires macOS/Xcode to complete)
- Responsive UI: desktop sidebar + mobile bottom tab bar, `pb-16` clearance on mobile, 44px+ touch targets
- New scripts: `bun run tauri`, `bun run tauri:android`, `bun run tauri:ios`
- Platform icons: Android mipmap (`ic_launcher`) and iOS xcassets
- App icons: Android launcher icons in `gen/android/` (5 densities), `docs/playstore.png`, `docs/appstore.png`
- Share via Android share sheet: custom `SharePlugin.kt` using `Intent.ACTION_SEND` with FileProvider content URI

### Changed

- Rust backend: `get_export_dir()` uses `app_data_dir()` on mobile, `download_dir()` on desktop
- `Cargo.toml`: `dirs` crate moved to target-specific conditional dependency
- `tauri.conf.json`: `minWidth`/`minHeight` removed; `bundle.targets` scoped to desktop only (mobile targets implicit in Tauri 2)
- `capabilities/default.json`: added `platforms` list for linux/macOS/windows/android/iOS; `opener:allow-open-url` scope with `content://*` for Android share
- `Sidebar.tsx`: responsive — desktop sidebar `hidden md:flex`, mobile tab bar `fixed md:hidden`
- Export directory on mobile: changed from `app_data_dir()` to `app_cache_dir()` for FileProvider compatibility
- `file_paths.xml`: added `<files-path>` for internal data directory
- Export share: replaced `openPath` (broken on Android due to plugin bug) with custom Rust `share_file` command + `SharePlugin.kt` using `Intent.ACTION_SEND`

## [1.0.4] - 2026-05-24

### Fixed

- CLI release binary now resolves `stickers.csv` correctly in the bundled ESM output
- GitHub Linux release bundle includes the executable, sticker data CSV, and release notes

## [1.0.3] - 2026-05-23

### Changed

- Team filter dropdown options in GUI collection view are now sorted alphabetically by `ID_FIX` (format `<ID_FIX> - <TEAM>`)

### Fixed

- Marking a sticker as duplicated/repeated in GUI no longer clears previously marked duplicated stickers

## [1.0.2] - 2026-05-23

### Added

- Backup save/load support in CLI with `.fwc26` files
- Backup save/load support in GUI with native file dialogs
- Source-based missing export filters (`Panini`, `Extra`, `Coca cola`, `McDonald's`, `Todos`) for PDF/CSV/TXT in CLI and GUI

### Changed

- Backup format now includes app version metadata for compatibility validation
- OpenSpec archive conventions standardized to `archive/YYYY/MM/YYYY-MM-DD-HHMM-<change-name>` in project command/skill docs

## [1.0.0] - 2026-05-15

### Added

- Initial release with full CLI functionality
- 911 stickers across 48 teams, FWC specials, Extra stickers, and Coca-Cola Spain edition
- Track owned and duplicate stickers with quantity counters
- View collection with filters (all, missing, owned, duplicated)
- Search stickers by ID, name, or team
- Export missing stickers to PDF, CSV, and TXT formats
- Statistics with progress bar, group breakdown, and type breakdown
- Persistent storage via Conf library
- Unit tests with Vitest (83 tests passing)
- OpenSpec workflow for change management

### Features

| Feature | Description |
|---------|-------------|
| View collection | Filter by status, 20 items per page |
| Mark owned | Register sticker ownership with quantity |
| Mark duplicate | Register duplicate stickers |
| Statistics | Progress percentage, group/type breakdown |
| Search | Find stickers by ID, name, or team |
| Export | PDF/CSV/TXT with date-stamped filenames |
| Reset | Clear all collection data |

### Tech Stack

- Bun + TypeScript + esbuild
- Clean Architecture + DDD + CQRS
- PDFKit, Inquirer, Chalk, Conf
- Vitest for testing