# Panini WC 2026 - GUI

Desktop application for managing your Panini FIFA World Cup 2026 sticker album collection.

## Features

- 🎨 Dark gaming-inspired UI with smooth animations
- ⌨️ Keyboard navigation (1-6 to switch screens)
- 📋 View collection with filters: All, Missing, Owned, Duplicates
- 🔍 Search stickers by ID, name or team
- 📊 Statistics with group progress
- 📤 Export missing list (PDF/CSV/TXT)
- 💾 Local persistence (localStorage)

## Tech Stack

- React 19 + TypeScript
- Vite
- TailwindCSS v4
- Framer Motion
- Zustand (state management)
- React Router

## Development

```bash
# Install dependencies
cd src/gui
bun install

# Development server
bun run dev

# Production build
bun run build
```

## Screenshots

The web browser acts as the application. Open http://localhost:5173 and use:

- **1** - View Collection
- **2** - Mark Owned
- **3** - Mark Duplicates
- **4** - Statistics
- **5** - Search
- **6** - Export

## Desktop Build (requires Rust)

To create native executables, you need to install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then configure Tauri for production builds.

## Structure

```
src/
├── components/    # Reusable UI components
├── screens/       # Application screens
├── stores/        # Global state (Zustand)
├── hooks/         # Custom hooks
└── data/          # Sticker data (911 stickers)
```

## Collection

- 48 teams × 20 stickers each = 960 stickers
- 48 team badges
- 48 World Cup special stickers
- 48 extra star stickers
- 32 Coca-Cola badges
- **Total: 911 stickers**

### ID Format

- Teams: `{TEAM}-{NN}` (e.g: MEX-01, ARG-15)
- Badges: `SHIELD-{TEAM}` (e.g: SHIELD-MEX)
- Special: `SPECIAL-{NN}` (e.g: SPECIAL-01)
- Extras: `EXTRA-{name}` (e.g: EXTRA-messi-golden)
- Coca-Cola: `CC-{NN}` (e.g: CC-01)