---
name: requirements-validate
description: Validate docs/REQUIREMENTS.md for validity, consistency, completeness, realism, and verifiability. Use when the user types /requirements-validate or asks to review whether requirements reflect current user needs and can be delivered and verified.
---

# Requirements validation

Review `docs/REQUIREMENTS.md` against current user needs, project constraints,
and evidence. Perform all five checks below; document structure alone is not
proof that requirements are valid.

## Scope

- The only paths this skill may create or modify are `docs/REQUIREMENTS.md` and
  the repository-root `tests/` directory and its contents. This includes test
  fixtures, generated files, caches, and other command outputs. Writes through
  symlinks must resolve to an allowed path.
- Read other files as context, but do not modify application code, dependency
  manifests, configuration, progress records, feature lists, other documents,
  or skill files. Do not stage or commit changes.
- Run commands only when their writes can be kept within the allowed paths.
  Do not install dependencies or run a command that writes elsewhere; report
  the limitation instead. Preserve pre-existing changes outside the scope.
- Report findings in chat rather than creating a separate report file.
- These boundaries apply whenever this skill runs. They keep validation changes
  limited to requirements and tests until the user explicitly changes scope.
- User approval is a separate decision. Do not invent stakeholder confirmation
  or treat a successful review as sign-off.

## Preparation

1. Read `docs/REQUIREMENTS.md`. If it is missing or empty, report that validation
   is blocked and request the requirements to review; do not generate them.
2. Identify the system boundary, intended users, goals, functions, constraints,
   assumptions, and recorded requirement sources. Use requirement identifiers
   where present; otherwise cite headings and line numbers.
3. Read relevant sources for current user needs, decisions, interfaces,
   technology, budget, resources, and schedule. Distinguish confirmed project
   facts from examples, proposals, outdated notes, and assumptions.
4. Note pre-existing workspace changes and record missing evidence as
   unresolved. Continue checks that can be performed independently rather
   than treating missing information as a pass.

## Checks

### 1. Validity

- Trace requirements to the real needs of intended system users and other
  affected stakeholders. Check the underlying need, not just the wording.
- Compare requirements with current goals, workflows, and user feedback.
  Look for changed circumstances, obsolete assumptions, and stale approvals.
- Identify requirements with no supported user need or with evidence that the
  need has changed. Distinguish a demonstrated mismatch from missing evidence.
- Seek stakeholder confirmation when current needs cannot be established from
  available evidence. Earlier approval alone does not establish current validity.

### 2. Consistency

- Compare requirements across the whole document, including functions,
  interfaces, data rules, quality attributes, and constraints.
- Identify incompatible obligations, thresholds, permissions, states, timing,
  assumptions, or dependencies. Cite both sides of each conflict.
- Check that terms, units, identifiers, and cross-references have consistent
  meanings. Distinguish harmless repetition from contradictory requirements.

### 3. Completeness

- Map every confirmed user goal, function, and constraint to requirements.
  Identify uncovered needs and requirements that only partially cover them.
- Consider relevant user roles, end-to-end workflows, inputs, outputs,
  interfaces, error cases, boundary conditions, and quality requirements.
  Assess applicability; do not invent obligations merely to fill a checklist.
- Check the SRS section coverage against the ISO/IEC/IEEE 29148:2018-aligned
  outline used by the `requirements` skill when available. An empty heading
  does not establish coverage; exclusions need a supported explanation.
- Report unresolved questions and placeholders that prevent implementation or
  acceptance. Do not claim completeness while intended scope remains unknown.

### 4. Realism

- Assess whether requirements are feasible individually and together using
  existing technology, available integrations, and project resources.
- Account for the stated budget and schedule, including dependencies,
  procurement or licensing, implementation effort, and verification effort.
  Do not invent costs, delivery dates, staffing, or feasibility estimates.
- Separate established capability from unproven assumptions. Identify evidence,
  estimates, or a feasibility experiment needed to resolve uncertainty; propose
  experiments rather than changing application code or the environment.
- For uncertain or time-sensitive technology claims, consult current
  authoritative documentation when available. Cite evidence and limitations;
  never send private project content to external services.
- If budget, schedule, or essential technical evidence is missing, mark that
  part of the assessment unresolved instead of declaring the requirement feasible.

### 5. Verifiability

- Check every requirement for a clear, observable pass/fail outcome. Identify
  ambiguous terms, combined obligations, missing conditions, undefined units,
  and absent thresholds where a threshold is needed.
- Check that each requirement maps to a suitable verification method and an
  explicit acceptance criterion. Do not substitute "tests pass" for a criterion.
- For runtime behavior, outline or create a test with preconditions, inputs or
  actions, and expected results that would demonstrate compliance.
- Where tests are unsuitable, identify a concrete inspection, analysis, or
  demonstration and its acceptance criterion, such as a licensing inspection.
- Check whether verification is practical within the available environment,
  budget, and schedule. Flag subjective acceptance that could cause disagreement
  between customer and contractor. Do not invent agreed thresholds.
- This review evaluates whether compliance can be demonstrated. Claim that
  system behavior passed verification only when the relevant test was run and
  passed.

## Addressing findings and tests

1. Make changes only when they address validation findings and are supported by
   documented evidence or user decisions. Preserve existing requirement IDs,
   unrelated content, and the distinction between draft and approved material.
2. Ask the user before changing a requirement's intended meaning or choosing
   between conflicting needs. Do not invent requirements, thresholds, budgets,
   schedules, stakeholder decisions, or approvals. Record unanswered questions
   and confirmed decisions in `docs/REQUIREMENTS.md` when relevant.
3. Add or update targeted tests under `tests/` when documented acceptance
   criteria make them possible. Trace each test to a requirement ID or document
   location and follow existing project testing conventions. If the necessary
   framework or behavior is unavailable, report the limitation rather than
   changing files outside the allowed paths or inventing expected behavior.
4. Run the smallest relevant checks for changed tests when their side effects
   can stay within the allowed paths. Report failures and skipped checks; do not
   change implementation or configuration to make a test pass.
5. Before finishing, confirm that this skill's changes stayed within the
   allowed paths and did not overwrite pre-existing work.

## Report and clarification

Report the reviewed scope and evidence, then provide:

1. A summary table covering all five checks. Use `Pass`, `Issues found`, or
   `Unresolved`. A pass requires supporting evidence. If a check has both known
   issues and unknowns, mark `Issues found` and list the unknowns explicitly.
2. Actionable findings, each with a requirement ID or document location, check
   category, problem, evidence, impact, and proposed correction or question.
   For conflicts, cite all affected requirements. For missing requirements,
   cite the unmet user need and relevant document section.
3. Missing evidence and stakeholder decisions required to resolve the review.
   Ask one focused question at a time, starting with the highest-impact gap.
   Use the host's question tool when available.

Describe any corrections, changed files, and verification results. Do not
silently correct findings. Reassess affected checks when answers arrive. State
remaining limitations without claiming full standards conformance, unqualified
completeness, or stakeholder approval.
