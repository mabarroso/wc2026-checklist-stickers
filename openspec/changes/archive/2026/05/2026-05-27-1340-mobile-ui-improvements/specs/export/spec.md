# export Specification - Delta

## ADDED Requirements

### Requirement: Responsive single-column layout on mobile
The Export screen SHALL adapt to a single-column layout on mobile viewports.

#### Scenario: Single column on mobile
- **WHEN** the viewport is narrower than 1024px
- **THEN** the export controls stack in a single column (full width)
- **AND** the preview panel is hidden (it is desktop-only)

#### Scenario: Two-column layout on desktop
- **WHEN** the viewport is 1024px or wider
- **THEN** the existing two-column layout with preview panel is shown

### Requirement: Toast feedback replaces inline error panel
Export success and error messages SHALL use the toast notification system instead of inline panels.

#### Scenario: Export success toast
- **WHEN** an export completes successfully on mobile
- **THEN** a success toast appears with the message "Exportaci&oacute;n completa"
- **AND** the previous inline success panel with "Abrir Carpeta" button is hidden on mobile

#### Scenario: Export error toast
- **WHEN** an export fails on any device
- **THEN** an error toast appears with the error message
- **AND** the previous inline error panel is replaced by the toast

### Requirement: Format export cards responsive
The three format export cards (PDF, CSV, TXT) SHALL adapt to mobile viewports.

#### Scenario: Full-width cards on mobile
- **WHEN** the viewport is narrower than 640px
- **THEN** the format cards stack vertically (single column)

#### Scenario: Three-column grid on desktop
- **WHEN** the viewport is 640px or wider
- **THEN** the format cards display in a 3-column grid (current behavior)
