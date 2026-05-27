# mark-owned Specification - Delta

## ADDED Requirements

### Requirement: Undo snackbar replaces recently added list on mobile
The Mark Owned screen SHALL replace the "A&ntilde;adidos Recientemente" side panel with an undo snackbar on mobile viewports.

#### Scenario: Undo snackbar on mobile
- **WHEN** the viewport is narrower than 768px
- **THEN** the "A&ntilde;adidos Recientemente" side panel is hidden
- **AND** after adding a sticker, a toast with "Undo" action appears at the bottom

#### Scenario: Side panel on desktop
- **WHEN** the viewport is 768px or wider
- **THEN** the existing "A&ntilde;adidos Recientemente" side panel is shown (current behavior)

#### Scenario: Undo action reverts last add
- **WHEN** the user taps "Undo" on the snackbar
- **THEN** the last added sticker is removed from the collection
- **AND** the snackbar dismisses

### Requirement: Unified quantity controls with icons
The quantity selector in Mark Owned (and Mark Duplicate) SHALL use consistent Lucide icons (Minus/Plus) and the same Button component.

#### Scenario: Same controls in both screens
- **WHEN** the user views Mark Owned or Mark Duplicate on any device
- **THEN** both screens use Minus/Plus icons from Lucide inside Button components with size="sm"
- **AND** the quantity number is displayed in the same font and size on both screens

### Requirement: Empty state with icon
The Mark Owned screen SHALL show a visual empty state when no stickers have been added.

#### Scenario: Empty state displayed
- **WHEN** no stickers have been added recently
- **THEN** an icon (FilePlus or similar) is displayed centered
- **AND** text says "A&uacute;n no has a&ntilde;adido cromos"
- **AND** a subtitle suggests "Busca un cromo por ID o nombre para empezar"
