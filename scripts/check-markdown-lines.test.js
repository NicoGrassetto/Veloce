const assert = require("node:assert/strict");
const { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { test, after, afterEach, mock } = require("node:test");
const { checkMarkdownLineLimit } = require("./check-markdown-lines");

const directory = mkdtempSync(path.join(__dirname, "../docs/.line-limit-test-"));
const file = path.join(directory, "example.md");
const script = path.join(__dirname, "check-markdown-lines.js");

after(() => {
  unlinkSync(file);
  rmdirSync(directory);
});
afterEach(() => mock.restoreAll());

test("accepts empty files and files with at most 150 lines", () => {
  for (const newline of ["\n", "\r\n", "\r"]) {
    for (const count of [0, 1, 149, 150]) {
      const content = Array(count).fill("line").join(newline);
      for (const ending of count === 0 ? [""] : ["", newline]) {
        writeFileSync(file, content + ending);
        assert.equal(checkMarkdownLineLimit(file), true);
      }
    }
  }
});

test("rejects 151 lines and reports the actual count", () => {
  const messages = [];
  mock.method(console, "error", (message) => messages.push(message));
  for (const newline of ["\n", "\r\n", "\r"]) {
    for (const ending of ["", newline]) {
      writeFileSync(file, Array(151).fill("line").join(newline) + ending);
      assert.equal(checkMarkdownLineLimit(file), false);
      assert.match(messages.at(-1), /151 lines.*maximum is 150.*1 too many/);
    }
  }
});

test("counts blank lines, but not a phantom line after a final newline", () => {
  mock.method(console, "error", () => {});
  writeFileSync(file, "\n".repeat(150));
  assert.equal(checkMarkdownLineLimit(file), true);
  writeFileSync(file, "\n".repeat(151));
  assert.equal(checkMarkdownLineLimit(file), false);
});

test("reports missing, unreadable, non-Markdown, and outside-docs inputs", () => {
  const messages = [];
  mock.method(console, "error", (message) => messages.push(message));
  assert.equal(checkMarkdownLineLimit(), false);
  assert.match(messages.at(-1), /Provide a Markdown file/);
  assert.equal(checkMarkdownLineLimit(path.join(directory, "missing.md")), false);
  assert.match(messages.at(-1), /Cannot read/);
  for (const input of [path.join(directory, "example.txt"), path.join(__dirname, "../README.md")]) {
    assert.equal(checkMarkdownLineLimit(input), false);
    assert.match(messages.at(-1), /must be a Markdown.*inside/);
  }
});

test("CLI prints a boolean and uses a matching exit status", () => {
  for (const count of [150, 151]) {
    writeFileSync(file, "line\n".repeat(count));
    const result = spawnSync(process.execPath, [script, file], { encoding: "utf8" });
    assert.equal(result.status, count === 150 ? 0 : 1);
    assert.equal(result.stdout.trim(), count === 150 ? "true" : "false");
    if (count === 151) assert.match(result.stderr, /151 lines/);
  }
  const missing = spawnSync(process.execPath, [script], { encoding: "utf8" });
  assert.equal(missing.status, 1);
  assert.equal(missing.stdout.trim(), "false");
  assert.match(missing.stderr, /Provide a Markdown file/);
});
