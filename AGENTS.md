# AGENTS.md

## Project Overview
{{project_overview}}

## Quick Start
- Install: `make setup`
- Test: `make test`
- Full verification: `make check`

## Hard Constraints
<example>All APIs must use OAuth 2.0 authentication</example>
{{hard_constraints_list}}

## At session start (clock in)
1. Read PROGRESS.md for current state
2. Read DECISIONS.md for important decisions
3. Run make check to confirm repo is in consistent state
4. Continue from PROGRESS.md "Next Steps" section

## Before session end (clock out)
1. Update PROGRESS.md
2. Run make check to confirm consistent state
3. Commit all completed workzll database queries must use SQLAlchemy 2.0 syntax
- All PRs must pass pytest + mypy --strict + ruff check

## Topic Docs
- API Design Patterns (`docs/api-patterns.md`) — Required reading when adding endpoints
- Database Rules (`docs/database-rules.md`) — Required when modifying database operations
- Testing Standards (`docs/testing-standards.md`) — Reference when writing tests

## At session start (clock in)
1. Read ./docs/PROGRESS.md for current state
2. Read ./docs/DECISIONS.md for important decisions
3. Run make check to confirm repo is in consistent state
4. Continue from ./docs/PROGRESS.md "Next Steps" section

## Before session end (clock out)
1. Update ./docs/PROGRESS.md
2. Run make check to confirm consistent state
3. Commit all completed work

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
