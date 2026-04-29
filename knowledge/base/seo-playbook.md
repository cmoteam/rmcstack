# SEO Playbook — キーワード戦略・技術 SEO・コンテンツ最適化

> RMC の **Activate 段** で参照する SEO 実行プレイブック。Insight 段で SEO 視点が必要なときは `/insight consultant` または `/insight customer`（検索意図を顧客視点で読み返す）を使う。

## このプレイブックの位置づけ

SEO は**チャネル / 専門領域**であり、Insight 段の「視点」軸とは別物。RMCStack では skill 化せず、`knowledge/base/` プレイブックとしてカバーする。`digital-advertising.md` `content-marketing.md` 等と並列に参照する。

参照する Listen 入力（アクティブ workspace の前提）:

- `private/memory/workspaces/active/profile/icp.md`（検索意図の理解）
- `private/memory/workspaces/active/profile/positioning.md`
- `private/memory/workspaces/active/profile/competitors.md`（SERP 上の競合）
- `private/memory/workspaces/active/profile/customer-signal.md`（顧客の生の検索クエリ・問い合わせ言葉）
- `knowledge/update/platform-updates.md`（Google アルゴリズム変更・AI Overview の動向）

## 1. キーワード戦略

### 1.1 KW の 4 軸評価

| 軸 | 問い | 弱い場合の対処 |
|----|------|--------------|
| **検索意図** | 情報系（TOFU）/ 比較系（MOFU）/ 取引系（BOFU）/ 指名系のどれか | ファネル段階に対応するコンテンツがあるか確認 |
| **難易度** | 上位 10 サイトのドメイン強度・コンテンツ品質・更新頻度 | 自社のドメイン強度に対して無謀な KW は捨てる |
| **ビジネス関連性** | この KW で来た訪問者が CV する可能性 | CV しない KW は順位を取っても無意味 |
| **検索ボリューム** | 月間検索数。ロングテールも含めて分布で見る | ボリューム 0 の KW は追わない（指名系除く） |

### 1.2 ファネル段階別 KW

| ファネル | KW タイプ | 例（B2B SaaS） | 主な目的 |
|---------|----------|----------------|---------|
| **TOFU** | 情報系・問題提起系 | "MA ツール とは" "リード獲得 課題" | 認知獲得・教育 |
| **MOFU** | 比較系・選定系 | "MA ツール 比較" "B2B SaaS 選び方" | 検討段階での候補入り |
| **BOFU** | 取引系・指名系 | "[製品名] 料金" "[製品名] vs [競合名]" | 申し込み直前の意思決定 |
| **Retention** | 活用系・解決系 | "[製品名] 使い方" "[機能名] エラー" | 解約防止・LTV 拡大 |

### 1.3 KW 選定アンチパターン

- **「やりたい KW」と「取れる KW」を混同**: 競合が圧倒的に強い KW に正面から挑む
- **検索意図無視**: 取引系 KW に情報記事を当てる（CTR は出るが CV しない）
- **ロングテール過剰**: ロングテールばかり狙ってドメイン全体の権威性が上がらない
- **指名系を放置**: 自社名 KW で他社にディスられる記事が上位に来ているのを放置

## 2. 技術 SEO 監査

### 2.1 監査チェックリスト

#### メタ情報
- [ ] title タグが各ページ固有・60 文字以内
- [ ] meta description が固有・150〜160 文字
- [ ] canonical タグが正しく設定（重複コンテンツ対策）
- [ ] OGP / Twitter Card が設定（SNS 流入用）
- [ ] hreflang（多言語サイトの場合）

#### 構造化データ
- [ ] JSON-LD で Schema.org 準拠（Organization / Article / Product / FAQ / BreadcrumbList）
- [ ] AI Overview / Featured Snippet 対象 KW で FAQ Schema を実装
- [ ] Rich Results Test でエラーなし

#### 内部リンク
- [ ] パンくずナビゲーションあり
- [ ] 関連記事リンクが意味的に関連
- [ ] アンカーテキストが具体的（「こちら」「詳細」を多用しない）
- [ ] 孤立ページがない（被リンク 0 のページ）

#### Core Web Vitals
- [ ] LCP（Largest Contentful Paint）< 2.5s
- [ ] CLS（Cumulative Layout Shift）< 0.1
- [ ] INP（Interaction to Next Paint）< 200ms
- [ ] PageSpeed Insights で Mobile も Green

#### クロール / インデックス
- [ ] robots.txt が意図通り
- [ ] sitemap.xml が最新で Search Console に登録済み
- [ ] noindex / nofollow が誤適用されていない
- [ ] 重要ページの被リンク（内部・外部）が揃っている

### 2.2 技術 SEO の優先順位付け

優先度 = `影響範囲 × 修正容易性`

- **High**: title / meta description の最適化、canonical 設定、Core Web Vitals 改善
- **Mid**: 構造化データ追加、内部リンク見直し、孤立ページ解消
- **Low**: hreflang（多言語化が決まってから）、画像 alt の網羅（既に大半埋まっているなら）

## 3. コンテンツ最適化

### 3.1 E-E-A-T

Google が品質評価に用いる 4 軸：

- **Experience**（経験）: 実際に使った・体験した情報か
- **Expertise**（専門性）: 著者・組織の専門性が示されているか
- **Authoritativeness**（権威性）: 業界内での認知・引用・受賞歴
- **Trustworthiness**（信頼性）: 情報の正確性・更新日・出典

実装ポイント:
- 著者プロフィール（顔写真 + 経歴 + SNS）
- 1 次情報（自社調査・顧客インタビュー・実績数値）
- 出典の明記（信頼できる外部ソース）
- 最終更新日の表示
- About / 運営者情報 / 問い合わせ先の明記

### 3.2 検索意図充足

KW から推定される検索意図に対し、以下を網羅：

- 主要な問いへの直接回答（ページ冒頭で答える）
- 関連サブトピックの網羅（H2 / H3 で分解）
- 比較・代替案の提示（中立的に）
- 次のアクションへの誘導（CTA）

### 3.3 AI Overview / LLM 検索対応

2025 年以降、Google AI Overview / ChatGPT / Perplexity からの流入が増加。対応策：

- **明確な定義**: ページ冒頭で「X とは Y である」と一文で答える（LLM が引用しやすい）
- **構造化された箇条書き**: H2 → H3 → リストの階層を整える
- **FAQ Schema**: AI Overview の FAQ セクションに採用されやすい
- **1 次情報・固有データ**: 一般論ではなく自社固有の数字・事例を入れる（LLM が「ソース」として参照する価値）
- **冗長性を削る**: 必要な情報を最短で提示

## 4. 実装案の提示テンプレ

レビュー時は以下のフォーマットで返す：

```markdown
## SEO Review — [対象ページ / KW]

### 検索意図 / KW 評価
- ターゲット KW: ...
- 検索意図: TOFU / MOFU / BOFU
- 難易度: ...
- ビジネス関連性: ...
- 評価: 続行 / リターゲット / 撤退

### 技術 SEO 監査
- メタ情報: [問題点と修正案]
- 構造化データ: ...
- 内部リンク: ...
- Core Web Vitals: ...

### コンテンツ最適化案
- E-E-A-T: ...
- 検索意図充足: ...
- AI Overview 対応: ...

### 実装案（コード片）
```html
<!-- title 修正案 -->
<title>...</title>

<!-- JSON-LD 追加 -->
<script type="application/ld+json">
{...}
</script>
```

### 優先順位
- High（即時）: ...
- Mid（次サイクル）: ...
- Low（後回し可）: ...

### 計測の同時着地（Activate 段の要件）
- Search Console での順位ベースライン取得
- GA4 で landing page 別 CV 計測
- AI Overview 採用有無を手動チェック（or Ahrefs / Semrush）
```

## 5. 還流（Learn 段への入力）

shipping 後に `/learn` で書き戻すべき項目：

- **順位変動**: 1 / 4 / 12 週後の主要 KW 順位
- **オーガニック CTR**: Search Console から
- **オーガニック CV**: GA4 から
- **AI Overview 採用**: 採用された KW / されなかった KW
- **被リンク獲得**: Ahrefs / Semrush で増加分
- **Customer Signal への書き戻し**: SEO 経由で来た顧客の問い合わせ・解約理由（検索意図と実際のニーズの乖離検出に使う）

## 6. アンチパターン

- **施策を打たない監査の量産**: 改善点を列挙して終わる。実装案・コード片まで出さない
- **ドメイン強度に合わない目標**: 立ち上げ 6 ヶ月のサイトで "B2B SaaS" 1 位を狙う
- **AI Overview 無視**: 古い SEO 方法論（H1 連発・KW 詰め込み）に固執
- **計測なしで shipping**: 順位ベースライン・CTR ベースラインを取らずに改善を回す
- **指名系を後回し**: 自社名 KW で他社の批判記事が上位に来ているのを放置

## 関連ドキュメント

- `knowledge/base/reframing-marketing-cycle.md` — RMC OS（Activate 段の位置づけ）
- `knowledge/base/content-marketing.md` — コンテンツ全体戦略
- `knowledge/base/web-analytics-practice.md` — 計測実装
- `knowledge/base/measurement-incrementality.md` — チャネル増分測定
- `knowledge/update/platform-updates.md` — Google アルゴリズム / AI Overview の最新動向
