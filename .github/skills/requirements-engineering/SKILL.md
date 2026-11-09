---
name: requirements-engineering
description: Elicits, specifies and validates software requirements with the user and records them in docs/REQUIREMENTS.md. Use when starting a new project or feature, when requirements are vague or missing, or when the user asks to gather, write, review or change requirements.
---

# Requirements engineering

Turn a rough idea into signed-off, testable requirements in
`docs/REQUIREMENTS.md`. The work runs in three phases, each with its own
instructions and exit checklist: elicitation, specification and validation.

## Where to start
Read `docs/REQUIREMENTS.md` and take the first match:
1. The file doesn't exist, or a story is below 100% on the completion metric:
   Elicitation.
2. A story has no `#### System requirements` heading: Specification.
3. There is no `## Sign-off` section: Validation.
4. Open questions has a "Change:" item, or the user asks for a change:
   "Changing signed-off requirements" in the validation instructions.
5. Otherwise the requirements are done.

## Elicitation
Follow [references/elicitation.md](references/elicitation.md). It is the only
source for how to interview the user, how to write and rank stories, and when
elicitation is finished. It produces `docs/REQUIREMENTS.md`.

## Specification
Follow [references/specification.md](references/specification.md). It is the
only source for how to turn the stories in `docs/REQUIREMENTS.md` into
traceable, verifiable system requirements, and when specification is
finished.

## Validation
Follow [references/validation.md](references/validation.md). It is the only
source for how to check that the requirements describe what the user needs,
how to record the user's sign-off, and how to change requirements after
sign-off.

## Rules for every phase
- **Write it down.** Record answers, decisions and questions in the files as
  you go. The conversation is not a record.
- **One phase at a time.** Finish a phase's exit checklist before starting
  the next. When a later phase finds a problem from an earlier one, go back to
  that phase.
- **Run the checklists.** Check every item of an exit checklist; never judge
  it by feel.
- **The user decides** what the system must do, how stories rank and whether
  the requirements are approved.

## Output
- `docs/REQUIREMENTS.md`: problem, goals, stakeholders, scope, ranked stories
  with their system requirements, open questions and sign-off.
- **Completion metric:** every row in the Stories table has an Explained (%)
  value for how accurately that story has been explained. Keep asking the
  user questions until every story is at 100%.
- `docs/DECISIONS.md`: resolved conflicts, declined changes and approvals.

This skill ends at sign-off. Turning the signed-off stories into a feature
list, one entry per story, is the next step.
