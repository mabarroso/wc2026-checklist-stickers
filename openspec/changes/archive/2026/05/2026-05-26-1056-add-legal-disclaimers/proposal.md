## Why

The application uses references to Panini, FIFA, and the FIFA World Cup — all protected trademarks. Without a visible legal disclaimer, the project could be perceived as an official or affiliated product, creating legal risk. Adding disclaimers across the GUI, CLI, and documentation mitigates this risk and clarifies the independent nature of the project.

## What Changes

- GUI: Modal popup with full legal notice shown on every app launch
- CLI: One-line disclaimer printed after the startup banner
- README: Short disclaimer section added to root `README.md`
- Documentation: Full disclaimer in `docs/index.md` and `docs/index-es.md`
- Store reference: `docs/disclaimer-store.md` with store-optimized text

## Capabilities

### New Capabilities
- `gui-disclaimer-modal`: Full-screen modal with legal notice on app startup
- `cli-legal-disclaimer`: One-line disclaimer printed in CLI startup
- `readme-legal-disclaimer`: Short disclaimer section in root README

### Modified Capabilities
- `gui-mobile-ui`: Add mobile-safe styling for disclaimer modal (responsive, safe-area)
- *None other affected*

## Impact

- `src/gui/src/components/DisclaimerModal.tsx` — new component
- `src/gui/src/AppLayout.tsx` — import and render modal
- `src/gui/src/components/index.ts` — export new component
- `src/infrastructure/cli/MainMenu.ts` — add chalk line in printHeader()
- `README.md` — add Disclaimer section
- `docs/index.md`, `docs/index-es.md` — add full disclaimer sections
- `docs/disclaimer-store.md` — new file with store-optimized text
