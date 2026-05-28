## Context

This change is a release-preparation change rather than a net-new feature implementation. The underlying capability work already exists in the codebase and needs version alignment, release notes, and verified distributable artifacts.

## Decisions

### Decision 1: Use semantic minor version 1.2.0
The current unreleased changes add user-visible functionality and fixes without introducing breaking changes, so the correct release bump is minor, not major.

### Decision 2: Keep release artifacts out of version control
The repository ignores build outputs under dist/ and release/, so artifacts will be generated locally for publishing to GitHub Releases without bloating the Git history.

### Decision 3: Publish official notes in docs/
The canonical release note text is kept in docs/RELEASE-v1.2.0.txt and reused for GitHub release publication.

## Risks

- GitHub release publication may require local authentication tooling not present in every environment.
- Android artifact is unsigned, so it is suitable for sideload/test distribution but not Play Store submission.
