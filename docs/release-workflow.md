# Release Workflow

This document captures the exact release process used for `v1.2.0` so future releases can follow the same steps consistently.

## Version Classification

Use semantic versioning:

- Patch: fixes only, no new user-visible capability
- Minor: backward-compatible features or UX improvements
- Major: breaking changes, migrations, or incompatible behavior

`v1.2.0` was classified as a minor release because it added a theme system, UI improvements, and a mobile crash fix without breaking compatibility.

## Files To Update

Before building, align the release version everywhere it is exposed:

- `package.json`
- `src/config/appVersion.ts`
- `src/gui/src/components/Header.tsx`
- `src/gui/src-tauri/Cargo.toml`
- `src/gui/src-tauri/tauri.conf.json`
- `src/gui/src-tauri/Cargo.lock`
- `docs/CHANGELOG.md`
- `docs/RELEASE-vX.Y.Z.txt`

## Release Notes

Create `docs/RELEASE-vX.Y.Z.txt` using the same structure as the previous release note file. Include:

- tag
- title
- release type
- summary bullets
- artifact list
- validation summary

Keep this file in git. If a temporary GitHub-only draft note is ever created, do not commit it unless explicitly requested.

## OpenSpec Change

Create a dedicated OpenSpec change for the release.

```bash
openspec new change release-v-x-y-z
```

Add:

- `proposal.md`
- `design.md`
- `tasks.md`
- at least one delta under `specs/`

Important: validation fails unless the change contains a real delta file with headers such as `## ADDED Requirements` and at least one `#### Scenario:` block.

Validate with:

```bash
openspec validate --type change release-v-x-y-z
```

## Verification Gates

Run the standard checks from the repository root:

```bash
bun run build
bun test
bun run typecheck
bun run lint
```

For `v1.2.0`, `bun run lint` returned `Lint not configured`, which is acceptable in the current repo state.

## Build Artifacts

### CLI

```bash
bun run build
```

Expected output:

- `dist/wc26-checklist.js`
- `dist/stickers.csv`

### Desktop GUI

```bash
cd src/gui
bun run tauri build
cd ../..
```

Expected Linux outputs:

- `src/gui/src-tauri/target/release/bundle/deb/WC 2026 Checklist_<version>_amd64.deb`
- `src/gui/src-tauri/target/release/bundle/rpm/WC 2026 Checklist-<version>-1.x86_64.rpm`

### Android GUI

```bash
cd src/gui
bun run tauri:android build
cd ../..
```

Expected outputs:

- `src/gui/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk`
- optionally also an `.aab`, if produced by the toolchain

For `v1.2.0`, the APK uploaded to GitHub was the unsigned universal APK.

## Package Release Folder

Create a local release folder and copy assets into stable GitHub-friendly names:

```bash
mkdir -p release/vX.Y.Z
cp dist/wc26-checklist.js release/vX.Y.Z/wc26-checklist-vX.Y.Z.js
chmod +x release/vX.Y.Z/wc26-checklist-vX.Y.Z.js
cp dist/stickers.csv release/vX.Y.Z/stickers.csv
cp "src/gui/src-tauri/target/release/bundle/deb/WC 2026 Checklist_X.Y.Z_amd64.deb" \
  "release/vX.Y.Z/WC26-Checklist-vX.Y.Z-linux-amd64.deb"
cp "src/gui/src-tauri/target/release/bundle/rpm/WC 2026 Checklist-X.Y.Z-1.x86_64.rpm" \
  "release/vX.Y.Z/WC26-Checklist-vX.Y.Z-linux-x86_64.rpm"
cp "src/gui/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk" \
  "release/vX.Y.Z/wc26-checklist-vX.Y.Z-android-universal-unsigned.apk"
cp docs/RELEASE-vX.Y.Z.txt release/vX.Y.Z/RELEASE-vX.Y.Z.txt
(cd release/vX.Y.Z && sha256sum * > SHA256SUMS.txt)
```

For `v1.2.0`, the GitHub release assets were:

- `wc26-checklist-v1.2.0.js`
- `wc26-checklist-v1.2.0-android-universal-unsigned.apk`
- `WC26-Checklist-v1.2.0-linux-amd64.deb`
- `WC26-Checklist-v1.2.0-linux-x86_64.rpm`
- `RELEASE-v1.2.0.txt`
- `SHA256SUMS.txt`
- `stickers.csv`

## Commit And Tag

Before committing, always show:

```bash
git status --short
git diff --cached --stat
git log --oneline -n 8
```

Then ask explicitly:

```text
¿Confirmas el commit?
```

After confirmation:

```bash
git add <release files>
git commit -m "release: bump version to X.Y.Z and prepare release artifacts"
git push origin main
git tag vX.Y.Z
git push origin vX.Y.Z
```

## Publish GitHub Release

Preferred path when GitHub CLI is available and authenticated:

```bash
gh release create vX.Y.Z release/vX.Y.Z/* --title "vX.Y.Z - <title>" --notes-file docs/RELEASE-vX.Y.Z.txt
```

### Browser Fallback

If `gh` is missing or there is no GitHub token/auth, publish via the GitHub web UI:

1. Open the repository Releases page.
2. Create a new release for the existing tag `vX.Y.Z`.
3. Fill the title.
4. Paste the release body.
5. Upload every file from `release/vX.Y.Z/`.
6. Wait until GitHub finishes processing uploads.
7. Publish the release.
8. Verify the published page shows the expected assets and marks the release as `Latest` when appropriate.

This browser fallback was used for `v1.2.0` because `gh` was not installed and `GITHUB_TOKEN` was not available.

## Post-Publish Verification

Verify:

- release page exists for tag `vX.Y.Z`
- title is correct
- all intended assets are attached
- checksums file is present
- tag points to the release commit

For `v1.2.0`, the published release was verified in the GitHub UI after upload.

## Archive OpenSpec Change

After the release is published:

```bash
openspec archive release-v-x-y-z
```

If OpenSpec archives into a flat folder name, move it into the repository convention:

```bash
mkdir -p openspec/changes/archive/YYYY/MM
mv openspec/changes/archive/YYYY-MM-DD-release-v-x-y-z \
  openspec/changes/archive/YYYY/MM/YYYY-MM-DD-HHMM-release-v-x-y-z
```

This repository expects archived changes under `openspec/changes/archive/YYYY/MM/` with a timestamp in the final folder name.

## Actual `v1.2.0` Summary

The `v1.2.0` release used this exact flow:

- classified as minor
- version metadata aligned across CLI, GUI, and Tauri
- release notes added in `docs/RELEASE-v1.2.0.txt`
- OpenSpec change created, validated, and archived
- CLI, desktop, and Android artifacts built locally
- release folder assembled and checksums generated
- commit pushed to `main`
- tag `v1.2.0` pushed
- GitHub release created in the browser
- 7 distribution assets uploaded and verified
