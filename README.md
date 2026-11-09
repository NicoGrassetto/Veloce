<p align="center">
  <img src=".github/assets/veloce-github-header.gif" alt="Veloce" width="224" />
</p>

<p align="center">
  <strong>A software engineering harness for craftsmen and software artisans.</strong><br />
  Build software for humans and AI, by humans and AI.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="LICENSE">License</a>
</p>

## Overview

Veloce is a software engineering harness designed to help people and agents build reliable software with the mindset of a craftsperson. It aims to make disciplined engineering practices part of the development loop rather than an afterthought.

The project brings together clear instructions, repeatable workflows, and practical guardrails so that planning, implementation, review, and verification remain consistent as software evolves.

Veloce is intentionally tool- and model-agnostic. The goal is not to prescribe a single way to write software, but to provide a dependable foundation that teams can adapt to their own stack and standards.

## Architecture

## How it works

### Project initialization

Invoke `/init` to initialize project documentation using the
[init skill](skills/init/SKILL.md). It creates or updates
`docs/DECISIONS.md`, `docs/ARCHITECTURE.md`, `docs/PROGRESS.md` and
`docs/FEATURES.md` with the project's decisions, architecture, current state and
verifiable feature list. Existing documentation and history are preserved;
unknowns and unavailable verification commands are recorded explicitly.
It also creates a root `AGENTS.md` with project-specific agent instructions
when that file does not already exist, leaving existing instructions unchanged.

The skill lives in `skills/init` and is exposed for project skill discovery
through `.agents/skills/init`.

### Agent instructions

Agent instructions are kept identical across the formats used by the supported
tools:

- `AGENTS.md` for OpenCode and other AGENTS.md-compatible agents
- `CLAUDE.md` for Claude Code
- `.github/copilot-instructions.md` for GitHub Copilot

The `Sync agent instructions` GitHub Actions workflow detects which instruction
file changed, copies it to the other formats, and commits the synchronized
files. If multiple instruction files change with different content, the
workflow stops to avoid discarding edits. It can also be run manually by
selecting the source file in the Actions tab.

### Initialization scripts

Run `./init` to create an empty `.github/AGENT.md` at the project root.
It also creates root `PROGRESS.md` and `DECISIONS.md` with their respective templates.
It creates `.github/` if needed and preserves existing files' contents.

To initialize a project's `.github/AGENTS.md` template, run with Node.js:

```sh
node scripts/create-agents.js
```

By default, the script creates `.github/AGENTS.md` in the current directory.
To initialize another project from this checkout:

```sh
node scripts/create-agents.js /path/to/project
```

The script creates `.github/` if needed and refuses to overwrite an existing
`AGENTS.md`, reporting the error with exit status 1. The template contains the
Python 3.11/FastAPI/PostgreSQL 15 overview, Make commands, hard constraints, and
topic documentation links. Adapt these examples to the target project's stack;
the script does not create a Makefile or the linked documentation.
It leaves the synchronized root agent instructions unchanged.

These scripts do not register a slash command with an agent tool; the `/init`
skill is documented above. Run the generator's tests with
`node --test scripts/create-agents.test.js`.

### Markdown line limit

Check a Markdown file inside this repository's `docs/` directory with Node.js:

```sh
node scripts/check-markdown-lines.js docs/PROGRESS.md
```

The script prints `true` for files with at most 150 lines. Otherwise it prints
the reason to stderr before printing `false` to stdout, and exits with status 1
(status 0 on success). Blank lines count; a final newline does not add an extra
line. Paths are relative to the current directory, or absolute.

JavaScript callers can import `checkMarkdownLineLimit` from the script; it
returns a boolean and prints a diagnostic on failure. Run its tests with
`node --test scripts/check-markdown-lines.test.js`.

### AGENTS.md line limit

Check the repository's root `AGENTS.md` against a 200-line maximum:

```sh
node scripts/check-agents-lines.js
```

The script prints a success message or failure reason before printing the
boolean result. It exits with status 0 for `true` and 1 for `false`, including
read errors. It locates `AGENTS.md` relative to the script, regardless of the
current directory, and uses the same line-counting rules as the Markdown check.

JavaScript callers can import `checkAgentsLineLimit` from the script; it prints
a message before returning a boolean. Run both checkers' tests with
`node --test scripts/check-markdown-lines.test.js scripts/check-agents-lines.test.js`.

## License

Veloce is available under the [MIT License](LICENSE), with the exception of the
Caveman-derived response-style guidance. Its attribution and license notices are
in [third_party/caveman](third_party/caveman/NOTICE).

<p align="center">
  <em>In memory of the software craftsmen who laid the foundations for today's technology and agentic revolution.</em>
</p>
