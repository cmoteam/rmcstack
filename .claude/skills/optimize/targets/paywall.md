# Target: paywall — Paywall / Upgrade モーダル最適化

Free → Paid 転換、Starter → Pro アップグレード、アドオン購入、機能解放など、
**既存ユーザーに対する課金アクションの CVR** を最大化。SaaS / モバイルアプリ / コンテンツプロダクトで有効。

## Optional Fields

- **Target Funnel Stage**: Revenue / Expansion 固定
- **Target Segment**: Power User / Casual / Trial 中 / 期限切れ 等でセグメント別設計
- **Primary KPI**: 未指定なら **Paywall Conversion Rate**＋ **LTV**（単発 CVR が Churn で LTV を下げないか監視）

## Diagnostic Framework

### 1. Paywall Trigger Strategy
**どのタイミングで** 出すかが最大の設計ポイント:

| トリガータイプ | 向いている場面 |
|-------------|-------------|
| **Feature-gated** | 明確な機能差がある SaaS |
| **Usage-based** | 使用量課金モデル |
| **Time-based** | Trial 終了時 |
| **Value-moment** | Aha Moment 直後 |
| **Exit intent (in-app)** | Mobile app の B2C |
| **Milestone** | N 回利用・X 作成達成時 |

**原則**: Value-moment / Milestone が最高 CVR。機能遮断は最終手段。

### 2. Paywall Design
- **Price Anchoring**: 上位 → 中位の順で見せると中位が選ばれる
- **Annual vs Monthly**: Annual を default に（「X% OFF」表記）
- **Feature Comparison**: 簡潔に（5〜7行）
- **Social Proof**: 「X 社利用中」「平均 Y 時間節約」
- **Risk Reversal**: 返金保証・いつでもキャンセル可

### 3. Copy Framework
- Headline: 遮断ではなく誘導（「Pro限定」ではなく「○○を解放して X を可能に」）
- Benefit: 機能ではなく **ユーザーが得るもの**
- Urgency: 限定オファーは信頼を失う場面あり。使う場合は本当に時限的に

### 4. Alternative Paths（逃げ道の設計）
- 「後で」ボタン（リマインダー切替可）
- 「代わりに安いプランを見る」導線
- ダウングレード防止: 既存課金者には Retention Flow（`/churn-prevention` 領域）

### 5. Post-purchase Experience
- 課金完了 → 有料機能解放の時間（理想: 即時）
- 有料機能への誘導（「早速 X をやってみましょう」）
- 24時間以内の Welcome メール + 使い方ガイド

## Output Format

```markdown
# Paywall Optimization: [Paywall名 / プロダクト]

## Current State
- トリガー / 表示回数/月 / Conversion Rate / ARPU

## Strategic Diagnosis
- トリガー戦略評価 / 推奨 / 根拠

## Paywall Audit

| 観点 | Score (1-10) | 改善余地 |
|------|-------------|---------|
| トリガータイミング / Price Anchoring / Benefit Copy / Social Proof / Risk Reversal / Alternative Paths |

## Top Issues

## Redesigned Paywall

### Trigger Change
- Before / After

### Copy & UI
```html
<div class="paywall-modal">...</div>
```

## A/B Test Roadmap

| Test | Hypothesis | Primary Metric | Guardrail |

## Guardrail Metrics
- 有料解約率（初月）/ NPS 変化 / ダウングレード率

## Pricing Alignment
- 現在の価格設定 / 改善余地（`/pricing-strategy` 相談推奨の判断）
```

## Target-specific Principles

- **Value-moment を狙う** — 遮断ではなく「価値を感じた瞬間に」
- **LTV を見る** — 短期 Conversion だけで判断せず初月解約率・Refund 率を Guardrail に
- **Benefit を語る** — 機能名ではなく、ユーザーが得る結果
- **Annual をデフォルトに** — LTV 最大化の最も手堅い施策
- **逃げ道を用意する** — 「後で」導線で短期 CVR は下がるが長期 LTV は上がる
- **Pricing が間違っていれば Paywall は効かない** — まず `/pricing-strategy` で価格構造を確認

## Chaining

- **前工程**: `/pricing-strategy`（価格構造の妥当性）、`/optimize onboarding`（Aha Moment 定義）
- **後工程**: `/churn-prevention`（強引転換ユーザーの Retention）、`/data-analytics`（LTV / ARPU / Refund）→ `/feedback`
