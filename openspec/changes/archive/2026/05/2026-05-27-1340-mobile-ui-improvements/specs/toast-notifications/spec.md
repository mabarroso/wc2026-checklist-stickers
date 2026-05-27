# toast-notifications Specification

## Purpose
Cross-cutting toast/snackbar notification system for non-intrusive user feedback across all screens.

## Requirements

### Requirement: Toast appears at bottom-center on mobile
The system SHALL display toast notifications at the bottom of the viewport on mobile devices.

#### Scenario: Mobile toast position
- **WHEN** a toast notification is triggered on a viewport narrower than 1024px
- **THEN** the toast appears at bottom-center, 80px above the bottom edge (above bottom tabs)
- **AND** the toast is horizontally centered with 16px horizontal margins

#### Scenario: Desktop toast position
- **WHEN** a toast notification is triggered on a viewport 1024px or wider
- **THEN** the toast appears at top-right, 16px from the top and right edges

### Requirement: Toast auto-dismisses after 3 seconds
The system SHALL automatically dismiss toast notifications after 3 seconds.

#### Scenario: Auto-dismiss
- **WHEN** a toast notification is shown
- **THEN** it automatically disappears after 3 seconds
- **AND** the user can also tap the toast to dismiss it immediately

### Requirement: Toast supports success, error, info variants
The system SHALL support three visual variants: success (green), error (red), and info (blue).

#### Scenario: Success toast
- **WHEN** a success toast is triggered
- **THEN** the toast displays with a green accent border and check icon

#### Scenario: Error toast
- **WHEN** an error toast is triggered
- **THEN** the toast displays with a red accent border and x icon

#### Scenario: Info toast
- **WHEN** an info toast is triggered
- **THEN** the toast displays with a blue accent border and info icon

### Requirement: Toast has undo action support
The system SHALL optionally include an "Undo" action button in toast notifications.

#### Scenario: Undo action
- **WHEN** a toast with undo capability is triggered
- **THEN** the toast displays an "Undo" button on the right side
- **AND** tapping "Undo" executes the undo callback and dismisses the toast

### Requirement: Toasts stack vertically
The system SHALL allow multiple toasts to be visible simultaneously, stacked vertically.

#### Scenario: Multiple toasts
- **WHEN** multiple toast notifications are triggered in succession
- **THEN** each new toast appears above the previous ones
- **AND** each toast independently auto-dismisses after its timer

### Requirement: Toast respects prefers-reduced-motion
The system SHALL respect the user's motion accessibility preference.

#### Scenario: Reduced motion
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** toasts appear and disappear without slide animation (instant fade or no animation)
