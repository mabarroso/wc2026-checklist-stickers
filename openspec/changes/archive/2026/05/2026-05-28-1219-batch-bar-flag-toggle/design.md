## Context

The app currently shows a generic ⚽ ball icon for every sticker card, regardless of country. Users want an optional flag display. Separately, the batch mode bottom bar overlaps the navigation tab, and the MarkDuplicate minus button is disabled at qty=1 instead of removing the entry.

## Goals / Non-Goals

**Goals:**
- Fix batch mode bar overlap (bottom-20 → bottom-28)
- Allow minus button at qty=1 to remove duplicate entry
- Add persisted toggle for country flag display, off by default
- Show flag emoji derived from sticker ID country code when toggle is on

**Non-Goals:**
- No new external dependencies
- No changes to sticker data model
- No changes to sticker card layout beyond the icon swap
- No flags for non-country stickers (logos, specials)

## Decisions

1. **Flag source**: FIFA 3-letter code from sticker `id` first 3 chars → ISO 2-letter code lookup → regional indicator flag emoji. Uses a static lookup map (`FIFA_TO_ISO`) in `flag-utils.ts`. No external API or library.

2. **Persistence**: Zustand store with `persist` middleware writing to `localStorage` key `showFlags`. Same pattern as existing stores (see `stores/`). Avoids adding a Conf dependency.

3. **Toggle placement**: Header 3-dot kebab menu (same as theme toggle). Clicking the item toggles the flag state immediately and closes the menu — unlike "Aviso legal" / "Acerca de" which open modals.

4. **Rendering**: Conditional ternary in the 3 card render paths. When `showFlags && flagEmoji` is truthy, show the flag emoji at `text-3xl`; otherwise fall back to ⚽.

5. **Non-country stickers**: `getFlagEmoji()` returns `null` for stickers where the first 3 chars don't match a known FIFA code (logos, special sections). The fallback ⚽ is used.

## Risks / Trade-offs

- **Subdivision flags** (England, Scotland): Uses Unicode subdivision flag sequences. These may render as text on older Android versions. Acceptable trade-off for correctness.
- **Missing codes**: If a new country is added without updating the FIFA_TO_ISO map, it silently falls back to ⚽. No crash risk.
