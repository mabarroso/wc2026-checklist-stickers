# Panini FIFA World Cup 2026 Stickers Checklist

A CLI application to track your Panini FIFA World Cup 2026 sticker collection. Manage your owned, duplicated, and missing stickers, then export wish lists in PDF, CSV, and TXT formats.

## Features

- Track owned and duplicate stickers per number
- View collection progress (completion percentage)
- Filter stickers by status: owned, missing, duplicated
- Search stickers by number or name
- Export missing stickers to PDF, CSV, or TXT
- Multi-platform: Linux, Unix, macOS

## Tech Stack

- **Bun** — fast JavaScript runtime & bundler
- **TypeScript** — type-safe codebase
- **Rollup** — single-file binary compilation
- **PDFKit** — PDF generation
- **Inquirer** — interactive CLI menus
- **Chalk** — terminal colors
- **Conf** — cross-platform JSON persistence
- **Vitest** — unit testing

## Quick Start

```bash
bun install
bun run build
./dist/panini-stickers --help
```

## Project Structure

```
src/
  domain/           # Core entities, value objects, repository interfaces
  application/      # Use cases (CQRS)
  infrastructure/   # Storage, exporters, CLI
tests/              # Unit and integration tests
```

## Commands

```bash
bun run dev         # Run in development mode
bun run build       # Build binary
bun test            # Run tests
```

## Architecture

Clean Architecture + DDD. See `INSTRUCTIONS.md` for details.