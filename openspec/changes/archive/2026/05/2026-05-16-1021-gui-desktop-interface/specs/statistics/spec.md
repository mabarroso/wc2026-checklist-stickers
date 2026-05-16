## statistics

### Screen Description

Sports analytics dashboard resembling FIFA analytics and esports control panels.

### Layout

```html
<div class="stats-dashboard">
  <section class="stats-overview">
    <div class="completion-ring"></div>
    <div class="stats-summary"></div>
  </section>
  <section class="charts-grid">
    <div class="chart-card group-bars"></div>
    <div class="chart-card type-breakdown"></div>
    <div class="chart-card duplicate-rankings"></div>
  </section>
</div>
```

### Widgets

#### Completion Widget
- Giant circular progress ring
- Animated percentage counter
- Total / Owned / Missing / Duplicates counts

#### Group Stats
- Horizontal progress bars per group (A-L)
- Group flags or letters
- Completion glow effect

#### Duplicate Rankings
- Podium visualization (top 3)
- Collectible rarity styling
- Animated badges

### Requirements

- [ ] Giant circular progress ring with animation
- [ ] Animated percentage counter (counts up)
- [ ] Summary cards: Total, Owned, Missing, Duplicates
- [ ] Group completion bars (A-L)
- [ ] Type breakdown (player, badge, special, etc.)
- [ ] Top duplicates podium
- [ ] Refresh button to sync data
- [ ] Export stats button

### Chart Styling

```css
.progress-ring {
  stroke-dasharray: 440;
  stroke-dashoffset: calc(440 - (440 * var(--progress)) / 100);
  transition: stroke-dashoffset 1s ease-out;
}

.group-bar {
  background: linear-gradient(90deg, var(--cyan) var(--percentage), var(--surface-2) var(--percentage));
}
```

### Acceptance Criteria

1. Progress ring animates on load
2. Numbers count up smoothly
3. Group bars show accurate percentages
4. Top duplicates podium displays correctly
5. Data refreshes from storage
6. Export generates report