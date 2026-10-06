#!/usr/bin/env python3

import argparse
import subprocess
import sys
from pathlib import Path
from typing import List, Optional


INSTRUCTION_FILES = (
    Path("AGENTS.md"),
    Path("CLAUDE.md"),
    Path(".github/copilot-instructions.md"),
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Synchronize repository instructions across supported coding agents."
    )
    parser.add_argument(
        "--source",
        choices=[str(path) for path in INSTRUCTION_FILES],
        help="Instruction file to copy from.",
    )
    parser.add_argument("--base", help="Base commit used to detect changed files.")
    parser.add_argument("--head", default="HEAD", help="Head commit to compare.")
    return parser.parse_args()


def changed_instruction_files(base: str, head: str) -> List[Path]:
    if set(base) == {"0"}:
        command = [
            "git",
            "diff-tree",
            "--root",
            "--no-commit-id",
            "--name-only",
            "-r",
            head,
            "--",
        ]
    else:
        command = ["git", "diff", "--name-only", base, head, "--"]

    result = subprocess.run(
        command + [str(path) for path in INSTRUCTION_FILES],
        check=True,
        capture_output=True,
        text=True,
    )
    changed = set(result.stdout.splitlines())
    return [path for path in INSTRUCTION_FILES if str(path) in changed]


def choose_source(args: argparse.Namespace) -> Optional[Path]:
    if args.source:
        return Path(args.source)
    if not args.base:
        raise ValueError("Provide --source or --base to select the source instructions.")

    changed = changed_instruction_files(args.base, args.head)
    if not changed:
        if all(path.exists() for path in INSTRUCTION_FILES):
            contents = {path.read_bytes() for path in INSTRUCTION_FILES}
            if len(contents) == 1:
                return None
        raise ValueError(
            "No instruction file changed and the files are not already synchronized. "
            "Run again with --source."
        )

    existing = [path for path in changed if path.exists()]
    if not existing:
        raise ValueError("The changed instruction files were deleted; synchronization stopped.")

    contents = {path.read_bytes() for path in existing}
    if len(contents) > 1:
        names = ", ".join(str(path) for path in existing)
        raise ValueError(
            f"Conflicting instruction changes detected in {names}. "
            "Make their contents identical or change only one file."
        )

    return existing[0]


def synchronize(source: Path) -> List[Path]:
    if not source.is_file():
        raise ValueError(f"Source instruction file does not exist: {source}")

    content = source.read_bytes()
    updated = []
    for target in INSTRUCTION_FILES:
        if target.exists() and target.read_bytes() == content:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)
        updated.append(target)
    return updated


def main() -> int:
    args = parse_args()
    try:
        source = choose_source(args)
        if source is None:
            print("Agent instruction files are already synchronized.")
            return 0
        updated = synchronize(source)
    except (OSError, subprocess.CalledProcessError, ValueError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 1

    if updated:
        print(f"Synchronized from {source}:")
        for path in updated:
            print(f"- {path}")
    else:
        print(f"Agent instruction files already match {source}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
