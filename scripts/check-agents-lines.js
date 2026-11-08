#!/usr/bin/env node

const path = require("node:path");
const { checkFileLineLimit } = require("./check-file-lines");

const agentsFile = path.resolve(__dirname, "../AGENTS.md");

function checkAgentsLineLimit() {
  const valid = checkFileLineLimit(agentsFile, 200);
  if (valid) {
    console.log("AGENTS.md is within the maximum of 200 lines.");
  }
  return valid;
}

if (require.main === module) {
  const valid = checkAgentsLineLimit();
  console.log(valid);
  process.exitCode = valid ? 0 : 1;
}

module.exports = { checkAgentsLineLimit };
