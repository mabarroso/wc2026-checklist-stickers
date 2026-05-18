## ADDED Requirements

### Requirement: Action buttons inside selected sticker card
The action buttons (Añadir, Quitar, Repetida) SHALL appear inside the selected sticker card at the bottom position, rather than in a side panel.

#### Scenario: No sticker selected
- **WHEN** no sticker is currently selected (selectedSticker is null)
- **THEN** no action buttons are displayed anywhere on the screen

#### Scenario: Sticker selected displays buttons
- **WHEN** user clicks on any sticker card (owned, missing, or duplicate)
- **THEN** the clicked sticker becomes selected
- **AND** the three action buttons appear at the bottom of the selected sticker card

#### Scenario: Add to album action
- **WHEN** user clicks "Añadir" button on the selected sticker
- **THEN** the owned quantity for that sticker increases by 1

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