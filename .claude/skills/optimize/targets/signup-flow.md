# Target: signup-flow — サインアップフロー最適化

CTAクリック → アカウント登録 → メール確認 → 初回ログイン到達、までの **離脱ポイント** を特定し完了率を最大化。
SaaS / アプリ / コミュニティ等、**ユーザー登録を伴う全プロダクト** が対象。

## Optional Fields

- **Target Funnel Stage**: Activation 固定（サインアップは Activation の入口）
- **Target Segment**: B2B なら法人メール/SSO、B2C ならソーシャル連携の扱いを切り替え
- **Primary KPI**: 未指定なら **Signup Completion Rate**（CTA → 初回ログイン到達）

## Diagnostic Framework

### 1. Funnel Map
現状のサインアップフローを **ステップ単位** で分解し、各ステップの完了率を列挙:

```
[CTA click] → [Signup page view] → [Email入力] → [Password入力] →
[Submit] → [Email verify] → [First login] → [First action (activation)]
```

**最も離脱が大きいステップ** を Top 3 で特定する。

### 2. Field-level Friction
- 必須フィールド数（理想: 2〜3 / 多くて5）
- パスワード要件の厳しさ（= 入力試行回数）
- バリデーション（リアルタイム vs submit時 / エラーメッセージの質）
- ソーシャル / SSO 登録の選択肢有無

### 3. Trust & Commitment
- 「クレジットカード不要」「X日無料」など commitment を下げる文言
- プライバシー表記の位置と明瞭さ
- 登録直後の Value Promise の明示

### 4. Email Verification Gap
- 認証メール到達率・開封率
- 認証メールのコピーとCTAデザイン
- 再送機能・マジックリンク等の代替パス

### 5. First-Login Bridge
- メール認証 → 初回ログインまでの誘導（即時遷移 or 別タブで認証）
- オンボーディング開始までのつなぎコピー

## Output Format

```markdown
# Signup Flow Optimization: [プロダクト名]

## Funnel Map & Baseline

| Step | 完了率 | Drop-off |
|------|-------|---------|
| CTA click → Signup page | X% | -Y% |
| Signup page → Email入力 | X% | -Y% |
| ... |

**Total Signup Completion**: X%

## Top 3 Drop-off Points
1. **[ステップ名]** / 離脱率 -X% / 想定原因: [...]
2. ...
3. ...

## Fix Plan

### Fix 1: [問題名] / Expected Completion Lift: +X%
- Before / After / 実装

## A/B Test Roadmap
| Test | Hypothesis | Primary Metric | MDE | 期間 |

## Recommended Architecture Changes
- [ ] ソーシャルログイン追加
- [ ] マジックリンク対応
- [ ] Progressive profiling
```

## Target-specific Principles

- **フィールドは最小に** — 「後で聞ける情報は後で聞く」
- **Verification は障壁にしない** — マジックリンク等の代替を真剣に検討
- **Value Promise を登録画面に** — 「これを登録すると X 分で Y ができる」
- **Single-step を優先** — マルチステップは完了率を下げがち（B2B の信用演出除く）
- **モバイル前提** — オートフィル・キーボード型を検証

## Chaining

- **前工程**: `/optimize page`（流入LP）、`/ads-manager`（流入広告整合）
- **後工程**: `/optimize onboarding`（初回ログイン後）、`/data-analytics` → `/feedback`
