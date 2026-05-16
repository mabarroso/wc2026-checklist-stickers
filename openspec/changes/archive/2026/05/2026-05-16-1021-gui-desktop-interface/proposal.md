## Why

The current CLI application provides all functionality but lacks a modern, premium visual experience. A desktop GUI will transform the collection tracking into a "next-generation premium FIFA World Cup digital sticker collection platform" with gaming-inspired UI, animated cards, and keyboard/mouse optimization.

## What Changes

- **New frontend**: React + TailwindCSS desktop application with Tauri wrapper
- **6 screens**: Main Menu, View Collection, Search, Statistics, Export, Mark Owned
- **Gaming-inspired UI**: Dark theme, holographic accents, vibrant gradients
- **Keyboard + mouse optimized**: Rapid navigation, hotkeys, efficient workflows
- **Animations**: Framer Motion transitions, hover effects, card reveals
- **Desktop-first responsive**: 1920x1080 primary, supports 2560x1440, 1600x900, 1366x768

## Capabilities

### New Capabilities

- `main-menu`: Premium dashboard with translucent sidebar, hero area with animated cards, and live progress widget
- `view-collection`: Card grid with sticker cards showing gradient backgrounds, holographic overlays, rarity glows, and quantity badges
- `search`: Steam/FUT-inspired search with instant results grid and giant preview card
- `statistics`: Sports analytics dashboard with completion ring, group bars, and duplicate podium
- `export`: Professional export center with PDF/CSV/TXT format selection cards
- `mark-owned`: Quick keyboard-first workflow with autocomplete and animated acquisition feedback

### Modified Capabilities

- `persistence`: Existing storage adapter remains (conf), frontend connects via Tauri IPC
- `collection-tracking`: CLI commands replaced by React UI components
- `progress-statistics`: Enhanced with animated widgets and visual charts

## Impact

- **New frontend**: `src/gui/` — React components, TailwindCSS styles, Framer Motion animations
- **New desktop wrapper**: `src-tauri/` — Tauri configuration and native integration
- **Dependencies**: react, react-dom, tailwindcss, framer-motion, @tauri-apps/api
- **Build output**: Desktop application (.exe, .app) via Tauri bundler
- **Legacy CLI**: Remains functional at `dist/panini-stickers` for terminal users