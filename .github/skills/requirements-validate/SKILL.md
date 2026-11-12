---
name: requirements-validate
description: Validate docs/REQUIREMENTS.md for validity, consistency, completeness, realism, and verifiability. Use when the user types /requirements-validate or asks to review whether requirements reflect current user needs and can be delivered and verified.
---

# Requirements validation

Review `docs/REQUIREMENTS.md` against current user needs, project constraints,
and evidence. Perform all five checks below; document structure alone is not
proof that requirements are valid.

## Scope

- Read the requirements document and relevant project context without changing
  any files. Report findings in chat, not in a separate report file.
- Do not rewrite requirements, update progress or approval records, implement
  features, or run commands that change project state.
- These boundaries apply whenever this skill runs. They keep review separate
  from authoring and remain in force unless the user explicitly changes scope.
- User approval is a separate decision. Do not invent stakeholder confirmation
  or treat a successful review as sign-off.

## Preparation

1. Read `docs/REQUIREMENTS.md`. If it is missing or empty, report that validation
   is blocked and request the requirements to review; do not generate them.
2. Identify the system boundary, intended users, goals, functions, constraints,
   assumptions, and recorded requirement sources. Use requirement identifiers
   where present; otherwise cite headings and line numbers without adding IDs.
3. Read relevant sources for current user needs, decisions, interfaces,
   technology, budget, resources, and schedule. Distinguish confirmed project
   facts from examples, proposals, outdated notes, and assumptions.
4. Record missing evidence as unresolved. Continue checks that can be performed
   independently rather than treating missing information as a pass.

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
  experiments rather than running them during this read-only review.
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
- For runtime behavior, outline a test with preconditions, inputs or actions,
  and expected results that would demonstrate compliance.
- Where tests are unsuitable, identify a concrete inspection, analysis, or
  demonstration and its acceptance criterion, such as a licensing inspection.
- Check whether verification is practical within the available environment,
  budget, and schedule. Flag subjective acceptance that could cause disagreement
  between customer and contractor. Do not invent agreed thresholds.
- This review evaluates whether compliance can be demonstrated; it does not
  claim that the system has been implemented or that its tests have passed.

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

Do not silently correct findings. Reassess affected checks when answers arrive.
State remaining limitations without claiming full standards conformance,
unqualified completeness, or stakeholder approval.
