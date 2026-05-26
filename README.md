# Panini FIFA World Cup 2026 Stickers Checklist

[📖 English docs](docs/index.md) · [📖 Documentación en español](docs/index-es.md)

CLI + GUI application to track your Panini FIFA World Cup 2026 sticker collection. Manage your owned, duplicated, and missing stickers, then export wish lists in PDF, CSV, and TXT formats. Runs on desktop (Linux, Windows, macOS) and mobile (Android, iOS).

## Features

- Track owned and duplicate stickers per number
- View collection progress (completion percentage)
- Filter stickers by status: owned, missing, duplicated
- Search stickers by number, name, team, or group
- Export missing stickers to PDF, CSV, or TXT
- Multi-platform: Linux, Windows, macOS, Android, iOS

## Platforms

| Mode | Platform | Format | How to Run |
|------|----------|--------|------------|
| CLI | Linux, macOS, Windows | Standalone JS (via Bun) | `./dist/panini-stickers.js` |
| GUI | Linux (Debian) | `.deb` | Install via `dpkg -i` |
| GUI | Linux (Fedora/RHEL) | `.rpm` | Install via `rpm -i` |
| GUI | Windows | `.exe` (NSIS) | Run installer |
| GUI | macOS | `.dmg` | Mount & drag to Applications |
| GUI | Android | `.apk` | `adb install` |
| GUI | iOS | `.ipa` | via TestFlight (macOS only) |
| GUI | Web (dev) | Vite dev server | `bun run gui:web` |
| GUI | Web (static) | Static HTML/JS | `bun run build` in `src/gui/` |

## Quick Start

```bash
bun install
bun run build
./dist/panini-stickers.js
```

## Build

### CLI

```bash
bun run build
# Output: dist/panini-stickers.js
```

### GUI Desktop (requires Rust)

```bash
cd src/gui && bun run tauri build
```

### GUI Android

```bash
cd src/gui && bun run tauri android build
adb install src/gui/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk
```

### GUI iOS (macOS only)

```bash
cd src/gui
npx tauri ios init
bun run tauri ios build
```

### GUI Web (development)

```bash
cd src/gui && bun run dev
```

## Commands

```bash
bun run dev           # Run CLI in development mode
bun run build         # Build CLI binary
bun test              # Run tests
bun run typecheck     # TypeScript check
bun run lint          # Run linter
bun run gui:web       # Run GUI web in development (Vite)
bun run gui:desktop   # Run GUI desktop in development (Tauri)
bun run tauri         # Run Tauri CLI
bun run tauri:android # Build Android APK
bun run tauri:ios     # Build iOS IPA (macOS only)
```

## Tech Stack

- **Bun** — runtime & build tool
- **TypeScript** — type-safe codebase
- **esbuild** — CLI standalone binary compilation
- **Tauri 2** — desktop + mobile GUI (Rust backend)
- **React 19** — GUI frontend
- **printpdf** — PDF generation (GUI)
- **PDFKit** — PDF generation (CLI)
- **Inquirer** — interactive CLI menus
- **Chalk** — terminal colors
- **Conf** — JSON persistence (`~/.config/panini-stickers/`)
- **Vitest** — unit testing

## Project Structure

```
src/
  domain/           # Core entities, value objects, repository interfaces
  application/      # Use cases (CQRS)
  infrastructure/   # Storage, exporters, CLI menus
  data/             # Sticker data (embedded JSON)
  gui/              # Tauri 2 + React GUI
tests/              # Unit and integration tests
```

## Architecture

Clean Architecture + DDD. See `docs/STYLE-GUIDE.md` for coding conventions and [`docs/index.md`](docs/index.md) for full documentation ([español](docs/index-es.md)).

## Disclaimer

Esta aplicación no está afiliada, asociada ni respaldada por Panini S.p.A. ni por la FIFA. Todas las marcas mencionadas pertenecen a sus respectivos propietarios.