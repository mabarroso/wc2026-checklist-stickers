# Spec: Search Actions

Enable sticker actions directly from search results, matching ViewCollection functionality.

## ADDED Requirements

### Requirement: Search results display action buttons

The system SHALL display action buttons for each sticker in search results, allowing users to add to album, remove from album, or mark as duplicate.

#### Scenario: Display action buttons for missing sticker
- **WHEN** user searches and sees a missing sticker result
- **THEN** system displays buttons: "Añadir al álbum", "Quitar del álbum" (disabled), "Marcar como repetida" (disabled)

#### Scenario: Display action buttons for owned sticker
- **WHEN** user searches and sees an owned sticker result
- **THEN** system displays buttons: "Añadir al álbum" (disabled), "Quitar del álbum", "Marcar como repetida"

#### Scenario: Display action buttons for duplicated sticker
- **WHEN** user searches and sees a duplicated sticker result
- **THEN** system displays buttons: "Añadir al álbum" (disabled), "Quitar del álbum", "Marcar como repetida" (disabled)

### Requirement: Add sticker to album from search

The system SHALL allow users to add a sticker to their album directly from search results.

#### Scenario: Add missing sticker to album
- **WHEN** user clicks "Añadir al álbum" on a missing sticker in search results
- **THEN** system marks sticker as owned with quantity 1
- **AND** updates search result UI to reflect owned status

#### Scenario: Add owned sticker increases quantity
- **WHEN** user clicks "Añadir al álbum" on an owned sticker (quantity > 0)
- **THEN** system increases owned quantity by 1

### Requirement: Remove sticker from album from search

The system SHALL allow users to remove a sticker from their album directly from search results.

#### Scenario: Remove sticker from album
- **WHEN** user clicks "Quitar del álbum" on an owned sticker in search results
- **THEN** system removes sticker from album
- **AND** updates search result UI to reflect missing status

### Requirement: Mark sticker as duplicate from search

The system SHALL allow users to mark a sticker as duplicate directly from search results.

#### Scenario: Mark owned sticker as duplicate
- **WHEN** user clicks "Marcar como repetida" on an owned sticker in search results
- **THEN** system marks sticker as duplicate
- **AND** updates search result UI to reflect duplicate status

### Requirement: Search results show sticker status

The system SHALL display current sticker status (missing, owned, duplicate) with quantities in search results.

#### Scenario: Show owned status with quantity
- **WHEN** user searches and sees an owned sticker
- **THEN** system displays "En el álbum" badge with quantity

#### Scenario: Show duplicate status with quantity
- **WHEN** user searches and sees a duplicated sticker
- **THEN** system displays "Repetida" badge with quantity