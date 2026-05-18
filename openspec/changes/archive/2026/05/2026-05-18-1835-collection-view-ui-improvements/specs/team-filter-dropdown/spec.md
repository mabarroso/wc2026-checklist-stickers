## ADDED Requirements

### Requirement: Team filter dropdown in collection view
A dropdown filter SHALL be displayed to the right of the "Repetidas" filter button, allowing users to filter stickers by team.

#### Scenario: Dropdown displays "Todos" as default option
- **WHEN** the collection view loads
- **THEN** the dropdown shows "Todos" as the selected option by default
- **AND** all stickers are displayed (no team filtering applied)

#### Scenario: Dropdown shows unique ID_FIX and team combinations
- **WHEN** the dropdown options are generated
- **THEN** each option displays format "<ID_FIX> - <TEAM>" (e.g., "ARG - Argentina")
- **AND** no ID_FIX value appears more than once in the dropdown
- **AND** options are sorted alphabetically by team name

#### Scenario: Selecting a team filters stickers
- **WHEN** user selects a team option (not "Todos") from the dropdown
- **THEN** only stickers whose team property matches the selected team are displayed
- **AND** the sticker count shown above the grid reflects only filtered stickers

#### Scenario: Team filter persists across view changes
- **WHEN** user changes filter view (Todas/Faltantes/En el álbum/Repetidas)
- **THEN** the selected team filter value is retained
- **AND** the filtered results still respect the selected team

#### Scenario: Resetting to "Todos" shows all teams
- **WHEN** user selects "Todos" from the dropdown
- **THEN** all stickers are displayed regardless of team
- **AND** filtering is based only on the current view filter (all/missing/owned/duplicates)