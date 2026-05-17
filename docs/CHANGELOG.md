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