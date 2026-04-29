# RMCStack — AI-Based Marketing OS

RMCStack は Claude Code / Codex 上で動作する **AI-Based Marketing OS**。Skill（`.claude/skills/*/SKILL.md`）と Agent（`.claude/agents/*.md`）の 2 種類で構成され、全員が **RMC**（Reframing Marketing Cycle: Listen / Insight / Release / Activate / Learn、読み:「アール・エム・シー」）サイクルの特定段階を担います。`CLAUDE.md` が canonical、`AGENTS.md` はこのファイルを参照するスタブ（Codex 他ハーネス向け）。

> 旧フレームワーク名「SURF」（Syncing / Understanding / Releasing / Fitting）は RMC の前身。プロダクト・リポジトリ名はリリース前に **SURFStack → RMCStack** にリネームし、フレームワーク名と揃えた。詳細は `knowledge/base/surf-framework.md`（歴史的経緯）。

## Operating Model — RMC

**マーケ組織のための AI 協働 OS**。個別フレームワーク（AARRR・STP・RAM-CE 等）の上位に位置し、それらを**組織学習として機能させる**ための型を定義します。

```
Listen ─→ Insight ─→ Release ─→ Activate ─→ Learn ─┐
   ↑                                                    │
   └────────────────────────────────────────────────────┘
              （Learn の終端は次サイクルの Listen 起点）
```

| RMC | 動詞 | 役割 |
|-----|------|------|
| **L — Listen** | 受信する | 4 同期源（**Team / Customer / Market / Performance**）から認識・実態を取り込む |
| **I — Insight** | 抽出する | 視点を切り替えて選択肢と判断材料を出す。JTBD・ICP 差分・Positioning 機会を言語化する |
| **R — Release** | 手放す | 既成 KPI・聖域・「ねばならない」を機械的に列挙して手放し、リフレーミングの余白を作る |
| **A — Activate** | 起動する | セグメント × チャネル × コンテンツに実装し、計測同時着地で本番反映する |
| **L — Learn** | 学ぶ | 結果を ICP / Positioning / Playbook に書き戻し、次サイクルの Listen 入力に変える |

### マーケ OS としての構造的特徴

1. **Customer Sync を独立同期源として置く** ── ICP 仮説（内部）と顧客実態（外部）を別ノードに分けることで、ズレが構造的に Release 入力になる。これが汎用組織学習ループ（OODA / PDCA）と RMC を分かつ最大の構造的違い
2. **Release を独立段として死守** ── 既存 "Adaptive Marketing"（リアルタイム最適化）系統との差別化軸。**Reframing**（既成枠の組み替え）を骨格名に昇格させた戦略レイヤー OS
3. **Activate / Learn の分離** ── shipping と還流を別段に分けることで、「shipping したけど学習に還流していない」状態が構造的に検出可能になる

詳細は `knowledge/base/reframing-marketing-cycle.md`。

### MVDF Domains — Listen 充足チェックリスト

RMC は AMA 定義（創造・伝達・提供・交換）の全工程を扱う。Listen 段で「自社のマーケがどの領域をカバーできていて、どこが空白か」を点検するための coverage model として **MVDF Domains** を内蔵する：市場・顧客理解 / 戦略・ポジショニング / ブランド・コミュニケーション / 提供価値・商品連携 / チャネル・顧客接点 / 需要創出・キャンペーン / 顧客関係・成長 / 測定・ガバナンス。MVDF は RMC と並ぶ別サイクルではなく、RMC 各段で点検する管理対象である。詳細と各領域 × RMCStack 道具対応表は `knowledge/base/reframing-marketing-cycle.md`、補足は `knowledge/base/mvdf.md`。

## Available Skills

**Core 5（Listen / Insight×2 / Release / Learn）+ Ops 2（Meta / Workspace）= 7 skills**。Activate 段は skill を持たず `knowledge/base/` プレイブックで実行する。詳細は `knowledge/base/agent-catalog.md`。

### Core RMC Skills（5）

| RMC 段 | skill | 引数 | 機能 |
|--------|-------|------|------|
| Listen | `/listen` | `team-org` / `team-brand` / `team-workspace` / `customer` / `market` | 4 同期源（Team / Customer / Market / Performance）の統一エントリ。**Customer Sync を独立スコープとして持つ** |
| Insight | `/insight` | `ceo` / `consultant` / `gemba` / `customer` | 4 視点切替（上から / 外から / 下から / 受け手）。subagent_type で対応 agent を呼ぶ |
| Insight | `/brand` | （なし） | ブランド適合チェック（軸違いの専門 skill。creative-direction agent を呼ぶ） |
| Release | `/release` | （なし） | 既成 KPI・聖域・前提の機械的列挙 → 手放し議論触媒 |
| Learn | `/learn` | （なし） | 結果還流・検証ゲート付き書き戻し・AI 採否ログ |

### Meta / Ops（2）

| skill | 引数 | 機能 |
|-------|------|------|
| `/next` | `--verbose` | 次の一歩を 1 行で推薦。`--verbose` で RMC サイクル詳細ダッシュボード |
| `/workspace` | `init` / `list` / `current` / `new <slug>` / `switch <slug>` / `remove <slug>` | workspace 初期化・切替・一覧・新規作成・削除 |

### Activate 段に skill を置かない設計判断

実行・shipping は `knowledge/base/` プレイブックを参照しながらインライン対話で進める。skill 化しないことで「RMC が何の OS か」の輪郭を維持する。

### 設計思想（再設計後も維持する原則）

- **skill は「サイクルを駆動する」「workspace 知識を前提に判断する」役割に絞る**。クリエイティブ生産・専門領域の実行（広告運用・コンテンツ制作・SEO・CVR 最適化・価格設計・解約対策・顧客調査・データ分析・UI レビュー・見積り）は LLM 汎用能力 + `knowledge/base/` のプレイブックでカバー
- 専門 skill が乱立すると「RMC が何の OS か」の輪郭がぼやけるため、**敢えて持たない**

### 専門領域は knowledge/base/ プレイブックに委譲

LLM 汎用能力 + プロンプトで十分な「実行・生産」レイヤーは skill 化せず、`knowledge/base/` のドキュメントを参照しながらインライン対話で進める：

| 領域 | 参照する knowledge/base/ |
|------|------------------------|
| 広告運用 | `digital-advertising.md` |
| コンテンツ制作 | `content-marketing.md` `narrative-storytelling.md` |
| **SEO**（KW 戦略・技術 SEO・コンテンツ最適化） | `seo-playbook.md` |
| 顧客調査 | `customer-research-jtbd.md` |
| データ分析・計測 | `web-analytics-practice.md` `measurement-incrementality.md` |
| 価格設計 | `pricing-strategy.md` |
| 解約防止・リテンション | `retention-lifecycle.md` |
| CVR 最適化（page / signup-flow / onboarding / form / popup / paywall） | `cvr-optimization-playbook.md` |
| 見積り・工数計算 | `estimate-playbook.md` |
| UI / LP レビュー | `cvr-optimization-playbook.md` の page セクション |
| ブランド戦略 | `brand-strategy.md` |

## Knowledge Architecture

```
knowledge/           — shared base (tracked, upstream に流れる)
  base/                 不変フレームワーク・マインドセット（RMC・組織学習・責任設計）
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

初回セットアップ: `/workspace init` で `private/` ブートストラップ、`/workspace new <slug>` で workspace 追加（内部で `bin/init-private` `bin/workspace` を呼ぶ）。`/listen team-org` `/listen team-brand` `/listen team-workspace` は対応する `bin/set-organization` `bin/set-brand` `bin/set-workspace` で TODO フィールドを埋める。

**workspace** は「RMC Listen（ICP・Positioning・Brand・Competitors・Customer Signal・実績）が独立して成立する最小スコープ」。事業部 / クライアント / プロダクトラインなど。`default` は使わない。

### 各層の責務

- **`knowledge/base/`** — 普遍的フレームワーク（めったに変更しない）。RMC 本体・組織学習論・責任設計
- **`knowledge/update/`** — 外部揮発情報（Market Sync）。`/listen market` で更新。自社実績は対象外
- **`private/memory/organization/`** — 組織全体共通。ミッション / ビジョン / 事業ポートフォリオ / ブランドガイドライン
- **`private/memory/workspaces/<slug>/profile/`** — workspace 固有。ICP / Positioning / 競合 / Customer Signal。ブランド差分が必要なら `brand-guidelines.md` を追加して override
- **`private/memory/workspaces/<slug>/results/`** — workspace 固有の実績数値・検証ログ（Performance Sync）。`/learn` が書き込む

**inheritance は導入しない**。共通情報が workspace に重複するのは許容（SKILL.md にマージ責務を波及させない設計）。

## Output Directory

全スキルの一次成果物は `private/output/<workspace>/` に書き込みます（`<workspace>` は `readlink private/memory/workspaces/active` で取得）。

- `private/output/` は gitignore 対象
- プロジェクトルートや `.claude/skills/` 内に直接ファイルを作らない
- 推奨ファイル名: `YYYYMMDD-{skill}-{slug}.{ext}`
- `knowledge/` に成果物を書くのは NG（knowledge は「次サイクルの Listen に効く蓄積」専用）

## Skills vs Agents

Skill（`.claude/skills/`）と Agent（`.claude/agents/`）の 2 種類。視点切替系（`ceo-review` / `consultant-review` / `insight-gemba` / `insight-customer` / `creative-direction`）は agent 化済で `/insight` `/brand` から thin dispatcher として呼ぶ、それ以外は基本 skill。詳細は `knowledge/base/skills-vs-agents.md`。

## Integrations

各スキルは Figma / GA4 / Google Ads / Meta / HubSpot / Salesforce / Stripe / Slack / Notion / BigQuery / PostHog / Amplitude 他と MCP 経由で直結可能。

- **カタログ**: `knowledge/base/integrations.md`
- **設定**: `.mcp.json.example` を `.mcp.json` にコピー（gitignored）。シークレットは環境変数
- **ガードレール**: Write は必ず承認ゲート / Read-only から開始 / 最小 scope / PII は匿名化

未接続時は従来の CSV 手入力にフォールバック。

## Principles

1. **忖度しない** — 数字とロジックに基づいた率直なフィードバック
2. **実行ベース** — アドバイスで終わらず成果物（コピー・HTML・設定値）まで出す。Activate の shipping まで到達して完了
3. **根拠を示す** — すべての提案に理由・データ・フレームワーク裏付けを添える
4. **RMC サイクルを回す** — Release と Learn 還流を怠らない。1 つのワークフローで Listen→Insight→Release→Activate→Learn→次 Listen を完結
5. **知識を分離する** — 普遍知識と揮発情報を混ぜない。検証済みの知見のみ `private/memory/workspaces/active/profile/` に書く
6. **責任を曖昧にしない** — 「AI が言ったから」を判断の根拠にしない。AI 出力の採否ログを `/learn` の差分セクションに残す（詳細 `knowledge/base/responsibility-design.md`）

## Canonical RMC Flow

初回プロジェクトの推奨順:

0. `/workspace new <slug>` で workspace を 1 つ作成（実在する事業名で）
1. `/listen team-org` で組織情報を入力（Listen / Team Sync）
2. `/listen team-brand` でブランドガイドラインを入力（Listen / Team Sync）
3. `/listen team-workspace` `/listen customer` で workspace 固有情報を入力（Listen / Team + Customer Sync）
4. `/next` で次の一歩確認。不足があれば 1〜3 に戻る
5. `/insight <ceo|consultant|gemba|customer>` `/brand` でレビュー
6. `/release` で既成 KPI / 聖域 / 前提の手放し
7. Activate（広告運用・コンテンツ・CVR 改善・分析等は `knowledge/base/` プレイブックを参照しながらインライン対話で shipping）
8. `/listen market` で外部揮発情報を更新、`/learn` で結果還流（次サイクルの Listen 入力を作る）

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

- `knowledge/base/reframing-marketing-cycle.md` — **RMC canonical OS**。Listen / Insight / Release / Activate / Learn の 5 段
- `knowledge/base/surf-framework.md` — SURF（RMC の前身となった 4 段汎用ループ）の歴史的経緯
- `knowledge/base/mvdf.md` — MVDF（Marketing Value Delivery Framework）。RMC に内蔵される coverage model（MVDF Domains）の詳細
- `knowledge/base/signature-frameworks.md` — 企業固有名のマーケティング体系（P&G Brand Management / Unilever Desire at Scale / Amazon Working Backwards / Google ZMOT / HubSpot Inbound 等 12 手法）
- `knowledge/base/marketing-structural-issues.md` — RMC が解こうとしているマーケティングの構造的病理
- `knowledge/base/learning-organization.md` — 学習プロセスをチームに埋め込む方法
- `knowledge/base/responsibility-design.md` — 責任の所在の設計、AI 委譲時代の責任外部化問題
- `knowledge/base/customer-research-jtbd.md` — Customer Sync の実装プレイブック
