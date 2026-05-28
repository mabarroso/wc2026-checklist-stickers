## 1. SVG Flag Implementation

- [x] 1.1 Install `country-flag-icons` npm package
- [x] 1.2 Create `src/gui/src/lib/flag-utils.ts` with FIFA-to-ISO map and `getFlagSvg()` function (import from `country-flag-icons/string/3x2`)
- [x] 1.3 Create `src/gui/src/stores/flagStore.ts` with zustand persist (key `show-flags`, default `true`)

## 2. Apply Flag SVG to Screens

- [x] 2.1 Apply flag SVG `<img>` in `ViewCollection.tsx` (w-8 h-6, ball fallback)
- [x] 2.2 Apply flag SVG `<img>` in `Search.tsx` preview + bottom sheet (w-16 h-12, ball fallback)
- [x] 2.3 Apply flag SVG `<img>` in `Statistics.tsx` team header (w-6 h-4 inline-block)

## 3. Header Toggle Menu

- [x] 3.1 Add "Mostrar/Ocultar bandera países" toggle item in 3-dot menu (`Header.tsx`)

## 4. Statistics Expand All

- [x] 4.1 Add "Desplegar todo / Colapsar todo" button logic in `Statistics.tsx`
- [x] 4.2 Add toggle-all button to "Por equipo" section header

## 5. Duplicate Minus UX

- [x] 5.1 Remove `disabled` condition on minus button at qty=1 in `MarkDuplicate.tsx`

## 6. Batch Bar Overlap

- [x] 6.1 Change batch action bar from `bottom-20` to `bottom-28` in `ViewCollection.tsx`

## 7. Deb Build

- [x] 7.1 Build `.deb` bundle (removed `fonts-noto-color-emoji` from `tauri.conf.json`)

## 8. Verification

- [x] 8.1 Run `bun test`
- [x] 8.2 Run `bun run typecheck`
- [x] 8.3 Build `.deb` package
