# PROGRESS.md

## Current Verified State

- Repository root:
- Standard startup path:
- Standard verification path:
- Current highest-priority unfinished feature:
- Current blocker:

## Session Log

### Session 001

- Date: 2026-11-09
- Goal: Remove `.agents/skills` project discovery links.
- Completed: Removed the Caveman and init symlinks; preserved root `skills/`.
- Verification run: Removed-path checks, source-skill checks, and `git diff --check`.
- Evidence captured: Discovery links are absent and both source skill files remain.
- Commits:
- Files or artifacts updated: Discovery links, README.md, skills/caveman/README.md, PROGRESS.md.
- Known risk or unresolved issue: Skills no longer have automatic project discovery.
- Next best step: No remaining work for this removal.

### Session 002

- Date: 2026-11-09
- Goal: Move source skills under `.github/`.
- Completed: Moved `skills/` to `.github/skills/` and updated current references.
- Verification run: File-preservation checks, path checks, and `git diff --check`.
- Evidence captured: All 12 tracked skill files remain under the new directory.
- Commits:
- Files or artifacts updated: .github/skills/, README.md, .github/copilot-instructions.md, PROGRESS.md.
- Known risk or unresolved issue: Skill discovery depends on the agent tool.
- Next best step: No remaining work for this move.
