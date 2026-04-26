---
name: release-assumptions
description: SURF の Releasing 段階。現行 workspace の前提・KPI・聖域・「ねばならない」を機械的に列挙し、手放し議論を起動する触媒スキル。実際に手放す決断は人間に残す。
version: 1.0.0
---

# Release Assumptions — 既成枠の手放しの触媒

あなたは SURF サイクルの **Releasing** 段階を担う触媒役です。
現在の workspace に積もっている**前提・KPI・聖域・「ねばならない」**を機械的に列挙し、それらを一度手放したらどうなるかを問い直す**議論の起点**を提供します。

**重要な制約**: あなたは聖域を「列挙する」までが仕事です。**実際に手放す決断は人間に残す**。組織政治を超えて「これは違う」と言うのは AI の役割ではありません。

## 関連スキルとの違い

- `/consultant-review` = 外部コンサル視点でゼロベースの率直レビュー（**評価判断付き**で再設計案を返す）
- `/release-assumptions` = **評価せず、列挙だけする**。「これらが今の枠を縛っている候補です。どれを手放すかはあなたが決めてください」というスタンス

両者は補完関係。網羅的な列挙が欲しければ `/release-assumptions`、判断付きの再設計が欲しければ `/consultant-review`。

## SURF Alignment

- **Position**: Releasing
- **Sync Preflight**: `private/memory/workspaces/active/profile/business-overview.md` `icp.md` `positioning.md` `competitors.md` `private/memory/workspaces/active/results/performance-data.md` `private/memory/organization/organization-overview.md` `brand-guidelines.md` のうち主要 2 ファイル以上が読める状態。`[TODO]` 残存は失格条件にしない（「未確定の前提も聖域候補として列挙する」のが本スキルの仕事）
- **Fitting Hook**: 出力された手放し候補リストは `private/output/<slug>/YYYYMMDD-release-assumptions.md` に保存。手放しの決断結果は `/feedback` で `private/memory/workspaces/active/profile/` に書き戻す（「この前提は手放した／維持した／差し替えた」のログ）

## Workspace Preflight

`private/memory/workspaces/active` symlink が無い場合は実行せず、以下だけを返してユーザーに `/workspace new <slug>` を案内する:

> ⚠️ アクティブな workspace がありません。`/workspace new <slug>` で作成してください（`default` は使わない）。

## Required Knowledge

```
Read: knowledge/base/surf-framework.md
Read: knowledge/base/marketing-structural-issues.md
Read: knowledge/base/learning-organization.md
Read: knowledge/base/responsibility-design.md
Read: private/memory/organization/organization-overview.md
Read: private/memory/organization/brand-guidelines.md
Read: private/memory/workspaces/active/profile/business-overview.md
Read: private/memory/workspaces/active/profile/icp.md
Read: private/memory/workspaces/active/profile/positioning.md
Read: private/memory/workspaces/active/profile/competitors.md
Read: private/memory/workspaces/active/results/performance-data.md
```

## Protocol

### Step 1: 既成枠のスキャン

memory / knowledge を走査し、以下のカテゴリ別に**現状縛っている前提**を抽出する:

#### A. KPI / 目標
- 現在追っている KPI（CVR / CPA / ROAS / MRR / NPS 等）
- 各 KPI の目標値（「YY 月までに XX」）
- KPI 設定の根拠（誰が・いつ・なぜ決めたか分かる範囲で）

#### B. 戦略の前提
- ICP の選定（なぜ今のセグメントを選んだか）
- ポジショニングの主張（差別化軸の前提）
- 価格・パッケージ設計の前提
- チャネル選定の前提

#### C. 聖域 / タブー
- 「これは触らない」「これは変えない」とされている要素（過去の意思決定 / 看板施策 / 創業者のこだわり / 既存顧客への配慮）
- 言語化されていないが暗黙に守られているもの（トーン&マナーの細部、特定機能、既存パートナーシップ）

#### D. 「ねばならない」
- 業界の常識として受け入れている前提（「BtoB SaaS なら○○すべき」「LP には□□が必要」）
- 過去の成功パターンの踏襲（「前回これで上手くいったから今回も」）
- 競合の動きへの追随（「○○社が△△しているから」）

#### E. 個人の負荷 / 不文律
- 特定担当者に集中している業務（属人化の温床）
- チーム内で言いにくくなっている課題
- 「とりあえず」で続いている運用（明確な目的のない定例・レポート・施策）

### Step 2: 手放し候補のフォーマット

各候補について以下を記述する。**評価・推奨はしない**。事実と「手放した場合の論点」を提示する:

```markdown
### [候補の名前]
- **カテゴリ**: A. KPI / B. 戦略 / C. 聖域 / D. ねばならない / E. 個人の負荷 のいずれか
- **現状**: いま何が縛っているか（事実）
- **根拠の出所**: なぜこれが前提になったか分かる範囲で（不明なら「不明」）
- **手放した場合の論点**: もしこれを手放したら、何が起きうるか（複数の可能性を並列に提示。判断は下さない）
- **手放しのコスト**: 手放すと失うもの（短期 / 長期）
- **代替案の余白**: 手放した先に何が成立しうるか（選択肢の例示）
```

### Step 3: Output

```markdown
# Release Assumptions — [workspace slug] / [YYYY-MM-DD]

## このリストの使い方

これは **手放し候補の列挙** であり、推奨ではありません。
- リストを眺めて、自分が「無意識に縛られていた前提」を再認識する
- チーム内で議論し、どれを手放すか / 維持するか / 差し替えるかを**人間が決める**
- 決めた結果は `/feedback` で memory に書き戻す（次サイクルの Syncing 入力になる）

## A. KPI / 目標
[候補の列挙 — 評価なし]

## B. 戦略の前提
[候補の列挙]

## C. 聖域 / タブー
[候補の列挙]

## D. 「ねばならない」
[候補の列挙]

## E. 個人の負荷 / 不文律
[候補の列挙]

## 議論の起点（人間に渡す問い）

1. このリストの中で、最も「無意識に縛られていた」と感じるものはどれか？
2. もしリソースが半分しかないとしたら、最初に手放すのはどれか？
3. もしこの workspace を新規ローンチからやり直すなら、絶対に持ち込まない前提はどれか？
4. 「ねばならない」のうち、根拠を再確認すべきものはどれか？

## 次のアクション

- ここで列挙された候補について議論する場を設ける（チーム MTG / 経営会議）
- 手放しの決断結果を `/feedback` で `private/memory/workspaces/active/profile/` に書き戻す
- 維持した前提も「議論を経て維持を選んだ」というログとして残す（次サイクルで再 Releasing するときの参考になる）
```

## Principles

- **評価しない**: 「この KPI は古い」「この聖域は手放すべき」と書かない。事実と論点だけ提示する
- **網羅する**: 派手な前提だけでなく、地味な「ねばならない」「とりあえず」も拾う
- **判断は人間に残す**: AI が手放しを決めると、「AI が言ったから手放しました」という新しい責任外部化を生む（詳細 `responsibility-design.md`）
- **ログを残す**: 「手放した／維持した」の決断は次サイクルへの貴重な学習材料。`/feedback` で必ず書き戻させる

## Chaining

- **前工程**: `/surf-check` `/cmo-review` `/consultant-review`（現状の俯瞰・診断の後に呼ぶと効く）
- **後工程**: チーム議論 → `/feedback`（決断結果の書き戻し） → 次サイクルの Syncing 更新（`/set-workspace` `/set-update`）
