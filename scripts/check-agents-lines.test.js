const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawnSync } = require("node:child_process");
const { test, afterEach, mock } = require("node:test");
const { checkAgentsLineLimit } = require("./check-agents-lines");

afterEach(() => mock.restoreAll());

test("accepts up to 200 lines and prints a message before returning true", () => {
  const messages = [];
  mock.method(console, "log", (message) => messages.push(message));
  for (const newline of ["\n", "\r\n", "\r"]) {
    for (const count of [0, 1, 199, 200]) {
      const content = Array(count).fill("line").join(newline);
      for (const ending of count === 0 ? [""] : ["", newline]) {
        mock.method(fs, "readFileSync", (file, encoding) => {
          assert.equal(file, path.resolve(__dirname, "../AGENTS.md"));
          assert.equal(encoding, "utf8");
          return content + ending;
        });
        assert.equal(checkAgentsLineLimit(), true);
        assert.match(messages.at(-1), /AGENTS\.md.*maximum of 200 lines/);
      }
    }
  }
});

test("rejects 201 lines and prints the reason before returning false", () => {
  const messages = [];
  const success = mock.method(console, "log", () => {});
  mock.method(console, "error", (message) => messages.push(message));
  for (const newline of ["\n", "\r\n", "\r"]) {
    for (const ending of ["", newline]) {
      mock.method(fs, "readFileSync", () => Array(201).fill("line").join(newline) + ending);
      assert.equal(checkAgentsLineLimit(), false);
      assert.match(messages.at(-1), /AGENTS\.md has 201 lines.*maximum is 200.*1 too many/);
    }
  }
  assert.equal(success.mock.callCount(), 0);
});

test("counts blank lines without counting a phantom final line", () => {
  mock.method(console, "log", () => {});
  mock.method(console, "error", () => {});
  mock.method(fs, "readFileSync", () => "\n".repeat(200));
  assert.equal(checkAgentsLineLimit(), true);
  mock.method(fs, "readFileSync", () => "\n".repeat(201));
  assert.equal(checkAgentsLineLimit(), false);
});

test("reports a read failure and returns false", () => {
  const messages = [];
  mock.method(console, "error", (message) => messages.push(message));
  mock.method(fs, "readFileSync", () => {
    throw new Error("Permission denied");
  });
  assert.equal(checkAgentsLineLimit(), false);
  assert.match(messages[0], /Cannot read .*AGENTS\.md: Permission denied/);
});

test("CLI checks the repository's AGENTS.md even from another directory", () => {
  const result = spawnSync(process.execPath, [path.join(__dirname, "check-agents-lines.js")], {
    cwd: os.tmpdir(),
    encoding: "utf8",
  });
  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.equal(result.stdout.trim(), "AGENTS.md is within the maximum of 200 lines.\ntrue");
});
