# WC 2026 Stickers Checklist

A CLI and GUI application to track your WC 2026 sticker collection. Manage your owned, duplicated, and missing stickers, then export wish lists in PDF, CSV, and TXT formats.

## Features

- Track owned and duplicate stickers per ID with quantity counters
- View collection progress with completion percentage
- Filter stickers by status: all, owned, missing, duplicated
- Search stickers by number, name, team, or group
- Export missing stickers to PDF (printable checklist), CSV, or TXT
- Multi-platform: Linux, Unix, macOS, Android, iOS

## Quick Start

```bash
bun install
bun run build
./dist/wc26-checklist.js
```

## Platforms

| Mode | Platform | Format | How to Run |
|------|----------|--------|------------|
| CLI | Linux, macOS, Windows | Standalone JS (via Bun) | `./dist/wc26-checklist.js` |
| GUI | Linux (Debian) | `.deb` | Install via `dpkg -i` |
| GUI | Linux (Fedora/RHEL) | `.rpm` | Install via `rpm -i` |
| GUI | Windows | `.exe` (NSIS) | Run installer |
| GUI | macOS | `.dmg` | Mount & drag to Applications |
| GUI | Android | `.apk` | `adb install` or side-load |
| GUI | iOS | `.ipa` | via TestFlight or sideload (macOS only) |
| GUI | Web (dev) | Vite dev server | `bun run gui:web` → `http://localhost:5173` |
| GUI | Web (static) | Static HTML/JS | `cd src/gui && bun run build` → `src/gui/dist/` |

## Build Executables

### CLI Executable

```bash
# Install dependencies
bun install

# Build standalone binary
bun run build

# Output: dist/wc26-checklist.js
chmod +x dist/wc26-checklist.js
./dist/wc26-checklist.js
```

### GUI Executables (Tauri)

Requires Rust installed:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

**Desktop (Linux, Windows, macOS):**

```bash
cd src/gui
bun run tauri build
```

Outputs by platform:

| Platform | Format | Location |
|----------|--------|----------|
| Linux (Debian) | `.deb` | `src/gui/src-tauri/target/release/bundle/deb/` |
| Linux (Fedora) | `.rpm` | `src/gui/src-tauri/target/release/bundle/rpm/` |
| Windows | `.exe` | `src/gui/src-tauri/target/release/bundle/nsis/` |
| macOS | `.dmg` | `src/gui/src-tauri/target/release/bundle/dmg/` |

**Android:**

```bash
cd src/gui
bun run tauri android build
# Output: src/gui/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk
```

Install on device:
```bash
adb install src/gui/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk
```

**iOS (requires macOS/Xcode):**

```bash
cd src/gui
npx tauri ios init        # One-time setup
bun run tauri ios build   # Build IPA
```

**Web (no install, dev):**

```bash
cd src/gui
bun run dev               # Development server at http://localhost:5173
```

**Web (static build):**

```bash
cd src/gui
bun run build             # Static build in src/gui/dist/
```

## CLI Menu Options

### Main Menu

```
1. View collection
2. Mark sticker as owned
3. Mark sticker as duplicate
4. Statistics
5. Search sticker
6. Export missing
7. Reset collection
8. Exit
```

### View Collection

Filter and browse stickers by status:
- All stickers
- Missing stickers
- Owned stickers
- Duplicated stickers

20 stickers per page with pagination.

### Mark as Owned / Duplicate

Enter sticker ID (e.g., `MEX-01`, `FWC-05`, `CC-03`) and quantity.

### Statistics

- Total / owned / missing / duplicated counts
- Completion percentage with progress bar
- Breakdown by group (A-L)
- Breakdown by type (player, team_badge, fwc_special, special, coca_cola)
- Top duplicated stickers

### Search

Search stickers by:
- Sticker ID
- Player/team name
- Team code

### Export

Export missing stickers to:
- **PDF**: Printable checklist with checkboxes (2 columns)
- **CSV**: Spreadsheet format (number, name, team)
- **TXT**: Human-readable list grouped by team

Auto-named with date stamp: `faltantes_YYYY-MM-DD.*`

## Sticker Data

| Type | Count | ID Pattern |
|------|-------|-----------|
| Logo Panini | 1 | `LOGO-00` |
| FWC Pre-teams | 8 | `FWC-01` to `FWC-08` |
| 48 Teams × 20 | 960 | `{TEAM}-{NN}` |
| FWC History | 11 | `FWC-09` to `FWC-19` |
| Extra Stickers | 80 | `EXTRA-{name}-{variant}` |
| Coca-Cola Spain | 12 | `CC-01` to `CC-12` |
| **Total** | **911** | |

## Tech Stack

- **Bun** — runtime and build tool
- **TypeScript** — type-safe codebase
- **esbuild** — standalone binary compilation
- **Tauri** — desktop + mobile GUI (Rust backend)
- **printpdf** — PDF generation (GUI)
- **PDFKit** — PDF generation (CLI)
- **Inquirer** — interactive CLI menus
- **Chalk** — terminal colors
- **Conf** — JSON persistence (`~/.config/wc26-checklist/`)
- **Vitest** — unit testing

## Architecture

Clean Architecture + DDD:

```
src/
├── domain/           # Entities, value objects, repository interfaces
├── application/     # Commands and queries (CQRS)
├── infrastructure/  # CLI menus, exporters, storage adapter
└── data/            # Sticker data (CSV)
tests/
└── domain/          # Unit tests
```

## Commands

```bash
bun run dev           # Run CLI in development mode
bun run build         # Build standalone binary
bun test              # Run tests
bun run typecheck     # TypeScript check
bun run gui:web       # Run GUI web in development (Vite)
bun run gui:desktop   # Run GUI desktop in development (Tauri)
bun run tauri         # Run Tauri CLI
bun run tauri:android # Build Android APK
bun run tauri:ios     # Build iOS IPA (macOS only)
```

## Data Storage

Collection state is persisted to:
```
~/.config/wc26-checklist/collection.json
```

Structure:
```json
{
  "owned": { "MEX-01": 1, "MEX-02": 2 },
  "duplicates": { "MEX-03": 1 }
}
```

## Project Structure

```
.
├── src/
│   ├── domain/           # Core entities and value objects
│   ├── application/     # Use cases (CQRS)
│   ├── infrastructure/  # CLI, exporters, storage
│   └── data/            # Sticker CSV data
├── tests/               # Unit tests (Vitest)
├── dist/                # Built binary
├── docs/                # Documentation
└── openspec/            # OpenSpec changes
```

## Disclaimer

This application is an independent, unofficial project.

It is not affiliated with, associated with, authorized by, or endorsed by Panini S.p.A., FIFA (Fédération Internationale de Football Association), or any organization related to the FIFA World Cup.

This application does not use or distribute:
- Official logos
- Registered trademarks
- Protected designs
- Official album or sticker content

Any references to names, events, or trademarks are for descriptive purposes only and belong to their respective owners.

This application is intended solely for personal collection management.

## Contributing

All CLI text is in Spanish. Code, commits, and technical docs are in English. See `docs/STYLE-GUIDE.md` for coding conventions.