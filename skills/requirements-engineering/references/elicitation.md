# Elicitation

Interview the user (technical or not) to turn a rough idea into a ranked list
of testable stories in `docs/REQUIREMENTS.md`. Repeat the interview loop until
every item in the exit checklist is true.

Contents: Mindset · Interview loop · Asking questions · Interviewer rules ·
Story size · Output · Exit checklist

## Mindset
- First answers are usually vague, incomplete or unrealistic. People find it
  hard to say what they need and rarely know what is feasible. Probe instead
  of accepting them as they are.
- People describe needs in their own terms and leave out what feels obvious to
  them. Ask about unfamiliar terms and unstated assumptions.
- Keep an open mind. Don't steer the user toward a solution you already have
  in mind. If an answer surprises you, follow it and update your picture of
  the system.
- Don't ask "What do you want?". People answer better in a concrete context,
  such as a specific situation or a rough prototype you work through together.

## Interview loop
1. **Discover.** Pick the next topic. Start broad (the problem, goals,
   stakeholders and success measures). Move to individual stories once those
   are clear.
2. **Probe.** Ask follow-up questions until the answer is concrete. See
   Interviewer rules.
3. **Record.** Write the answer into `docs/REQUIREMENTS.md` straight away. Add
   anything still unresolved to Open questions.
4. **Organize.** Group related needs into stories, merge duplicates and split
   stories that are too big. See Story size.
5. **Prioritize.** Rank the stories with the user. When two needs conflict,
   show the user both, let them decide, and record the decision in
   `docs/DECISIONS.md`.

## Asking questions
- Ask about one topic per message. Don't bundle several questions into one.
- Keep questions short and in plain language. Explain any technical term you
  can't avoid.
- Ask neutrally ("How should cancellations work?"), not leadingly ("You want
  free cancellations, right?").

## Interviewer rules
Interviewers often skip these steps, and AI interviewers make about as many
mistakes as people do. Follow every rule:
- **Identify every stakeholder.** Early on, ask who will use, pay for, run,
  maintain or be affected by the system, and whether anyone else should be
  consulted. When the user speaks for someone else, record that under Source.
- **Always follow up.** When an answer is vague, general or proposes a
  solution, ask before moving on: "Why do you need that?", "Can you give me a
  recent example?", "What should happen if it fails?", "How often? How many?"
- **Ask how success is measured.** For the project, ask "How will you know
  this worked?". For each story, ask "What would you check to confirm it's
  done?". Turn the answers into success measures and acceptance criteria.
- **Close with a summary.** Before finishing, read back the goals,
  stakeholders, ranked stories, out-of-scope items and open questions. Ask the
  user to correct anything wrong. You're not finished until they confirm.

## Story size
A story is one user-visible behavior that can be built and verified in one
working session.
- Too broad: "Manage bookings". Split it.
- Right size: "Cancel a booking".
- Too narrow: "Add a status column to the bookings table". It has no
  user-visible result, so fold it into the story it serves.

Split a story if its title needs "and", it serves more than one goal, or it
needs more than about five acceptance criteria.

## Output
Write `docs/REQUIREMENTS.md` with this structure:

```markdown
# Requirements

## Problem and goals
<What problem the system solves, for whom, and why it matters now.>

## Success measures
- <How the user will judge success, e.g. "Members can book a room in under a minute.">

## Stakeholders
| Stakeholder | Relationship to the system | Main need | Consulted directly? |
|---|---|---|---|

## Out of scope
- <Capability that will not be built> (<reason; who decided>)

## Stories
| ID | Title | Rank | Depends on | Explained (%) |
|---|---|---|---|---|
| S01 | <verb-first title> | 1 | — | <0–100> |

### S01: <verb-first title>
- **Story:** As a <role>, I want <capability>, so that <benefit>.
- **Acceptance criteria:**
  - Given <situation>, when <action>, then <observable result>.
- **Out of scope:** <what this story leaves out, or —>
- **Source:** <who asked for it, and why>
- **Scenario (optional):** starting state; normal flow; what can go wrong and
  how it's handled; other activities at the same time; end state.

## Open questions
- [ ] <question> (blocks S01)
```

Field rules:
- **ID:** `S01`, `S02` and so on. Never reuse an ID, even after deleting a
  story.
- **Rank:** unique; 1 is built first. A story always ranks after every story
  it depends on.
- **Depends on:** IDs of stories that must work first, or `—`. No cycles.
- **Explained (%):** the completion metric defined in SKILL.md.
- **Acceptance criteria:** describe what a user can observe, not how it's
  built. Each criterion has a yes/no outcome so it can later become an
  automated check. Cover the normal case and, where relevant, what happens
  when something goes wrong.
- **Out of scope (story):** what the story deliberately leaves out, so it
  doesn't grow during implementation.

## Exit checklist
Elicitation is finished when every box is checked:
- [ ] Problem, goals and success measures are recorded.
- [ ] Stakeholders are listed, and you've asked whether anyone is missing.
- [ ] The project-level Out of scope list is filled in.
- [ ] Every story has a story sentence, acceptance criteria, a rank and its
      dependencies, and is the right size.
- [ ] Every story meets the completion metric in SKILL.md.
- [ ] Open questions is empty.
- [ ] The user confirmed your closing summary.

Then continue with the Specification section of SKILL.md.

