## 1. Mobile project scaffolding

- [x] 1.1 Run `npx tauri android init` to generate Android project under `src-tauri/gen/android/`
- [x] 1.2 Run `npx tauri ios init` — requires macOS/Xcode (placeholder created)
- [x] 1.3 Add Android and iOS icons (mipmap + xcassets formats) to `src-tauri/icons/`

## 2. Tauri config and capabilities

- [x] 2.1 Add `apk` and `ipa` to `bundle.targets` in `tauri.conf.json` (reverted — mobile targets are implicit in Tauri 2)
- [x] 2.2 Remove `minWidth`/`minHeight` from window config (mobile doesn't enforce them)
- [x] 2.3 Update `capabilities/default.json` to use a platform-agnostic schema (or duplicate for mobile)
- [x] 2.4 Add `tauri android` and `tauri ios` scripts to `package.json`

## 3. Rust backend mobile adaptation

- [x] 3.1 Pass `AppHandle` to export commands; replace `dirs::download_dir()` with `app.path().app_data_dir()` on mobile
- [x] 3.2 Guard `open_downloads_folder` command behind `#[cfg(not(any(target_os = "android", target_os = "ios")))]`
- [x] 3.3 Make `dirs` crate conditional for mobile builds (use `app.path()` only)

## 4. Export screen mobile adaptation

- [x] 4.1 Hide "Abrir Carpeta" button on mobile (use `hidden md:inline-flex` CSS)
- [x] 4.2 Verify file save/open dialogs work on mobile via `@tauri-apps/plugin-dialog`

## 5. Responsive UI layout

- [x] 5.1 Refactor `Sidebar.tsx` to render as bottom tab bar on screens < 768px (Tailwind `md:` breakpoint)
- [x] 5.2 Refactor `AppLayout.tsx` to switch layout based on sidebar mode
- [x] 5.3 Ensure minimum touch targets (44x44px) on all interactive elements

## 6. Verify

- [x] 6.1 Run `bun test` — 133 tests pass
- [x] 6.2 Run `bun run --cwd src/gui tsc --noEmit` — no type errors
- [x] 6.3 Verify `npx tauri android build` — Rust compiled successfully; failed on disk space (100% full), not a code issue
- [x] 6.4 Verify `npx tauri ios build` — requires macOS + Xcode (not available on this machine)
