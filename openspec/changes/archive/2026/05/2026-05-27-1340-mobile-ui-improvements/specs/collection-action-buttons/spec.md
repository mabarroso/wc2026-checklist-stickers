# collection-action-buttons Specification - Delta

## MODIFIED Requirements

### Requirement: Action buttons inside selected sticker card (updated sizing)
The action buttons (A&ntilde;adir, Quitar, Repetida) SHALL appear inside the selected sticker card at the bottom position, with equal widths and minimum 44px height.

#### Scenario: No sticker selected
- **WHEN** no sticker is currently selected (selectedSticker is null)
- **THEN** no action buttons are displayed anywhere on the screen

#### Scenario: Sticker selected displays buttons
- **WHEN** user clicks on any sticker card (owned, missing, or duplicate)
- **THEN** the clicked sticker becomes selected
- **AND** the three action buttons appear at the bottom of the selected sticker card
- **AND** each button has equal width (flex-1) and minimum height of 44px

#### Scenario: Add to album action
- **WHEN** user clicks "A&ntilde;adir" button on the selected sticker
- **THEN** the owned quantity for that sticker increases by 1
- **AND** the button is disabled for 300ms to prevent double-tap

#### Scenario: Remove from album action
- **WHEN** user clicks "Quitar" button on the selected sticker
- **THEN** the sticker is removed from owned (quantity becomes 0)
- **AND** any duplicate quantity for that sticker is also removed

#### Scenario: Mark as duplicate action
- **WHEN** user clicks "Repetida" button on the selected sticker
- **THEN** the duplicate quantity for that sticker increases by 1
- **AND** if the sticker was not owned, it is automatically added with quantity 1

#### Scenario: Clicking another sticker changes selection
- **WHEN** user clicks on a different sticker while one is already selected
- **THEN** the new sticker becomes selected
- **AND** the action buttons move to appear inside the newly selected card
- **AND** the previous card no longer displays any buttons

## ADDED Requirements

### Requirement: Button component supports size variant
The Button component SHALL support a `size` prop with `sm`, `md`, and `lg` variants.

#### Scenario: Small button size
- **WHEN** Button is rendered with `size="sm"`
- **THEN** the button has `min-h-[36px]` and `px-3 py-1.5` padding

#### Scenario: Medium button size (default)
- **WHEN** Button is rendered with `size="md"` or no size prop
- **THEN** the button has `min-h-[44px]` and `px-4 py-2` padding

#### Scenario: Large button size
- **WHEN** Button is rendered with `size="lg"`
- **THEN** the button has `min-h-[52px]` and `px-6 py-3` padding

### Requirement: Icon-only buttons include aria-label
All icon-only buttons SHALL include a descriptive `aria-label` attribute.

#### Scenario: Aria label on action icons
- **WHEN** a button displays only an icon (no visible text)
- **THEN** it includes an `aria-label` attribute describing the action in Spanish
- **AND** it includes a `title` attribute for tooltip on desktop hover
