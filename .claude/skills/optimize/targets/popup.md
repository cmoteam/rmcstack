# Target: popup — ポップアップ/モーダル最適化

Exit intent、ニュースレター登録、クーポン配布、機能告知、アンケート、同意取得など、
**ユーザーのコンテキストに割り込むUI** を対象に、**捕捉率と UX のバランス** を最適化。

## Optional Fields

- **Target Funnel Stage**: TOFU（Newsletter / Lead Magnet）/ MOFU（Exit intent でリード化）/ BOFU（カート放棄回収）で分岐
- **Target Segment**: モバイル vs デスクトップで設計が全く違う（モバイルは Google ペナルティリスク）
- **Primary KPI**: 未指定なら **Popup Capture Rate**（表示 → 捕捉アクション完了）＋ **メインファネル離脱率変化**

## Diagnostic Framework

### 1. Popup Justification（そもそも必要か）
ポップアップを使う前に **代替手段** を検討:

| 目的 | 代替 |
|------|-----|
| Newsletter 登録 | フッター常設フォーム、記事末尾フォーム |
| Lead Magnet | インラインCTA、サイドバー |
| お知らせ | トップバナー、バッジ |
| 同意取得 | Cookie/同意専用UI（ポップアップ必須） |

代替で十分ならポップアップは使わない。

### 2. Trigger Design
- **Time-based** / **Scroll-based**（X%）/ **Exit intent** / **Inactivity** / **Page-specific** / **Session-based**
- トリガー条件が厳しいほど UX 良好、表示数は減るが捕捉率は上がる

### 3. Value Exchange
- Newsletter: 「週 1 回の厳選記事」だけでは弱い。**差別化価値**
- Lead Magnet: 即時使える成果物
- Exit intent: ディスカウント or 限定オファー（ブランドガイドラインと整合）

### 4. Design & Copy
- Headline: 「○○を受け取る」より「○○があなたにもたらすもの」
- Field: email のみ（理想）、多くて 2
- Close button: 視認可能に配置
- No-thanks コピーの心理ハックは慎重に（ブランド毀損リスク）

### 5. Frequency & Suppression
- 1 セッションに 1 つまで
- 一度閉じたユーザーには N 日間表示しない
- 購読済みは非表示
- モバイルはさらに厳しく

## Output Format

```markdown
# Popup Optimization: [ポップアップ名]

## Justification Check
- 目的 / 代替手段の検討結果

## Current State
- 表示トリガー / Capture Rate / メインファネル影響

## Top Issues

## Recommended Design

### Trigger
- 条件 / 表示頻度 / デバイス

### Copy & Layout
```html
<div class="popup">...</div>
```

## A/B Test Roadmap

| Test | Hypothesis | Primary Metric | Guardrail |

## Guardrail Metrics（必ず監視）
- メインCTAクリック率 / ページ滞在時間 / Bounce Rate / モバイルペナルティ

## Kill Criteria
- メインファネル悪影響が Capture 数を上回る場合は即停止
```

## Target-specific Principles

- **代替手段を先に試す** — インラインCTAで十分なら出すな
- **Exit intent を優先** — Time-based / 即時は UX を壊す
- **Guardrail を必ず見る** — Capture 率向上でメインファネル CVR 低下は赤字
- **モバイルは別設計** — デスクトップのまま出すと Google ペナルティ
- **価値の大きさを語る** — 「Newsletter」より「週1本、独占コンテンツ」
- **閉じる選択肢を隠さない**

## Chaining

- **前工程**: `/optimize page`（ポップアップ要否判断）
- **後工程**: `/contents-edit`（Lead Magnet本体制作）、`/data-analytics`（Guardrail計測）→ `/feedback`
