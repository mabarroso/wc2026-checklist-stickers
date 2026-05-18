## Context

The ViewCollection.tsx screen currently has:
- A grid of sticker cards (filtered by all/missing/owned/duplicates)
- A side panel on the right showing action buttons when a sticker is selected
- Sort order dropdown (Álbum/Cromo)
- Clicking a missing sticker auto-marks it as owned

The UI uses React with Framer Motion for animations and Zustand for state management.

## Goals / Non-Goals

**Goals:**
- Move action buttons inside the selected sticker card (bottom position)
- Add team filter dropdown with unique ID_FIX-TEAM combinations
- Maintain filter state across view changes
- Update click behavior: select only, no auto-mark

**Non-Goals:**
- Do not change the collection data model or storage
- Do not add new dependencies
- Do not modify other screens

## Decisions

### 1. Button placement inside cards
**Decision**: Add buttons at the bottom of the selected sticker card, above the ID.

**Rationale**: The proposal explicitly asks for "En la parte inferior" (at the bottom). This keeps buttons connected to the specific sticker and makes them disappear when another sticker is selected.

**Alternative considered**: Floating overlay with icons - rejected per user requirement.

### 2. Team filter implementation
**Decision**: Use local React state (`useState`) for team filter instead of adding to Zustand store.

**Rationale**: The filter is a UI-only concern specific to the ViewCollection screen. Adding it to the global store would pollute shared state with view-specific concerns. The filter doesn't need to persist across sessions.

**Alternative considered**: Add to Zustand store - rejected as overkill for UI-only state.

### 3. ID_FIX extraction
**Decision**: Extract first 3 characters from sticker ID (e.g., "COL12" → "COL").

**Rationale**: Matches user requirement exactly. This is a simple string operation: `sticker.id.substring(0, 3)`.

**Alternative considered**: Use regex to extract letters prefix - rejected as 3-character approach is simpler and matches requirement.

### 4. Unique team options generation
**Decision**: Generate options by iterating all stickers and creating a Map keyed by ID_FIX, storing unique ID_FIX-team combinations.

**Rationale**: The requirement specifies no repeated ID_FIX in the dropdown. Using a Map ensures uniqueness while preserving the team name for the label.

### 5. Click behavior change
**Decision**: Modify `handleCardClick` to only set `selectedSticker` (no auto-mark as owned).

**Rationale**: User explicitly requested "Mantener el comportamiento y seleccionar" - meaning select without auto-marking. This gives users explicit control.

## Risks / Trade-offs

- **[Risk]** Buttons inside cards may make the selected card taller than others → **Mitigation**: The grid uses fixed-height cards (aspect-[3/4]) so this should be acceptable. Buttons will be compact with icons.

- **[Risk]** Team filter may slow down rendering with 700+ stickers → **Mitigation**: Use `useMemo` for both option generation and filtering to avoid recalculation on every render.

- **[Risk]** Dropdown options may be too numerous → **Mitigation**: The requirement explicitly asks for unique ID_FIX per team, so we implement exactly as specified. Can be revisited if UX is poor.

## Migration Plan

1. Modify `ViewCollection.tsx`:
   - Remove side panel (lines 170-212)
   - Add buttons inside selected card's `Card` component
   - Add team filter state and dropdown
   - Update `handleCardClick` logic

2. No database migration needed - purely UI change

3. No rollback complexity - revert to previous version of ViewCollection.tsx