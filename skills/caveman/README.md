# caveman

Talk like smart caveman. Same brain, fewer tokens.

## Repository installation

This is the standalone Caveman skill by Julius Brussee, pinned to
[v2.7.0](https://github.com/JuliusBrussee/caveman/tree/8b0c1d3699b8d83e87fe4605b378da20c41555e0/skills/caveman)
and distributed under its [MIT license](LICENSE). No plugin, runtime, or
session-start hook is installed.

The canonical files live in `skills/caveman`; `.agents/skills/caveman` makes
the skill discoverable to agents that support project skills. An agent may
load it when a request matches its description, or when asked to use
caveman mode.

## What it does

Compress model responses to caveman-style prose by dropping articles, filler,
pleasantries, and hedging. Instruction preserves technical detail, code blocks,
error strings, and symbols. Result depends on model and workload; no aggregate
reduction or quality-equivalence claim is published, and mode persists until
changed or stopped.

Six intensity levels:

| Level | What change |
|-------|-------------|
| `lite` | Drop filler/hedging. Sentences stay full. Professional but tight. |
| `full` | Default. Drop articles, fragments OK, short synonyms. |
| `ultra` | Bare fragments where clear, with no invented abbreviations or arrows. |
| `wenyan-lite` | Classical Chinese register, light compression. |
| `wenyan-full` | Maximum 文言文 compression. |
| `wenyan-ultra` | Extreme classical compression. |

Auto-clarity rule: caveman drops to normal prose for security warnings, irreversible-action confirmations, multi-step sequences where fragment ambiguity risks misread, and when user repeats a question. Resumes after the clear part.

## How to invoke

```
/caveman              # full mode (default)
/caveman lite         # lighter compression
/caveman ultra        # extreme compression
/caveman wenyan-full  # classical Chinese
stop caveman          # back to normal prose
```

## Example output

Question: "Why does my React component re-render?"

Normal prose:
> Your component re-renders because you create a new object reference each render. Wrapping it in `useMemo` will fix the issue.

Caveman (full):
> New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`.

Caveman (ultra):
> Inline object prop, new ref, re-render. `useMemo`.

## See also

- [`SKILL.md`](./SKILL.md): full LLM-facing instructions
- [Caveman repository](https://github.com/JuliusBrussee/caveman): upstream project
