## 1. Mobile project scaffolding

- [ ] 1.1 Run `npx tauri android init` to generate Android project under `src-tauri/android/`
- [ ] 1.2 Run `npx tauri ios init` to generate iOS project under `src-tauri/ios/`
- [ ] 1.3 Add Android and iOS icons (mipmap + xcassets formats) to `src-tauri/icons/`

## 2. Tauri config and capabilities

- [ ] 2.1 Add `apk` and `ipa` to `bundle.targets` in `tauri.conf.json`
- [ ] 2.2 Remove `minWidth`/`minHeight` from window config (mobile doesn't enforce them)
- [ ] 2.3 Update `capabilities/default.json` to use a platform-agnostic schema (or duplicate for mobile)
- [ ] 2.4 Add `tauri android` and `tauri ios` scripts to `package.json`

## 3. Rust backend mobile adaptation

- [ ] 3.1 Pass `AppHandle` to export commands; replace `dirs::download_dir()` with `app.path().app_data_dir()` on mobile
- [ ] 3.2 Guard `open_downloads_folder` command behind `#[cfg(not(any(target_os = "android", target_os = "ios")))]`
- [ ] 3.3 Remove `dirs` crate dependency for mobile builds (use `app.path()` only)

## 4. Export screen mobile adaptation

- [ ] 4.1 Hide "Abrir Carpeta" button on mobile (use `isTauri` and platform check or CSS)
- [ ] 4.2 Verify file save/open dialogs work on mobile via `@tauri-apps/plugin-dialog`

## 5. Responsive UI layout

- [ ] 5.1 Refactor `Sidebar.tsx` to render as bottom tab bar on screens < 768px (Tailwind `md:` breakpoint)
- [ ] 5.2 Refactor `AppLayout.tsx` to switch layout based on sidebar mode
- [ ] 5.3 Ensure minimum touch targets (44x44px) on all interactive elements

## 6. Verify

- [ ] 6.1 Run `bun test` — all tests pass
- [ ] 6.2 Run `bun run --cwd src/gui tsc --noEmit` — no type errors
- [ ] 6.3 Verify `npx tauri android build` succeeds (requires Android SDK)
- [ ] 6.4 Verify `npx tauri ios build` succeeds (requires macOS + Xcode)
