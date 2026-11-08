# Veloce agent instructions

## Project context

Veloce is a tool- and model-agnostic software engineering harness. Adapt its
instructions to each project's actual stack, architecture, tools, and
constraints. Template placeholders and examples are not verified facts about
Veloce or a project.

When adapting the harness, document the project overview
(`{{project_overview}}`), hard constraints (`{{hard_constraints_list}}`),
architecture, dependencies, and commands for setup, development, testing,
linting, and full verification. Check that commands and paths exist before
relying on them.

When adding an instruction, record why it was added, when it applies, and when
it can be removed.

## Shared agent instructions

`AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md` contain the same
project-wide instructions. Before synchronizing, inspect all three files and
reconcile independent changes rather than overwriting them.

In this repository, select a reconciled source and run, for example:

```sh
python3 scripts/sync-agent-instructions.py --source AGENTS.md
```

The GitHub Actions workflow also synchronizes these files and stops when
multiple changed sources conflict.

## Session workflow

At the start of a session:

1. Read `docs/PROGRESS.md` and `docs/DECISIONS.md` when they exist. If the
   project keeps these files at its root instead, read those. Treat example or
   placeholder entries as examples, not current project state.
2. Run `make check` when the target exists. Otherwise use the project's
   available verification commands and report what could not be checked.
3. Continue the requested work. Use the progress file's next steps when they
   are relevant and describe actual project work.

Before ending a session:

1. Update the project's progress record with completed work, remaining work,
   blockers, and verification results.
2. Run `make check` when available, or the applicable documented checks.
   Report any missing or failing verification.
3. Commit completed, verified work as a complete logical operation.

## Engineering workflow

- Break large goals into small design, implementation, review, and verification
  blocks. Build more complex work from verified blocks.
- Work on one feature at a time. Finish its end-to-end verification before
  starting another; do not make unrelated refactors.
- Record durable project knowledge in tracked files. Use separate branches or
  progress files for concurrent work to avoid conflicting writes.
- Keep the feature list in `docs/features.md` when the project uses one.
  Only one feature may be active at a time. Its verification command must
  pass before it is marked passing.
- Feature state is updated by the verification script, not by an agent. If the
  script is unavailable, report the limitation rather than marking a feature
  passing manually.
- Consult project topic documents when applicable, including API design,
  database rules, and testing standards, if those documents exist.

## Definition of done

Code being written is not sufficient. A feature is complete only after its
required verification passes:

1. Syntax and static analysis.
2. Unit tests, then integration tests.
3. End-to-end or system-level verification of the user scenario and relevant
   runtime behavior.

Do not advance from a failed level to the next. Check relevant side effects,
startup readiness, and temporary-resource cleanup. Report missing checks or
failures rather than claiming completion.

For project initialization, document how to run and test the project, ensure
setup works from scratch, configure at least one passing test, and provide a
task breakdown with at least three tasks. Commit completed, verified work.

## Agent state and consistency

- **Atomicity:** Complete and verify a logical operation as a whole; do not
  commit a partial or abandoned operation.
- **Consistency:** Define verification predicates and run the applicable checks
  after each operation. Do not commit an inconsistent intermediate state.
- **Isolation:** Isolate concurrent agents with separate branches or progress
  records.
- **Durability:** Keep important project knowledge in tracked files rather than
  relying on conversation memory.

## Template examples

These are illustrations to adapt, not Veloce requirements or evidence that a
tool, file, feature, or test exists:

- Common project commands are `make setup`, `make dev`, `make test`, and
  `make check`.
- A Python project might use Python 3.11, FastAPI, PostgreSQL 15, OAuth 2.0,
  SQLAlchemy 2.0, pytest, mypy, and Ruff. Its checks might be:

  ```sh
  pytest tests/ -x
  mypy src/ --strict
  ruff check src/
  make check
  ```

- A React project might use Vitest, React Testing Library, ESLint, and
  Prettier. Authentication, user profiles, and search are example tasks, not
  requirements for every project.
- A project may document API architecture in `src/api/ARCHITECTURE.md`,
  database constraints in `src/db/CONSTRAINTS.md`, and topic guidance in
  `docs/api-patterns.md`, `docs/database-rules.md`, and
  `docs/testing-standards.md`.
