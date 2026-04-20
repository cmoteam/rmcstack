# Target: onboarding — ユーザー有効化最適化

初回ログイン → Aha Moment（価値実感の瞬間）到達 → Activation までの設計を最適化し、
**継続利用に繋がるユーザー比率** を最大化。SaaS / モバイルアプリ / コミュニティ等で有効。

## Optional Fields

- **Target Funnel Stage**: Activation 固定
- **Target Segment**: B2B/B2C、Free/Paid、モバイル/デスクトップで別設計
- **Primary KPI**: 未指定なら **Activation Rate**（Aha Moment 到達率）

## Diagnostic Framework

### 1. Aha Moment Definition
Activation を論じる前に **Aha Moment** を定量的に定義。例:
- Slack: 2,000 メッセージ送受信
- Dropbox: 1 ファイル以上をアップロード＋別デバイスで確認
- Notion: 3 ページ以上作成

未定義時: 既存ユーザー行動データから **長期継続ユーザーが初週に共通していたアクション** を候補として洗い出す。

### 2. Time-to-Value（TTV）
- 登録から Aha Moment 到達までの中央値時間
- 理想: Web SaaS <5分、モバイル <3分、エンタープライズは初回ミーティング前

### 3. Activation Funnel
```
[初回ログイン] → [Welcome] → [Profile setup] → [First Action] → [Second Action] → [Aha Moment] → [Habit formation]
```

### 4. Guidance Mode
- **Product Tour** / **Empty State Design** / **Checklist** / **Interactive Tutorial** / **Sample Data / Template**
- どれを採用するかは ICP と core value による。一般則: **「説明より体験」**

### 5. Drop-off Recovery
- Day 1 / Day 3 / Day 7 のリエンゲージメント email or push
- 「まだやっていないアクション」のパーソナライゼーション
- 再訪時の再オンボーディング（続きから誘導）

## Output Format

```markdown
# Onboarding Optimization: [プロダクト名]

## Aha Moment Definition
- **定義**: [具体的な行動 + 数値基準]
- **根拠**: [既存データ or 仮説]
- **現状到達率**: X%（中央値 TTV: Y 分）

## Activation Funnel

| Step | 完了率 | 中央値所要時間 |
|------|-------|-------------|

## Top 3 Activation Killers

## Fix Plan

### Fix 1: [問題名] / Expected Activation Lift: +X%

## Guidance Mode Recommendation
- 推奨モード: [Empty State / Checklist / Template-first / etc.]
- 理由: [ICP と core value に基づく]

## Lifecycle Email Plan

| Day | トリガー条件 | Subject | 目的 |

## A/B Test Roadmap
```

## Target-specific Principles

- **Time-to-Value を最短にする** — 5分を超えたら設計を疑う
- **説明より体験** — Tour より First Action の方が強い
- **Empty State を価値あるものに** — サンプルデータ・テンプレートで初期画面にも価値
- **Checklist は Aha Moment で終わる**
- **回収メールは具体的に** — 「まだやっていない X を試してみませんか」

## Chaining

- **前工程**: `/optimize signup-flow`
- **後工程**: `/data-analytics`（リテンション・コホート）、`/contents-edit`（オンボーディングメール）→ `/feedback`
- **関連**: `/churn-prevention`（Activation 失敗 → 長期 Churn 主因）
