## 1. GUI Disclaimer Modal

- [x] 1.1 Create `src/gui/src/components/DisclaimerModal.tsx` with framer-motion animation, overlay backdrop, centered card, "Aviso legal" title, full legal text, and "Cerrar" button
- [x] 1.2 Register DisclaimerModal in `src/gui/src/components/index.ts`
- [x] 1.3 Integrate DisclaimerModal in `src/gui/src/AppLayout.tsx` with `useState(true)` and close handler

## 2. CLI Legal Disclaimer

- [x] 2.1 Add `chalk.gray` disclaimer line after banner in `src/infrastructure/cli/MainMenu.ts` `printHeader()` method

## 3. README and Documentation

- [x] 3.1 Add `## Disclaimer` section with short version to root `README.md`
- [x] 3.2 Add full disclaimer section (`## Disclaimer`) to `docs/index.md`
- [x] 3.3 Add full disclaimer section (`## Descargo de responsabilidad`) to `docs/index-es.md`
- [x] 3.4 Create `docs/disclaimer-store.md` with store-optimized disclaimer text

## 4. Verification

- [x] 4.1 Run `bun test` — all tests pass
- [x] 4.2 Run `bun run typecheck` — no TypeScript errors
- [x] 4.3 Run `bun run lint` — no lint errors
