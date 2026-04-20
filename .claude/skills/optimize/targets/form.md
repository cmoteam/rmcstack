# Target: form — リード獲得フォーム最適化

デモ依頼 / 資料ダウンロード / お問い合わせ / ウェビナー登録 / ニュースレター購読など、
**フォーム送信が Conversion の定義となるシーン** で、送信完了率を最大化。

## Optional Fields

- **Target Funnel Stage**: 主に MOFU。BOFU フォーム（購入直前）なら決済離脱の観点も加味
- **Target Segment**: B2B は enrichment 可能な最小フィールド、B2C は email のみスタート
- **Primary KPI**: 未指定なら **Form Completion Rate**（表示 → 送信完了）

## Diagnostic Framework

### 1. Field-by-field Value Analysis
各フィールドについて評価:

| フィールド | 必須/任意 | 営業プロセスで実際に使われているか | 離脱影響 | 後工程で取得可能か |
|-----------|---------|------------------------------|---------|-----------------|
| Email | 必須 | Yes | 小 | No |
| 電話番号 | 必須 | No | 大 | Yes |

**ルール**: 営業で使われていない or 後工程で取得可能なフィールドは削除候補。

### 2. Form Density
- フィールド数（理想: 3〜5 / 上限: 7）
- 1画面完結 vs スクロール vs マルチステップ
- ラベル配置（上配置 = 完了率高）

### 3. Progressive Profiling
- 初回は最小限、リピート訪問時に追加取得
- MA ツール（HubSpot / Marketo）連携で既知フィールドは非表示化

### 4. Trust & Risk Reduction
- プライバシー表記（「スパムは送りません」「15分以内に連絡」）
- フォーム周辺の Social Proof（導入企業ロゴ・利用者数）
- 送信後の具体的次ステップ明示

### 5. Submission Experience
- Submit ボタンコピー（「送信」より「無料デモを予約する」）
- バリデーションの質（リアルタイム / submit時 / エラー文言）
- 送信後のサンキューページ（次アクション誘導）

## Output Format

```markdown
# Form Optimization: [フォーム名 / ページ名]

## Baseline
- 現状 Completion Rate: X%
- フィールド数: N
- 現状のリード数/月: Y

## Field-by-field Audit

| # | フィールド | 必須 | 営業で使用 | 離脱影響 | 判定 |
|---|-----------|------|----------|---------|------|

## Top Issues

## Redesigned Form

### Proposed Fields
```html
<form>...</form>
```

### Copy Changes
- Submit ボタン / Privacy note / Thank you page

## A/B Test Roadmap

## Downstream Impact
- enrichment コスト / 追加リード数 / 営業プロセス影響
```

## Target-specific Principles

- **営業で使わないフィールドは削除する** — 「あったら便利」は取得理由にならない
- **電話番号は CVR 最大の殺し手** — B2B でも任意化 or 削除を検討
- **Submit ボタンは価値を語る** — 「送信」ではなく得られるものを明示
- **Progressive profiling で長期取得** — MA 連携前提
- **Thank you ページは資産** — 送信後こそ次アクションの最大の機会

## Chaining

- **前工程**: `/optimize page`（フォーム設置ページ）、`/contents-edit`（周辺コピー）
- **後工程**: `/data-analytics`（フィールド別離脱）、`/ads-manager`（CPA 再計算）→ `/feedback`
