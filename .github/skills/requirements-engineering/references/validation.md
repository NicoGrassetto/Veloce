# Validation

Check that the specified requirements in `docs/REQUIREMENTS.md` describe the
system the user actually needs, then record the user's approval. The
specification exit checklist has already checked that each requirement is
well written. Validation looks for the wrong requirement, the missing one, and
the one that can't be built or tested.

Contents: Rules · Validation loop · Checks · Independent review · Mock-up ·
User review and sign-off · Exit checklist · Changing signed-off requirements

## Rules
- **Don't grade your own work.** You wrote these requirements, so you will
  overrate them. An independent reviewer runs the checks. If you disagree
  with a finding, don't drop it: add it to Open questions with your reason,
  and the user decides.
- **Fix problems where they started.** A missing or wrong need goes back to
  elicitation. An unclear, contradictory or untestable requirement goes back
  to specification. Follow that phase's rules for writing, then validate
  again. Questions for the user go to Open questions and are asked during the
  user review.
- **Write findings down.** Put every finding that only the user can decide
  under Open questions, starting with "Validation:", so the next session can
  see it.
- **Only the user approves.** Never sign off for the user, and never treat
  silence or a vague reply as approval.

## Validation loop
1. Confirm the specification exit checklist passes. Open questions marked
   "Validation:" don't count against it; the user review resolves them. If
   it fails for any other reason, return to specification.
2. Run the independent review, with a fresh reviewer each round.
3. Fix each finding at its source, or add it to Open questions if only the
   user can decide.
4. Repeat steps 2 and 3 until the verdict is Accept. If the third round still
   isn't Accept, fix what you can, add the remaining findings to Open
   questions and move on: the user decides what happens next.
5. If any story has a user interface, build a mock-up.
6. Run the user review and record the sign-off.

## Checks
| Check | Question | Example finding |
|---|---|---|
| Validity | Does every story and requirement serve a goal, success measure or stakeholder need the user stated? | FR-007 emails a weekly report that nobody asked for. |
| Completeness | Does every goal, success measure and stakeholder need have a story? Does each story cover what users will obviously try next, such as undoing or correcting what they just did? | Members can book a room, but nothing lets them cancel. |
| Consistency | Do two requirements, assumptions or Out of scope items contradict each other or use different numbers for the same thing? | FR-002 closes bookings at 18:00, FR-009 at 20:00. |
| Realism | Can it be built within the known budget, deadline and required technology, and do the outside systems it relies on exist? If these constraints aren't recorded, ask. | NFR-003 demands 100% uptime. |
| Verifiability | Can a tester follow every Verified by step without asking anyone, and is every result observable? | "Check that the room is released" with no way to see it. |

A completeness finding that needs a new story or capability becomes an Open
question; never add it yourself. A missing detail inside an existing story is
fixed in specification.

Verified by steps may assume test setup, such as setting the clock or using a
test inbox, because that is a design decision. Report only steps whose result
can't be observed or whose meaning is unclear.

## Independent review
Use a reviewer that didn't write the requirements: a subagent, or a new
session that sees only `docs/REQUIREMENTS.md` and not this conversation. If
you can't start one, do the review yourself in three separate passes, one per
perspective, and note that in the sign-off.

Give the reviewer this brief:

```text
Review docs/REQUIREMENTS.md. Don't edit it; only report.
1. Read it three times, each time as a different person:
   - The user (validity, completeness): does every story and requirement
     serve a goal, success measure or stakeholder need in the document? What
     do I need that no story covers?
   - A tester (verifiability): can I follow every Verified by step and
     observe its result? Test setup, such as setting the clock or using a
     test inbox, may be assumed.
   - A developer (consistency, realism): do any requirements, assumptions or
     Out of scope items contradict each other? Can everything be built within
     the recorded constraints, with outside systems that exist?
2. Feature-list test: write one feature-list entry per story with its title,
   priority, user-visible behavior and verification steps. Every question you
   would have to ask and every detail you would have to invent is a finding.
3. Report each new finding as: ID · check · problem · suggested fix ·
   severity (blocker, major or minor). A finding is new unless an Open
   question or an assumption already covers it.
4. End with a verdict:
   - Accept: no new blocker or major findings.
   - Revise: new findings that can be fixed in the document.
   - Block: a problem that only the user can resolve stops everything else.
```

## Mock-up
Build one when any story has a user interface, so the user can see what the
requirements describe before anything is built.
- Use plain HTML and CSS, with JavaScript only to click between screens. No
  backend and no real data.
- Put it in `docs/mockups/`, one file per story with a screen, for example
  `docs/mockups/S01.html`.
- Use the exact wording, fields and failure messages from the requirements.
  Don't add screens or features the requirements don't describe.
- Ask the user to click through it and say what is wrong or missing. Each
  answer becomes a fix or an Open question.
- The mock-up is throwaway: never build the product on it. Delete it after
  sign-off unless the user wants to keep it.

## User review and sign-off
1. Walk the user through the stories in rank order. For each one, say in
   plain words what the system will do, what it won't do (Out of scope) and
   how it will be checked. Ask: "Is this what you need? Is anything wrong or
   missing?"
2. Resolve every Open question with the user. Record the answers and update
   the requirements by the rules of their phase. If anything changed, run the
   independent review again before asking for approval.
3. Ask for explicit approval: "Do you approve these requirements as the basis
   for building the system?" Only a clear yes counts.
4. Add a row to the Sign-off section at the end of `docs/REQUIREMENTS.md`,
   creating the section the first time:

   ```markdown
   ## Sign-off
   | Date | Approved by | Scope | Review | Mock-up |
   |---|---|---|---|---|
   | <date> | <name> | All stories | Accept (<subagent, new session or three self-review passes>) | <tried on date, or none> |
   ```

5. Record the approval in `docs/DECISIONS.md`. Commit both files with the
   message "Sign off requirements". That commit is the approved version.

## Exit checklist
Validation is finished when every box is checked:
- [ ] The specification exit checklist passes.
- [ ] The latest independent review's verdict is Accept.
- [ ] Its feature-list test produced an entry for every story without
      questions or invented details.
- [ ] Every story with a user interface is in a mock-up the user has tried.
- [ ] Open questions is empty.
- [ ] The Sign-off row is added, the approval is in `docs/DECISIONS.md`, and
      both files are committed.

The requirements are then done. Turning the stories into a feature list is
the next step, outside this skill.

## Changing signed-off requirements
When the user wants to change something after sign-off:
1. Add the request to Open questions, starting with "Change:", with who asked
   and why.
2. Find everything it touches: the stories and requirements involved,
   everything that traces to them or depends on them (search for their IDs),
   and related Glossary terms and Assumptions. If a feature list exists, note
   which of these stories are already built.
3. Tell the user the impact: what changes, which built work has to change,
   and roughly how big the change is. Ask whether to go ahead.
4. If the user declines, remove the request and record the decision in
   `docs/DECISIONS.md`.
5. If the user agrees, make the change by the rules of the Elicitation and
   Specification phases in SKILL.md:
   - Never edit a story that is already built. Add a new story that describes
     the change and depends on the old one.
   - Otherwise update the story and its requirements in place. Never reuse
     an ID.
6. Validate the affected stories again and add a Sign-off row whose Scope
   names them.

> Sources: the five checks and the change steps are adapted from Ian
> Sommerville's *Software Engineering* and paraphrased.
