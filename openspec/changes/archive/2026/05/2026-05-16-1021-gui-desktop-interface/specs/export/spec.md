## export

### Screen Description

Professional export center for generating missing sticker lists in multiple formats.

### Layout

```html
<div class="export-layout">
  <section class="export-panel">
    <button class="export-option pdf">
      <span class="icon">📄</span>
      <span class="label">PDF</span>
    </button>
    <button class="export-option csv">
      <span class="icon">📊</span>
      <span class="label">CSV</span>
    </button>
    <button class="export-option txt">
      <span class="icon">📝</span>
      <span class="label">TXT</span>
    </button>
  </section>
  <section class="preview-panel">
    <div class="export-preview"></div>
    <div class="export-stats"></div>
  </section>
</div>
```

### Export Cards

| Format | Accent | Icon | Description |
|--------|--------|------|-------------|
| PDF | Red | 📄 | Printable checklist with checkboxes |
| CSV | Green | 📊 | Spreadsheet format |
| TXT | Cyan | 📝 | Human-readable list |

### Requirements

- [ ] Three export format cards with icons
- [ ] Hover animation (scale + glow)
- [ ] Preview area showing file content sample
- [ ] Stats: number of missing stickers
- [ ] Export location selector (Downloads/Desktop/Custom)
- [ ] Progress indicator during export
- [ ] Success notification with file path
- [ ] Open folder button after export

### Export Card Styling

```css
.export-option {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px;
  transition: 220ms ease-out;
}

.export-option:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(121,216,219,.2);
}

.export-option.pdf:hover {
  border-color: var(--red);
}

.export-option.csv:hover {
  border-color: var(--green);
}

.export-option.txt:hover {
  border-color: var(--cyan);
}
```

### File Naming

Pattern: `faltantes_YYYY-MM-DD.{ext}`

### Acceptance Criteria

1. Clicking format generates correct file type
2. Preview shows sample of output
3. File is saved to selected location
4. Success notification appears
5. "Open folder" works after export