# cli-legal-disclaimer Specification

## Purpose
Print a one-line legal disclaimer when the CLI application starts.

## Requirements

### Requirement: Disclaimer printed on CLI startup
The system SHALL print a short legal disclaimer line immediately after the startup banner when the CLI application runs.

#### Scenario: Disclaimer shown after banner
- **WHEN** the CLI application starts and `printHeader()` is called
- **THEN** a line is printed after the banner with the text `No afiliado a Panini ni a la FIFA. Uso solo para gestión personal.`
- **AND** the text is styled with `chalk.gray` to be subtle but readable

#### Scenario: Disclaimer before interactive menu
- **WHEN** the disclaimer is printed
- **THEN** it appears before the interactive menu is shown
- **AND** it is followed by a blank line for visual separation

### Requirement: Disclaimer is non-blocking
The disclaimer SHALL NOT interrupt or delay the CLI startup flow.

#### Scenario: No user interaction required
- **WHEN** the disclaimer is printed
- **THEN** the CLI proceeds to show the interactive menu without requiring any user input
