# Target: page — マーケティングページCVR最適化

LPだけでなく、Product / Feature / Pricing / Use Case / About ページなど、**意図あるページ全般** が対象。
`/ui-design` が UI/UX 全般を見るのに対し、こちらは **CVR を上げるための構造・コピー・CTA配置** に焦点を絞る。

## Optional Fields

- **Target Funnel Stage**: TOFU/MOFU/BOFU で重視軸が変わる（TOFU=離脱率・直帰率 / MOFU=次アクション遷移率 / BOFU=CTA クリック率・フォーム完了率）
- **Primary KPI**: 未指定なら CVR（≒ Primary CTA 到達率）

## Diagnostic Framework

### 1. Intent Match（意図適合度）
- 検索意図・流入元意図 と ページ内容の一致度
- 流入元別（広告／オーガニック／メール／直接）のメッセージ整合
- Message Match: 広告コピー ↔ LP ヘッドラインの一致度

### 2. Value Proposition Clarity（価値提案の明瞭度）
- 「何を提供するサービスか」が **3秒以内** に伝わるか
- Who / What / Why Now / Why You の4点が揃っているか
- ジャーゴン・自社語を避け、ICP の語彙に寄せているか

### 3. Funnel Friction（摩擦要因）
- Primary CTA までのスクロール・クリック数
- CTA の重複・競合（同じ重みの CTA が並んでいないか）
- フォームフィールド数の妥当性
- 認知負荷の高いセクション（比較表・長文・動画）の位置

### 4. Trust Stack（信頼要素スタック）
- Social Proof（ロゴ・数字・レビュー・事例）の配置と質
- リスク軽減（保証・返金・無料トライアル条件）
- セキュリティ・コンプライアンス表示

### 5. Momentum Design（モメンタム設計）
- スクロールに従って commitment が段階的に高まる設計
- 微小CTA → 中CTA → 主CTA のグラデーション
- Exit intent / Sticky CTA の必要性

## Output Format

```markdown
# Page Optimization Review: [ページ名/URL]

## CVR Baseline
- 現状 CVR: [X%]
- 改修後の目標 CVR: [Y%]（根拠: ベンチマーク or 仮説）

## Scorecard

| 観点 | Score (1-10) | CVR Impact |
|------|-------------|-----------|
| Intent Match | X | H/M/L |
| Value Proposition | X | H/M/L |
| Funnel Friction | X | H/M/L |
| Trust Stack | X | H/M/L |
| Momentum | X | H/M/L |

## Top 3 CVR Killers
1. [要因] — 位置: [セクション] / 想定損失 CVR: [-X pt]
2. ...
3. ...

## Fix Plan（優先度順）

### Fix 1: [問題名] / Expected Lift: +X%
- **Before**: [現状]
- **After**: [改修後]
- **実装**: [HTML/CSS 差分]

## A/B Test Roadmap
| Test | Hypothesis | Primary Metric | MDE | 期間 |
```

## Target-specific Principles

- **1ページ1 Primary CTA** — 複数の主 CTA を並置しない
- **Trust Stack を早めに** — ファーストビュー or その直後に社会的証明

## Chaining

- **前工程**: `/ui-design`、`/contents-edit`（コピー全面書き直し）、`/ads-manager`（流入広告整合）
- **後工程**: `/creative-direction`（ブランド整合）、`/data-analytics`（A/B測定）→ `/feedback`
