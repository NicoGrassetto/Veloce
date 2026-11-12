---
name: architect
description: Design and document a project's architecture in docs/ARCHITECTURE.md. Use when the user types /architect or asks to create or revise architectural documentation.
---

# Architect

Describe the system's architecture, its design decisions, and the reasons for
them in `docs/ARCHITECTURE.md`.

## File boundary

- The only file this skill may create or modify is `docs/ARCHITECTURE.md`,
  relative to the repository root. Read other files as context, but do not
  modify them. Keep diagrams and decision records inside the architecture
  document rather than creating separate files.
- This restriction includes tests, requirements, progress records, decision
  logs, code, configuration, generated diagrams, caches, and other command
  outputs. A write through a symlink must resolve to the permitted file.
- Do not install dependencies, stage or commit changes, or run a command that
  writes elsewhere. Report checks that cannot run within this boundary.
  Invoking another skill does not expand the permitted scope.
- This boundary applies whenever the skill runs. It keeps architectural work
  in one document until the user explicitly changes the scope.

## Discover and clarify

1. Read the existing architecture document, requirements, project instructions,
   and relevant implementation and configuration without changing them.
   Preserve existing user-authored material and unrelated workspace changes.
2. Identify system purpose, users, boundaries, requirements, constraints,
   components, interfaces, data flow, and operational environment from
   evidence. Distinguish current implementation from proposed architecture.
3. Treat examples and placeholders as examples, not project facts. Record
   unknowns and ask the user one focused question at a time when missing
   requirements or design choices would materially affect the architecture.
4. Do not silently replace an existing architecture. For a significant design
   choice, explain the options and tradeoffs and obtain the user's decision.

## Architectural patterns and diagram

An established architectural pattern may provide a starting point when it fits
the system's confirmed needs and constraints. Examples include layered,
repository, model-view-controller (MVC), client-server, and pipe-and-filter
architecture. A pattern is optional; do not force one onto an unsuitable system.
Explain the chosen pattern, how it applies, its tradeoffs, and any project-specific
adaptations. Mark proposals as proposed until the user accepts them.

Add an architecture diagram directly to `docs/ARCHITECTURE.md`, for example
using Mermaid. Show the system boundary, major components, and their relationships
or flows where known. Label planned components separately from existing ones and
provide a short textual explanation. If there is not enough information to make
a meaningful diagram, record what is missing and ask the user instead of
inventing components or relationships.

For any architectural pattern other than the five examples above, place a link
to the pattern's original source immediately below the architecture diagram.
Verify that the source is the original; do not present a secondary explanation
as the original or invent a URL. If the original cannot be verified, leave the
pattern decision unresolved and ask for the source or choose a supported
alternative with the user's agreement. Create project-specific diagrams; adapt
an existing diagram only when its license or permission allows it, and link its
original source directly below the diagram.

Include other diagrams only when relevant:

- Use case diagrams show interactions between the system and its environment.
- Activity diagrams show activities in a process or in data processing.
- State diagrams show how the system reacts to internal and external events.
- Sequence diagrams show interactions between actors and the system, and
  between system components.
- Class diagrams show object classes and their associations.

## Document structure

Reconcile the existing document rather than replacing it wholesale. Organize
its content using the following sections, adapting the other sections to the
project while retaining `## Design decisions` and its level-three headings:

```markdown
# Architecture

## Overview

## Architecture
### Architecture diagram

## Components and responsibilities

## Data and control flow

## Design decisions
### Performance
### Security
### Safety
### Availability
### Maintainability

## Risks, assumptions, and open questions
```

Keep `### Performance`, `### Security`, `### Safety`, and `### Availability`.
If one is not relevant, say so and explain why rather than inventing a decision.
`### Maintainability` may be omitted when it is not relevant.

For each applicable decision, record its context, chosen or proposed approach,
reason, relevant requirements or evidence, alternatives, tradeoffs, scope, and
when it should be revisited. Record verification or measurable constraints when
known, and identify unresolved choices without guessing. Distinguish observed
choices from proposals and decisions the user has accepted.

## Finish

Check that the diagram and descriptions agree, the decisions address the
confirmed requirements, and each required pattern source appears immediately
below its diagram. Record unresolved questions in `docs/ARCHITECTURE.md` and
report them in chat. Do not claim a design is approved or implemented without
evidence. Confirm that the skill changed no other file.
