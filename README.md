# SARFStack — Virtual Marketing Organization 

SARFStackは、コーディングエージェント上で動作する**仮想マーケティング組織**です。
AI時代の **マーケティングOS** である **SARF**（Set / Ask / Release / Feedback、読み:「サーフ」）をそのまま実装したもので、1コマンドでSetからFeedbackまでのサイクルを回せます。

---

## 🏄 迷ったら `/next`

「何をしたらいいかわからない」「前回どこまでやったか忘れた」「このプロジェクトでAIに何を頼めるんだっけ」——そういう時は **`/next`** を押してください。現在の workspace 状態（Set 充足率・直近の Release / Feedback）を見て、**次の一歩を1つだけ** 推薦します。

- `/next` = 迷った時の入口（ボタン1つ押す感覚）
- `/sarf-check` = 詳細な診断ダッシュボード（充足率・ブロッカーを多角的に見る）

---

> SARF は「AI協働の汎用フレームワーク」ではなく、マーケティング特化のOSです。ファネル段階・セグメント・ユニットエコノミクス・KPI・アトリビューションといったマーケ固有のディメンションを各段階に重ねる **Marketing Extension**（optional）により、マーケ文脈でAIが本気で機能するように設計されています。

## Who is this for?

- 企業のマーケティング担当者
- スタートアップのグロース担当
- 広告代理店の担当者
- 1人マーケ/1人広報

## The SARF Framework

SARFStackが前提とする、AI時代のマーケティングの基本サイクル（**マーケティングOS**）:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   Set    │ →  │   Ask    │ →  │ Release  │ →  │ Feedback │ ─┐
│ 情報を渡す│    │ 問いを組む│    │ 本番反映  │    │ 結果を戻す│  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘  │
      ↑                                                           │
      └───────────────────────────────────────────────────────────┘
```

| SARF段階 | 人間がやること | SARFStackでの対応 |
|---------|---------------|---------------|
| **S**et | 事業・ICP・ブランド・制約を言語化してAIに渡す | `knowledge/`（base）と `memory/`（per-project）に記入 |
| **A**sk | 誰の視点で・何を・どの形式で出させるか問いを組む | レビュー系スキル（`/cmo-review` 等） |
| **R**elease | 出てきたアイデアを判断して**本番環境に反映**する | 制作系スキル・ワークフロー（`/contents-edit` `/landing-page` 等） |
| **F**eedback | 結果の数字と定性反応をAIに戻す | 分析系スキル（`/data-analytics` `/weekly-retro`） |

詳細は [`knowledge/base/sarf-framework.md`](knowledge/base/sarf-framework.md) を参照。マーケ固有のディメンション（Funnel Stage / Segment / Unit Economics / Measurement / Baseline KPI）を各段階に重ねる optional な **Marketing Extension** もそこに定義されています。

## Setup

### 1. Clone

```bash
git clone https://github.com/cmoteam/sarfstack.git
cd sarfstack
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

初回で private リポがまだ無い場合は、空ディレクトリのまま進めても `/set-organization` `/workspace new <slug>` `/feedback` などがテンプレートから自動生成します。あとで `cd private && git init && git remote add origin ...` で切り出せます。

### 3. Bootstrap Company Knowledge（企業情報ディレクトリを作成）

企業固有情報は `private/memory/` 配下に置きますが、このディレクトリは **gitignore 対象**（upstream には含まれない）です。リポジトリにはテンプレート `templates/memory/` のみが入っているので、初回にコピーしてください（`bin/init-private` が自動化してくれます）:

```bash
/workspace new <slug>     # 新規 workspace を作成（事業部・プロダクト・クライアント単位）
/set-organization         # 組織情報（ミッション・ビジョン・ブランド）を memory/organization/ に埋める
/set-workspace            # workspace 固有情報（ICP・Positioning・競合・事業概要）を memory/profile/ に埋める
```

> **なぜ分離しているか**: ICP・競合情報・ブランドガイドラインなどの機密情報を upstream に誤って push する事故を防ぎ、`git pull` でフレームワーク本体のアップデートを素直に取り込めるようにするためです。

### 4. Fill in Company Knowledge（= SARFのSet）

SARFの **Set** 段階。ここを埋めないとAIは汎用回答しか返せません。成果物の質の9割がここで決まります。

memory は **2層** に分かれます:

| 層 | パス | スコープ | 担当スキル |
|---|---|---|---|
| Organization | `memory/organization/` | 組織全体（全 workspace 共通） | `/set-organization` |
| Workspace | `memory/profile/`（workspace symlink） | 単一 workspace（事業部 / プロダクト / クライアント） | `/set-workspace` |

**推奨**: まず `/set-organization` で組織情報を埋め、次に `/set-workspace` で workspace 固有情報を埋めます。未存在時は自動でテンプレートから作成します。

手動で編集する場合は、それぞれのディレクトリのファイルを開き `[TODO]` を置き換えてください:

```
memory/organization/organization-overview.md ← 組織全体の概要・ミッション・事業ポートフォリオ
memory/organization/brand-guidelines.md      ← 組織共通のブランドガイドライン

memory/profile/business-overview.md          ← この workspace の事業概要
memory/profile/icp.md                        ← 理想的な顧客像
memory/profile/positioning.md                ← ポジショニング
memory/profile/competitors.md                ← 競合情報
```

⚠️ **`templates/memory/` 配下には実情報を書き込まないでください**。こちらは upstream に push される共通テンプレートです。実データは必ず gitignore 側（`private/memory/organization/` / `private/memory/workspaces/<slug>/profile/`）に書きます。

充足率は `/sarf-check` で確認できます。

### 5. Bootstrap Results Knowledge（企業固有の結果ログ）

自社の実績数値（CVR・CPA・売上 等）は `private/memory/workspaces/<slug>/results/` に置きます。こちらも **gitignore 対象** なので、初回に `templates/memory/results/` からコピーしてください（`bin/workspace new <slug>` または `bin/workspace new <slug>` が自動化）:

```bash
cp -r templates/memory/results private/memory/workspaces/<slug>/results
```

`/feedback` を初回実行した際に未存在なら自動で同じコピーが行われます。

### 6. Refresh Update Knowledge（外部揮発情報）

`knowledge/update/` は外部観測・公開情報（プラットフォーム仕様変更、業界トレンド）の最新化レイヤーです。自社数値は対象外（`results/` 側）。

**推奨**: `/set-update` で対話的に書き戻し、自社の KPI 実績は `/feedback` で `memory/results/` に書き込みます。検証済みの学びは `/feedback` が company 層に昇華します。

```
knowledge/update/platform-updates.md    ← プラットフォーム仕様変更（共有可）
knowledge/update/industry-trends.md     ← 業界トレンド（共有可）
memory/results/performance-data.md   ← 直近のパフォーマンスデータ（gitignore）
```

### 7. Connect Integrations（外部ツール直結・optional）

Figma / Google Ads / GA4 / Search Console / Meta / X / LinkedIn / TikTok / HubSpot / Salesforce / Stripe / Notion / Slack / BigQuery / PostHog / Amplitude / Intercom などと **MCP サーバ経由で直接繋ぐ** ことができます。接続があれば CSV 手入力をスキップして SARF サイクルが一段速く回ります（未接続でも従来通り動作します）。

```bash
cp .mcp.json.example .mcp.json
# .mcp.json を編集し、使うサーバを残して API Key / Token を環境変数で注入
```

- 詳細カタログ: [`knowledge/base/integrations.md`](knowledge/base/integrations.md)
- `.mcp.json` と `.claude/settings.local.json` は gitignore 済み（シークレット保護）
- Write 操作は必ずユーザー承認ゲート経由 / Read-only から始めるのが既定
- 最小推奨セット: Figma + Google Ads + GA4 + Meta + Slack + GitHub

## Available Skills

### SARF Ops（サイクル運用）
| Command | Phase | Description |
|---------|-------|-------------|
| `/set-organization` | Set | 組織全体の情報（ミッション・ビジョン・ブランド・事業ポートフォリオ）を対話で一括ヒアリング |
| `/set-workspace` | Set | workspace 単位の情報（事業概要・ICP・Positioning・競合）を対話で一括ヒアリング |
| `/set-update` | Set | 業界トレンド・プラットフォーム仕様変更を `knowledge/update/` に書き戻す |
| `/sarf-check` | Meta | Set充足率・次の一手を診断 |
| `/feedback` | Feedback | 施策結果を検証ゲート付きで `memory/results/` と `memory/profile/` に反映 |

### Executive Review（経営レビュー）
| Command | Role | Description |
|---------|------|-------------|
| `/ceo-review` | CEO | 収益性・ROI・事業インパクト評価 |
| `/cmo-review` | CMO | マーケティング戦略全体の統括レビュー |
| `/consultant-review` | Consultant | 外部コンサル視点でゼロベースの率直フィードバック |

### Specialist Agents（専門エージェント）
| Command | Role | Description |
|---------|------|-------------|
| `/seo` | SEO | SEO分析・KW戦略・技術SEO |
| `/creative-direction` | CD | クリエイティブ品質・ブランド一貫性 |
| `/ui-design` | UI/UX | LP/WebページのUI・CVR最適化 |
| `/ads-manager` | Ads | Google/Meta/X広告の設計・最適化 |
| `/contents-edit` | Content | ブログ・SNS・メールの企画・制作 |
| `/data-analytics` | Analytics | KPI分析・レポート・改善提案 |
| `/customer-research` | Research | 顧客インタビュー・JTBD・Win/Loss分析（ICPをデータで鍛える） |
| `/pricing-strategy` | Pricing | 価格設定・プラン設計・パッケージング戦略 |
| `/churn-prevention` | Retention | 解約防止・リテンション改善・Save Offer設計 |

### Optimization Agent（`/optimize <target>`）
各ファネル段階でのユーザー行動完了率（CVR）を数字で上げる診断・改修を専門とする。`/ui-design` が UI/UX 全般を見るのに対し、`/optimize` はファネル段階別に特化（1つのスキルが 6 target に対応）。

| target | Scope | Primary KPI |
|---|---|---|
| `page` | LP/Product/Feature/Pricing 等 | CVR |
| `signup-flow` | 登録〜初回ログイン | Signup Completion |
| `onboarding` | Aha Moment 到達〜Activation | Activation Rate |
| `form` | デモ/資料DL/問い合わせ | Form Completion |
| `popup` | Exit intent / Newsletter / 告知系 | Capture Rate + Guardrail |
| `paywall` | Free→Paid / アプリ内アップセル | Paywall CVR + LTV |

### Workflows（統合ワークフロー）
| Command | Description |
|---------|-------------|
| `/campaign-launch` | キャンペーンの全工程（企画→制作→レビュー→ローンチ） |
| `/content-review` | コンテンツの制作→多角的レビューサイクル |
| `/landing-page` | LP設計→制作→最適化 |
| `/weekly-retro` | 週次マーケティング振り返り |

## Architecture

```
sarfstack/
├── AGENTS.md                    # Canonical: agents, SARF, knowledge, workflows
├── CLAUDE.md                    # Stub importing AGENTS.md (for Claude Code)
├── .claude/settings.json        # Skill definitions
├── .mcp.json.example            # MCP server template (copy to .mcp.json, gitignored)
│
├── knowledge/                   # Base: shared, tracked
│   ├── foundation/              # Stable: frameworks, mindset
│   └── update/                  # External volatile: platform updates, industry trends
│
├── templates/memory/            # Templates for private/memory/ (tracked)
│   ├── organization/            # Template for private/memory/organization/
│   ├── profile/                 # Template for private/memory/workspaces/<slug>/profile/
│   └── results/                 # Template for private/memory/workspaces/<slug>/results/
│
├── private/                     # All per-project data (gitignored)
│   ├── memory/
│   │   ├── organization/        # Organization-wide: mission, brand, portfolio
│   │   └── workspaces/<slug>/   # Per-workspace: profile/ (ICP, positioning) + results/
│   └── output/                  # Generated artifacts, per-workspace
│
├── skills/                      # Individual agents & workflows
│   ├── set-organization/SKILL.md # SARF: Set (organization層)
│   ├── set-workspace/SKILL.md    # SARF: Set (workspace層)
│   ├── set-update/SKILL.md      # SARF: Set
│   ├── sarf-check/SKILL.md      # SARF: Meta (diagnostic)
│   ├── feedback/SKILL.md        # SARF: Feedback
│   ├── ceo-review/SKILL.md
│   ├── cmo-review/SKILL.md
│   ├── consultant-review/SKILL.md
│   ├── seo/SKILL.md
│   ├── creative-direction/SKILL.md
│   ├── ui-design/SKILL.md
│   ├── ads-manager/SKILL.md
│   ├── contents-edit/SKILL.md
│   ├── data-analytics/SKILL.md
│   ├── customer-research/SKILL.md
│   ├── pricing-strategy/SKILL.md
│   ├── churn-prevention/SKILL.md
│   ├── optimize/SKILL.md + targets/{page,signup-flow,onboarding,form,popup,paywall}.md
│   ├── campaign-launch/SKILL.md
│   ├── content-review/SKILL.md
│   ├── landing-page/SKILL.md
│   └── weekly-retro/SKILL.md
│
├── templates/                   # Reusable content templates（成果物テンプレ）
│   ├── ad-copy.md
│   ├── landing-page.md
│   ├── email-sequence.md
│   ├── blog-post.md
│   ├── social-media.md
│   └── memory/                  # memory 層のテンプレ（上記参照）
│
└── lib/                         # Shared components
    ├── preamble.md
    ├── review-format.md
    └── scoring-rubric.md
```

## Knowledge vs Memory

ベースの `knowledge/`（tracked、共有可）と per-project の `private/memory/`（gitignored）を分離しています。`templates/memory/` はその private/memory/ を生成するためのテンプレート。

```
knowledge/                            templates/memory/            private/memory/
(shared base — tracked)               (templates — tracked)        (per-project — gitignored)
┌──────────────────────────┐         ┌──────────────────────┐     ┌──────────────────────────────┐
│ base/                    │         │ organization/        │ ──▶ │ organization/                │
│  marketing-mindset,      │         │ profile/             │ ──▶ │ workspaces/<slug>/profile/   │
│  growth-frameworks, ...  │         │ results/             │ ──▶ │ workspaces/<slug>/results/   │
├──────────────────────────┤         └──────────────────────┘     └──────────────────────────────┘
│ update/                  │         テンプレから private/ を生成: bin/init-private
│  platform-updates,       │
│  industry-trends         │
└──────────────────────────┘

Executive agents   → knowledge/base + private/memory/organization + profile
Specialist agents  → knowledge/base + private/memory/ 全層 + knowledge/update
Workflow agents    → delegates to sub-agents

Write targets:
  /set-organization → memory/organization/
  /set-workspace    → memory/profile/ (workspace symlink)
  /set-update       → knowledge/update/
  /feedback         → memory/results/ (raw numbers) + memory/profile/ (verified learnings)
```

## Marketing Cycle = SARF Cycle

SARFStackのマーケティングサイクルは、そのままSARFのサイクルです:

```
            SARF:  Set ──→ Ask ──→ Release ──→ Feedback ──→ (Setに還元)

/campaign-launch or /weekly-retro kicks off the cycle:

  ┌──────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐
  │   Set    │ ──→ │   Ask     │ ──→ │  Release  │ ──→ │ Feedback  │
  │/set-     │     │/cmo-      │     │/contents- │     │/data-     │
  │ company  │     │  review   │     │  edit     │     │ analytics │
  │/set-     │     │/ceo-      │     │/ads-      │     │/weekly-   │
  │ update   │     │  review   │     │  manager  │     │  retro    │
  │/sarf-    │     │/seo       │     │/landing-  │     │/feedback  │
  │  check   │     │/ui-design │     │  page     │     │           │
  │          │     │/creative- │     │/estimate  │     │           │
  │          │     │ direction │     │           │     │           │
  └──────────┘     └───────────┘     └───────────┘     └───────────┘
       ↑                                                   │
       └── /feedback + /set-update で knowledge 層に還元 ──┘
```

## License

MIT
