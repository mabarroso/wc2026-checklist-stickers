## Context

The GUI uses CSS custom properties defined in `index.css` for its color scheme. The primary blue (`--color-blue`) is currently set to `#3b82f6` (Tailwind blue-500), which is a generic web blue with no brand identity. Tailwind v4 maps any `--color-*` CSS variable into its utility system (e.g., `--color-blue` makes `bg-blue`, `text-blue`, `border-blue` work automatically).

The app icon features a purple/violet palette (`#863bff`, `#7e14ff`), but the user prefers Panini/FIFA brand colors over matching the icon. The FIFA World Cup 2026 brand uses a multicolor "26" pattern, and the Panini sticker album uses deep blues and vibrant accents.

## Goals / Non-Goals

**Goals:**
- Replace the generic primary blue with a deeper FIFA-branded blue
- Add a distinct vibrant cyan accent separate from the primary blue
- Ensure all Tailwind utility classes derived from these variables work correctly
- Maintain dark theme consistency

**Non-Goals:**
- Changing the dark background (`--bg-main: #0f172a`)
- Changing surface colors (`--color-surface`, `--color-surface-2`)
- Changing status colors (green, yellow, orange, red)
- Adding new CSS variables or components
- Modifying component logic or behavior

## Decisions

**Decision 1: Use CSS variable changes only** — Since Tailwind v4 reads `--color-*` CSS variables directly, changing the variable values in `index.css` is sufficient. No Tailwind config file changes needed.

**Decision 2: Split `--color-blue` and `--color-cyan`** — Currently both point to `#3b82f6`. After this change, `--color-blue` becomes `#1d4ed8` (deep FIFA blue) and `--color-cyan` becomes `#0891b2` (vibrant cyan). This creates visual hierarchy: blue for primary actions/navigation, cyan for accents/highlights.

**Decision 3: Keep semantic `--color-cyan` and `--color-blue` separate** — The current codebase uses `--color-cyan` in select borders, badges, and some hover states. These should become actual cyan to differentiate from primary blue buttons and navigation.

## Risks / Trade-offs

- **Low risk**: CSS variable change is fully reversible with a single edit
- **Trade-off**: Some elements currently styled with `--color-blue` may look different if they relied on the old blue brightness. Visual review on P80 recommended after implementation.
- **No migration needed**: Zero-downtime, instant change via CSS refresh
