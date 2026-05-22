# export Specification

## Purpose
Legacy synchronized capability specification for export.
## Requirements
### Requirement: export capability behavior
The system SHALL implement the capability behavior described in this specification.

#### Scenario: Capability behavior is used as baseline
- **WHEN** this capability is implemented, tested, or reviewed
- **THEN** the behavior captured in this specification MUST be treated as the baseline
- **AND** legacy archived notes MUST remain available for reference

### Requirement: Export flow allows source selection
The system SHALL require users to select a source scope before exporting missing stickers.

#### Scenario: Export source options are shown
- **WHEN** the user opens the export flow
- **THEN** the system shows these source options: `Panini`, `Extra`, `Coca cola`, `McDonald's`, and `Todos`

#### Scenario: Source selection is applied to export action
- **WHEN** the user selects one source option and confirms export
- **THEN** the selected source scope is used for file generation

### Requirement: Source selection is format-independent
The system SHALL apply the same selected source scope across PDF, CSV, and TXT export formats.

#### Scenario: Same scope works for PDF export
- **WHEN** user exports in PDF with source `Panini`
- **THEN** only missing Panini stickers are included in the PDF

#### Scenario: Same scope works for CSV export
- **WHEN** user exports in CSV with source `Coca cola`
- **THEN** only missing Coca cola stickers are included in the CSV

#### Scenario: Same scope works for TXT export
- **WHEN** user exports in TXT with source `McDonald's`
- **THEN** only missing McDonald's stickers are included in the TXT

### Requirement: Source selection applies only to checklist export
The system SHALL keep source selection scoped to checklist generation and SHALL NOT use it for backup operations.

#### Scenario: Backup remains full collection
- **WHEN** the user saves a backup from the same screen where source selection is shown
- **THEN** the backup contains the full collection state
- **AND** the selected export source does not change backup contents

## Legacy Notes

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