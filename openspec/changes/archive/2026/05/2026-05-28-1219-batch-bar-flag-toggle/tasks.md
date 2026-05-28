## 1. Flag Utility

- [x] 1.1 Create `src/gui/src/lib/flag-utils.ts` with FIFA-to-ISO mapping and `getFlagEmoji()` function

## 2. Flag Store

- [x] 2.1 Create `src/gui/src/stores/flagStore.ts` with zustand persist store (`showFlags` boolean, default false)

## 3. Header Menu Item

- [x] 3.1 Add "Mostrar bandera países" toggle item to 3-dot menu in `Header.tsx`

## 4. Sticker Card Flag Rendering

- [x] 4.1 Update `ViewCollection.tsx` (line ~304) — conditional flag vs ball icon
- [x] 4.2 Update `Search.tsx` (lines ~376 and ~454) — conditional flag vs ball icon

## 5. Batch Mode Bar Position

- [x] 5.1 Change `bottom-20` to `bottom-28` in `ViewCollection.tsx` line ~382

## 6. MarkDuplicate Minus Button

- [x] 6.1 Remove `disabled={qty <= 1}` from minus button in `MarkDuplicate.tsx`
- [x] 6.2 Change onClick to call `markDuplicate(id, -1)` unconditionally

## 7. Verification

- [x] 7.1 Run `bun test`
- [x] 7.2 Run `bun run typecheck`
- [x] 7.3 Run `bun run lint`
