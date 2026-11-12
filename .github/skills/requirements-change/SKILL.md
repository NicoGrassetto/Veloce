---
name: requirements-change
description: Manage additions, revisions, and removals to existing requirements in docs/REQUIREMENTS.md. Use when the user types /requirements-change or requests a requirements change. Assess cost, schedule, effort, dependencies, and risks, obtain the user's decision, and invoke requirements-validation after applying an approved change.
---

# Requirements change

Assess a proposed requirements change, establish its impact, and apply it only
after the user accepts the proposal and its known consequences. Automatically
run `requirements-validation` on the resulting requirements.

## Scope

- The only paths this skill may create or modify are `docs/REQUIREMENTS.md` and
  the repository-root `tests/` directory and its contents. This boundary also
  applies to invoked skills, command outputs, fixtures, caches, and writes
  through symlinks. Honor any narrower boundary supplied by the caller.
- Read other files as evidence, but do not modify application code, dependency
  manifests, configuration, progress records, feature lists, other documents,
  or skill files. Do not install dependencies, stage, or commit changes.
- Keep change records, impact analysis, decisions, open questions, and
  validation results inside `docs/REQUIREMENTS.md`. Report the outcome in chat;
  do not create a separate change-request or impact-analysis file.
- These boundaries apply whenever this skill runs. They keep change management
  separate from application implementation until the user explicitly changes
  scope.

## 1. Establish the proposed change

1. Read `docs/REQUIREMENTS.md` and relevant project context. If there are no
   existing requirements, explain that an initial specification is needed
   rather than inventing a baseline.
2. Identify pre-existing workspace changes and preserve unrelated work. Use
   the current requirements as the baseline unless the user identifies another
   one; distinguish pending edits from an approved baseline.
3. Identify the change's source, reason, affected users, and affected requirement
   IDs. Specify additions, revisions, and removals with their before-and-after
   meaning, including acceptance criteria and constraints.
4. Clarify missing intent before proposing a solution. Do not infer changed
   user needs, acceptance thresholds, or approval from ambiguous wording.
5. Record a uniquely identified proposed change under section 4.2, Decisions
   and change history, using the existing document convention or `CHG-001`.
   Keep the effective requirements unchanged until approval.

## 2. Assess impact before approval

Trace direct and indirect effects through related requirements, acceptance
criteria, interfaces, data, existing implementation, and tests. Read relevant
code and project records as evidence without changing them. Separate changes
within this skill's scope from implementation work that must follow separately.

Cover each of these areas, marking missing evidence as unresolved:

| Area | Assess |
|---|---|
| Scope and user value | The need served, affected users and workflows, additions or removals, and compatibility with other requirements. |
| Cost | Incremental implementation, rework, verification, migration, training, licensing, infrastructure, operation, and maintenance costs where applicable. |
| Schedule and effort | Work added or removed, available capacity, dependencies, affected milestones, and delivery risks. Do not equate effort directly with elapsed time. |
| Technical feasibility | Existing technology, integrations, data migration, backward compatibility, and deployment implications. |
| Quality and obligations | Effects on performance, reliability, security, accessibility, and applicable contractual or regulatory constraints. |
| Verification and risk | Tests to add or change, regression coverage, feasibility uncertainty, and consequences of accepting, rejecting, or deferring the change. |

Compare the baseline with the proposal and identify the expected difference.
For cost and schedule figures, cite their source and assumptions, including
currency, recurring-cost period, rates, capacity, and estimate confidence when
available. Use ranges only when evidence supports them. Do not invent prices,
budgets, effort, staffing, deadlines, or precision.

Distinguish confirmed effects from estimates and unknowns. Missing cost or
schedule evidence is not zero impact. Ask focused questions, one at a time,
when a missing input prevents a meaningful decision. Consult current
authoritative technology or pricing sources when needed and available, without
sending private project content to external services.

Record the analysis with the proposed change in `docs/REQUIREMENTS.md`.

## 3. Obtain the decision and apply the change

1. Present the proposed requirement changes, impact, unresolved risks, and
   alternatives before changing effective requirements or tests.
2. Obtain an explicit accept, reject, or defer decision. Use the host's question
   tool when available. Do not treat the initial request for a change as
   acceptance of an impact analysis the user has not seen. Reuse an existing
   decision only if it covers the same proposal and disclosed impacts.
3. Record the actual decision and its scope. If rejected or deferred, leave
   effective requirements and tests unchanged.
4. If accepted, apply the agreed change to `docs/REQUIREMENTS.md`. Preserve
   stable IDs for revised requirements, allocate unique IDs for additions,
   record removals in the change history without reusing their IDs, and update
   affected cross-references and acceptance criteria.
5. Record unresolved conditions explicitly. Acceptance of a change does not
   prove validation passed or establish final SRS sign-off.

## 4. Trigger requirements validation

After applying an accepted change, invoke `requirements-validation` in the same
task. Do not ask the user to type `/requirements-validation` or stop at a
recommendation to run it.

- Use the host's skill-loading mechanism with the exact name
  `requirements-validation` when available. If it cannot discover the renamed
  skill, read and follow the sibling
  [`requirements-validation/SKILL.md`](../requirements-validation/SKILL.md)
  directly. If neither route works, report validation as blocked; do not
  silently skip it or claim success.
- Supply the change ID, affected requirement IDs, approved intent, impact
  analysis, unresolved assumptions, and applicable write boundary.
- Follow that skill for all five checks and requirement-linked tests rather
  than duplicating its checklist. Review the full effective specification for
  conflicts and omissions, not just the edited lines.
- Record the validation outcome with the change record. Preserve failures and
  unknowns as such; an unavailable test or unknown budget is not a pass.
- If validation reveals a new semantic change, dependency, cost, or schedule
  impact, revise the proposal and impact analysis and obtain a new user
  decision before applying further changes. Revalidate affected requirements.
  Do not change application code to make validation pass.

## Completion

Report the change decision, affected requirements, cost and schedule impact,
validation results, unresolved questions, and any separate implementation work
needed. Distinguish requirements validation from proof that the changed system
has been implemented.

Confirm that this skill and the invoked validation changed only permitted
paths, preserved unrelated work, and did not invent stakeholder approval.
