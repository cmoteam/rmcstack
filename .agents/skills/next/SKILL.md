---
name: next
description: 「今何をしたらいいかわからない」時に最初に押すスキル。RMC サイクル現在地（Listen 充足率・直近の Activate / Learn 還流の有無）から、次に踏むべき一歩を 1 つだけ推薦。--verbose で詳細ダッシュボード。
version: 2.1.0
---

# Next — 迷ったらこれ

「何をしたらいいかわからない」「前回どこまでやったか忘れた」「このプロジェクトで AI に何を頼めるんだっけ」という状態からの入口。
現在のリポジトリ状態を最小限走査して、**次の一歩を 1 つだけ提案する**（ダッシュボードではなく「ボタン」）。

`--verbose` フラグで RMC サイクル全体の詳細ダッシュボード（旧 `/next --verbose`）に切り替わる。

## RMC Alignment

- **Position**: Meta（RMC のどの段階かを判断して次の段階への入口を示す）
- **Listen Preflight**: 不要（未完了の Listen や workspace 未作成を検出することが責務）
- **Learn Hook**: なし（推薦のみ、書き込み副作用なし）

## モード

| モード | 起動 | 出力 |
|-------|------|------|
| **default** | `/next` | 1 行推薦（次に踏むべき一歩のみ） |
| **verbose** | `/next --verbose` または `/next dashboard` | RMC サイクルの詳細ダッシュボード（充足率・ブロッカー・Artifact Completion・Evidence Level・Marketing Extension） |

## Default モードの動作

以下を **順番に** 確認し、最初に該当した条件に対応する推薦を出す。**最初にぶつかった壁だけ**を取り上げる。

### Step 0: Workspace が未作成（最優先 / ハード停止）

```bash
test -L private/memory/workspaces/active && test -d "private/memory/workspaces/active" || echo "NO_WORKSPACE"
ls private/memory/workspaces/ 2>/dev/null
```

- `private/memory/workspaces/active` symlink が無い、または `private/memory/workspaces/` が空
  - → **⚠️ 警告**: 「アクティブな workspace がありません。CMOFlow は workspace を 1 つ作らないと動作しません」
  - → **推薦**: `/workspace new <slug>`（slug は実在する事業名。`default` は使わない）
  - これ以降のステップはスキップ

### Step 0.5: Organization 層が未作成

```bash
test -d private/memory/organization || echo "NO_ORGANIZATION"
```

- 未存在 → **推薦**: `/listen team-org`
- 代替: `/workspace init` で全体ブートストラップ

### Step 1: Listen 充足率（Team Sync の `[TODO]`）

```bash
grep -l "\[TODO\]" private/memory/organization/*.md private/memory/workspaces/active/profile/*.md 2>/dev/null | wc -l
```

- organization ファイルの過半数に `[TODO]` → **推薦**: `/listen team-org`
- profile ファイルの過半数に `[TODO]` → **推薦**: `/listen team-workspace`
- 両方なら organization を先に（上位コンテキスト優先）

### Step 1.5: Customer Sync が空（マーケ OS の構造的要件）

```bash
test -f private/memory/workspaces/active/profile/customer-signal.md \
  && test -s private/memory/workspaces/active/profile/customer-signal.md \
  && ! grep -q "\[TODO" private/memory/workspaces/active/profile/customer-signal.md \
  || echo "NO_CUSTOMER_SIGNAL"
```

- `customer-signal.md` が無い、空、または `[TODO]` が残っている → **推薦**: `/listen customer`
- 理由: Customer Sync が無いと `/insight customer` も `/release` も顧客実態を参照できない（一般論しか出ない）

### Step 2: 直近の Results / 還流（Learn の終端）

- `results/performance-data.md` の最終更新が 30 日以上前 → **推薦**: `/learn`（直近施策の還流）
- 走った施策ログがあるが Learn 未実行 → **推薦**: `/learn`

### Step 3: 全部揃っている → 次サイクルへ

- → **推薦**: `/insight ceo` または `/release`（前回サイクルからの懸案による）

### 出力フォーマット（Default）

```markdown
## Next — [現在の RMC 段階]

⚠️ [ブロッカーがあれば 1 行]

### 推薦
[skill 名] — [なぜこれか、1 行]

### 詳細が知りたい
`/next --verbose`
```

## Verbose モードの動作（旧 /next --verbose 機能）

RMC サイクル全体の現在地を詳細に診断する。

### 1. RMC サイクル充足率

| 段 | skill | 状態 | 充足度 |
|----|-------|-----|--------|
| Listen / team-org | /listen team-org | [TODO] N 件 | x% |
| Listen / team-brand | /listen team-brand | [TODO] N 件 | x% |
| Listen / team-workspace | /listen team-workspace | [TODO] N 件 | x% |
| Listen / customer | /listen customer | customer-signal.md の TODO / 引用件数 / Release 候補 | x% |
| Listen / market | /listen market | knowledge/update/ 最終更新 | 経過日数 |
| Learn | /learn | results/ 最終更新 | 経過日数 |

### 2. ブロッカー一覧

- 高優先度: ハード停止条件（workspace 未作成、organization 未作成）
- 中優先度: Customer Sync 空、Listen の TODO 過半数、Activate artifact 不足、Evidence Level 不整合
- 低優先度: 30 日以上の Learn 未実行、next-listen-input 未作成

### 3. Marketing Extension 充足

`reframing-marketing-cycle.md` の以下が埋まっているか:

- Funnel Stage（TOFU / MOFU / BOFU）
- Segment（Primary / Secondary / Anti-Persona）
- Unit Economics（CAC / LTV / Payback / 許容 CPA）
- Measurement（使用ツール）
- Baseline KPI（現状 CVR / CPA / ROAS / 順位）

### 4. 直近のサイクル動向

- 直近 Activate（shipping）の数
- 直近 Release 決定の数
- 直近 Learn 還流の数
- AI Decision Log の有無

### 5. Artifact Completion

`agent-catalog.md` の Artifact Completion Rule に沿って、1 サイクルが閉じているかを診断する。実チェックは以下を実行する：

```bash
bin/artifact-check
```

内部ではアクティブ workspace を以下で取得する：

```bash
workspace="$(basename "$(readlink private/memory/workspaces/active 2>/dev/null)")"
output_dir="private/output/$workspace"
results_dir="private/memory/workspaces/active/results"
profile_dir="private/memory/workspaces/active/profile"
```

#### 必須 artifact チェック

| 条件 | 判定方法 | 未充足時の扱い |
|---|---|---|
| Listen: `customer-signal.md` | `test -s "$profile_dir/customer-signal.md"` かつ `[TODO]` が残っていない | `/listen customer` |
| Listen: baseline | `test -s "$results_dir/performance-data.md"` | `/learn` または baseline 入力 |
| Insight: options / evidence | `$output_dir/*insight-options*.md` または `$output_dir/*evidence-map*.md` がある | `/insight <role>` |
| Release: candidates / log | `$output_dir/*release-candidates*.md` または `$results_dir/release-log.md` がある | `/release` |
| Activate: brief | `$output_dir/*activation-brief*.md` がある | Activate brief 作成 |
| Activate: measurement | `$output_dir/*measurement-plan*.md` がある | measurement plan 作成 |
| Learn: result | `$results_dir/*result-log*.md` がある | `/learn` |
| Learn: AI decision | `$results_dir/*ai-decision-log*.md` がある | `/learn` で AI Decision Log 作成 |
| Learn → Listen: next input | `$output_dir/*next-listen-input*.md` がある | `/learn` の引き継ぎ作成 |

#### 出力フォーマット

```markdown
### Artifact Completion
| RMC | Required | Status | Next |
|---|---|---|---|
| Listen | customer-signal / baseline | OK / Missing | ... |
| Insight | options / evidence-map | OK / Missing | ... |
| Release | release-candidates / release-log | OK / Missing | ... |
| Activate | activation-brief / measurement-plan | OK / Missing | ... |
| Learn | result-log / ai-decision-log / next-listen-input | OK / Missing | ... |
```

### 6. Evidence Level 分布

`reframing-marketing-cycle.md` の Evidence Level（E0〜E3）に沿って、`results/` と `private/output/<workspace>/` 内の知見の検証度を集計する。通常は `bin/artifact-check` の Evidence Level セクションをそのまま使う。手動確認する場合は以下：

```bash
rg --no-filename -o "E[0-3](:|\\b)" "$results_dir" "$output_dir" 2>/dev/null | sed 's/[: ]$//' | sort | uniq -c
```

表示する観点:

- **E0 が残っている数**: 仮説のまま残っている。profile 反映不可
- **E1 の数**: 単発観測。`customer-signal.md` / `results/` に留める
- **E2 の数**: profile 反映候補。承認待ちがないか確認
- **E3 の数**: 検証済み知見。profile / update への反映漏れがないか確認

#### Evidence ブロッカー

- E0 / E1 しかないのに `profile/` 更新が提案されている → **高優先度ブロッカー**
- E2 以上の記録があるが、承認ログや diff がない → **中優先度ブロッカー**
- E3 があるが `next-listen-input.md` がない → **中優先度ブロッカー**

### 7. 推薦（Default モードと同じ）

最初にぶつかった壁を 1 つ。

## Required Knowledge

```
Read: knowledge/base/reframing-marketing-cycle.md
Read: private/memory/workspaces/active/profile/*.md
Read: private/memory/workspaces/active/results/*.md
```

## Principles

- **Default は 1 行推薦**: ダッシュボードを出さない。「次にどのボタンを押すか」だけ
- **Verbose は --verbose 明示時のみ**: デフォルトでダッシュボードを出すと「迷ったらこれ」の入口価値が薄れる
- **書き込みなし**: 副作用なし、診断のみ
- **Customer Sync を独立にチェック**: マーケ OS の構造的要件として優先度を高く扱う

## Chaining

- **前工程**: なし（迷ったときの入口）
- **後工程**: 推薦された skill
