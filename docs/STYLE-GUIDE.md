# WC 2026 CHECKLIST
## Design System & Style Guide
### OpenSpec Development Reference

---

# 1. Project Vision

The application should feel like:

> “A premium digital Panini-style football collection experience.”

The UI must combine:
- modern sports aesthetics
- collectible card systems
- FIFA-inspired layouts
- gamified interactions
- fast mobile-first UX

Core inspiration:
- Panini World Cup albums
- FIFA Ultimate Team
- Adrenalyn XL
- modern sports apps
- gaming interfaces

---

# 2. Brand Personality

## Keywords

- Collectible
- Energetic
- Premium
- Modern
- Competitive
- Digital-first
- Football-centric
- Interactive
- Youth-oriented

---

# 3. Visual Direction

## Overall Feel

The interface should feel:
- dark
- vibrant
- layered
- dynamic
- modular
- visually dense

Use:
- gradients
- glow effects
- large typography
- card overlays
- holographic accents
- subtle motion

---

# 4. Color Palette

## Base Colors

| Token | Hex |
|---|---|
| background | #0B0B0D |
| surface | #151515 |
| surfaceSecondary | #1A1A1A |
| white | #F5F5F5 |

---

## Accent Colors

| Token | Hex |
|---|---|
| cyan | #79D8DB |
| cyanDark | #55C8D0 |
| yellow | #FFD400 |
| fifaYellow | #F3D116 |
| red | #E21B3C |
| orange | #FF6A00 |
| green | #22B455 |
| blue | #2458FF |

---

# 5. Typography

## Primary Fonts

Recommended stack:

- Inter
- Montserrat
- Bebas Neue (headlines only)

---

## Typography Rules

### Headlines
- Uppercase preferred
- Bold / ExtraBold
- Tight spacing
- Compact layout

### Body Text
- Medium weight
- Compact spacing
- High readability

### Numbers
- Oversized
- Heavy weight
- Used as visual elements

---

# 6. Layout System

## Grid System

Use CSS Grid heavily.

Recommended breakpoints:

| Device | Columns |
|---|---|
| Mobile | 2 |
| Tablet | 3–4 |
| Desktop | 5–8 |

Spacing should remain compact and dense.

---

# 7. Card System

## Core Philosophy

Cards are the main interaction unit.

Every screen should prioritize:
- collection progress
- player cards
- sticker visuals
- rarity indicators

---

## Card Structure

1. Gradient background
2. Large background number
3. Player cutout image
4. Player name
5. Metadata section
6. Team/nationality
7. Rarity state
8. Collection status

---

## Card Styling

### Rules
- Rounded corners
- Gradient overlays
- Shadow depth
- Hover glow
- Slight elevation
- Dynamic background patterns

---

# 8. Rarity System

## Rarity Levels

| Rarity | Color |
|---|---|
| Common | Gray |
| Rare | Blue |
| Epic | Purple |
| Legendary | Gold |
| Holo | Rainbow/Holographic |

---

# 9. Motion & Animation

## Animation Style

Animations should feel:
- fast
- smooth
- gaming-inspired
- rewarding

---

## Interaction Timing

Recommended:
- 180ms–250ms
- ease-out curves

---

## Hover Effects

### Cards
- scale(1.03)
- soft glow
- shadow elevation

### Buttons
- brightness increase
- slight lift

---

## Pack Opening Animations

Use:
- blur transitions
- particles
- holographic flashes
- flip animations
- glow pulses

---

# 10. Buttons

## Primary Button

### Style
- Yellow background
- Black text
- Rounded XL corners
- Strong hover state

---

## Secondary Button

### Style
- Dark background
- Cyan border
- Subtle glow

---

# 11. Inputs & Forms

## Inputs

### Rules
- Dark background
- Rounded corners
- Cyan focus ring
- White text

---

## Search Bars

Should feel:
- compact
- fast
- minimal
- esports-inspired

---

# 12. Navigation

## Navbar

### Rules
- Sticky
- Glassmorphism blur
- Compact height
- Large icons

---

## Sidebar

### Recommended Sections
- Teams
- Players
- Collection
- Missing
- Duplicates
- Statistics
- Marketplace

---

# 13. Photography & Assets

## Image Style

Player images should:
- use transparent PNG cutouts
- have strong contrast
- include soft shadows
- integrate into gradients

---

## Background Assets

Use:
- geometric shapes
- diagonal patterns
- football textures
- subtle overlays

---

# 14. Iconography

## Recommended Libraries

- Lucide
- Heroicons

---

## Style

Icons should be:
- rounded
- bold
- simple
- modern

---

# 15. Responsive Philosophy

## Priority

The application must be:
- mobile-first
- touch-friendly
- optimized for quick interactions

The UI should feel like:
> “A football collection game.”

---

# 16. Tailwind Design Tokens

```js
export const theme = {
  colors: {
    background: '#0B0B0D',
    surface: '#151515',
    surfaceSecondary: '#1A1A1A',
    cyan: '#79D8DB',
    cyanDark: '#55C8D0',
    yellow: '#FFD400',
    fifaYellow: '#F3D116',
    red: '#E21B3C',
    orange: '#FF6A00',
    green: '#22B455',
    blue: '#2458FF',
    white: '#F5F5F5'
  }
}
```

---

# 17. Recommended Tech Stack

## Frontend
- React
- TailwindCSS
- Framer Motion

## Runtime
- Bun

## Optional Desktop Wrapper
- Tauri

---

# 18. UX Principles

## The Application Must Encourage

- collecting
- completion
- progression
- discovery
- reward loops

---

## The User Should Feel

- motivated to complete the album
- rewarded when unlocking content
- visually satisfied
- immersed in a football ecosystem

---

# 19. OpenSpec Implementation Notes

## Priorities

### High Priority
- reusable card components
- collection tracking
- rarity system
- responsive layouts
- smooth transitions

### Medium Priority
- pack opening system
- animations
- marketplace concepts
- social sharing

### Low Priority
- advanced customization
- desktop-specific features

---

# 20. Final Identity

## Design Name

“Digital Panini 2026”

## Core Concept

A premium digital football sticker album with modern gaming-inspired UI and FIFA World Cup aesthetics.
