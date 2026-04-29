# Agent Catalog — CMOFlow スキル詳細定義

各スキルの **役割 / 入力 / 出力 / 知識 / トリガー** を網羅的に記載。`CLAUDE.md` の `## Available Skills` 一覧から詳細が必要になった時に参照する。

## 設計思想

CMOFlow の skill は「**RMC サイクルを駆動する**」「**workspace 知識を前提に判断する**」役割に絞っている。RMC（Reframing Marketing Cycle: Listen / Insight / Release / Activate / Learn、`reframing-marketing-cycle.md`）の各段に対応する skill を 1 つずつ + Ops 2 個の **計 7 skills** で構成する。

### 残した skill の判定基準

- **Cycle Driver** — RMC サイクルの動力源（Listen 入力 / Insight 視点切替 / Release ゲート / Learn 還流 / Meta）
- **Ops** — サイクル外、土台整備（workspace 操作、初期化、サイクル現在地確認）

実行・shipping（**Activate 段**）は skill 化せず、`knowledge/base/` のプレイブック（`digital-advertising.md` / `content-marketing.md` / `seo-playbook.md` / `cvr-optimization-playbook.md` / `pricing-strategy.md` / `retention-lifecycle.md` / `customer-research-jtbd.md` / `estimate-playbook.md` / `brand-strategy.md` 等）を参照しながらインライン対話で進める。

## Artifact Catalog — RMC 最小成果物

CMOFlow の体系性と運用性を担保するため、各 RMC 段で最低限残す成果物を以下に固定する。これは PMBOK 風の重い成果物体系ではなく、**1 サイクルを次回に引き継げる状態にするための最小 artifact set** である。

雛形は `templates/artifacts/` に置く。実ファイルは `private/output/<workspace>/` または `private/memory/workspaces/active/results/` にコピーして使う。

### 原則

- **成果物は RMC の段階に紐づける**: 「何を作ったか」だけでなく、Listen / Insight / Release / Activate / Learn のどの段階の証跡かを明示する
- **workspace 固有情報は `private/memory/` に置く**: 組織・事業固有の事実、顧客ログ、施策結果は upstream に流さない
- **一次成果物は `private/output/<workspace>/` に置く**: レビュー結果、施策案、brief、レポートなどの作業成果は output に残す
- **`knowledge/base/` は汎用化された知識だけ**: 1 workspace の結果を直接 base knowledge に昇格しない
- **Activate は skill 化しないが artifact は必須**: shipping の前後で brief / measurement / approval の最低証跡を残す

### RMC Stage × Required Artifacts

| RMC 段 | 最小 artifact | 推奨パス | 目的 | 作成・更新タイミング |
|---|---|---|---|---|
| **Listen** | `sync-diff.md` | `private/output/<workspace>/YYYYMMDD-listen-sync-diff.md` | Team / Customer / Market / Performance の一致・不一致を可視化する | `/listen` 後、複数入力を同期したとき |
| Listen | `customer-signal.md` | `private/memory/workspaces/active/profile/customer-signal.md` | 顧客の生の言葉・行動・反論・離脱理由を ICP 仮説と分けて保持する | `/listen customer`、顧客接点後、`/learn` 還流時 |
| Listen | `baseline.md` または `performance-data.md` | `private/memory/workspaces/active/results/performance-data.md` | 施策前の KPI / Unit Economics / 計測状態を記録する | Activate 前、月次・四半期更新 |
| **Insight** | `options.md` | `private/output/<workspace>/YYYYMMDD-insight-options.md` | 選択肢、判断材料、推奨案、却下案を分けて残す | `/insight` 実行時、新規施策設計時 |
| Insight | `assumption-map.md` | `private/output/<workspace>/YYYYMMDD-insight-assumption-map.md` | 前提・未検証仮説・反証条件を一覧化する | 施策案が複数の仮説に依存するとき |
| Insight | `evidence-map.md` | `private/output/<workspace>/YYYYMMDD-insight-evidence-map.md` | 判断根拠を顧客ログ・数値・市場情報・経験則に分解する | 重要判断、経営承認、profile 更新候補が出たとき |
| **Release** | `release-candidates.md` | `private/output/<workspace>/YYYYMMDD-release-candidates.md` | KPI・施策・聖域・慣習チャネル・ICP ズレを手放し候補として列挙する | `/release` 実行時 |
| Release | `stop-doing-log.md` または `release-log.md` | `private/memory/workspaces/active/results/release-log.md` | 実際に止めた施策・KPI・前提と理由を組織記憶に残す | 人間が手放しを決定した後、`/learn` 時 |
| **Activate** | `activation-brief.md` | `private/output/<workspace>/YYYYMMDD-activation-brief.md` | 目的、owner、scope、非 scope、予算、実行内容を固定する | shipping 前 |
| Activate | `measurement-plan.md` | `private/output/<workspace>/YYYYMMDD-measurement-plan.md` | Before / After、判定指標、観測期間、計測方法、撤退条件を固定する | shipping 前、計測実装時 |
| Activate | `approval-log.md` | `private/output/<workspace>/YYYYMMDD-approval-log.md` | ブランド・法務・予算・実装承認の痕跡を残す | 承認が必要な施策の shipping 前後 |
| **Learn** | `result-log.md` | `private/memory/workspaces/active/results/YYYYMMDD-result-log.md` | 施策結果、予測との差分、定性反応、次回課題を残す | 施策終了時、判定期間終了時 |
| Learn | `ai-decision-log.md` | `private/memory/workspaces/active/results/YYYYMMDD-ai-decision-log.md` | AI 提案の採用・却下・修正採用と理由を残す | AI を使った施策の `/learn` 時 |
| Learn | `next-listen-input.md` | `private/output/<workspace>/YYYYMMDD-next-listen-input.md` | 次サイクルの Listen に戻すべき新仮説・残課題・追加観測点を明示する | `/learn` 完了時 |

### Artifact Completion Rule

RMC の 1 サイクル完了は、以下が揃った状態とする。

1. Listen の `customer-signal.md` と baseline が存在する
2. Insight の選択肢と判断根拠が output に残っている
3. Release 候補を一度は列挙し、採否が記録されている
4. Activate の brief と measurement plan が shipping 前に作られている
5. Learn の result log と AI decision log が `results/` に戻っている
6. 次サイクルの `next-listen-input.md` が作られている

この 6 条件を満たさない場合、その活動は「施策を実行した」状態ではあっても、CMOFlow 上では **サイクルが閉じていない** と扱う。

### Naming Rule

`private/output/<workspace>/` に置く artifact は以下の形式を推奨する。

```text
YYYYMMDD-{rmc-stage}-{artifact-slug}.md
```

例:

```text
20260429-insight-options-pricing.md
20260429-release-candidates-seo.md
20260429-activation-brief-meta-ads.md
20260429-measurement-plan-lp-abtest.md
```

`private/memory/workspaces/active/results/` に置く artifact は、時系列で後から検索できるように日付 prefix を付ける。ただし継続更新する台帳型 artifact（`performance-data.md` / `release-log.md`）は固定名でよい。

## RMC Skills（5）

### `/listen` — Listen 段（4 同期源の統一エントリ）

- **役割**: RMC Listen 段。Team / Customer / Market / Performance の 4 同期源を引数で切替
- **scope 引数**: `team-org` / `team-brand` / `team-workspace` / `customer` / `market`
- **委譲先**:
  - team-org → `bin/set-organization`
  - team-brand → `bin/set-brand`
  - team-workspace → `bin/set-workspace`
  - market → `bin/set-update`
  - customer → 直接対話で `customer-signal.md` を構造的に埋める（**新規スコープ**）
- **入力**: 各同期源の対話入力
- **出力**: 該当ファイルへの書き込み + 充足率サマリー
- **トリガー**: workspace 初期化時、ICP 更新時、新規顧客インタビュー後、外部仕様変更時

### `/insight` — Insight 段（4 視点の統一エントリ）

- **役割**: RMC Insight 段。4 視点でレビュー
- **role 引数**:
  - `ceo` — 上から（経営・財務・ROI）→ `subagent_type: ceo-review`
  - `consultant` — 外から（ゼロベース批評）→ `subagent_type: consultant-review`
  - `gemba` — 下から（現場・実装可能性）→ `subagent_type: insight-gemba`
  - `customer` — 受け手から（ICP 本人視点）→ `subagent_type: insight-customer`
- **入力**: 対象施策・成果物・論点
- **出力**: agent の判断材料レポート（書き込み副作用なし）
- **知識**: base/reframing-marketing-cycle + profile（特に customer-signal）+ results
- **トリガー**: 新規施策の go/no-go、戦略リフレーミング、施策の実装可能性確認、コピー / LP の刺さり度評価
- **CMO 視点の扱い**: 構造的に「ceo + gemba」の中間役なので独立 role として持たない。マーケ統括観点が必要なら `/insight ceo` → `/insight gemba` で triangulate

### `/brand` — Insight 専門軸（ブランド適合）

- **役割**: ブランド一貫性・トーン&マナーをブランドガイドラインと照合してレビュー
- **委譲先**: `subagent_type: creative-direction`
- **入力**: コピー、ビジュアル案、LP 構成、広告クリエイティブ
- **出力**: クリエイティブ評価 + 修正指示 + ブランド適合度スコア
- **知識**: profile（特に brand-guidelines）
- **トリガー**: クリエイティブ制作前 / 後、ブランド一貫性レビュー
- **なぜ独立 skill か**: `/insight` の 4 役は「視点の高さ」軸で揃う。ブランド適合は「専門性」軸であり、軸を混ぜないため独立維持

### `/release` — Release 段（手放し触媒）

- **役割**: 既成 KPI・聖域・前提・「ねばならない」を機械的に列挙して手放し議論を起動
- **入力**: なし（profile / customer-signal / results を走査）
- **出力**: 5 カテゴリ × P0–P3 × 感応度 のグリッドで篩った手放し候補リスト + ゼロベース問い直し
- **知識**: base/marketing-structural-issues（特に Section 0.4 / 2.1 / 2.2）+ profile + results
- **トリガー**: 停滞感、四半期見直し、新サイクル開始前、Insight 段で出た不一致が多いとき
- **重要制約**: AI は列挙のみ。実際に手放す決断は人間に残る

### `/learn` — Learn 段（還流ゲート）

- **役割**: 施策結果を検証ゲート付きで memory / knowledge に書き戻す + AI 採否ログを残す
- **入力**: 数字（KPI 実績 / 4 軸データ）+ 定性（顧客反応・学び）+ AI 提案の採否
- **出力**: カテゴリ分類（results / customer-signal 反映 / profile 反映候補 / 却下）+ diff ベースの書き込み + 4-Axis 自動判定
- **知識**: base/reframing-marketing-cycle + profile + update
- **トリガー**: キャンペーン終了時、shipping 後の還流タイミング
- **重要制約**: profile 層への書き込みは Evidence Level E2 以上 + N ≥ 統計有意 + 複数施策再現 + ユーザー承認の四条件

## Meta / Ops（2）

### `/next` — 次の一歩 + サイクル診断

- **役割**: RMC 現在地を診断して次の一歩を 1 件推薦。`--verbose` で詳細ダッシュボード（旧 `/surf-check` 機能を吸収）
- **モード**:
  - default: 1 行推薦（次に踏むべき一歩のみ）
  - verbose: RMC サイクル充足率 / ブロッカー / Artifact Completion / Evidence Level / Marketing Extension / 直近サイクル動向
- **Artifact 診断**: `bin/artifact-check` を使う
- **入力**: なし
- **出力**: 推薦コマンド 1 つ + 理由 1〜2 文（default）/ 完全ダッシュボード（verbose）
- **トリガー**: 何を叩けばいいかわからない時、フェーズ切替時

### `/workspace` — Workspace ops

- **役割**: workspace の初期化・切替・一覧・新規作成・削除
- **subcommand**: `init` / `list` / `current` / `new <slug>` / `switch <slug>` / `remove <slug>`
- **委譲先**: `bin/init-private`（init）/ `bin/workspace`（その他）
- **トリガー**: 初回セットアップ、新規 workspace 追加、切替

## Agent Files（`/insight` `/brand` から呼ばれる）

| agent file | 呼び出し元 | scope |
|-----------|----------|-------|
| `.claude/agents/ceo-review.md` | `/insight ceo` | company-wide |
| `.claude/agents/consultant-review.md` | `/insight consultant` | workspace |
| `.claude/agents/insight-gemba.md` | `/insight gemba` | workspace |
| `.claude/agents/insight-customer.md` | `/insight customer` | workspace |
| `.claude/agents/creative-direction.md` | `/brand` | workspace |

## 専門領域は knowledge/base/ プレイブックに委譲

skill 化せず、LLM + プロンプトで対応。会話で `knowledge/base/<doc>.md` を参照しながら進める（Activate 段に skill を持たない設計判断）。

| 領域 | 参照する knowledge/base/ |
|------|------------------------|
| 広告運用（Google / Meta / X / LinkedIn / TikTok） | `digital-advertising.md` `measurement-incrementality.md` |
| コンテンツマーケ（ブログ・SNS・メール・WP） | `content-marketing.md` `narrative-storytelling.md` `video-shorts-strategy.md` |
| **SEO**（KW 戦略・技術 SEO・コンテンツ最適化） | `seo-playbook.md` |
| 顧客調査（JTBD / Switch / Win-Loss / Churn / Message Testing） | `customer-research-jtbd.md` |
| データ分析・計測 | `web-analytics-practice.md` `measurement-incrementality.md` `metrics-glossary.md` |
| 価格設計・パッケージング | `pricing-strategy.md` |
| 解約防止・リテンション | `retention-lifecycle.md` |
| CVR 最適化（page / signup-flow / onboarding / form / popup / paywall） | `cvr-optimization-playbook.md` |
| 見積り・工数計算・松竹梅提案 | `estimate-playbook.md` |
| UI / LP レビュー | `cvr-optimization-playbook.md` の page セクション |
| ブランド戦略 | `brand-strategy.md` |
| カテゴリーデザイン / B2B Demand Gen / Community Led Growth など | `category-design.md` `b2b-demand-gen.md` `community-led-growth.md` 他 |
