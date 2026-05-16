## Context

The current CLI application is fully functional but uses text-based Inquirer menus. This design document outlines the migration to a modern desktop GUI while maintaining the existing backend architecture.

### Current State
- CLI application with Inquirer menus
- Terminal-only interaction
- Functional but lacks visual appeal

### Target State
- Fullscreen desktop dashboard with gaming aesthetics
- Keyboard + mouse optimized
- Animated transitions and premium card designs

## Goals / Non-Goals

**Goals:**
- Create a premium FIFA World Cup collectible experience
- Implement 6 core screens with consistent design system
- Enable keyboard navigation and mouse interactions
- Maintain existing data persistence layer
- Generate native desktop executable

**Non-Goals:**
- Mobile-first design (desktop only)
- Complete redesign of backend (CLI remains)
- Real-time multiplayer/trading features
- Web deployment (desktop native only)

## Decisions

### 1. React + TailwindCSS over Vanilla JS

| Option | Decision | Rationale |
|--------|----------|-----------|
| React + TailwindCSS | ✅ Selected | Component reuse, hot reload, ecosystem |
| Vanilla JS + CSS | ❌ Rejected | Scaling difficulty, no state management |
| Vue.js | ❌ Rejected | Smaller ecosystem for Tauri integration |

### 2. Tauri over Electron

| Option | Decision | Rationale |
|--------|----------|-----------|
| Tauri | ✅ Selected | Smaller binary size, Rust backend, Bun compatibility |
| Electron | ❌ Rejected | Large bundle size, security concerns |

### 3. Framer Motion for Animations

| Option | Decision | Rationale |
|--------|----------|-----------|
| Framer Motion | ✅ Selected | Declarative, React-native, gaming transitions |
| CSS animations | ❌ Rejected | Less control, harder orchestration |
| GSAP | ❌ Rejected | Overkill for this scope |

### 4. File Structure

```
src/gui/
├── components/       # Reusable UI components (Button, Panel, Card)
├── screens/          # Page-level components (MainMenu, ViewCollection, etc.)
├── hooks/            # Custom React hooks (useCollection, useStickers)
├── stores/           # State management (Zustand)
├── styles/           # TailwindCSS config, global styles
├── assets/           # Images, fonts, icons
└── lib/              # Utilities and helpers

src-tauri/
├── src/              # Rust backend code
├── Cargo.toml        # Rust dependencies
└── tauri.conf.json   # Tauri configuration
```

### 5. Color Tokens

```css
:root {
  --bg: #0B0B0D;
  --surface: #151515;
  --surface-2: #1D1D1F;
  --cyan: #79D8DB;
  --cyan-dark: #55C8D0;
  --yellow: #FFD400;
  --fifa-yellow: #F3D116;
  --red: #E21B3C;
  --orange: #FF6A00;
  --green: #22B455;
  --blue: #2458FF;
  --white: #F5F5F5;
}
```

### 6. Typography Stack

| Usage | Font | Weight |
|-------|------|--------|
| Headlines | Bebas Neue | Bold |
| UI Text | Inter | Regular/Medium |
| Numbers | Montserrat | ExtraBold |
| Fallback | system-ui | - |

### 7. Screen Layouts

#### Main Menu
```
┌─────────────────────────────────────────────────────────┐
│ [Sidebar]           │  [Hero Area]                       │
│ • PANINI WC 2026    │                                    │
│ • View Collection   │    ┌─────────────────────────┐    │
│ • Mark Owned        │    │   Animated Card Stack   │    │
│ • Mark Duplicate    │    └─────────────────────────┘    │
│ • Statistics        │                                    │
│ • Search            │    ┌─────────────────────────┐    │
│ • Export            │    │   Progress Widget       │    │
│                     │    │   [Ring: XX%]           │    │
└─────────────────────────────────────────────────────────┘
```

#### View Collection
```
┌─────────────────────────────────────────────────────────┐
│ [Toolbar: All | Missing | Owned | Duplicates] [Search]│
├─────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │ Card    │ │ Card    │ │ Card    │ │ Card    │       │
│ │ MEX-01  │ │ MEX-02  │ │ MEX-03  │ │ MEX-04  │       │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │ Card    │ │ Card    │ │ Card    │ │ Card    │       │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
└─────────────────────────────────────────────────────────┘
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Tauri complexity for CLI devs | Keep CLI as separate binary |
| Bundle size increase | Tauri is smaller than Electron |
| Animation performance | Use Framer Motion's GPU acceleration |
| State sync between CLI and GUI | Use shared storage file via Tauri IPC |

## Migration Path

1. **Phase 1**: Set up React + TailwindCSS + Tauri scaffold
2. **Phase 2**: Implement Main Menu screen with navigation
3. **Phase 3**: Implement View Collection with card grid
4. **Phase 4**: Implement remaining screens (Search, Stats, Export, Mark Owned)
5. **Phase 5**: Polish animations and desktop integration
6. **Phase 6**: Build and distribute native executables