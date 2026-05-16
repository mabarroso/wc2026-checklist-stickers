## mark-owned

### Screen Description

Quick keyboard-first workflow optimized for rapid sticker entry, like collectors opening packs.

### Layout

```html
<div class="mark-owned-layout">
  <section class="input-panel">
    <input class="sticker-id-input" placeholder="Enter sticker ID (e.g., MEX-01)" />
    <div class="quantity-selector">
      <button class="qty-btn">-</button>
      <span class="qty-value">1</span>
      <button class="qty-btn">+</button>
    </div>
    <button class="btn-primary">Mark as Owned</button>
  </section>
  <section class="recently-added">
    <h3>Recently Added</h3>
    <div class="recent-list"></div>
  </section>
</div>
```

### Input Panel

- Giant input field with autocomplete
- Sticker ID validation
- Quantity selector with +/- buttons
- Primary action button (yellow gradient)

### Recently Added

- List of last 10 added stickers
- Animated card additions
- Timestamp for each entry
- Undo button per entry

### Requirements

- [ ] Auto-focused input on screen load
- [ ] Autocomplete dropdown for sticker IDs
- [ ] Real-time validation feedback
- [ ] Quantity selector with keyboard support (+/-)
- [ ] Submit on Enter key
- [ ] Recently added list with animations
- [ ] Success animation (card reveal effect)
- [ ] Undo functionality per entry
- [ ] Keyboard shortcuts: Tab, Enter, +/-

### Autocomplete

```javascript
// On input change
suggestions = stickers.filter(s =>
  s.id.toLowerCase().includes(query.toLowerCase()) ||
  s.name.toLowerCase().includes(query.toLowerCase())
).slice(0, 8)
```

### Animation

```css
.recent-item {
  animation: slideIn 300ms ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Acceptance Criteria

1. Input is auto-focused
2. Autocomplete shows matching stickers
3. Selecting from autocomplete fills input
4. Quantity can be adjusted
5. Enter submits and clears form
6. Recently added list updates with animation
7. Undo removes from collection
8. Success feedback animation plays