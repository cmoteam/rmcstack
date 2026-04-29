# Artifact Templates

RMC サイクルの一次成果物テンプレート。実ファイルは `private/output/<workspace>/` または `private/memory/workspaces/active/results/` にコピーして使う。

## 使い分け

| RMC 段 | Template | 主な保存先 |
|---|---|---|
| Listen | `sync-diff.md` | `private/output/<workspace>/YYYYMMDD-listen-sync-diff.md` |
| Insight | `options.md` | `private/output/<workspace>/YYYYMMDD-insight-options-<slug>.md` |
| Insight | `assumption-map.md` | `private/output/<workspace>/YYYYMMDD-insight-assumption-map-<slug>.md` |
| Insight | `evidence-map.md` | `private/output/<workspace>/YYYYMMDD-insight-evidence-map-<slug>.md` |
| Release | `release-candidates.md` | `private/output/<workspace>/YYYYMMDD-release-candidates-<slug>.md` |
| Release / Learn | `release-log.md` | `private/memory/workspaces/active/results/release-log.md` |
| Activate | `activation-brief.md` | `private/output/<workspace>/YYYYMMDD-activation-brief-<slug>.md` |
| Activate | `measurement-plan.md` | `private/output/<workspace>/YYYYMMDD-measurement-plan-<slug>.md` |
| Activate | `approval-log.md` | `private/output/<workspace>/YYYYMMDD-approval-log-<slug>.md` |
| Learn | `result-log.md` | `private/memory/workspaces/active/results/YYYYMMDD-result-log-<slug>.md` |
| Learn | `ai-decision-log.md` | `private/memory/workspaces/active/results/YYYYMMDD-ai-decision-log-<slug>.md` |
| Learn | `next-listen-input.md` | `private/output/<workspace>/YYYYMMDD-next-listen-input-<slug>.md` |

## Rule

- `[TODO]` を残したまま Activate / Learn を完了扱いにしない
- 顧客の生の言葉は `customer-signal.md` にも書き戻す
- profile 層への反映は `/learn` の検証ゲートを通す
