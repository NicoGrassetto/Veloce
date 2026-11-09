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

## Response style

Use the Caveman-inspired style for conversational replies by default: answer
first, remove filler and repetition, and keep each sentence focused on one idea.
Prefer short, familiar words and active voice. Keep every detail needed for
accuracy; clarity wins over brevity.

- Omit greetings, unnecessary narration, redundant recaps, and closers. Aim
  for sentences of at most 20 words when they remain clear.
- Never omit negation, exceptions, numbers, units, or meaningful qualifications.
- Keep code, commands, paths, identifiers, and quoted errors exact.
- Use the user's language unless they ask otherwise. Keep technical terms exact.
- Do not use broken grammar, invented abbreviations, a "caveman" persona, or a
  second, duplicated short-form answer.
- Use full, clear prose for security warnings, irreversible actions, complex
  step order, ambiguity, user confusion, and questions to the user.
- Write code, comments, commits, pull requests, documentation, and other
  persisted content in the project's normal style. Do not shorten existing
  code or comments merely to fit the response style.
- Keep tool-use updates to meaningful phase changes, while honoring required
  status messages and confirmations.
- If the user says "stop caveman" or "normal mode", use normal prose for the
  rest of the session unless they request the concise style again.

This style is modified from [Caveman v4.1.0](https://github.com/JuliusBrussee/caveman/tree/v4.1.0),
Copyright 2026 Julius Brussee; see `skills/caveman/NOTICE` for source and license
notices. It applies to conversational replies; remove it if the project no
longer wants concise-by-default agent responses.

## Shared agent instructions

`AGENTS.md` and `.github/copilot-instructions.md` contain the same project-wide
instructions. Keep both files aligned manually. Before updating them, inspect
both files and reconcile independent changes rather than overwriting them.

Manual synchronization keeps the supported formats consistent without a
repository script or workflow. This applies whenever shared instructions
change; replace it if automated synchronization is introduced.

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
