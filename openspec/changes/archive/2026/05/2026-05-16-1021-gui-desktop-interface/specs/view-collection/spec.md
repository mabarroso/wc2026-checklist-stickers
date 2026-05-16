## view-collection

### Screen Description

Core experience of the app. A premium digital football sticker album browser with card grid layout.

### Layout

```html
<div class="collection-screen">
  <header class="topbar"></header>
  <section class="collection-toolbar">
    <div class="filter-buttons">All | Missing | Owned | Duplicates</div>
    <input class="search-input" placeholder="Search..." />
  </section>
  <section class="card-grid">
    <article class="sticker-card owned"></article>
    <article class="sticker-card missing"></article>
    <article class="sticker-card duplicate"></article>
  </section>
</div>
```

### Sticker Card Structure

1. Gradient background (145deg, #1d1d1f → #0f0f10)
2. Holographic overlay
3. Giant background number
4. Player render placeholder
5. National flag stripe
6. Sticker metadata (name, team)
7. Quantity badge
8. Rarity glow border

### Card States

| State | Visual |
|-------|--------|
| Missing | Grayscale, reduced glow |
| Owned | Full vibrant colors, cyan outline |
| Duplicate | Orange/gold glow, animated badge |

### Requirements

- [ ] Toolbar with filter buttons (All/Missing/Owned/Duplicates)
- [ ] Search input with instant filtering
- [ ] Responsive card grid (4-8 columns based on width)
- [ ] Sticker cards with all visual layers
- [ ] Hover animation: translateY(-6px) scale(1.03)
- [ ] Click to toggle owned/duplicate status
- [ ] Quantity badge displays owned count
- [ ] Loading skeleton during data fetch
- [ ] Pagination or infinite scroll
- [ ] Keyboard navigation in grid (arrow keys)

### Styling

```css
.sticker-card {
  border-radius: 24px;
  background: linear-gradient(145deg, #1d1d1f, #0f0f10);
  transition: 220ms ease-out;
  box-shadow: 0 10px 40px rgba(0,0,0,.45);
}

.sticker-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 20px 60px rgba(121,216,219,.25);
}

.sticker-card.owned {
  border: 2px solid var(--cyan);
}

.sticker-card.duplicate {
  border: 2px solid var(--orange);
  box-shadow: 0 0 20px rgba(255,106,0,.4);
}
```

### Acceptance Criteria

1. Cards display in responsive grid
2. Filters correctly show subset of stickers
3. Click toggles sticker status
4. Quantity increment/decrement works
5. Search filters cards in real-time
6. Hover animations are smooth (220ms)
7. Keyboard can navigate and select cards