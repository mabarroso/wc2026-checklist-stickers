## ADDED Requirements

### Requirement: Export missing stickers by source scope
The system SHALL filter missing stickers by selected source scope before export generation.

#### Scenario: Panini scope includes only Panini missing stickers
- **WHEN** source scope is `Panini`
- **THEN** exported missing list includes only Panini stickers that are missing

#### Scenario: Extra scope includes only Extra missing stickers
- **WHEN** source scope is `Extra`
- **THEN** exported missing list includes only Extra stickers that are missing

#### Scenario: Coca cola scope includes only Coca cola missing stickers
- **WHEN** source scope is `Coca cola`
- **THEN** exported missing list includes only Coca cola stickers that are missing

#### Scenario: McDonald's scope includes only McDonald's missing stickers
- **WHEN** source scope is `McDonald's`
- **THEN** exported missing list includes only McDonald's stickers that are missing

#### Scenario: Todos scope preserves existing behavior
- **WHEN** source scope is `Todos`
- **THEN** exported missing list includes all missing stickers from every source