# Panini FIFA World Cup 2026 Stickers Checklist

A CLI application to track your Panini FIFA World Cup 2026 sticker collection. Manage your owned, duplicated, and missing stickers, then export wish lists in PDF, CSV, and TXT formats.

## Features

- Track owned and duplicate stickers per ID with quantity counters
- View collection progress with completion percentage
- Filter stickers by status: all, owned, missing, duplicated
- Search stickers by number, name, team, or group
- Export missing stickers to PDF (printable checklist), CSV, or TXT
- Multi-platform: Linux, Unix, macOS

## Quick Start

```bash
bun install
bun run build
./dist/panini-stickers.js
```

## Build Executables

### CLI Executable

```bash
# Install dependencies
bun install

# Build standalone binary
bun run build

# Output: dist/panini-stickers.js
chmod +x dist/panini-stickers.js
./dist/panini-stickers.js
```

### GUI Executables (Tauri)

Requires Rust installed:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

**Build GUI:**

```bash
cd src/gui
bun run tauri build
```

**Outputs:**

| Platform | File | Location |
|----------|------|----------|
| Linux (Debian) | `.deb` | `src/gui/src-tauri/target/release/bundle/deb/` |
| Linux (Fedora) | `.rpm` | `src/gui/src-tauri/target/release/bundle/rpm/` |
| Windows | `.exe` | `src/gui/src-tauri/target/release/bundle/nsis/` |
| macOS | `.dmg` | `src/gui/src-tauri/target/release/bundle/dmg/` |

**Install:**

```bash
# Linux Debian/Ubuntu
sudo dpkg -i "Panini WC 2026_1.0.0_amd64.deb"

# Linux Fedora/RHEL
sudo rpm -i "Panini WC 2026-1.0.0-1.x86_64.rpm"

# Windows
# Run the NSIS installer .exe

# macOS
# Mount the .dmg and drag to Applications
```

**Web GUI (no install):**

```bash
cd src/gui
bun run dev     # Development server at http://localhost:5173
bun run build   # Static build in src/gui/dist/
```

### Configurar Targets Adicionales

Editar `src/gui/src-tauri/tauri.conf.json`:

```json
"bundle": {
  "targets": ["deb", "rpm", "nsis", "dmg"]
}
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
- **PDFKit** — PDF generation
- **Inquirer** — interactive CLI menus
- **Chalk** — terminal colors
- **Conf** — JSON persistence (`~/.config/panini-stickers/`)
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
bun run dev       # Development mode
bun run build     # Build standalone binary
bun test          # Run tests
bun run typecheck # TypeScript check
```

## Data Storage

Collection state is persisted to:
```
~/.config/panini-stickers/collection.json
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

## Contributing

All CLI text is in Spanish. Code, commits, and technical docs are in English. See `docs/STYLE-GUIDE.md` for coding conventions.