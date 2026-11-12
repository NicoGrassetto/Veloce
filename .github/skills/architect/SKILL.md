---
name: architect
description: Design and document a project's architecture, technology stack, and design decisions in docs/ARCHITECTURE.md. Use when the user types /architect or asks to create or revise architectural documentation.
---

# Architect

Describe the system's architecture, technology stack, design decisions, and
the reasons for them in `docs/ARCHITECTURE.md`.

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

## Technology stack

Include a brief `## Technology stack` section in `docs/ARCHITECTURE.md`.
Summarize the languages, runtimes, frameworks, storage, deployment platform,
and important integrations or tools that will be used, where relevant. Use
a short paragraph or compact table with each technology's role and selection
status; do not inventory every dependency. Include versions only when known.

Base the summary on project evidence and user decisions. Distinguish existing
technologies from accepted future choices, proposals, and undecided items.
Explain each choice briefly and keep it consistent with the components and
design decisions. Ask about material unresolved choices rather than assuming
a stack, and do not install or configure the technologies.

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

## UML diagrams and use-case descriptions

When relevant, include one or more use-case diagrams, a tabular description of
each distinct use case, sequence diagrams, and class diagrams. Choose diagrams
that explain the system rather than adding them merely to fill a template.
Use standard [UML 2.5.1 notation](https://www.omg.org/spec/UML/2.5.1/About-UML)
for all of these diagrams. Relate each diagram and description to confirmed
requirements and distinguish proposed design from implemented behavior.

### Use-case diagrams

When the system has relevant actors and goals, show their interactions with the
system in one or more use-case diagrams. Use UML actors outside a named system
boundary, use-case ellipses inside it, and association lines between actors
and their use cases. Where applicable, show a dashed `<<include>>` arrow from
the base use case to the included use case, a dashed `<<extend>>` arrow from
the extending use case to the base use case, and a generalization line with a
hollow triangle pointing to the general actor or use case.

Give each distinct use case a stable identifier and a user-goal-oriented name.
Use the same identifiers in the diagrams, descriptions, and related sequence
diagrams. If a use case appears in several diagrams, provide one shared
description rather than conflicting copies.

### Use-case description tables

For each use case shown, add a Markdown table with these fields. This table is a
documentation convention; UML does not prescribe this particular table format.

| Field | Content |
|---|---|
| ID and name | Stable use-case identifier and goal-oriented name. |
| Scope and goal | System boundary and outcome of value to the actor. |
| Actors | Primary actor and any supporting actors. |
| Trigger | Event that starts the use case. |
| Preconditions | Conditions required before the use case begins. |
| Main success scenario | Numbered actor and system steps leading to the goal. |
| Alternative and exception flows | Branches or failures, linked to the relevant main-scenario step. |
| Postconditions | State after successful completion and, when applicable, failure. |
| Related requirements | Requirement identifiers or documented sources. |
| Open questions | Missing or unconfirmed details, when applicable. |

Use confirmed information; identify unknowns instead of inventing details.
Ensure the actors, flows, and outcomes agree with the diagrams and requirements.

### Sequence diagrams

When interactions or message ordering are relevant, show participants and UML
lifelines, messages in time order, and activation and return notation as
appropriate. Distinguish synchronous calls with filled arrowheads,
asynchronous messages with open arrowheads, and returns with dashed lines and
open arrowheads. Use standard combined fragments such as `alt`, `opt`, or
`loop` where needed. Connect each diagram to the use-case identifier or
requirement it explains.

### Class diagrams

When class or domain-object structure is relevant, show UML classes with
appropriate name, attribute, and operation compartments. Include supported
types, visibility, associations, roles, and multiplicities when known. Show
generalization with a hollow triangle at the parent, aggregation with a hollow
diamond at the whole, composition with a filled diamond at the whole, and
dependency with a dashed arrow when applicable. Do not infer relationships or
multiplicities without evidence.

### Other diagrams

- Activity diagrams, if relevant, show activities in a process or data processing.
- State diagrams, if relevant, show how the system reacts to internal and
  external events.

### Rendering and scope

Keep editable diagram source inside `docs/ARCHITECTURE.md`, not in separate
diagram or image files. Use a renderer that supports the required UML notation.
Mermaid can represent sequence and class diagrams when its supported notation
is sufficient. PlantUML can represent use-case, sequence, and class diagrams,
but GitHub Markdown does not natively render PlantUML code blocks.

If the target viewer cannot render a needed UML diagram, retain its source in
the document, clearly mark it as unrendered, and report the limitation. Ask the
user about a compatible viewer or an explicit scope change when needed; do not
silently replace UML use-case notation with a non-UML flowchart or claim an
unrendered diagram was displayed. Do not send project content to an external
rendering service. Verify rendering only when an available local tool can do so
without writing outside the permitted file boundary.

## Document structure

Reconcile the existing document rather than replacing it wholesale. Organize
its content using the following sections, adapting the other sections to the
project while retaining `## Design decisions` and its level-three headings:

```markdown
# Architecture

## Overview

## Technology stack

## Architecture
### Architecture diagram

## Components and responsibilities

## Data and control flow

## Use cases
### Use-case diagram(s)
### Use-case descriptions

## Sequence diagrams

## Class diagrams

## Design decisions
### Performance
### Security
### Safety
### Availability
### Maintainability

## Risks, assumptions, and open questions
```

Include the use-case, sequence, and class sections when relevant. If a section
is not relevant, it may be omitted; explain the omission in the document rather
than inventing diagrams or use cases.

Keep `### Performance`, `### Security`, `### Safety`, and `### Availability`.
If one is not relevant, say so and explain why rather than inventing a decision.
`### Maintainability` may be omitted when it is not relevant.

For each applicable decision, record its context, chosen or proposed approach,
reason, relevant requirements or evidence, alternatives, tradeoffs, scope, and
when it should be revisited. Record verification or measurable constraints when
known, and identify unresolved choices without guessing. Distinguish observed
choices from proposals and decisions the user has accepted.

## Finish

Check that each applicable diagram uses standard UML notation and agrees with
its use-case tables and confirmed requirements. Check that the architectural
decisions address those requirements and each required pattern source appears
immediately below its diagram. Confirm the technology summary matches the
evidence and clearly labels proposed or undecided choices. Record unresolved
questions and rendering limitations in `docs/ARCHITECTURE.md` and report them
in chat. Do not claim a design is approved or implemented without evidence.
Confirm that the skill changed no other file.
