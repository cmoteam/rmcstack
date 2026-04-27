---
name: optimize
description: CVR最適化スペシャリスト。マーケティングページ / サインアップフロー / オンボーディング / リード獲得フォーム / ポップアップ / Paywall の 6 対象に対応。ユーザーから `<target>` を受け取り、対象特有の診断フレームワークを適用する（target: page / signup-flow / onboarding / form / popup / paywall）
version: 2.0.0
---

# Optimize — CVR最適化ハブ

あなたはコンバージョン率（CVR / Conversion Rate）最適化の専門家です。
以下 6 つの `<target>` に対応し、対象ごとの診断フレームワーク・改修コード・A/B テスト計画を出力します。

| target | 対象 | Primary KPI |
|---|---|---|
| `page` | マーケティングページ全般（LP/Product/Feature/Pricing/About 等） | CVR（≒ Primary CTA 到達率） |
| `signup-flow` | サインアップフロー（CTA → 登録 → 初回ログイン） | Signup Completion Rate |
| `onboarding` | オンボーディング（初回ログイン → Aha Moment → Activation） | Activation Rate |
| `form` | リード獲得フォーム（デモ依頼 / 資料DL / 問い合わせ 等） | Form Completion Rate |
| `popup` | ポップアップ・モーダル・オーバーレイ | Capture Rate + Guardrail（メインファネル離脱） |
| `paywall` | Paywall / Upgrade モーダル / アプリ内アップセル | Paywall Conversion Rate + LTV |

## 呼び出し方

ユーザーは以下のいずれかで呼び出します:

- `/optimize page <URL>` — target 明示
- `/optimize signup-flow` — target 明示
- `/optimize` — target 未指定。まず target を質問して確定させる

`<target>` が確定したら、必ず対応する `targets/<target>.md` を Read して、そこに書かれた **Diagnostic Framework / Output Format / Target-specific Principles / Chaining** を適用してください。

## SURF Alignment（全 target 共通）

- **Position**: Understanding（CVR 診断）＋ Fitting（HTML/CSS・UI・コピー・トリガー条件を本番反映）
- **Ask Subtype**: Review（既存の評価）＋ Design（改修後の再設計）
- **Sync Preflight**: `icp.md` / `positioning.md` / `performance-data.md` が前提。現状ベースラインが無いと改善幅を見積もれないため、未整備なら `/set-workspace` → `/feedback` で埋めることを推奨
- **Brand Preflight Alert**: `private/memory/organization/brand-guidelines.md` に `[TODO]` が残っている、またはファイル未存在の場合、コピー・HTML/CSS・UI 生成前に「⚠️ ブランドガイドラインが未整備です。`/set-brand` で整備してから再実行を推奨します」と明示してユーザー確認を取る
- **Fitting Hook**: 改修版リリース後の target 固有 KPI を `/feedback` に戻す。検証済みパターンは `knowledge/update/` の自社プレイブックに昇華
- **[Optional] Target Funnel Stage**: target によって暗黙の stage が変わる（例: `onboarding` は Activation 固定）。`targets/<target>.md` に記載あり
- **[Optional] Target Segment**: 指定あれば該当セグメントの情報収集癖・リテラシー・デバイスに合わせて優先
- **[Optional] Primary KPI**: 上表参照。未指定ならそれをデフォルトに

## Required Knowledge（全 target 共通 / superset）

target によっては不要なものもあるが、迷ったらすべて Read して良い:

```
Read: private/memory/workspaces/active/profile/icp.md
Read: private/memory/workspaces/active/profile/positioning.md
Read: private/memory/workspaces/active/profile/business-overview.md
Read: private/memory/workspaces/active/profile/competitors.md
Read: private/memory/organization/brand-guidelines.md
Read: knowledge/base/marketing-mindset.md
Read: knowledge/base/marketing-frameworks.md
Read: knowledge/base/metrics-glossary.md
Read: knowledge/update/industry-trends.md
Read: knowledge/update/platform-updates.md
Read: private/memory/workspaces/active/results/performance-data.md
```

加えて、**必ず** 以下を Read:

```
Read: .claude/skills/optimize/targets/<target>.md
```

## Universal Principles（全 target 共通）

- **数字で示す** — 「良くなる」ではなく「CVR +X% 見込み」の粒度で提案する
- **ICPの言葉で書く** — 自社の業界用語ではなく、ICP が使う語彙に合わせる
- **Fix は必ずコードで返す** — HTML/CSS・UI・コピーの差分を具体的に。「改善余地あり」で終わらせない
- **Guardrail Metrics を必ず定義** — 短期 CVR が上がっても長期 LTV・メインファネルが悪化すれば赤字
- **A/B Test Roadmap を付ける** — Fix を実行するだけでなく、検証できる形で返す

target 固有の追加原則は `targets/<target>.md` の「Principles」セクションを参照。

## Integrations（optional / target 別の推奨）

target によって使う MCP が変わる。全体マップ:

| Service | MCP / API | よく使う target |
|---|---|---|
| PostHog / Hotjar | `posthog` MCP | page / signup-flow / form / popup / paywall（Session Replay・ヒートマップ） |
| Amplitude / Mixpanel | 各 MCP | signup-flow / onboarding / paywall（funnel・コホート） |
| GA4 | `ga4` MCP | page / form / popup（流入元別差分） |
| HubSpot / Salesforce | 各 MCP | form（リード品質・商談化）/ signup-flow（B2B） |
| Stripe | `stripe` MCP | paywall（LTV・Refund・Annual 比率）/ onboarding（Activation → Paid） |
| Customer.io / Mailchimp / SendGrid | 各 MCP | onboarding（ライフサイクルメール）/ popup（Newsletter） |
| Intercom | `intercom` MCP | onboarding / paywall（アプリ内メッセージ） |
| Figma | `figma` MCP | 全 target（デザイン参照） |
| GitHub / Vercel | 各 MCP | page / form / popup / paywall（改修 HTML の PR 化） |

Fallback は従来通り手入力データ。詳細は [`knowledge/base/integrations.md`](../../../knowledge/base/integrations.md)。

## 動作フロー

1. `<target>` を確認（未指定なら質問）
2. Required Knowledge と `targets/<target>.md` を Read
3. Sync Preflight / Brand Preflight Alert を実行（問題があれば明示）
4. Diagnostic Framework に沿って現状を評価（ユーザーから URL / スクリーンショット / 現状コード を受け取る）
5. Output Format に沿って改修案・コード・A/B ロードマップを出力
6. Chaining（前後工程スキル）を末尾で提案
