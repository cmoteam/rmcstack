# SURFStack Agents — Virtual Marketing Organization

SURFStack は Claude Code / Codex 上で動作する仮想マーケティング組織。各エージェントは SKILL.md で定義され、全員が **SURF**（Syncing / Understanding / Releasing / Fitting、読み:「サーフ」）サイクルの特定段階を担います。`CLAUDE.md` が canonical、`AGENTS.md` はこのファイルを参照するスタブ（Codex 他ハーネス向け）。

## Operating Model — SURF

**AI 時代のマーケティング OS**。個別フレームワーク（AARRR・STP・RAM-CE 等）の上位に位置し、それらを**組織学習として機能させる**ための型を定義します。マーケ固有ディメンション（ファネル段階 / セグメント / ユニットエコノミクス / KPI / アトリビューション）を重ねる **Marketing Extension** で特化性を担保（optional）。詳細は `knowledge/base/surf-framework.md`。

```
Syncing ─→ Understanding ─→ Releasing ─→ Fitting ─┐
   ↑                                                  │
   └──────────────────────────────────────────────────┘
        （Fitting の終端は次サイクルの Syncing 起点）
```

- **S — Syncing**（共有／入力）: 情報・認識・リソース・課題のサイロを解消し、共有された前提から始める
- **U — Understanding**（理解／出力）: 何を理解しているか／していないかを可視化し、視点を切り替えて選択肢を出す
- **R — Releasing**（解放）: 既成の KPI・聖域・「ねばならない」を手放し、リフレーミングの余白を作る
- **F — Fitting**（適合・本番反映・還流）: 自社プロダクトに適合した目標とステップに再構成し、shipping し、結果を次の Syncing に還流する

| SURF | 担い手 |
|------|-------|
| Syncing（入力） | `/set-organization` `/set-brand` `/set-workspace` `/set-update` `/init-private` `/workspace` + `knowledge/` + `private/memory/` |
| Understanding（出力） | `/cmo-review` `/ceo-review` `/seo` `/creative-direction` `/ui-design` `/customer-research` `/data-analytics` `/pricing-strategy` `/churn-prevention` `/estimate` |
| Releasing（解放） | `/release-assumptions` `/consultant-review` |
| Fitting（適合・shipping・還流） | `/contents-edit` `/ads-manager` `/optimize` `/feedback`（次サイクル還流のゲート） |
| Meta | `/surf-check` `/next` |

Workflows（`campaign-launch` / `content-review` / `landing-page` / `weekly-retro`）は複数段階を横断する束ね役。`.claude/workflows/` 配下、**現状未実装**。

全 SKILL.md 冒頭に `SURF Alignment` セクション（Position / Sync Preflight / Fitting Hook）あり。Understanding / Fitting 系には optional な `Target Funnel Stage` / `Target Segment` / `Primary KPI` フィールドがある（記入すれば解像度が上がる、空欄でも動作する）。

## Available Skills

自動検出されたスキル一覧は会話開始時のシステムリマインダー参照。カテゴリ別詳細は `knowledge/base/agent-catalog.md`。

### 迷ったら
- **`/next`** — 現在の workspace 状態を見て次の一歩を**1 つだけ**推薦（workspace 未作成もここで検出）
- `/surf-check` — `/next` の詳細モード（充足率・ブロッカー・Marketing Extension を可視化）

### Workspace / SURF Ops
- `/workspace` — list / current / new / switch / remove
- `/set-organization` / `/set-brand` / `/set-workspace` / `/set-update` — Syncing 段階の各層
- `/release-assumptions` — Releasing 段階。前提・KPI・聖域を機械的に列挙して手放し議論を起動する
- `/feedback` — Fitting の還流ゲート

### Executive / Specialist / Optimization
- Executive: `/ceo-review` `/cmo-review` `/consultant-review`
- Specialist: `/seo` `/creative-direction` `/ui-design` `/ads-manager` `/contents-edit` `/data-analytics` `/customer-research` `/pricing-strategy` `/churn-prevention` `/estimate`
- Optimization: **`/optimize <target>`** — target = `page` / `signup-flow` / `onboarding` / `form` / `popup` / `paywall`

## Knowledge Architecture

```
knowledge/           — shared base (tracked, upstream に流れる)
  base/                 不変フレームワーク・マインドセット（SURF・徹底原理・組織学習・責任設計）
  update/               外部揮発情報（プラットフォーム仕様・業界トレンド）

templates/memory/    — memory 層のテンプレート (tracked)
  organization/         private/memory/organization/ のテンプレ
  profile/              private/memory/workspaces/<slug>/profile/ のテンプレ
  results/              private/memory/workspaces/<slug>/results/ のテンプレ

private/memory/      — per-workspace memory (gitignored)
  organization/         組織全体（単一インスタンス）
  workspaces/<slug>/profile/  事業プロフィール（ICP / Positioning / Competitors 等）
  workspaces/<slug>/results/  実績数値・施策検証ログ
  workspaces/active  → <slug>  アクティブ symlink（全スキルが参照）
```

初回セットアップ: `bin/init-private` で organization 層を作成、`bin/workspace new <slug>` で workspace を追加。

**workspace** は「SURF Syncing（ICP・Positioning・Brand・Competitors・実績）が独立して成立する最小スコープ」。事業部 / クライアント / プロダクトラインなど。`default` は使わない。

### 各層の責務

- **`knowledge/base/`** — 普遍的フレームワーク（めったに変更しない）。SURF 本体・組織学習論・責任設計
- **`knowledge/update/`** — 外部揮発情報。`/set-update` で更新。自社実績は対象外
- **`private/memory/organization/`** — 組織全体共通。ミッション / ビジョン / 事業ポートフォリオ / ブランドガイドライン
- **`private/memory/workspaces/<slug>/profile/`** — workspace 固有。ICP / Positioning / 競合。ブランド差分が必要なら `brand-guidelines.md` を追加して override
- **`private/memory/workspaces/<slug>/results/`** — workspace 固有の実績数値・検証ログ。`/feedback` が書き込む

**inheritance は導入しない**。共通情報が workspace に重複するのは許容（SKILL.md にマージ責務を波及させない設計）。

## Output Directory

全スキルの一次成果物は `private/output/<workspace>/` に書き込みます（`<workspace>` は `readlink private/memory/workspaces/active` で取得）。

- `private/output/` は gitignore 対象
- プロジェクトルートや `.claude/skills/` 内に直接ファイルを作らない
- 推奨ファイル名: `YYYYMMDD-{skill}-{slug}.{ext}`
- `knowledge/` に成果物を書くのは NG（knowledge は「次サイクルの Syncing に効く蓄積」専用）

## Skills vs Agents

Skill（`.claude/skills/`）と Agent（`.claude/agents/`）の 2 種類。レビュー系（CEO / CMO / Consultant / SEO / Creative Direction）は agent 化済（skill は thin dispatcher）、それ以外は基本 skill。詳細は `knowledge/base/skills-vs-agents.md`。

## Integrations

各スキルは Figma / GA4 / Google Ads / Meta / HubSpot / Salesforce / Stripe / Slack / Notion / BigQuery / PostHog / Amplitude 他と MCP 経由で直結可能。

- **カタログ**: `knowledge/base/integrations.md`
- **設定**: `.mcp.json.example` を `.mcp.json` にコピー（gitignored）。シークレットは環境変数
- **ガードレール**: Write は必ず承認ゲート / Read-only から開始 / 最小 scope / PII は匿名化

未接続時は従来の CSV 手入力にフォールバック。

## Principles

1. **忖度しない** — 数字とロジックに基づいた率直なフィードバック
2. **実行ベース** — アドバイスで終わらず成果物（コピー・HTML・設定値）まで出す。Fitting の shipping まで到達して完了
3. **根拠を示す** — すべての提案に理由・データ・フレームワーク裏付けを添える
4. **SURF サイクルを回す** — Releasing と Fitting 還流を怠らない。1 つのワークフローで Syncing→Understanding→Releasing→Fitting→次 Syncing を完結
5. **知識を分離する** — 普遍知識と揮発情報を混ぜない。検証済みの知見のみ `private/memory/workspaces/active/profile/` に書く
6. **責任を曖昧にしない** — 「AI が言ったから」を判断の根拠にしない。AI 出力の採否ログを `/feedback` の差分セクションに残す（詳細 `knowledge/base/responsibility-design.md`）

## Canonical SURF Flow

初回プロジェクトの推奨順:

0. `/workspace new <slug>` — workspace を 1 つ作成（実在する事業名で）
1. `/set-organization` — 組織情報（Syncing）
2. `/set-brand` — ブランドガイドライン（Syncing）
3. `/set-workspace` — workspace 固有情報（Syncing）
4. `/next` — 次の一歩確認（詳細は `/surf-check`）。不足があれば 1〜3 に戻る
5. `/cmo-review`（Understanding 単体）or `/campaign-launch`（Syncing〜Fitting 横断ワークフロー）
6. `/release-assumptions` or `/consultant-review` — Releasing。既成枠の手放し
7. `/data-analytics` or `/weekly-retro` — Fitting の結果集約
8. `/set-update` + `/feedback` — Syncing 層への還流（サイクルを閉じる）

## Agent Communication Protocol

エージェント間の引き継ぎは以下のフォーマット:

```markdown
## Handoff: [送信元 Agent] → [受信先 Agent]

### Context
[何についてのレビュー / 作業か]

### Findings
[発見事項・成果物のサマリー]

### Action Items for Next Agent
- [ ] [具体的なアクション 1]

### Artifacts
[成果物へのパス or インラインの成果物]
```

## 関連知識ベース

- `knowledge/base/surf-framework.md` — SURF の定義・各段階の責務・スキル対応
- `knowledge/base/marketing-structural-issues.md` — SURF が解こうとしているマーケティングの構造的病理
- `knowledge/base/learning-organization.md` — 学習プロセスをチームに埋め込む方法
- `knowledge/base/responsibility-design.md` — 責任の所在の設計、AI 委譲時代の責任外部化問題
