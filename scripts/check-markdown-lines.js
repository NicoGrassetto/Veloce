#!/usr/bin/env node

const { readFileSync } = require("node:fs");
const path = require("node:path");

const docsDirectory = path.resolve(__dirname, "../docs");
const maximumLines = 150;

function checkMarkdownLineLimit(filePath) {
  if (!filePath) {
    console.error("Provide a Markdown file: node scripts/check-markdown-lines.js docs/file.md");
    return false;
  }

  const absolutePath = path.resolve(filePath);
  const relativePath = path.relative(docsDirectory, absolutePath);
  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath) ||
    path.extname(absolutePath).toLowerCase() !== ".md"
  ) {
    console.error(`${filePath} must be a Markdown (.md) file inside the repository's docs directory.`);
    return false;
  }

  let content;
  try {
    content = readFileSync(absolutePath, "utf8");
  } catch (error) {
    console.error(`Cannot read ${filePath}: ${error.message}`);
    return false;
  }

  const lines = content === "" ? 0 : content.split(/\r\n|\n|\r/).length - (/\r?\n$|\r$/.test(content) ? 1 : 0);
  if (lines > maximumLines) {
    console.error(`${filePath} has ${lines} lines; the maximum is ${maximumLines} (${lines - maximumLines} too many).`);
    return false;
  }

  return true;
}

if (require.main === module) {
  const valid = checkMarkdownLineLimit(process.argv[2]);
  console.log(valid);
  process.exitCode = valid ? 0 : 1;
}

module.exports = { checkMarkdownLineLimit };
