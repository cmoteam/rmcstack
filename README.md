# RMCStack — AI-Based Marketing OS

RMCStack は、コーディングエージェント上で動作する **AI-Based Marketing OS** です。
マーケ組織が AI と協働するための OS **RMC**（Reframing Marketing Cycle: Listen / Insight / Release / Activate / Learn、読み:「アール・エム・シー」）をそのまま実装したもので、1 コマンドで Listen から Learn までのサイクルを回せます。

> 旧フレームワーク名「SURF」（Syncing / Understanding / Releasing / Fitting）は RMC の前身。プロダクト名はリリース前に **SURFStack → RMCStack** にリネームし、フレームワーク名と揃えた。詳細は [`knowledge/base/surf-framework.md`](knowledge/base/surf-framework.md)（歴史的経緯）。

---

## 🏄 迷ったら `/next`

「何をしたらいいかわからない」「前回どこまでやったか忘れた」「このプロジェクトで AI に何を頼めるんだっけ」── そういう時は **`/next`** を押してください。現在の workspace 状態（Listen 充足率・直近の Activate / Learn 還流の有無）を見て、**次の一歩を 1 つだけ** 推薦します。

- `/next` = 迷った時の入口（ボタン 1 つ押す感覚）
- `/next --verbose` = 詳細な診断ダッシュボード（充足率・ブロッカーを多角的に見る）

---

> RMC は「AI 協働の汎用フレームワーク」ではなく、**マーケ特化の組織学習 OS** です。**Customer Sync を独立同期源として OS 段に埋め込む**ことで汎用組織学習ループ（OODA / PDCA）と差別化し、**Release を独立段として死守**することで戦術最適化系（既存 "Adaptive Marketing"）と差別化しています。

## Who is this for?

- 企業のマーケティング担当者
- スタートアップのグロース担当
- 広告代理店の担当者
- 1 人マーケ / 1 人広報

## The RMC Framework

RMCStack が前提とする、AI 時代のマーケティングの基本サイクル:

```
┌────────┐   ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌────────┐
│ Listen │ → │ Insight │ → │ Release │ → │ Activate │ → │ Learn  │ ─┐
│ 受信   │   │ 抽出    │   │ 手放し  │   │ 起動     │   │ 還流   │  │
└────────┘   └─────────┘   └─────────┘   └──────────┘   └────────┘  │
    ↑                                          （次サイクル起点）   │
    └──────────────────────────────────────────────────────────────┘
```

| RMC 段 | 人間がやること | RMCStack での対応 |
|--------|---------------|-------------------|
| **L**isten（入力） | 4 同期源（Team / **Customer** / Market / Performance）から認識・実態を取り込む | `/listen team-org` `/listen team-brand` `/listen team-workspace` `/listen customer` `/listen market` |
| **I**nsight（出力） | 4 視点（上から / 外から / 下から / 受け手）に切り替えて選択肢を出す | `/insight ceo` `/insight consultant` `/insight gemba` `/insight customer` ＋ ブランド適合は `/brand` |
| **R**elease（解放） | 既成の KPI・聖域・前提を手放す | `/release` |
| **A**ctivate（適合・shipping） | 自社実力に適合した目標で本番反映 | `knowledge/base/` プレイブック直参照のインライン対話（広告 / コンテンツ / SEO / CVR / 価格 / 解約 等） |
| **L**earn（還流） | 結果を memory に書き戻し、次サイクル Listen の入力にする | `/learn` |

詳細は [`knowledge/base/reframing-marketing-cycle.md`](knowledge/base/reframing-marketing-cycle.md) を参照。

### マーケ OS としての構造的特徴

1. **Customer Sync を独立同期源として置く** — ICP 仮説（内部）と顧客実態（外部）を別ノードに分けることで、ズレが構造的に Release 入力になる。これが汎用組織学習ループ（OODA / PDCA）と分かつ最大の構造的違い
2. **Release を独立段として死守** — 既存 "Adaptive Marketing"（リアルタイム最適化）系統との差別化軸
3. **Activate / Learn の分離** — shipping と還流を別段に分けることで、「shipping したけど還流していない」状態が構造的に検出可能になる
4. **Activate 段に skill を持たない** — 実行・shipping は `knowledge/base/` プレイブック直参照。skill 化しないことで「RMC が何の OS か」の輪郭を維持
5. **MVDF Domains を内蔵する** — RMC は「どう回すか」、MVDF は「何を見落とさず管理するか」。MVDF は別サイクルではなく、RMC 各段で使う 8 領域の coverage model

## Setup

### 1. Clone

```bash
git clone https://github.com/cmoteam/rmcstack.git
cd rmcstack
```

### 2. Bootstrap `private/`（企業ごとの別リポを clone）

`private/` 配下（`memory/` と `output/`）は **この upstream リポには含まれません**（gitignore）。企業ごとに実情報が変わるため、各社で **別の private リポジトリを用意し `private/` として clone** する運用を推奨しています。submodule 登録はあえてしていません（企業ごとに URL が異なり upstream に固定できないため）。

```bash
git clone <your-company-private-repo> private
```

private リポ側のレイアウトは以下を想定:

```
private/
├── memory/        # organization / workspaces / results（実データ）
└── output/        # 生成成果物（workspace slug で分離）
```

初回で private リポがまだ無い場合は、空ディレクトリのまま進めても `/listen` `/workspace new <slug>` `/learn` などがテンプレートから自動生成します。あとで `cd private && git init && git remote add origin ...` で切り出せます。

### 3. Bootstrap Company Knowledge

企業固有情報は `private/memory/` 配下に置きますが、このディレクトリは **gitignore 対象**（upstream には含まれない）です。リポジトリにはテンプレート `templates/memory/` のみが入っているので、**最初に `/workspace init` を実行してください**。これが全ての起点になります。

```bash
/workspace init           # ★最初にこれ：private/ 配下（memory/organization, memory/workspaces, output, README）を生成
/workspace new <slug>     # 新規 workspace を作成（事業部・プロダクト・クライアント単位）
/listen team-org          # 組織情報（ミッション・ビジョン・事業ポートフォリオ）
/listen team-brand        # ブランドガイドライン
/listen team-workspace    # workspace 固有情報（ICP・Positioning・競合）
/listen customer          # Customer Sync（顧客の生の声・JTBD・離脱理由）
```

> `/workspace init` は `bin/init-private` に委譲する薄いラッパーです。冪等なので再実行しても既存は上書きされません。

> **なぜ分離しているか**: ICP・競合情報・ブランドガイドラインなどの機密情報を upstream に誤って push する事故を防ぎ、`git pull` でフレームワーク本体のアップデートを素直に取り込めるようにするためです。

### 4. Fill in Company Knowledge（= RMC の Listen）

RMC の **Listen** 段。ここを埋めないと AI は汎用回答しか返せません。成果物の質の 9 割がここで決まります。

memory は **2 層** に分かれます:

| 層 | パス | スコープ | 担当 |
|---|---|---|---|
| Organization | `memory/organization/` | 組織全体（全 workspace 共通） | `/listen team-org` `/listen team-brand` |
| Workspace | `memory/workspaces/<slug>/profile/` | 単一 workspace | `/listen team-workspace` `/listen customer` |

**推奨**: `/listen team-org` → `/listen team-brand` → `/listen team-workspace` → `/listen customer` の順で埋める。Customer Sync は新規追加スコープで、ICP 仮説と実態のズレを検出するための顧客接点ログを構造的に保持します。

手動で編集する場合は、それぞれのディレクトリのファイルを開き `[TODO]` を置き換えてください:

```
memory/organization/organization-overview.md ← 組織全体の概要・ミッション・事業ポートフォリオ
memory/organization/brand-guidelines.md      ← 組織共通のブランドガイドライン

memory/workspaces/<slug>/profile/business-overview.md ← この workspace の事業概要
memory/workspaces/<slug>/profile/icp.md               ← 理想的な顧客像（仮説）
memory/workspaces/<slug>/profile/positioning.md      ← ポジショニング
memory/workspaces/<slug>/profile/competitors.md      ← 競合情報
memory/workspaces/<slug>/profile/customer-signal.md  ← Customer Sync（実態）
```

⚠️ **`templates/memory/` 配下には実情報を書き込まないでください**。こちらは upstream に push される共通テンプレートです。実データは必ず gitignore 側（`private/memory/`）に書きます。

充足率は `/next --verbose` で確認できます。

### 5. Bootstrap Results Knowledge（企業固有の結果ログ）

自社の実績数値（CVR・CPA・売上 等）は `private/memory/workspaces/<slug>/results/` に置きます。こちらも **gitignore 対象** なので、初回に `templates/memory/results/` からコピーしてください（`/workspace new <slug>` が自動化）:

```bash
cp -r templates/memory/results private/memory/workspaces/<slug>/results
```

`/learn` を初回実行した際に未存在なら自動で同じコピーが行われます。

### 6. Refresh Update Knowledge（外部揮発情報）

`knowledge/update/` は外部観測・公開情報（プラットフォーム仕様変更、業界トレンド）の最新化レイヤーです。自社数値は対象外（`results/` 側）。

**推奨**: `/listen market` で対話的に書き戻し、自社の KPI 実績は `/learn` で `memory/results/` に書き込みます。検証済みの学びは `/learn` が profile 層に昇華します（次サイクルの Listen 入力になる）。

```
knowledge/update/platform-updates.md    ← プラットフォーム仕様変更（共有可）
knowledge/update/industry-trends.md     ← 業界トレンド（共有可）
memory/workspaces/<slug>/results/performance-data.md ← 直近のパフォーマンスデータ（gitignore）
```

### 7. Connect Integrations（外部ツール直結・optional）

Figma / Google Ads / GA4 / Search Console / Meta / X / LinkedIn / TikTok / HubSpot / Salesforce / Stripe / Notion / Slack / BigQuery / PostHog / Amplitude / Intercom などと **MCP サーバ経由で直接繋ぐ** ことができます。接続があれば CSV 手入力をスキップして RMC サイクルが一段速く回ります（未接続でも従来通り動作します）。

```bash
cp .mcp.json.example .mcp.json
# .mcp.json を編集し、使うサーバを残して API Key / Token を環境変数で注入
```

- 詳細カタログ: [`knowledge/base/integrations.md`](knowledge/base/integrations.md)
- `.mcp.json` と `.claude/settings.local.json` は gitignore 済み（シークレット保護）
- Write 操作は必ずユーザー承認ゲート経由 / Read-only から始めるのが既定
- 最小推奨セット: Figma + Google Ads + GA4 + Meta + Slack + GitHub

## Available Skills

**RMC 各段に 1 skill ずつ + Ops 2 個 = 7 skills**。

### Core RMC Skills（5）

| Command | RMC 段 | 引数 | Description |
|---------|--------|------|-------------|
| `/listen` | Listen | `team-org` / `team-brand` / `team-workspace` / `customer` / `market` | 4 同期源の統一エントリ。Customer Sync を独立スコープとして持つ |
| `/insight` | Insight | `ceo` / `consultant` / `gemba` / `customer` | 4 視点切替（上から / 外から / 下から / 受け手） |
| `/brand` | Insight | （なし） | ブランド適合チェック（軸違いの専門 skill） |
| `/release` | Release | （なし） | 既成 KPI・聖域・前提の機械的列挙 → 手放し議論触媒 |
| `/learn` | Learn | （なし） | 結果還流・検証ゲート付き書き戻し・AI 採否ログ |

### Meta / Ops（2）

| Command | 引数 | Description |
|---------|------|-------------|
| `/next` | `--verbose` | 次の一歩を 1 行で推薦。`--verbose` で RMC サイクル詳細ダッシュボード |
| `/workspace` | `init` / `list` / `current` / `new <slug>` / `switch <slug>` / `remove <slug>` | workspace 初期化・切替・一覧・新規作成・削除 |

### Activate 段に skill を持たない設計判断

実行・shipping は `knowledge/base/` プレイブックを参照しながらインライン対話で進めます。skill 化しないことで「RMC が何の OS か」の輪郭を維持します。

| 領域 | 参照する knowledge/base/ |
|------|------------------------|
| 広告運用 | [`digital-advertising.md`](knowledge/base/digital-advertising.md) |
| コンテンツ制作 | [`content-marketing.md`](knowledge/base/content-marketing.md) [`narrative-storytelling.md`](knowledge/base/narrative-storytelling.md) |
| SEO（KW 戦略・技術 SEO・コンテンツ最適化） | [`seo-playbook.md`](knowledge/base/seo-playbook.md) |
| 顧客調査 | [`customer-research-jtbd.md`](knowledge/base/customer-research-jtbd.md) |
| データ分析・計測 | [`web-analytics-practice.md`](knowledge/base/web-analytics-practice.md) [`measurement-incrementality.md`](knowledge/base/measurement-incrementality.md) |
| 価格設計 | [`pricing-strategy.md`](knowledge/base/pricing-strategy.md) |
| 解約防止・リテンション | [`retention-lifecycle.md`](knowledge/base/retention-lifecycle.md) |
| CVR 最適化（page / signup-flow / onboarding / form / popup / paywall） | [`cvr-optimization-playbook.md`](knowledge/base/cvr-optimization-playbook.md) |
| 見積り・工数計算 | [`estimate-playbook.md`](knowledge/base/estimate-playbook.md) |
| ブランド戦略 | [`brand-strategy.md`](knowledge/base/brand-strategy.md) |

### Workflows（統合ワークフロー）

> ⚠️ **現状未実装**。`.claude/workflows/` 配下に配置予定。

| Command | Description |
|---------|-------------|
| `/campaign-launch` | キャンペーンの全工程（企画→制作→レビュー→ローンチ） |
| `/content-review` | コンテンツの制作→多角的レビューサイクル |
| `/landing-page` | LP 設計→制作→最適化 |
| `/weekly-retro` | 週次マーケティング振り返り |

## Architecture

```
rmcstack/
├── CLAUDE.md                    # Canonical: agents, RMC, knowledge
├── AGENTS.md                    # Stub pointing to CLAUDE.md (for Codex 他)
├── .claude/
│   ├── skills/                  # 7 skills
│   │   ├── listen/              #   /listen <scope>
│   │   ├── insight/             #   /insight <role>
│   │   ├── brand/               #   /brand
│   │   ├── release/             #   /release
│   │   ├── learn/               #   /learn
│   │   ├── next/                #   /next [--verbose]
│   │   └── workspace/           #   /workspace <subcommand>
│   └── agents/                  # /insight /brand から Task tool で呼ばれる
│       ├── ceo-review.md        #   /insight ceo
│       ├── consultant-review.md #   /insight consultant
│       ├── insight-gemba.md     #   /insight gemba
│       ├── insight-customer.md  #   /insight customer
│       └── creative-direction.md#   /brand
│
├── bin/                         # Shell ヘルパー（init-private, workspace, set-* の委譲先）
├── .mcp.json.example            # MCP サーバテンプレ（copy to .mcp.json, gitignored）
│
├── knowledge/                   # Base: shared, tracked
│   ├── base/                    # 不変フレームワーク（reframing-marketing-cycle, marketing-structural-issues, learning-organization, responsibility-design, *-playbook.md, ...）
│   └── update/                  # 外部揮発情報（platform-updates, industry-trends）
│
├── templates/
│   └── memory/                  # memory 層のテンプレ（private/memory を生成する元）
│       ├── organization/
│       ├── profile/
│       └── results/
│
├── private/                     # Per-project data (gitignored)
│   ├── memory/
│   │   ├── organization/        # Organization-wide: mission, brand, portfolio
│   │   └── workspaces/
│   │       ├── <slug>/profile/  # ICP, positioning, competitors, customer-signal
│   │       ├── <slug>/results/  # 実績数値・検証ログ
│   │       └── active → <slug>  # アクティブ symlink
│   └── output/<slug>/           # 生成成果物（workspace ごと）
│
└── lib/                         # 共通部品
    ├── preamble.md
    ├── review-format.md
    └── scoring-rubric.md
```

## Knowledge vs Memory

ベースの `knowledge/`（tracked、共有可）と per-project の `private/memory/`（gitignored）を分離しています。`templates/memory/` は private/memory/ を生成するためのテンプレート。

```
knowledge/                            templates/memory/            private/memory/
(shared base — tracked)               (templates — tracked)        (per-project — gitignored)
┌──────────────────────────┐         ┌──────────────────────┐     ┌──────────────────────────────┐
│ base/                    │         │ organization/        │ ──▶ │ organization/                │
│  reframing-marketing-,   │         │ profile/             │ ──▶ │ workspaces/<slug>/profile/   │
│  marketing-structural-,  │         │ results/             │ ──▶ │ workspaces/<slug>/results/   │
│  learning-organization,  │         └──────────────────────┘     └──────────────────────────────┘
│  responsibility-design,  │         テンプレから private/ を生成: /workspace init
│  *-playbook.md, ...      │
├──────────────────────────┤
│ update/                  │
│  platform-updates,       │
│  industry-trends         │
└──────────────────────────┘

Write targets:
  /listen team-org / team-brand → memory/organization/
  /listen team-workspace        → memory/workspaces/<slug>/profile/
  /listen customer              → memory/workspaces/<slug>/profile/customer-signal.md
  /listen market                → knowledge/update/
  /learn                        → memory/.../results/ (raw) + memory/.../profile/ (verified)
```

## RMC Cycle

RMCStack のマーケティングサイクルは、そのまま RMC のサイクルです:

```
RMC: Listen ──→ Insight ──→ Release ──→ Activate ──→ Learn ──→（次サイクル Listen に還流）

スキル単体でも各段を回せます（workflows 統合版は将来実装）:

  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │  Listen  │ → │  Insight │ → │  Release │ → │ Activate │ → │   Learn  │
  │ /listen  │   │ /insight │   │ /release │   │ playbook │   │ /learn   │
  │  team-org│   │  ceo     │   │          │   │ 直参照の │   │          │
  │  team-   │   │  consult-│   │          │   │ インライン│   │          │
  │  brand   │   │  ant     │   │          │   │ 対話     │   │          │
  │  team-   │   │  gemba   │   │          │   │          │   │          │
  │  work-   │   │  customer│   │          │   │          │   │          │
  │  space   │   │ /brand   │   │          │   │          │   │          │
  │  customer│   │          │   │          │   │          │   │          │
  │  market  │   │          │   │          │   │          │   │          │
  └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
       ↑                                                            │
       └── /learn + /listen market で knowledge / memory に還流 ─────┘
```

## なぜ RMCStack か — 起点となる問題意識

なぜマーケティングチームは機能しないのか。最も根源的な答えは「前提共有の不在」にある:

1. **個人の存在意義が言語化されていない** — メンバーが「自分は事業のどの課題に効いているか」を即答できない
2. **「マーケティング」の共通定義がチーム内にない** — 同じ言葉で別のことを話しているため議論が噛み合わない
3. **戦略から切り離された戦術チームが、戦略課題を戦術で解こうとする** — プロダクト・価格・ポジショニングのずれは広告コピーでは解けない
4. **顧客との同期チャネルが構造的にない** — ICP 仮説（内部）と顧客実態（外部）のズレが検出されない
5. **失敗の症状: 閉じた指標への固執 or 施策の自己目的化** — CPA・CVR・PV だけを追う、または「やった感」が目的化する
6. **AI 時代はこれを洗練された形で加速する** — 集計・施策量産・きれいな報告書がいくらでも作れる、しかし事業は変わらない

RMC の **Listen**（4 同期源で前提を揃える、特に Customer Sync で実態を直接捕捉）→ **Insight**（4 視点で理解する）→ **Release**（既成 KPI・聖域を手放す）→ **Activate**（自社の現在地に適合した課題・戦術・目的を再設定し本番反映）→ **Learn**（結果を還流して次サイクルに渡す）は、この 6 層への直接的な対症である。詳細は [`knowledge/base/marketing-structural-issues.md`](knowledge/base/marketing-structural-issues.md) Section 0 から。

## 関連知識

- [`knowledge/base/reframing-marketing-cycle.md`](knowledge/base/reframing-marketing-cycle.md) — **RMC canonical OS**
- [`knowledge/base/surf-framework.md`](knowledge/base/surf-framework.md) — SURF（RMC の前身）の歴史的経緯
- [`knowledge/base/mvdf.md`](knowledge/base/mvdf.md) — MVDF（RMC に内蔵される 8 領域の coverage model）
- [`knowledge/base/signature-frameworks.md`](knowledge/base/signature-frameworks.md) — 企業固有名のマーケティング体系（P&G / Unilever / Amazon / Google / HubSpot 等）
- [`knowledge/base/marketing-structural-issues.md`](knowledge/base/marketing-structural-issues.md) — マーケの構造的病理（Section 0: 前提共有の不在）
- [`knowledge/base/learning-organization.md`](knowledge/base/learning-organization.md) — 学習する組織
- [`knowledge/base/responsibility-design.md`](knowledge/base/responsibility-design.md) — 責任の所在の設計
- [`knowledge/base/customer-research-jtbd.md`](knowledge/base/customer-research-jtbd.md) — Customer Sync の実装プレイブック

## License

MIT
