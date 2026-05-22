# AGENTS.md

## Context

This is a **Bun + TypeScript CLI application** for tracking a Panini FIFA World Cup 2026 sticker collection. The app is built with **Clean Architecture + DDD**.

## Tech Stack

- **Bun** — runtime and build tool
- **TypeScript** — language
- **esbuild** — bundler (produces standalone binary)
- **PDFKit** — PDF generation
- **Inquirer** — interactive CLI menus
- **Chalk** — terminal colors
- **Conf** — JSON persistence (`~/.config/panini-stickers/`)
- **Vitest** — testing

## Documentation

| File | Purpose |
| ---- | ------- |
| `docs/README.md` | Project documentation (English) |
| `docs/README-es.md` | Project documentation (Spanish) |
| `docs/STYLE-GUIDE.md` | Code style guide (also read as project spec) |
| `docs/CHANGELOG.md` | Change history |
| `docs/MOCKUPS/*.md` | CLI screen mockups |

## Language Rules

- **Code, commits, technical docs**: English only
- **User interface (CLI output)**: Spanish only (labels, prompts, messages, error messages)

## Architecture

- **Domain** (`src/domain/`) — Entities (`Sticker`, `CollectionState`), value objects, repository interfaces. Zero external dependencies.
- **Application** (`src/application/`) — Use cases (CQRS pattern).
- **Infrastructure** (`src/infrastructure/`) — CLI menus, storage adapter, PDF/CSV/TXT exporters.

## Key Files

| File | Purpose |
| ---- | ------- |
| `src/domain/entities/Sticker.ts` | Sticker entity |
| `src/domain/entities/CollectionState.ts` | Collection progress |
| `src/infrastructure/storage/StorageAdapter.ts` | JSON persistence via Conf |
| `src/infrastructure/exporters/` | PDF, CSV, TXT exporters |
| `src/infrastructure/cli/` | Interactive CLI menus |
| `src/data/stickers.ts` | Embedded JSON with all sticker data |

## TDD Requirements

- Write failing tests **before** implementation (Arrange-Act-Assert)
- Tests go in `tests/<layer>/<entity>.test.ts`
- Mock all external dependencies (storage, exporters)
- Target >= 80% coverage for domain layer

## Data Model

### Sticker (embedded)

```typescript
{ number: number; name: string; team: string; type: 'player' | 'team_badge' | 'special' }
```

### Collection State (persisted)

```typescript
{ owned: Record<number, number>; duplicates: Record<number, number> }
```

Store path: `~/.config/panini-stickers/collection.json`

## Naming Conventions

| Type | Convention | Example |
| ---- | ---------- | ------- |
| Files | kebab-case | `storage-adapter.ts` |
| Functions/variables | camelCase | `getMissingStickers` |
| Types/classes | PascalCase | `CollectionState` |
| Constants | SCREAMING_SNAKE | `MAX_STICKERS` |
| Database keys | snake_case | `owned_count` |

## Build & Run Commands

```bash
bun run dev       # Development
bun run build     # Compile binary → dist/panini-stickers
bun test          # Run tests
bun run lint      # Lint
bun run typecheck # TypeScript check
```

## OpenSpec Workflow

Use `openspec` commands for all changes:

```bash
openspec list                               # View active changes
openspec new change <name>                  # Create change
openspec status --change <name>             # Check artifact progress
openspec instructions <artifact> --change <name>  # Show next artifact guidance
openspec validate <change>                  # Verify implementation
openspec archive <change>                   # Archive completed change
```

Never commit directly to main. Always work through an OpenSpec change.

## CI/CD / Verification

After every implementation:
1. Run `bun test`
2. Run `bun run typecheck`
3. Run `bun run lint`
4. Fix all failures before moving on

## Accessibility (CLI)

- All prompts use clear Spanish labels
- Error messages are descriptive in Spanish
- Progress indicators show percentage and counts