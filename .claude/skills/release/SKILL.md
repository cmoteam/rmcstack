---
name: release
description: RMC の Release 段（手放し）。前提・KPI・聖域・「ねばならない」を機械的に列挙し、手放し議論を起動する触媒スキル。実際に手放す決断は人間に残す。
version: 1.0.0
---

# Release — 既成枠の手放し触媒

RMC（`knowledge/base/reframing-marketing-cycle.md`）の **Release 段** を担う skill。引き継いだ KPI・看板施策・「ねばならない」を機械的に列挙して、手放し議論を起動する。**実際に手放す決断は人間に残る**（AI は触媒、調停者ではない）。

## RMC Alignment

- **Position**: Release（既成枠の機械的列挙 → 手放し議論の起動）
- **Sync Preflight**: アクティブ workspace の Listen 出力（profile / customer-signal / results）が前提。Customer Sync が空だと「ICP 仮説 vs 実態のズレ」が抽出できない
- **Learn Hook**: 手放しが確定した KPI / 施策は `/learn` で `results/release-log.md` に記録する

## なぜ Release 段が要るか

マーケ組織の最大のボトルネックは、引き継いだ KPI・看板施策・「ねばならない」が思考を縛ること（`marketing-structural-issues.md` Section 0.4 / 2.1 / 2.2）。Insight が出ても、これらを意識的に手放さない限り Activate には届かない。Release は **本番反映ではなく認知・前提・組織心理の解放** である。

## 動作

### Step 1: 機械的列挙（5 カテゴリ）

以下を Read で workspace から自動抽出する。**漏れなく機械的に**：

| カテゴリ | 抽出元 | 質問 |
|---------|-------|------|
| **既成 KPI** | `results/performance-data.md` の Baseline KPI / 走らせている KPI | この KPI は P0 にどう紐付くか？ 説明できるか？（`marketing-structural-issues.md` Section 2.1） |
| **走っている施策** | `profile/business-overview.md` の現行施策一覧 / `results/` の最新ログ | この施策は KPI にどの感応度（High/Mid/Low）で効くか？（同 Section 2.2） |
| **聖域**（過去の意思決定 / 看板施策 / 既存 ICP 像） | `profile/icp.md` `profile/positioning.md` の確定記述 | この前提は誰が・いつ決めたか？ 顧客実態（customer-signal.md）と整合しているか？ |
| **慣習チャネル** | 走っているチャネルのうち、撤退判断が一度もされていないもの | このチャネルが効いていない場合、撤退の意思決定者は誰か？ |
| **ICP 仮説 vs 実態のズレ**（Customer Sync 駆動） | `profile/icp.md`（仮説）vs `profile/customer-signal.md` の `### Release 候補` セクション | 仮説と実態のどちらを残すか？ |

### Step 2: P0–P3 × 感応度のグリッドで篩う

抽出結果を以下のグリッドにマップする：

```
        High感応  Mid感応  Low感応
P0     [維持]   [維持]   [改善 or 撤退]
P1     [維持]   [改善]   [手放し候補]
P2     [維持]   [改善]   [手放し候補]
P3     [維持]   [手放し候補] [撤退]  ★ P3 × Low はゼロ目標
```

`marketing-structural-issues.md` Section 2.1 / 2.2 のフレームを参照。

### Step 3: 手放し候補の提示

ユーザーに対して以下を提示：

```markdown
## Release Candidates — [YYYY-MM-DD]

### 機械的列挙（5 カテゴリ × N 件）

#### 既成 KPI
- [KPI 名]: P? × 感応度? → 手放し候補（理由）

#### 走っている施策
- [施策名]: 効いている KPI / 効いていない KPI → 撤退候補（理由）

#### 聖域
- [前提]: 決定者 / 時期 / 顧客実態との整合性 → 再検査要

#### 慣習チャネル
- [チャネル]: 撤退判断が n ヶ月されていない → 撤退検討要

#### ICP 仮説 vs 実態のズレ
- 仮説: ...
- 実態（customer-signal.md より）: ...
- → 仮説を手放し、実態側に寄せるか？

### 「もし制約がなかったら」（ゼロベース問い直し）
- [問い 1] / [問い 2] / [問い 3]

### 捨てた後に「最後まで残る一本」（`marketing-structural-issues.md` Section 0.4）
- 候補: ...
- 理由: ...
```

### Step 4: 人間の決断を待つ

ユーザーが手放し対象を確定する。AI は**列挙と問いの起動まで**。承認されたものを `/learn` で `results/release-log.md` に記録するよう促す。

## Required Knowledge

```
Read: knowledge/base/reframing-marketing-cycle.md
Read: knowledge/base/marketing-structural-issues.md  # Section 0.2 / 0.4 / 2.1 / 2.2
Read: private/memory/workspaces/active/profile/*.md
Read: private/memory/workspaces/active/results/performance-data.md
```

## Principles

- **機械的列挙に徹する**: 「どれが本当に手放すべきか」は AI が判定しない
- **聖域も並べる**: 「これは触れない」と言われた前提ほど機械的に並べる
- **Customer Sync を仮説の検査に使う**: ICP の確定記述と customer-signal.md の実態を必ず並置する
- **P3 × Low はゼロ目標**: 経営に紐付かず施策にも反応しない指標は存在意義がない（`marketing-structural-issues.md` Section 2.1 のルール 1）
- **「ねばならない」と「やりたい」を分ける**: 手放し議論の前提として区別を要求する

## Anti-Patterns

- 「とりあえず手放した」と言うだけで実際には残す（手放したのは言葉だけ）
- 列挙だけして問いを起動しない（手放し議論が起きない）
- AI が「これは手放すべきです」と決断する（人間の役割の侵害）
- Customer Sync を見ずに ICP 仮説を擁護する（仮説と実態の照合を怠る）

## Chaining

- **前工程**: `/listen customer`（Customer Sync 充実）/ `/insight`（不一致・聖域候補の特定）
- **後工程**: Activate（playbook 参照のインライン対話で再構成）/ `/learn`（手放し決定の記録）
