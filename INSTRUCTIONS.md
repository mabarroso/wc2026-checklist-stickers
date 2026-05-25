# Instructions

## Development

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- [Node.js](https://nodejs.org) >= 18 (for compatibility tooling)

### Setup

```bash
bun install
```

### Run in Development

```bash
bun run dev
```

### Build Binary

```bash
bun run build
```

Output: `dist/panini-stickers` (executable)

### Run Tests

```bash
bun test
```

### Lint & Typecheck

```bash
bun run lint
bun run typecheck
```

## Architecture

The project follows **Clean Architecture** (Robert C. Martin) with **Domain-Driven Design (DDD)**.

### Layers

- **Domain** — Core business entities and rules. No external dependencies.
- **Application** — Use cases. Orchestrates domain logic.
- **Infrastructure** — CLI, storage, exporters.

### Domain Entities

- `Sticker` — Represents a single sticker in the Panini collection (number, name, team, type)
- `CollectionState` — Snapshot of the user's progress (owned stickers, duplicate counts)

### Language Conventions

- **Technical code**: English only (variables, functions, comments, commit messages, logs)
- **User interface**: Spanish only (all CLI output, labels, prompts, messages)

## Data Model

### Sticker (embedded JSON)

| Field     | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `number`  | number | Unique sticker number (1-850)     |
| `name`    | string | Player or sticker name            |
| `team`    | string | National team or sticker group    |
| `type`    | enum   | `player`, `team_badge`, `special` |

### Collection State (JSON file)

| Field     | Type             | Description                               |
| --------- | ---------------- | ----------------------------------------- |
| `owned`   | Map<number, number> | Sticker number → quantity owned (1+) |
| `duplicates` | Map<number, number> | Sticker number → duplicate count    |

Persisted at: `~/.config/panini-stickers/collection.json`

## Export Formats

### PDF

Layout: 2 stickers per row, print-friendly with checkboxes.
Filename: `faltantes_YYYY-MM-DD.pdf`

### CSV

Format: `numero,nombre,equipo`
Filename: `faltantes_YYYY-MM-DD.csv`

### TXT

Format: Human-readable list.
Filename: `faltantes_YYYY-MM-DD.txt`

## CLI Menu Structure

```
1. Ver colección completa
2. Marcar cromo como obtenido
3. Marcar cromo como repetido
4. Estadísticas de progreso
5. Buscar cromo
6. Exportar faltantes
7. Configuración
8. Salir
```

## Naming Conventions

- Files: `kebab-case.ts`
- Functions/variables: `camelCase`
- Types/classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Database keys: `snake_case`
- User-facing strings: Spanish, with Spanish punctuation

## TDD Protocol

Follow **Arrange-Act-Assert (AAA)** pattern.

- `tests/<layer>/<entity>.test.ts`
- Mock all external dependencies
- Target >= 80% coverage for domain layer

## OpenSpec Workflow

This project uses **OpenSpec** for change management:

```bash
openspec list                               # View current changes
openspec new change <name>                  # Start a new change
openspec status --change <name>             # Check artifact progress
openspec instructions <artifact> --change <name>  # Advance to next artifact guidance
openspec validate <change>                  # Verify implementation
openspec archive <change>                   # Archive completed change
```

See `.opencode/skills/` for available commands.

## Release Workflow (Persistent)

For every requested release, use this default workflow:

1. Build release artifacts for all required platforms.
2. Run verification gates:
	- `bun test`
	- `bun run typecheck`
	- `bun run lint`
3. Prepare commit with release changes and include `docs/RELEASE-vX.Y.Z.txt`.
4. Do not version `docs/RELEASE-vX.Y.Z-GITHUB.md` when the request is to keep GitHub draft notes out of git.
5. Before committing, present `git status --short`, `git diff --cached --stat`, and recent commits.
6. Ask explicit confirmation: `¿Confirmas el commit?`.
7. Commit and push to `main` after confirmation.
8. Create and push tag `vX.Y.Z`.
9. Publish GitHub release and upload all artifacts.
10. Validate uploaded assets and checksums.
11. If a new artifact is added later (for example Debian `.deb`), upload it to the existing release and refresh `SHA256SUMS.txt`.