## Context

The GUI is a Tauri 2 desktop app (React + Vite + Rust). Tauri 2 has built-in mobile support — `tauri android` and `tauri ios` commands wrap the same web frontend with a native WebView shell. The Rust backend uses `dirs::download_dir()` and platform-specific `open`/`explorer`/`xdg-open` commands that are not available on mobile.

## Goals / Non-Goals

**Goals:**
- Android and iOS builds via Tauri Mobile
- Export files save to app data directory on mobile
- Hide non-functional features (Abrir Carpeta) on mobile
- Responsive UI with bottom tab navigation on small screens
- Mobile-compatible icons and capabilities

**Non-Goals:**
- No app store publishing (CI/CD, signing, store listings)
- No push notifications, in-app purchases, or native camera/geolocation
- No tablet-specific layouts (responsive but not adaptive)

## Decisions

### Decision 1: Tauri Mobile over alternatives (React Native, Flutter, PWA)
- **Chosen**: Tauri Mobile (existing Tauri 2 codebase, minimal changes)
- **Rationale**: Maximum code reuse — same React frontend, same Rust backend, only platform-specific paths and commands change. Tauri 2 mobile is production-ready.
- **Alternatives**: PWA (no file system access, no native dialogs), React Native (rewrite from scratch), Flutter (rewrite from scratch) — all rejected.

### Decision 2: App data dir over Downloads on mobile
- **Chosen**: Use `app.path().app_data_dir()` from Tauri's AppHandle on mobile
- **Rationale**: Mobile OS permissions don't allow arbitrary Downloads folder access. The app data directory is sandboxed and always writable.
- **Implementation**: Pass `AppHandle` to export commands via Tauri state, resolve path at runtime based on platform.

### Decision 3: CSS media queries for responsive layout (no runtime detection)
- **Chosen**: Use Tailwind `md:` breakpoint to switch between sidebar and bottom tabs
- **Rationale**: The frontend is the same across platforms — responsive CSS avoids platform detection in JS. The sidebar collapses at 768px.
- **Alternative**: Runtime `isMobile()` check — rejected; coupling UI to platform instead of viewport is less flexible.

### Decision 4: Guard platform commands with #[cfg], not runtime checks
- **Chosen**: Use `#[cfg(not(target_os = "android"))]` and `#[cfg(not(target_os = "ios"))]` to exclude `open_downloads_folder` on mobile
- **Rationale**: Compile-time exclusion avoids shipping dead code. The `dirs` crate is kept for desktop only.
- **Alternative**: Runtime `cfg!()` checks — rejected; compile-time is cleaner.

## Risks / Trade-offs

- **[Medium] Tauri Mobile compatibility**: Tauri 2 mobile plugins (`fs`, `dialog`) have some differences from desktop. Need to test each plugin on both platforms.
- **[Low] Android/iOS init requires native SDKs**: Android needs JDK 17+, Android SDK, NDK; iOS needs macOS + Xcode 15+. These are development environment requirements, not code changes.
- **[Low] PDF generation via printpdf**: `printpdf` is pure Rust and should compile for mobile targets. Verify it doesn't depend on any system PDF libraries.
- **[Low] Bottom tab bar redesign**: The current sidebar SVG icons work for tabs, but the action buttons in `MarkOwned`/`MarkDuplicate` may need layout adjustments for small screens.
