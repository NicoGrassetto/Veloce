#!/usr/bin/env node

const path = require("node:path");
const { checkFileLineLimit } = require("./check-file-lines");

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

  return checkFileLineLimit(filePath, maximumLines);
}

if (require.main === module) {
  const valid = checkMarkdownLineLimit(process.argv[2]);
  console.log(valid);
  process.exitCode = valid ? 0 : 1;
}

module.exports = { checkMarkdownLineLimit };
