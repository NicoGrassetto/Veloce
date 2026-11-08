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

## License

Veloce is available under the [MIT License](LICENSE).

<p align="center">
  <em>In memory of the software craftsmen who laid the foundations for today's technology and agentic revolution.</em>
</p>
