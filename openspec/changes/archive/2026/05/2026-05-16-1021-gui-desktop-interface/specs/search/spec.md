## search

### Screen Description

Fast desktop-oriented searching inspired by Steam/FIFA Ultimate Team transfer market.

### Layout

```html
<div class="search-layout">
  <div class="search-header">
    <input class="search-input" autofocus />
    <div class="filter-chips">By Team | By Group | By Type</div>
  </div>
  <div class="search-results-grid"></div>
  <aside class="search-preview">
    <div class="preview-card"></div>
    <div class="player-stats"></div>
    <div class="ownership-status"></div>
  </aside>
</div>
```

### Requirements

- [ ] Auto-focused search input on screen load
- [ ] Instant results as user types (debounced 150ms)
- [ ] Results grid showing matching stickers
- [ ] Giant preview card on right panel
- [ ] Preview shows: player name, team, rarity, stats
- [ ] Filter chips for Team/Group/Type
- [ ] Keyboard shortcut: Ctrl+F to focus search
- [ ] Escape to clear and close preview
- [ ] Arrow keys to navigate results
- [ ] Enter to select/toggle ownership

### Search Features

| Feature | Behavior |
|---------|----------|
| Case insensitive | "messi" matches "Messi" |
| Partial match | "Mess" matches "Messi" |
| ID search | "MEX" finds all MEX stickers |
| Team search | "Argentina" finds team |

### Preview Panel

- Giant sticker card (selected)
- Player name and team
- Rarity indicator
- Ownership status (owned/duplicate/missing)
- Quick action buttons

### Acceptance Criteria

1. Search input is auto-focused
2. Results update within 200ms
3. Preview shows selected sticker details
4. Filter chips narrow results
5. Keyboard navigation works (arrows + enter)
6. Selection toggles ownership