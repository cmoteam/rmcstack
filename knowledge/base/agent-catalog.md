# Agent Catalog — RMCStack スキル詳細定義

各スキルの **役割 / 入力 / 出力 / 知識 / トリガー** を網羅的に記載。`CLAUDE.md` の `## Available Skills` 一覧から詳細が必要になった時に参照する。

## 設計思想（2026-04 改訂、RMC 移行版）

RMCStack の skill は「**RMC サイクルを駆動する**」「**workspace 知識を前提に判断する**」役割に絞っている。RMC（Reframing Marketing Cycle: Listen / Insight / Release / Activate / Learn、`reframing-marketing-cycle.md`）の各段に対応する skill を 1 つずつ + Ops 2 個の **計 7 skills** で構成する。

### 残した skill の判定基準

- **Cycle Driver** — RMC サイクルの動力源（Listen 入力 / Insight 視点切替 / Release ゲート / Learn 還流 / Meta）
- **Ops** — サイクル外、土台整備（workspace 操作、初期化、サイクル現在地確認）

実行・shipping（**Activate 段**）は skill 化せず、`knowledge/base/` のプレイブック（`digital-advertising.md` / `content-marketing.md` / `seo-playbook.md` / `cvr-optimization-playbook.md` / `pricing-strategy.md` / `retention-lifecycle.md` / `customer-research-jtbd.md` / `estimate-playbook.md` / `brand-strategy.md` 等）を参照しながらインライン対話で進める。

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
- **重要制約**: profile 層への書き込みは N ≥ 統計有意 + 複数施策再現 + ユーザー承認の三条件

## Meta / Ops（2）

### `/next` — 次の一歩 + サイクル診断

- **役割**: RMC 現在地を診断して次の一歩を 1 件推薦。`--verbose` で詳細ダッシュボード（旧 `/surf-check` 機能を吸収）
- **モード**:
  - default: 1 行推薦（次に踏むべき一歩のみ）
  - verbose: RMC サイクル充足率 / ブロッカー / Marketing Extension / 直近サイクル動向
- **入力**: なし
- **出力**: 推薦コマンド 1 つ + 理由 1〜2 文（default）/ 完全ダッシュボード（verbose）
- **トリガー**: 何を叩けばいいかわからない時、フェーズ切替時

### `/workspace` — Workspace ops

- **役割**: workspace の初期化・切替・一覧・新規作成・削除（旧 `/init-private` を吸収）
- **subcommand**: `init` / `list` / `current` / `new <slug>` / `switch <slug>` / `remove <slug>`
- **委譲先**: `bin/init-private`（init）/ `bin/workspace`（その他）
- **トリガー**: 初回セットアップ、新規 workspace 追加、切替

## Agent Files（`/insight` `/brand` から呼ばれる）

| agent file | 呼び出し元 | scope |
|-----------|----------|-------|
| `.claude/agents/ceo-review.md` | `/insight ceo` | company-wide |
| `.claude/agents/consultant-review.md` | `/insight consultant` | workspace |
| `.claude/agents/insight-gemba.md`（新規） | `/insight gemba` | workspace |
| `.claude/agents/insight-customer.md`（新規） | `/insight customer` | workspace |
| `.claude/agents/creative-direction.md` | `/brand` | workspace |

> 注: agent ファイル名は `/insight` 配下で揃えるなら `insight-ceo.md` `insight-consultant.md` にリネームするのが整合的。低優先度の改名作業として残置。

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

## 移行履歴（2026-04 RMC 化）

### Skill 統廃合（15 → 7、約 53% 削減）

| 旧 skill | 新 skill | 経緯 |
|---------|---------|------|
| /set-organization | `/listen team-org` | 4 同期源を `/listen` に統合 |
| /set-brand | `/listen team-brand` | 同上 |
| /set-workspace | `/listen team-workspace` | 同上 |
| /set-update | `/listen market` | 同上 |
| （新規） | `/listen customer` | **Customer Sync を独立スコープとして追加**（マーケ OS の構造的差別化軸） |
| /cmo-review | （廃止） | CMO は ceo + gemba の中間役。3+1 パースペクティブで triangulate |
| /ceo-review | `/insight ceo` | 4 視点切替の統一エントリへ |
| /consultant-review | `/insight consultant` | 同上 |
| （新規） | `/insight gemba` | 現場視点として新設（Toyota Lean の "現場" 概念） |
| （新規） | `/insight customer` | 受け手視点として新設（ICP 本人 / 購買者 / 離脱者として読み返す） |
| /seo | `seo-playbook.md`（プレイブック化） | チャネル / 専門領域は skill 化しない原則に整理 |
| /creative-direction | `/brand` | リネーム + 軸違い（専門性）として独立維持 |
| /release-assumptions | `/release` | リネーム |
| /feedback | `/learn` | RMC 段の語彙に統一 |
| /surf-check | `/next --verbose` | Meta 重複の解消 |
| /init-private | `/workspace init` | Ops 統合 |
| /workspace | `/workspace`（subcommand 拡張） | init を吸収 |

### Skill 削除（プレイブックに統合済み、2026-04 第 1 弾）

以下は前回の見直しで削除済み：

- `/ads-manager` → `digital-advertising.md`
- `/contents-edit` → `content-marketing.md`
- `/customer-research` → `customer-research-jtbd.md`
- `/data-analytics` → `web-analytics-practice.md` + `measurement-incrementality.md`
- `/pricing-strategy` → `pricing-strategy.md`
- `/churn-prevention` → `retention-lifecycle.md`
- `/optimize <target>` → `cvr-optimization-playbook.md`
- `/estimate` → `estimate-playbook.md`
- `/ui-design` → `cvr-optimization-playbook.md` の page セクション
- `/powerpoint` → 廃止
