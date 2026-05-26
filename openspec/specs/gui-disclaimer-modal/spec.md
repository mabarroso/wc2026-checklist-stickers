# gui-disclaimer-modal Specification

## Purpose
Show a full-screen legal disclaimer modal on every GUI app launch.

## Requirements

### Requirement: Disclaimer modal shown on app launch
The system SHALL display a legal disclaimer modal immediately when the GUI application loads.

#### Scenario: Modal appears on startup
- **WHEN** the GUI application is loaded in any platform (desktop browser, Tauri desktop, Tauri Android, Tauri iOS)
- **THEN** a modal overlay covers the screen with a semi-transparent backdrop
- **AND** the modal contains a centered card with the full legal notice text
- **AND** the modal animates in using framer-motion (fade + scale)

#### Scenario: User dismisses the modal
- **WHEN** the user taps/clicks the "Cerrar" button inside the modal
- **THEN** the modal animates out and is removed from the DOM
- **AND** the app content behind it becomes interactive

#### Scenario: Modal shows on every fresh launch
- **WHEN** the user closes the app and opens it again
- **THEN** the disclaimer modal is shown again on the next launch
- **AND** dismissal is not persisted across sessions

### Requirement: Modal content matches legal notice
The modal SHALL display the full "Aviso legal" text as specified.

#### Scenario: Legal text displayed
- **WHEN** the modal is rendered
- **THEN** it displays the title "Aviso legal"
- **AND** it displays the full disclaimer body text as provided

### Requirement: Modal is responsive and mobile-safe
The modal SHALL render correctly on all screen sizes, including mobile devices with safe-area insets.

#### Scenario: Modal fits mobile viewport
- **WHEN** the modal is shown on a mobile device (width < 640px)
- **THEN** the card uses horizontal padding (`px-4`) to avoid edge-to-edge text
- **AND** the backdrop covers the full viewport including safe areas
- **AND** the close button is at least 44px tall for touch targets

#### Scenario: Modal fits desktop viewport
- **WHEN** the modal is shown on desktop (width >= 640px)
- **THEN** the card is constrained to `max-w-md` (448px) width
