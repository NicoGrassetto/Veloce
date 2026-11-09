---
name: init
description: Initialize project documentation when the user invokes /init or asks to initialize a project. Creates AGENTS.md only when missing and creates or updates docs/DECISIONS.md, docs/ARCHITECTURE.md, root PROGRESS.md and docs/FEATURES.md using repository evidence and confirmed requirements.
---

# Project initialization

Prepare a project for reliable agent work by creating these files at the
repository root:

- `AGENTS.md` (only if it does not already exist)
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `PROGRESS.md`
- `docs/FEATURES.md`

This skill initializes documentation, not application code, infrastructure or
dependencies. Do not scaffold a stack, introduce tooling or implement features
unless the user separately requests that work.

## 1. Discover the project

Read the repository's agent instructions, README, existing documentation,
dependency manifests, build scripts, CI configuration and relevant source
structure. Inspect the working tree before editing.

Identify the project's purpose, stack and versions, architectural conventions,
application logic, infrastructure, tooling and exact setup, development, test,
type-check, lint and full-verification commands.

Distinguish implemented behavior from examples, proposals and template
placeholders. Do not copy illustrative technology choices, test counts or
features into the project's actual state. Mark unavailable commands and unknown
facts explicitly; do not assume `make check` exists.

For an empty project, ask what the project should do before inventing its
architecture or feature list. Ask one focused question at a time when missing
requirements or conflicting evidence would materially change the documents.
Record unresolved questions instead of guessing.

## 2. Create or reconcile the documents

Create `docs/` if necessary. Use the templates below as a minimum structure and
populate them with discovered facts and confirmed requirements, not unfilled
template variables.

On repeated runs, read all four files first. Preserve valid decisions, history,
feature IDs, verification results and user edits. Add missing sections or update
facts supported by evidence; do not reset progress or overwrite the documents
wholesale. Surface conflicts before replacing existing decisions.

### AGENTS.md

Create `AGENTS.md` at the repository root only if it does not already exist.
Leave an existing `AGENTS.md` unchanged and follow its instructions. When
creating it, incorporate applicable conventions from other existing agent
instruction files and respect any repository synchronization policy.

```markdown
# Agent Instructions

## Project Overview
## Quick Start
## Hard Constraints
## Topic Docs
- [Architecture](docs/ARCHITECTURE.md)
- [Decisions](docs/DECISIONS.md)
- [Progress](PROGRESS.md)
- [Features](docs/FEATURES.md)

## At Session Start
1. Read PROGRESS.md and docs/DECISIONS.md.
2. Run the documented baseline verification command when available.
3. Continue from PROGRESS.md "Next Steps".

## Work Rules
- Work on one feature at a time.
- Verify the current feature before starting the next.
- Keep changes scoped to the active feature.

## Before Session End
1. Update PROGRESS.md with completed work and blockers.
2. Run the documented verification commands and record the results.
3. Follow the repository commit policy; preserve unrelated changes.
```

Populate the overview, quick-start commands and constraints from repository
evidence and confirmed requirements. Include each constraint's source,
applicability and reconsideration condition, linking to decision IDs where
appropriate. Do not invent commands, policies or technology choices.

### docs/DECISIONS.md

```markdown
# Design Decisions

## Decisions

### D001: <decision title>
- Date: <YYYY-MM-DD>
- Status: <proposed, accepted or superseded>
- Context: <problem and supporting repository path or user requirement>
- Decision: <chosen approach>
- Alternatives: <rejected approaches and reasons>
- Consequences: <tradeoffs and constraints>
- Applies when: <scope or triggering condition>
- Revisit when: <expiry or reconsideration condition>

## Open Questions
```

Record actual architectural, application, infrastructure and tooling decisions.
Distinguish observed choices from user-approved decisions. Each constraint must
include its source, applicability and reconsideration condition. If there are
no known decisions, say so instead of creating a fictional D001.

### docs/ARCHITECTURE.md

```markdown
# Project Architecture

## Overview
## Technology Stack
## Repository Structure
## Components and Responsibilities
## Data and Control Flow
## Infrastructure and Deployment
## Conventions and Constraints
## Development and Verification Commands
## Unknowns
```

Describe the current architecture separately from planned components. Link
constraints to decision IDs and cite representative source paths. Cover
application logic, data storage, external integrations and deployment only
where applicable. For commands, record their purpose, working directory,
prerequisites and exact invocation. Explicitly note missing verification levels.

### PROGRESS.md

```markdown
# Project Progress

## Current State
## Completed
## In Progress
## Blocked
## Verification

| Check | Command | Result | Evidence |
|-------|---------|--------|----------|

## Next Steps
```

Record the actual state, not estimated success. Use `not run`, `passed`, `failed`
or `unavailable` for verification results, with the execution date and a concise
result or blocker as evidence. Link work items to feature IDs where applicable.
Keep only one feature active; break its next steps into design, implementation,
review and verification work as needed.

### docs/FEATURES.md

```markdown
# Project Features

## Scope

## Feature List

| ID | Feature | Acceptance Criteria | Verification Command | Status | Evidence |
|----|---------|---------------------|----------------------|--------|----------|

## Work Rules
- Keep at most one feature in progress.
- Complete verification before starting the next feature.
- Do not mark a feature passing based only on written code.

## Open Questions
```

Use stable IDs such as `F001`, one independently verifiable user outcome per
entry, with measurable acceptance criteria. Derive entries from confirmed
requirements, including `docs/REQUIREMENTS.md` when present, and existing
implementation. Do not invent features to fill the table.

Use `pending`, `in progress`, `blocked` and `passing` states. Mark unverified
existing features pending and explain that their implementation exists but
verification is outstanding. If a repository verification script owns feature
states, preserve its authority and do not manually change those states.

## 3. Verify and hand off

Check that all four documents exist, contain project-specific content and agree
on commands, decisions, feature IDs and current state. Check that root
`AGENTS.md` exists and, if it predated initialization, remains unchanged.
Ensure a new agent can
find how to run the project, how to verify it and what to do next from these
documents alone.

Run existing checks when required by repository instructions or to establish
the initialization baseline. Use the smallest relevant commands and proceed
through static analysis, runtime tests and system-level verification in that
order; stop escalation when an earlier level fails. Do not install dependencies
unless a selected command fails because they are missing. Record unavailable or
failed checks as blockers without claiming the project is ready.

Finish by reporting which documents were created or updated and any unresolved
blockers. Follow repository commit policy, preserving unrelated working-tree
changes. Initialization is complete when all four documents are populated and
root `AGENTS.md` exists;
project readiness is a separate claim requiring its documented checks to pass.
