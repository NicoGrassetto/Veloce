const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { test } = require("node:test");

const script = path.join(__dirname, "create-agents.js");
const expected = [
  "# AGENTS.md",
  "",
  "## Project Overview",
  "",
  "Python 3.11 FastAPI backend, PostgreSQL 15 database.",
  "",
  "## Quick Start",
  "",
  "- Install: `make setup`",
  "- Test: `make test`",
  "- Full verification: `make check`",
  "",
  "## Hard Constraints",
  "",
  "- All APIs must use OAuth 2.0 authentication",
  "- All database queries must use SQLAlchemy 2.0 syntax",
  "- All PRs must pass pytest + mypy --strict + ruff check",
  "",
  "## Topic Docs",
  "",
  "- API Design Patterns (`docs/api-patterns.md`) — Required reading when adding endpoints",
  "- Database Rules (`docs/database-rules.md`) — Required when modifying database operations",
  "- Testing Standards (`docs/testing-standards.md`) — Reference when writing tests",
  "",
].join("\n");

function project(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "veloce-create-agents-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function run(cwd, args = []) {
  return spawnSync(process.execPath, [script, ...args], { cwd, encoding: "utf8" });
}

test("creates the exact template in the current project's .github directory", (t) => {
  const cwd = project(t);
  const result = run(cwd);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.match(result.stdout, /Created .*\.github[/\\]AGENTS\.md/);
  assert.equal(fs.readFileSync(path.join(cwd, ".github/AGENTS.md"), "utf8"), expected);
  assert.equal(fs.existsSync(path.join(cwd, "AGENTS.md")), false);
});

test("accepts a project directory and preserves unrelated files", (t) => {
  const cwd = project(t);
  const target = path.join(cwd, "another project");
  fs.mkdirSync(path.join(target, ".github"), { recursive: true });
  const instructions = path.join(target, ".github/copilot-instructions.md");
  fs.writeFileSync(instructions, "Existing instructions\n");
  const result = run(cwd, ["another project"]);
  assert.equal(result.status, 0);
  assert.equal(fs.readFileSync(path.join(target, ".github/AGENTS.md"), "utf8"), expected);
  assert.equal(fs.readFileSync(instructions, "utf8"), "Existing instructions\n");
  assert.equal(fs.existsSync(path.join(cwd, ".github")), false);
});

test("fails without overwriting an existing AGENTS.md", (t) => {
  const cwd = project(t);
  fs.mkdirSync(path.join(cwd, ".github"));
  const target = path.join(cwd, ".github/AGENTS.md");
  fs.writeFileSync(target, "Customized instructions\n");
  const result = run(cwd);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cannot create .*EEXIST/);
  assert.equal(result.stdout, "");
  assert.equal(fs.readFileSync(target, "utf8"), "Customized instructions\n");
});

test("reports filesystem failures", (t) => {
  const cwd = project(t);
  fs.writeFileSync(path.join(cwd, ".github"), "Not a directory");
  const result = run(cwd);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cannot create/);
  assert.equal(result.stdout, "");
});

test("rejects extra arguments without creating files", (t) => {
  const cwd = project(t);
  const result = run(cwd, [".", "extra"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
  assert.equal(fs.existsSync(path.join(cwd, ".github")), false);
});
