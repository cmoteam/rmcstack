---
name: learn
description: RMC の Learn 段（還流）。施策の結果（数字＋定性）を受け取り、検証済み知見だけを memory / knowledge に書き戻す。AI 出力の採否ログも残す。
version: 1.0.0
---

# Learn — 結果還流ゲート

RMC（`knowledge/base/reframing-marketing-cycle.md`）の **Learn 段** を担う唯一の skill。実行された施策（Activate）の結果をユーザーから受け取り、情報の性質に応じて適切な memory / knowledge 層に書き戻す。**検証済みでないものを `private/memory/workspaces/active/profile/` に混入させない（Listen 汚染防止）こと**が最重要責務。

## RMC Alignment

- **Position**: Learn（Activate の終端 → 次サイクル Listen 起点）
- **Sync Preflight**: `private/memory/workspaces/active/results/performance-data.md` `private/memory/workspaces/active/profile/*` が存在する前提
- **Listen Hook**: 書き戻された結果は次サイクルの `/listen` で読まれる。**この skill が無いと RMC サイクルは閉じない**

## Step 0: Bootstrap（初回のみ）

`private/memory/workspaces/active/results/` が未存在なら：

```bash
cp -r templates/memory/results private/memory/workspaces/active/results
```

または `bin/init-private --workspace <slug>` で workspace ごと初期化。`templates/memory/results/` は絶対に書き換えない（upstream に流れる）。

## Required Knowledge

```
Read: knowledge/base/reframing-marketing-cycle.md
Read: private/memory/workspaces/active/profile/business-overview.md
Read: private/memory/workspaces/active/profile/icp.md
Read: private/memory/workspaces/active/profile/positioning.md
Read: private/memory/workspaces/active/profile/customer-signal.md
Read: private/memory/workspaces/active/results/performance-data.md
```

## Intake Protocol

ユーザーに以下を **1 メッセージで一括** 質問：

### Block A: 施策の特定
- 施策名 / 期間 / チャネル
- 参照した knowledge/base/ プレイブック（例: `digital-advertising.md` / `cvr-optimization-playbook.md`）

### Block B: 数字の Feedback
- KPI 実績: CTR / CVR / CPA / ROAS / LTV
- 予測値 vs 実績値 の差分
- N 数（統計的有意性判断のため）

### Block C: 定性の Feedback
- 顧客からの反応（具体的な声があれば引用）
- 営業現場で聞かれた質問
- クレーム・違和感
- AI の提案のうち: 採用したもの / 却下したもの / 修正したもの

### Block D: 学び
- なぜ予測と実績がズレたか（仮説）
- 次サイクルの Listen に何を追加すべきか

### Block E: 4 軸（Auto-upgrade トリガ）

以下 4 軸の情報が入力にあれば、出力を 4-Axis 構造に **auto-upgrade**：

- **Funnel Conversion**: TOFU / MOFU / BOFU / Retention / Referral でどう転換率が動いたか
- **Segment Response**: セグメント別反応差
- **Attribution**: ラストクリック以外を含むチャネル寄与
- **Unit Economics Update**: CAC / LTV / Payback / LTV:CAC のズレ

2 軸以上 → 4-Axis モード、1 軸以下 → 従来モード。

## Classification — 検証ゲート

3 カテゴリに分類してから、**承認を得てから書き込む**：

### カテゴリ 1: results / customer-signal に直接反映

- 数値の実績 → `results/performance-data.md`
- 顧客の生の声・新しい言葉 → `profile/customer-signal.md` の追記セクション
- 施策ごとの観測事実・仮説ログ（統計有意未達）→ `results/`

### カテゴリ 2: profile 層への反映候補（要検証）

次の条件を **すべて** 満たす場合のみ：

- [ ] N ≥ 統計的に意味のある数（目安: CV 30 件以上 / 記事 10 本以上 / 広告 2 週間以上）
- [ ] 単一施策ではなく複数施策で同じ傾向が観測されている
- [ ] 仮説ではなく検証済みの事実として記述できる
- [ ] ユーザーが明示的に「profile 層に書いてよい」と承認した

書き込み対象例:
- ICP の解像度が上がった（新しいペイン・言い回し）
- Positioning の差別化軸の微修正
- Brand Voice で避けるべき表現の判明

### カテゴリ 3: 却下（書き込まない）

- N が小さすぎる
- 仮説段階の解釈
- 一時的な外部要因（季節性・ニュース）によるブレ
- ユーザーの感情的な反応

却下したものは Archive セクションに記録するだけで、knowledge/ には書き込まない。

## Write Protocol

1. カテゴリ 1 は `private/memory/workspaces/active/results/*.md` または `customer-signal.md` の該当セクションに追記
2. カテゴリ 2 は ユーザー承認後に `profile/*.md` に反映。差分を diff 形式で提示してから書き込み
3. 書き込み後、該当ファイル末尾に `## Feedback Log` セクションを作成／追記し、`[YYYY-MM-DD] 施策名: 変更点の要約` を 1 行追加
4. Release 段で確定した手放し決定があれば、`results/release-log.md` に追記

すべての書き込み先は gitignore 対象（upstream には流れない）。

## AI 出力の採否ログ

**必須**: AI が出した提案のうち何を採用し何を捨てたかを記録する：

```markdown
## AI Decision Log — [YYYY-MM-DD] / 施策名

### 採用
- [提案]: 採用理由

### 却下
- [提案]: 却下理由

### 修正採用
- [提案]: 修正の内容と理由
```

これにより「AI が言ったから」を判断の根拠にしない構造を維持する（`responsibility-design.md`）。

## Output

```markdown
## Learn Processed — [YYYY-MM-DD]
Mode: 従来 / 4-Axis（Block E が 2 軸以上で自動切替）

### 分類結果
- カテゴリ 1（results / customer-signal 反映）: N 件
- カテゴリ 2（profile 反映候補）: N 件 ← 承認要求
- カテゴリ 3（却下）: N 件

### カテゴリ 2 の承認要求
以下の変更を反映してよいですか？

#### 変更 1: [ファイル名 / セクション]
```diff
- [変更前]
+ [変更後]
```
根拠: [N 件の実績 / 複数施策での再現性]

### 反映済み（results / customer-signal）
- ...

### AI Decision Log
- 採用 / 却下 / 修正採用

### Archive（却下）
- [施策名]: 却下理由

### 次サイクルの Listen への引き継ぎ
- 残課題: ...
- 新仮説: ...

### 次の一手
- `/next` で更新後の状態を確認
- 次サイクルの `/insight`（必要 role）または `/release` へ
```

## Principles

- **Listen 汚染を絶対に起こさない**: 検証ゲートを通らないものは profile 層に書かない
- **却下も記録する**: 却下した情報は消さず、判断理由とともに残す
- **Diff で承認を取る**: profile 層の変更は必ず変更前後を見せて承認を得る
- **数字と定性を分ける**: 数字はそのまま、定性は「事実 + 解釈」で分離
- **AI 採否ログを必ず残す**: 「AI が言ったから」を排除する
- **Customer Sync への書き戻しを忘れない**: 数値メトリクスだけで終わらせない

## Anti-Patterns

- N=1 の反応を ICP の修正に使う
- 仮説を事実として profile 層に書く
- ユーザー承認なく profile 層を書き換える
- 却下したものを黙って消す
- AI 採否ログを残さない（「AI が言ったから」病の温床）

## Chaining

- **前工程**: Activate（playbook 参照のインライン対話で shipping した結果）/ `web-analytics-practice.md` 参照のインライン分析
- **後工程**: `/next`（更新後の状態確認）→ 次サイクルの `/listen` または `/insight`
