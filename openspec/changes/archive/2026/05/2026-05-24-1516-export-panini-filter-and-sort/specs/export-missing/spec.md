## MODIFIED Requirements

### Requirement: Panini scope excludes extra stickers
The system SHALL exclude PANINI_EXTRA type stickers when the Panini source scope is selected for export, including only the basic collection (players, team badges, logos, FIFA specials).

#### Scenario: Panini scope excludes extras
- **WHEN** source scope is `Panini`
- **THEN** exported missing list includes only basic Panini stickers (PLAYER, TEAM_BADGE, LOGO, FWC_SPECIAL)
- **AND** PANINI_EXTRA stickers are excluded from the export
