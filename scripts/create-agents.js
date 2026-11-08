#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const template = `# AGENTS.md

## Project Overview

Python 3.11 FastAPI backend, PostgreSQL 15 database.

## Quick Start

- Install: \`make setup\`
- Test: \`make test\`
- Full verification: \`make check\`

## Hard Constraints

- All APIs must use OAuth 2.0 authentication
- All database queries must use SQLAlchemy 2.0 syntax
- All PRs must pass pytest + mypy --strict + ruff check

## Topic Docs

- API Design Patterns (\`docs/api-patterns.md\`) — Required reading when adding endpoints
- Database Rules (\`docs/database-rules.md\`) — Required when modifying database operations
- Testing Standards (\`docs/testing-standards.md\`) — Reference when writing tests
`;

function main() {
  if (process.argv.length > 3) {
    console.error("Usage: node scripts/create-agents.js [project-directory]");
    return 1;
  }

  const target = path.resolve(process.argv[2] || ".", ".github/AGENTS.md");
  try {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, template, { encoding: "utf8", flag: "wx" });
  } catch (error) {
    console.error(`Cannot create ${target}: ${error.message}`);
    return 1;
  }

  console.log(`Created ${target}`);
  return 0;
}

process.exitCode = main();
