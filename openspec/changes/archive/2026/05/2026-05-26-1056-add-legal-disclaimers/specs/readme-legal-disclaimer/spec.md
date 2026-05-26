# readme-legal-disclaimer Specification

## Purpose
Add a short legal disclaimer to the root `README.md` and full disclaimers to the documentation files.

## ADDED Requirements

### Requirement: Short disclaimer in root README
The root `README.md` SHALL include a concise legal disclaimer section.

#### Scenario: Disclaimer section present
- **WHEN** the root `README.md` is viewed
- **THEN** a `## Disclaimer` section exists at the end of the file
- **AND** the section contains: `Esta aplicación no está afiliada, asociada ni respaldada por Panini S.p.A. ni por la FIFA. Todas las marcas mencionadas pertenecen a sus respectivos propietarios.`

### Requirement: Full disclaimer in docs
The `docs/index.md` and `docs/index-es.md` files SHALL include the complete legal disclaimer.

#### Scenario: Full disclaimer in English docs
- **WHEN** `docs/index.md` is viewed
- **THEN** a `## Disclaimer` section exists with the complete disclaimer text

#### Scenario: Full disclaimer in Spanish docs
- **WHEN** `docs/index-es.md` is viewed
- **THEN** a `## Descargo de responsabilidad` section exists with the complete disclaimer text in Spanish

### Requirement: Store-optimized disclaimer reference
A reference file SHALL be provided with the store-optimized disclaimer text for copy-pasting into app store listings.

#### Scenario: Store disclaimer file exists
- **WHEN** `docs/disclaimer-store.md` is opened
- **THEN** it contains the short store-optimized version of the disclaimer
