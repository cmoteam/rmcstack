"""Shared helpers for bin/set-* scripts.

Prompts the user to fill [TODO] markers across one or more markdown files.
"""
from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

TODO_RE = re.compile(r'\[TODO(?::\s*([^\]]*))?\]')


def count_todos(paths: list[Path]) -> int:
    total = 0
    for p in paths:
        if p.exists():
            total += len(TODO_RE.findall(p.read_text()))
    return total


def line_label(content: str, match: re.Match) -> str:
    ls = content.rfind('\n', 0, match.start()) + 1
    le = content.find('\n', match.end())
    line = content[ls: le if le != -1 else None].strip()
    return re.sub(r'\[TODO[^\]]*\]', '', line).strip().strip('*-| ').rstrip(':').strip()


def ensure_from_template(target_dir: Path, template_dir: Path) -> None:
    """Bootstrap target_dir from template_dir if not present."""
    if target_dir.exists():
        return
    if not template_dir.exists():
        print(f"エラー: テンプレート {template_dir} が見つかりません")
        sys.exit(1)
    shutil.copytree(str(template_dir), str(target_dir))
    print(f"初期化: {target_dir}")


def _prompt_for_file(path: Path, counter: list[int], total: int) -> tuple[str, int]:
    content = path.read_text()
    matches = list(TODO_RE.finditer(content))
    if not matches:
        return content, 0

    changes = []
    filled = 0
    for m in matches:
        hint = (m.group(1) or '').strip()
        label = line_label(content, m)
        counter[0] += 1
        display = label or hint or '値を入力'
        extra = f"  例: {hint}" if hint and hint != label else ""
        print(f"\n[{counter[0]}/{total}] {path.name} > {display}")
        if extra:
            print(extra)
        print("  (空Enter でスキップ)")
        try:
            value = input("  > ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n中断しました")
            sys.exit(0)
        if value:
            changes.append((m.start(), m.end(), value))
            filled += 1

    result = content
    for start, end, val in reversed(changes):
        result = result[:start] + val + result[end:]
    return result, filled


def fill_todos(paths: list[Path], header: str, next_step: str | None = None) -> None:
    """Interactively fill [TODO] markers across the given files.

    paths: files to process (in order). Non-existent files are skipped with a warning.
    header: one-line label shown before counting (e.g. script name or file name).
    next_step: optional "次のステップ: ..." hint printed at the end.
    """
    existing = [p for p in paths if p.exists()]
    missing = [p for p in paths if not p.exists()]
    for p in missing:
        print(f"警告: {p} が見つかりません — スキップ")

    total = count_todos(existing)
    if total == 0:
        print("TODO はすべて埋まっています。/next --verbose で充足率を確認してください。")
        return

    print(f"{header}")
    print(f"TODO: {total} 件。空のまま Enter でスキップできます。")
    print("─" * 40)

    counter = [0]
    summary: dict[str, int] = {}
    for p in existing:
        new_content, filled = _prompt_for_file(p, counter, total)
        p.write_text(new_content)
        summary[p.name] = filled

    print("\n\n─── 完了 ───")
    for fname, count in summary.items():
        print(f"  {fname}: {count} 件 更新")
    remaining = total - sum(summary.values())
    if remaining > 0:
        print(f"  残り TODO: {remaining} 件（再実行で補完できます）")
    if next_step:
        print(f"\n次のステップ: {next_step}")
