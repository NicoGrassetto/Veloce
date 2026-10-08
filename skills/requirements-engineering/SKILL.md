---
name: requirements-engineering
description: Elicits, specifies and validates software requirements with the user and records them in docs/REQUIREMENTS.md. Use when starting a new project or feature, when requirements are vague or missing, or when the user asks to gather, write, review or change requirements.
---

# Requirements engineering
Guidelines:
- Functional requirements:
- Non-functional requirements:

- The output of this process and skill is a REQUIREMENTS.md file listing the requirements: Each row represents a requirement alongisde a percentage metric assessing whether it's been accuratly explained. Keep asking questions to the user until the metric for all requirements is at 100%

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
During the validation, you check that requirements define the system that the customer really wants.

During the requirements validation process, different types of checks should be
carried out on the requirements in the requirements document. These checks include:
1. Validity checks These check that the requirements reflect the real needs of system users. Because of changing circumstances, the user requirements may have
changed since they were originally elicited.
2. Consistency checks Requirements in the document should not conflict. That is,
there should not be contradictory constraints or different descriptions of the
same system function.
3. Completeness checks The requirements document should include requirements
that define all functions and the constraints intended by the system user.
4. Realism checks By using knowledge of existing technologies, the requirements
should be checked to ensure that they can be implemented within the proposed
budget for the system. These checks should also take account of the budget and
schedule for the system development.
5. Verifiability To reduce the potential for dispute between customer and contractor, system requirements should always be written so that they are verifiable.
This means that you should be able to write a set of tests that can demonstrate
that the delivered system meets each specified requirement.

- instructions: skills/requirements-engineering/references/validation.md

Validation techniques:

1. Build a mock-up of the solution in plain html, css, and javascript just to showcase and validate the vision of the system (if there is any frontend). Otherwise skip.

2. Test-case generation Requirements should be testable. If the tests for the
requirements are devised as part of the validation process, this often reveals
requirements problems.

3.Requirements reviews The requirements are analyzed systematically by the user/programme who check for errors and inconsistencies. By the end of the phase ask the user to write "sign off" which acts as a legal proof that the user validates the requirements and you can proceed further.   If a test is difficult or impossible to design, this usually
means that the requirements will be difficult to implement and should be reconsidered.

### Requirements change
Problem analysis and change specification The process starts with an identified requirements problem or, sometimes, with a specific change proposal.
During this stage, the problem or the change proposal is analyzed to check that
it is valid. This analysis is fed back to the change requestor who may respond
with a more specific requirements change proposal, or decide to withdraw
the request.
2. Change analysis and costing The effect of the proposed change is assessed
using traceability information and general knowledge of the system requirements. The cost of making the change is estimated in terms of modifications to
the requirements document and, if appropriate, to the system design and implementation. Once this analysis is completed, a decision is made as to whether or
not to proceed with the requirements change.

Change implementation The requirements document and, where necessary, the
system design and implementation, are modified. You should organize the
requirements document so that you can make changes to it without extensive
rewriting or reorganization. As with programs, changeability in documents is
achieved by minimizing external references and making the document sections
as modular as possible. Thus, individual sections can be changed and replaced
without affecting other parts of the document.
