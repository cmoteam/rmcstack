# Skills vs Agents — 使い分けの判断基準

SARFStack は **Skill**（`.claude/skills/`）と **Agent**（`.claude/agents/`）の2種類を使い分けます。

| | Skill | Agent |
|---|---|---|
| 場所 | `.claude/skills/<name>/SKILL.md` | `.claude/agents/<name>.md` |
| 呼び出し | ユーザーの `/skill-name` or モデルが Skill ツール経由 | モデルが Task ツール経由で並列ディスパッチ |
| コンテキスト | メインセッションで実行（成果物・履歴が残る） | 独立したサブエージェントで実行（結果のみ返却） |
| 副作用 | あり（ファイル書き込み・MCP 呼び出し） | なし（Read のみ、結果を文字列で返す） |
| 典型的な用途 | 直接のユーザー対話・制作・Set/Feedback 操作 | レビュー・評価・並列診断 |

## Agent 化の判断基準

以下のいずれかに当てはまる → **Agent 化**:
- workflow から並列で呼ばれる（例: `/campaign-launch` で CEO/CMO/SEO を同時ディスパッチ）
- レビュー系（副作用なし・結果返却のみ）
- メインコンテキストを汚したくない診断タスク

以下のいずれかに当てはまる → **Skill のまま**:
- 直接のユーザー対話が主（対話を積み重ねて成果物に到達する）
- 書き込み副作用あり（`private/output/` や `private/memory/` への生成）
- MCP 呼び出しや長期状態の操作（`/workspace switch` など）

## Scope（company-wide か workspace か）

Agent の frontmatter には `scope` フィールドを持たせる:

- **`scope: company-wide`** — `private/memory/workspaces/*/` を全走査。全 workspace 横断レビュー（CEO / Group CMO）
- **`scope: workspace`** — アクティブ workspace（`private/memory/workspaces/active/profile/`）のみ。事業部マネージャー / 専門職

**経営層は全事業部横断、それ以外は単一 workspace が基本スコープ**。

## 現状マッピング

| カテゴリ | Agent 化済み | Scope | Skill のみ |
|---|---|---|---|
| Executive Review | `ceo-review` | company-wide | — |
| Executive Review | `cmo-review` | company-wide | — |
| Executive Review | `consultant-review` | workspace | — |
| Specialist (Ask) | `creative-direction` `seo` | workspace | `customer-research` |
| Specialist (Release) | — | workspace | `contents-edit` `ads-manager` `estimate` `ui-design` `pricing-strategy` `churn-prevention` |
| Optimization | — | workspace | `optimize`（6 target 統合） |
| SARF Ops | — | organization | `set-organization` |
| SARF Ops | — | workspace | `set-workspace` `set-update` `feedback` `sarf-check` |
| Meta | — | cross-workspace | `workspace` |
| Workflows | — | — | `campaign-launch` 他（`.claude/workflows/` 配下、未実装） |

## 実装原則

Agent は「**Skill の薄いラッパー**」として実装します（対応 SKILL.md を Read → 定義通り実行 → 結果返却）。Skill 側に定義を一本化することで、仕様の重複を防ぎます。
