---
name: requirements
description: Create or revise docs/REQUIREMENTS.md using an ISO/IEC/IEEE 29148:2018 software requirements specification structure. Use when the user asks to document or change software requirements.
---

# Requirements

Create or revise a software requirements specification (SRS) in
`docs/REQUIREMENTS.md`.

## File boundary

- The only file this skill may create or modify is `docs/REQUIREMENTS.md`,
  relative to the repository root.
- Read other files as context, but do not change them. Do not update progress
  records, feature lists, decision logs, code, tests, or this skill.
- Keep requirements, open questions, decisions, traceability, and review status
  inside `docs/REQUIREMENTS.md`; do not create companion files.
- This boundary applies whenever the skill runs. It keeps requirements work
  isolated and remains in force unless the user explicitly changes its scope.

## Document structure

Use the following outline, adapted from the SRS guidance in
ISO/IEC/IEEE 29148:2018. It is an organizational guide, not a claim of full
standards conformance. Keep each section; explain why a section is not
applicable rather than silently dropping it.

```markdown
# Software Requirements Specification

## 1. Introduction
### 1.1 Purpose
### 1.2 Scope
### 1.3 Product perspective
### 1.4 Product functions
### 1.5 User characteristics
### 1.6 Limitations
### 1.7 Assumptions and dependencies
### 1.8 Definitions
### 1.9 Acronyms and abbreviations

## 2. Requirements
### 2.1 External interfaces
### 2.2 Functions
### 2.3 Usability requirements
### 2.4 Performance requirements
### 2.5 Logical database requirements
### 2.6 Design constraints
### 2.7 Standards compliance
### 2.8 Software system attributes

## 3. Verification

## 4. Supporting information
### 4.1 Open questions
### 4.2 Decisions and change history
### 4.3 Review and approval status

## 5. References
```

Describe system boundaries and relevant system, user, hardware, software,
communication, and service interfaces under product perspective. Put detailed
interface requirements in section 2.1. Cover applicable quality attributes,
including reliability, availability, security, and maintainability, in
section 2.8. The supporting-information subsections are this skill's convention
for keeping the work in one file, not mandated IEEE headings.

## Writing and updating

1. Read the existing document and relevant project context. Preserve confirmed
   requirements, identifiers, and user-authored material when organizing it.
2. Ask the user about missing or ambiguous requirements. Record unresolved
   questions in section 4.1; do not invent answers, constraints, or approvals.
3. Give each requirement a stable, unique identifier, such as `REQ-001`.
   Write one obligation per requirement using "shall", with measurable
   conditions and outcomes. Separate requirements from rationale and assumptions.
4. Record each requirement's source and priority when known. In section 3,
   map every requirement identifier to a verification method (inspection,
   analysis, demonstration, or test) and an explicit acceptance criterion.
   Record unknown values as unresolved rather than guessing them.
5. Record decisions, revisions, and actual user approval in section 4.
   Keep unapproved material marked as draft. Reference sources in section 5.
6. Before finishing, check section coverage, unique identifiers, consistency,
   traceability, and verifiability. Report unresolved gaps without claiming
   completion or standards conformance. Confirm that no file other than
   `docs/REQUIREMENTS.md` was changed by the skill.

## Sources

- [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html):
  requirements-engineering processes and information-item guidance.
- [ReqView SRS example](https://www.reqview.com/doc/iso-iec-ieee-29148-srs-example/):
  a public example of an SRS organized using the standard.