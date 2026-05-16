## main-menu

### Screen Description

Premium fullscreen dashboard with:
- Left holographic navigation sidebar (translucent dark glass)
- Hero area with animated football cards
- Live progress widget with radial completion ring

### Layout

```html
<div class="main-menu-layout">
  <aside class="menu-sidebar">
    <div class="logo">PANINI WC 2026</div>
    <nav>
      <button class="menu-item active">View Collection</button>
      <button class="menu-item">Mark Owned</button>
      <button class="menu-item">Mark Duplicate</button>
      <button class="menu-item">Statistics</button>
      <button class="menu-item">Search</button>
      <button class="menu-item">Export</button>
    </nav>
  </aside>
  <main class="hero-area">
    <div class="hero-card"></div>
    <div class="progress-panel"></div>
  </main>
</div>
```

### Requirements

- [ ] Sidebar with 6 navigation items
- [ ] Active item shows cyan glow
- [ ] Hover animation on menu items
- [ ] Large iconography (Lucide/Heroicons)
- [ ] Hero area with animated sticker cards
- [ ] Progress widget showing: owned %, total, duplicates, missing
- [ ] Radial completion ring animation
- [ ] Dark gradient background with football textures
- [ ] Keyboard navigation (arrow keys + enter)
- [ ] Click to navigate

### Styling

```css
.menu-sidebar {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255,255,255,.08);
}

.menu-item.active {
  background: rgba(121,216,219,.15);
  border-left: 3px solid var(--cyan);
  box-shadow: 0 0 20px rgba(121,216,219,.3);
}
```

### Acceptance Criteria

1. Sidebar is always visible on left
2. Clicking menu item navigates to screen
3. Active screen is highlighted with cyan
4. Progress widget updates in real-time
5. Keyboard shortcuts work (1-6 for navigation)