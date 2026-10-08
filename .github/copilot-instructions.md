Completion criteria:
- To be implemented as a template
  Project tech stack, architectural convention, verification commadns  etc
  Application logic, infrastructure, tooling, documentation
break large goals into small building blocks — design, code, review, test — let the agent assemble them one by one, then use those blocks to compose more complex tasks.

Verification commands:

For now just an example -> 
- Tests: pytest tests/ -x
- Type check: mypy src/ --strict
- Lint: ruff check src/
- Full verification: make check (includes all above)


project/
├── AGENTS.md              # Entry: project overview, run commands, hard constraints
├── src/
│   ├── api/
│   │   ├── ARCHITECTURE.md  # API layer architecture decisions
│   │   └── ...
│   ├── db/
│   │   ├── CONSTRAINTS.md   # Database operation hard constraints
│   │   └── ...
│   └── ...
├── PROGRESS.md             # Current progress: done, in-progress, blocked
└── Makefile                # Standardized commands: setup, test, lint, check

Managing Agent State with ACID Principles
This analogy comes from database transaction management. You might feel like this is overcomplicating things, but it actually provides a very practical framework:

Atomicity: A "logical operation" (say, adding an endpoint and updating its tests) is committed as a whole only once it's complete and verified. A failed or abandoned attempt gets discarded, not partially merged. All or nothing.
Consistency: Define "consistent state" verification predicates — all tests pass, lint reports zero errors. The agent runs verification after each operation; inconsistent intermediate states should not be committed. After an operation, the system should be in a verifiably correct state.
Isolation: When multiple agents work concurrently, design state files to avoid race conditions. Simple approach: each agent uses its own progress file, or use git branches for isolation. Concurrent writes to the same file are a common source of trouble.
Durability: Critical project knowledge lives in git-tracked files. Temporary state can stay in session memory, but knowledge that must survive across sessions has to be written to files. What's in your head doesn't count — only what's written down counts.

# AGENTS.md

## Project Overview
Python 3.11 FastAPI backend, PostgreSQL 15 database.

## Quick Start
- Install: `make setup`
- Test: `make test`
- Full verification: `make check`

## Hard Constraints
- All APIs must use OAuth 2.0 authentication
- All database queries must use SQLAlchemy 2.0 syntax
- All PRs must pass pytest + mypy --strict + ruff check

## Topic Docs
- API Design Patterns (`docs/api-patterns.md`) — Required reading when adding endpoints
- Database Rules (`docs/database-rules.md`) — Required when modifying database operations
- Testing Standards (`docs/testing-standards.md`) — Reference when writing tests

Every instruction should document its source ("why was this rule added?"), applicability condition ("when is this rule needed?"), and expiry condition ("under what circumstances can this rule be removed?").

## At session start (clock in)
1. Read PROGRESS.md for current state
2. Read DECISIONS.md for important decisions
3. Run make check to confirm repo is in consistent state
4. Continue from PROGRESS.md "Next Steps" section

## Before session end (clock out)
1. Update PROGRESS.md
2. Run make check to confirm consistent state
3. Commit all completed work

# Startup Readiness Checklist

## Start Commands
- Install dependencies: `make setup`
- Start dev server: `make dev`
- Run tests: `make test`
- Full verification: `make check`

## Current State
- All dependencies installed and locked
- Test framework configured (Vitest + React Testing Library)
- Example test passing (1/1)
- Lint rules configured (ESLint + Prettier)

## Project Structure
- src/ — Source code
- src/components/ — React components
- src/api/ — API client
- tests/ — Test files

# Task Breakdown

## Task 1: User Authentication Basics
- Implement JWT auth middleware
- Add login/register endpoints
- Acceptance: pytest tests/test_auth.py all passing

## Task 2: User Profile Page
- Implement user profile CRUD
- Add profile edit form
- Acceptance: pytest tests/test_profile.py all passing

## Task 3: Search Feature
- ...


## Initialization Acceptance Checklist
- [ ] `make setup` succeeds from scratch
- [ ] `make test` has at least one passing test
- [ ] A new agent session can answer "how to run" and "how to test" from repo contents alone
- [ ] Task breakdown file exists with at least 3 tasks
- [ ] Everything committed to git

how to enforce WIP
## Work Rules
- Work on one feature at a time
- Only start the next feature after the current one passes end-to-end verification
- Don't "also refactor" feature B while implementing feature A

F01: User Registration
  Verification: curl -X POST /api/register -d '{"email":"test@example.com","password":"123456"}' | jq .status == 201
  State: passing

## Feature List Rules
- Feature list file: /docs/features.md
- Only one feature active at a time
- Verification command must pass before marking as passing
- Don't modify feature list states yourself — the verification script updates them automatically

## Definition of Done
- Feature complete = end-to-end verification passed, not "code is written"
- Required verification levels:
  1. Unit tests pass
  2. Integration tests pass
  3. End-to-end flow verification passes
- Do not proceed to level 2 if level 1 fails
- Do not proceed to level 3 if level 2 fails

2. Build a Three-Layer Termination Validation
Layer 1: Syntax and Static Analysis. Lowest cost, least information, but must pass. This is the bare minimum—you need to spell the words correctly before reading further.
Layer 2: Runtime Behavior Verification. Test execution, application startup checks, critical path validation. This is the core evidence of completion—not just written, but runnable.
Layer 3: System-Level Confirmation. End-to-end testing, integration validation, user scenario simulation. The last line of defense against premature declarations—not just runnable, but correct.


<!-- 4. Capture Runtime Signals -->
<!-- Effective runtime signals include: -->

<!-- Did the application successfully start and reach a ready state? -->
<!-- Did critical feature paths execute successfully at runtime? -->
<!-- Were database writes, file operations, and other side effects correct? -->
<!-- Were temporary resources cleaned up? -->

