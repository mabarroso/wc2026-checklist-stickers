## Context

The application references Panini, FIFA, and FIFA World Cup trademarks in both the CLI and GUI. Currently there is no visible legal disclaimer anywhere in the app or documentation. This creates legal exposure by potentially misleading users into believing the app is official or affiliated.

## Goals / Non-Goals

**Goals:**
- Show a legal disclaimer modal on every GUI app launch
- Print a short disclaimer line on every CLI startup
- Add short disclaimer to root `README.md`
- Add full disclaimers to `docs/index.md` and `docs/index-es.md`
- Provide a store-optimized reference file

**Non-Goals:**
- Hiding the disclaimer after first dismissal (must show on every fresh launch)
- Platform-specific dismissal persistence
- Affecting app performance or startup time perceptibly

## Decisions

1. **Modal over footer**: A modal on launch ensures the user sees the notice before interacting with the app. A footer could be scrolled past or ignored. Using `AnimatePresence` from framer-motion (already a dependency) for smooth entry/exit animation.
2. **State not persisted**: The disclaimer shows on every app load. No localStorage/sessionStorage — the user explicitly requested "cada vez que se acceda". Simple React `useState(true)` in `AppLayout`.
3. **Responsive sizing**: `max-w-md` on desktop, full-width padding on mobile via `px-4`. Safe-area-aware via existing `viewport-fit=cover` in `index.html`.
4. **CLI placement**: After the banner in `printHeader()` — visible immediately on startup, not mixed into the interactive menu flow.
5. **README disclaimer**: Short version (1 sentence) to keep the root README concise. Full version goes in `docs/` which is the canonical documentation location.

## Risks / Trade-offs

- Modal on every startup may annoy frequent users → trade-off accepted for legal clarity. Dismiss is a single tap/click.
- CLI disclaimer adds 1 line to output → negligible visual impact.
- Users with accessibility needs: modal uses standard dismiss button, no auto-dismiss timeout.
