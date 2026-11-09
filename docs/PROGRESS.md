# Project Progress

## Veloce harness update
- Reconciled the shared agent instructions across `AGENTS.md`, `CLAUDE.md`,
  and `.github/copilot-instructions.md`.
- Added Caveman-inspired concise-by-default conversational guidance to the
  shared instructions.
- Recorded the upstream source and license notices for the adapted guidance.
- Confirmed the instruction files match, Copilot CLI discovers the shared
  instructions, and a fresh session preserves key facts in a concise reply.
- Merged the latest main changes; the Node.js tests and instruction/progress
  line-limit checks pass.

## Session Update (2026-11-09)
- Integrated the pending init-script and init-skill branches, preserving both
  implementations and their documentation.
- Verification: all 15 Node.js tests, POSIX shell syntax, root AGENTS.md and
  docs Markdown line limits, and shared instruction consistency passed.
- Verified shell initialization from another working directory and confirmed
  repeated runs preserve existing agent, progress, and decision content.
- Verified the init skill discovery link and its tracked Markdown content.
- No implementation work remains for these merges. `make check` is unavailable;
  interactive agent execution of the documentation skill was not checked.
- Extended `init` to create root `DECISIONS.md` with the requested design
  decision template, preserving existing decisions on subsequent runs.
- Extended `init` to create root `PROGRESS.md` with the requested placeholder
  template, preserving existing progress on subsequent runs.

## Session Update (2026-11-08)
- Added executable POSIX shell script `init` to create an empty
  `.github/AGENT.md` relative to the script, preserving existing contents.
- Added `scripts/create-agents.js` to generate the requested
  `.github/AGENTS.md` template without overwriting existing instructions.
- Documented generator usage in README's `/init` section and added tests for
  exact content, target directories, existing files, and failure reporting.
- Added `scripts/check-agents-lines.js` to check root `AGENTS.md` against a
  200-line maximum, printing a message before returning a boolean.
- Shared file reading and line counting between both checkers, and added
  AGENTS.md boundary, diagnostic, and working-directory tests.
- Added `scripts/check-markdown-lines.js` to check Markdown files in `docs/`
  against a 150-line maximum, with boolean results and failure diagnostics.
- Documented CLI/import usage and added Node.js tests for line-count boundaries,
  newline formats, invalid paths, and exit statuses.
- Extended `/init` to create root `AGENTS.md` only when missing, with
  project-specific instructions and links to the four documentation files.
- Added `/init` under `skills/init`, exposed through `.agents/skills/init`, to
  create or reconcile the four project documentation files. Documented its use
  in the README.
- Added the standalone Caveman skill under `skills/caveman` and exposed it for
  project skill discovery through `.agents/skills/caveman`.
- `make check` is unavailable because this repository has no Makefile or
  `check` target.

The remaining sections are illustrative template content, not verified Veloce
project status.

## Current State
- Latest commit: {{latest_commit}} (feat: {{feat}})
- Test status: 42/43 passing (test_pagination_edge_case failing)
- Lint: passing

## Completed
- [x] User model and database migration
- [x] Basic CRUD endpoints
- [x] Auth middleware integration

## In Progress
- [ ] Pagination feature (90% - edge case test failing)

## Known Issues
- test_pagination_edge_case returns 500 on empty result sets
- Need to confirm whether deleted users should appear in listings

## Next Steps
1. Fix pagination edge case bug
2. Add "include deleted users" query parameter
3. Update API documentation
