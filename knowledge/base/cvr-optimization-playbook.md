# CVR Optimization Playbook — 6 対象別の診断と改修

CVR 最適化の対象は単一ではない。**何を最適化するか**で診断軸も改修パターンも全く違う。
このドキュメントは 6 つの対象（page / signup-flow / onboarding / form / popup / paywall）について、共通原則 → 対象別の診断フレーム → 出力形式 → 落とし穴をまとめた実装プレイブック。

CVR 改善は SURF の **Understanding（診断）+ Fitting（HTML/CSS/UI/コピーの本番反映）** に位置する。改修後の KPI は必ず `/feedback` で `private/memory/workspaces/active/results/` に戻す。

## 対象一覧

| target | 対象 | Primary KPI |
|---|---|---|
| `page` | マーケティングページ全般（LP / Product / Feature / Pricing / About） | CVR（≒ Primary CTA 到達率） |
| `signup-flow` | サインアップフロー（CTA → 登録 → 初回ログイン） | Signup Completion Rate |
| `onboarding` | 初回ログイン → Aha Moment → Activation | Activation Rate |
| `form` | リード獲得フォーム（デモ / 資料 DL / 問い合わせ） | Form Completion Rate |
| `popup` | ポップアップ・モーダル・オーバーレイ | Capture Rate + メインファネル離脱（Guardrail） |
| `paywall` | Paywall / Upgrade モーダル / アプリ内アップセル | Paywall Conversion Rate + LTV |

## Universal Principles（全対象共通）

- **数字で示す** — 「良くなる」ではなく「CVR +X% 見込み」の粒度で
- **ICP の言葉で書く** — 自社の業界用語ではなく、ICP の語彙
- **Fix は必ずコードで返す** — HTML / CSS / コピーの差分を具体的に
- **Guardrail Metrics を必ず定義** — 短期 CVR が上がっても長期 LTV や別ファネルが悪化すれば赤字
- **A/B Test Roadmap を付ける** — 単発の Fix だけでなく、検証できる形で

---

## 1. page — マーケティングページ

LP に限らず Product / Feature / Pricing / Use Case / About など**意図あるページ全般**が対象。

### Diagnostic Framework

1. **Intent Match** — 流入元意図とページ内容の一致度。広告コピー ↔ LP ヘッドラインの Message Match
2. **Value Proposition Clarity** — 「何を提供するか」が **3 秒以内**に伝わるか。Who / What / Why Now / Why You の 4 点が揃っているか
3. **Funnel Friction** — Primary CTA までのスクロール・クリック数 / CTA の重複・競合 / フォーム長 / 認知負荷の高いセクション位置
4. **Trust Stack** — Social Proof（ロゴ・数字・レビュー・事例）の配置と質 / リスク軽減（保証・返金・無料トライアル）/ セキュリティ表示
5. **Momentum Design** — スクロールに従って commitment が段階的に高まる設計。微小 CTA → 中 CTA → 主 CTA のグラデーション

### Output

```markdown
# Page Optimization Review: [URL]

## CVR Baseline
- 現状 CVR: X% / 改修後の目標: Y%（根拠）

## Scorecard
| 観点 | Score (1-10) | CVR Impact (H/M/L) |
| Intent Match / Value Prop / Friction / Trust / Momentum |

## Top 3 CVR Killers
1. [要因] / 位置: [...] / 想定損失 CVR: -X pt

## Fix Plan（優先度順）
### Fix 1: [問題名] / Expected Lift: +X%
- Before / After / 実装（HTML/CSS差分）

## A/B Test Roadmap
| Test | Hypothesis | Metric | MDE | 期間 |
```

### 落とし穴

- **1 ページ 1 Primary CTA** — 同じ重みの CTA を並置しない
- **Trust Stack を早めに** — ファーストビュー or その直後に社会的証明を置く

---

## 2. signup-flow — サインアップフロー

CTA クリック → アカウント登録 → メール確認 → 初回ログインまでの離脱を最小化。

### Diagnostic Framework

1. **Funnel Map** — `[CTA click] → [Signup page view] → [Email] → [Password] → [Submit] → [Email verify] → [First login]` をステップ単位で分解、各ステップの完了率を出して Top 3 離脱を特定
2. **Field-level Friction** — 必須フィールド数（理想 2〜3、多くて 5）/ パスワード要件 / バリデーションの質 / SSO・ソーシャル選択肢の有無
3. **Trust & Commitment** — 「クレジットカード不要」「X 日無料」など commitment を下げる文言 / プライバシー表記 / 登録直後の Value Promise
4. **Email Verification Gap** — 認証メール到達率 / 開封率 / マジックリンク等の代替パス
5. **First-Login Bridge** — メール認証 → 初回ログインまでの誘導（即時 vs 別タブ）

### 落とし穴

- **フィールドは最小に** — 「後で聞ける情報は後で聞く」（Progressive Profiling）
- **Verification を障壁にしない** — マジックリンクを真剣に検討
- **Value Promise を登録画面に** — 「これを登録すると X 分で Y ができる」
- **Single-step を優先** — マルチステップは完了率を下げがち（B2B の信用演出を除く）
- **モバイル前提** — オートフィル・キーボード型を検証

---

## 3. onboarding — ユーザー有効化

初回ログイン → **Aha Moment（価値実感の瞬間）** → Activation。

### Diagnostic Framework

1. **Aha Moment Definition** — Activation を論じる前に Aha Moment を定量定義（例: Slack 2,000 メッセージ / Dropbox 1 ファイル + 別デバイス確認 / Notion 3 ページ作成）。未定義時は長期継続ユーザーが初週に共通したアクションから候補を抽出
2. **Time-to-Value（TTV）** — 登録から Aha Moment 到達までの中央値。理想: Web SaaS <5 分、モバイル <3 分
3. **Activation Funnel** — `初回ログイン → Welcome → Profile setup → First Action → Second Action → Aha → Habit formation`
4. **Guidance Mode** — Product Tour / Empty State / Checklist / Interactive Tutorial / Sample Data・Template。一般則は **「説明より体験」**
5. **Drop-off Recovery** — Day 1 / 3 / 7 のリエンゲージメント。「まだやっていない X を試してみませんか」のパーソナライズ

### 落とし穴

- **TTV 5 分超は設計を疑う**
- **Tour より First Action** — 説明より体験
- **Empty State を価値あるものに** — サンプル / テンプレで初期画面にも価値
- **Checklist は Aha Moment で終わる** — Aha 到達後の Checklist は不要
- Activation 失敗は長期 Churn の主因 → リテンション設計と連動して見る

---

## 4. form — リード獲得フォーム

デモ依頼 / 資料 DL / お問い合わせ / ウェビナー登録など、フォーム送信が Conversion となるシーン。

### Diagnostic Framework

1. **Field-by-field Value Analysis** — 各フィールドを「営業プロセスで実際に使われているか」「後工程で取得可能か」で評価。**営業で使われていない or 後工程で取得可能なフィールドは削除候補**
2. **Form Density** — フィールド数（理想 3〜5、上限 7）/ 1 画面 vs マルチステップ / ラベル配置（上配置 = 完了率高）
3. **Progressive Profiling** — 初回は最小、リピート時に追加。MA ツール（HubSpot / Marketo）連携で既知フィールドは非表示
4. **Trust & Risk Reduction** — プライバシー表記（「スパムは送りません」「15 分以内に連絡」）/ 周辺の Social Proof / 送信後の次ステップ明示
5. **Submission Experience** — Submit ボタンコピー（「送信」より「無料デモを予約する」）/ バリデーション / Thank you ページ（次アクション誘導）

### 落とし穴

- **電話番号は CVR 最大の殺し手** — B2B でも任意化 or 削除を検討
- **Submit ボタンは価値を語る** — 「送信」ではなく得られるものを書く
- **Thank you ページは資産** — 送信後こそ次アクションの最大の機会

---

## 5. popup — ポップアップ / モーダル

Exit intent / Newsletter / Lead Magnet / 機能告知 / 同意取得など。**捕捉率と UX のバランス**が肝。

### Diagnostic Framework

1. **Popup Justification（そもそも必要か）** — 代替手段で十分なら使わない
   | 目的 | 代替 |
   |------|-----|
   | Newsletter | フッター常設フォーム、記事末尾フォーム |
   | Lead Magnet | インライン CTA、サイドバー |
   | お知らせ | トップバナー、バッジ |
   | 同意取得 | Cookie/同意専用 UI（ポップアップ必須） |
2. **Trigger Design** — Time-based / Scroll-based / Exit intent / Inactivity / Page-specific / Session-based。**条件が厳しいほど UX 良好**、表示数は減るが捕捉率は上がる
3. **Value Exchange** — Newsletter は「週 1 厳選」だけでは弱い、**差別化価値**が必要 / Lead Magnet は即時使える成果物
4. **Design & Copy** — 「○○を受け取る」より「○○があなたにもたらすもの」/ Field は email のみ理想 / Close button を視認可能に
5. **Frequency & Suppression** — 1 セッションに 1 つまで / 一度閉じたユーザーには N 日間非表示 / 購読済みは非表示 / モバイルは特に厳しく

### Guardrail（必須）

- メイン CTA クリック率 / ページ滞在時間 / Bounce Rate / モバイルペナルティ
- **Capture 率向上でメインファネル CVR が低下したら赤字** → 即停止の Kill Criteria を事前定義

### 落とし穴

- **代替手段を先に試す** — インライン CTA で十分なら出すな
- **Exit intent を優先** — Time-based の即時表示は UX を壊す
- **モバイルは別設計** — デスクトップのまま出すと Google ペナルティ
- **「閉じる」を心理ハックで隠さない** — ブランド毀損リスク

---

## 6. paywall — Paywall / Upgrade モーダル

Free → Paid 転換、Starter → Pro アップグレード、機能解放など、**既存ユーザーへの課金アクション**。

### Diagnostic Framework

1. **Paywall Trigger Strategy** — どのタイミングで出すかが最大の設計判断
   | トリガー | 向いている場面 |
   |--------|-------------|
   | **Feature-gated** | 明確な機能差がある SaaS |
   | **Usage-based** | 使用量課金モデル |
   | **Time-based** | Trial 終了時 |
   | **Value-moment** | Aha Moment 直後（最高 CVR） |
   | **Exit intent (in-app)** | Mobile B2C |
   | **Milestone** | N 回利用・X 作成達成時 |

   **Value-moment / Milestone が最高 CVR**。機能遮断は最終手段
2. **Paywall Design** — Price Anchoring（上位 → 中位の順）/ Annual を default に / Feature Comparison は簡潔（5〜7 行）/ Social Proof / Risk Reversal（返金保証・いつでもキャンセル）
3. **Copy Framework** — 遮断ではなく誘導（「Pro 限定」ではなく「○○を解放して X を可能に」）/ 機能ではなく**ユーザーが得るもの**/ 限定オファーは慎重に
4. **Alternative Paths（逃げ道）** — 「後で」ボタン / 「代わりに安いプランを見る」/ ダウングレード防止
5. **Post-purchase Experience** — 課金完了 → 機能解放は即時 / 24 時間以内の Welcome メール / 有料機能への誘導

### Guardrail（必須）

- 有料解約率（初月）/ Refund 率 / NPS 変化 / ダウングレード率
- **短期 Conversion だけで判断しない** — LTV ベースで見る

### 落とし穴

- **Value-moment を狙え** — 遮断ではなく価値を感じた瞬間
- **逃げ道を用意する** — 「後で」導線で短期 CVR は下がるが長期 LTV は上がる
- **Pricing が間違っていれば Paywall は効かない** — 価格構造の妥当性を先に確認

---

## SURF との接続

- **Set**: 各対象の現状ベースライン（CVR / Completion Rate / Activation Rate / Capture Rate / Paywall Conversion）を `memory/results/performance-data.md` に書く
- **Ask**: 「この LP の CVR を上げる Top 3 改修案を、HTML 差分で」「Onboarding の Aha Moment 仮説を 3 つ挙げて」
- **Release**: 改修 HTML / CSS / コピー / トリガー設定を本番反映する。検証可能な A/B 設計を伴う
- **Feedback**: 施策後の対象別 KPI と Guardrail を `memory/results/performance-data.md` に記録、検証済みパターンは `knowledge/update/` に自社プレイブックとして昇華
