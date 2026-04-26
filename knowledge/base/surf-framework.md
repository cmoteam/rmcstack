# SURF — AI 時代のマーケティング OS

## 定義

SURF は、**AI エージェントと協働しながら学習する組織を作るためのオペレーティング・システム**である。
個別のマーケティングフレームワーク（AARRR・STP・RAM-CE 等）の上位に位置し、それらを**組織学習として機能させる**ための型を定義する。

SURFStack 全スキル・全ワークフローの基底にあるマーケ OS であり、**Syncing → Understanding → Releasing → Fitting** の 4 段階を持つ。
読みは「**サーフ**」（波乗り）。

```
Syncing ─→ Understanding ─→ Releasing ─→ Fitting ─┐
   ↑                                                  │
   └──────────────────────────────────────────────────┘
              （Fitting の終端は次サイクルの Syncing 起点）
```

| 段階 | 動詞 | 性格 | 主な担い手 | 役割 |
|------|------|------|-----------|------|
| **S — Syncing** | 共有する | 入力 | チーム全員 + 場としての knowledge / memory | 情報・認識・リソース・課題のサイロを解消し、共有された前提から始める |
| **U — Understanding** | 理解する | 出力 | 各レビュー観点 + AI | 何を理解しているか／していないかを可視化し、視点を切り替えて選択肢と判断材料を出す |
| **R — Releasing** | 解放する | 認知の手放し | 意思決定者 + AI（触媒） | 既成の KPI・聖域・「ねばならない」を手放し、リフレーミングの余白を作る |
| **F — Fitting** | 適合させる | 実行と還流 | 実行責任者 + AI | 自社プロダクトに適合した目標とステップを再構成し、本番反映（shipping）し、結果を次の Syncing に還流する |

> **Release vs Releasing — 意味の分離**:
> 旧 SARF の "Release"（本番反映）と SURF の "Releasing"（既成枠の解放）は**意味が逆**である。本番反映を指すときは英語では `shipping` / `deploy` / 日本語では「本番反映」「ローンチ」と表記し、Releasing は**認知・前提の解放専用**に固定する。本番反映の責務は **Fitting** に吸収されている。

## なぜ SURF か ── 旧 SARF からの転換

旧 SARF（Set / Ask / Release / Feedback）は **AI 協働の戦術 OS** だった。前提として「個人が良い Set を作れば良いアウトプットが出る」という個人 ↔ AI モデル。

しかし AI に委ねる時代（2026 年〜）には、個人レベルの最適化では足りない。**チーム単位で学習プロセスを埋め込まないと、AI は責任放棄の道具になる**（詳細は `learning-organization.md` `responsibility-design.md` `marketing-structural-issues.md`）。

SURF は OS の主体を**個人 ↔ AI から、組織 ↔ AI に切り替える**:

| 観点 | 旧 SARF | 新 SURF |
|------|---------|--------|
| 主体 | 個人 ↔ AI | 組織 ↔ AI |
| 起点 | 自分の情報を AI に**渡す** | チームで情報を**共有する** |
| 中核問い | AI に何を問うか | チームが何を理解しているか |
| 中盤動詞 | Release（本番反映） | Releasing（既成枠の解放） |
| 終端 | Feedback（結果を戻す） | Fitting（適合させる ＋ 次サイクル起点） |
| 思想 | プロンプト工学 | 学習する組織 |

## 4 段階の詳細

### S — Syncing（共有する／入力）

**原則**: AI が良い出力を返すかどうかは、共有されている情報の質と範囲で決まる。サイロの中で持っている情報は、組織にとって存在しないのと同じ。

**やること**:
- 事業・ICP・ブランド・数字・制約の言語化と共有（`private/memory/`）
- チーム内サーベイ／対話で「誰が何を知っているか／知らないか」を可視化
- 外部揮発情報（プラットフォーム仕様・業界トレンド）の取り込み（`knowledge/update/`）
- 過去の成功と失敗、現在のパフォーマンスの記録（`private/memory/results/`）

**Syncing が成立しているかのチェック**:
- [ ] `[TODO]` が残っていないか
- [ ] 「弊社は」ではなく具体的な固有名詞・数値で書かれているか
- [ ] 成功事例だけでなく失敗事例・避けたい表現も書かれているか
- [ ] 担当者の頭の中だけにある情報がないか（属人化検出）

**担い手スキル**: `/set-organization` `/set-brand` `/set-workspace` `/set-update` `/init-private` `/workspace`

### U — Understanding（理解する／出力）

**原則**: 漠然とした問いには漠然とした答えしか返らない。問いの解像度＝視点の切り替えが、組織の理解の解像度を規定する。

**やること**:
- 視点を切り替えて選択肢と判断材料を出す（CEO 視点・CMO 視点・SEO 視点・ICP 視点 等）
- 何を理解しているか／していないかを実測する（サーベイ・診断・既存成果物のレビュー）
- 分析データから事実を抽出する

**良い Understanding の構造**:
1. **誰の視点で**（CEO / CMO / SEO / ICP 本人 / 新規訪問者）
2. **何を**（評価 / 制作 / 分析 / 比較 / 予測）
3. **どの深さで**（案出し 3 つ / 完成品 / レビュー付き / A/B パターン）
4. **何を判断基準に**（ICE / ROI / ブランド整合 / CVR 予測）
5. **どの形式で**（表 / チェックリスト / コード / 原稿）

**Understanding のサブタイプ**:

| サブタイプ | 何をするか | 例 |
|----------|----------|----|
| **Design** | ゼロから設計させる（戦略・ICP 仮説・LP 構成案・キーワード戦略） | `/seo`（キーワード戦略）, `/cmo-review`（チャネル設計） |
| **Review** | 既存成果物を評価する（コピー品質・LP CVR・広告整合性・経営インパクト） | `/ceo-review`（GO/PIVOT/KILL）, `/creative-direction`, `/ui-design` |
| **Analytics** | データから理解を更新する | `/data-analytics` |

**ワークフロー内での回り方**: `Design Understanding → Fitting（叩き台 shipping） → Review Understanding → Fitting（本番 shipping）` のように、Understanding と Fitting が入れ子で回る。

**担い手スキル**: `/cmo-review` `/ceo-review` `/seo` `/creative-direction` `/ui-design` `/customer-research` `/data-analytics` `/pricing-strategy` `/churn-prevention` `/estimate`

### R — Releasing（解放する／認知の手放し）

**原則**: 学習する組織を作る最大のボトルネックは、既成の KPI・聖域・「ねばならない」が思考を縛ること。これらを意識的に手放さない限り、リフレーミングは起きない。

> **Releasing は本番反映ではない**。本番反映は Fitting の責務。Releasing は**認知・前提・組織心理の解放**である。

**やること**:
- 「ねばならない」を一旦手放す（KPI・スケジュール・既存の戦略）
- 聖域を否定する（過去の意思決定・看板施策・既存 ICP 像）
- 個人が抱えている負荷を表に出して解放する
- ゼロベースで「もし制約がなかったら何をするか」を問い直す

**Releasing が成立しているかのチェック**:
- [ ] 「現状の KPI に縛られない場合、別の指標になりうるか」が議論されたか
- [ ] 「聖域として触れていなかった前提」が機械的に列挙されたか
- [ ] 「ねばならない」と「やりたい」の区別がついているか
- [ ] チームメンバーが個別に抱えている負担・不満が場に出ているか

**担い手スキル**: `/release-assumptions`（前提・KPI・聖域の機械的列挙→手放し議論の触媒）/ `/consultant-review`（外部コンサル視点でのゼロベース率直レビュー）

**重要な制約**: Releasing は人間にしか引き受けられない判断である。AI は「聖域」「前提」「ねばならない」を機械的に列挙できるが、それらを**実際に手放す決断**は人間に残る。組織政治を超えて「これは違う」と言うのは AI の役割ではない。

### F — Fitting（適合させる／実行と還流）

**原則**: 自社プロダクトの実力に適合しない目標は、いくら立派でも機能しない。**自分たちのプロダクトに何ができるかを正確に理解した上で**、適した目標とステップに再構成する。

**やること**:
1. **適合**: 自社の実力・リソース・制約に適合した目標とステップを再構成する
2. **本番反映（shipping）**: 原稿を公開する、広告を入稿する、LP をデプロイする ── 本番環境に反映されて初めて Fitting 完了
3. **計測の同時着地**: UTM・計測タグ・コンバージョン設定・A/B テスト分岐を**同じリリースで揃える**
4. **次サイクルへの還流**: 結果（数字・定性・差分・学び）を `private/memory/results/` `private/memory/profile/` `knowledge/update/` に書き戻し、**次の Syncing の入力に変える**

> **Fitting の終端 = 次サイクルの Syncing 起点**。Fitting で得た学びは、書き戻されて初めて次サイクルの Syncing で使える前提になる。書き戻されない学びは個人の頭の中にだけ残り、組織知にならない。

**Fitting の責務**:
- **選ぶ**: 複数案の中から自社の文脈に最も合うものを選択する
- **削る**: AI が出しがちな冗長な要素・汎用的な装飾を削る
- **足す**: AI が持ちえない現場の暗黙知・1 次情報を足す
- **shipping する**: 本番環境に反映する
- **計測する**: ベースラインと差分が測れる状態を作る
- **還流する**: 結果を memory / knowledge に書き戻し、次の Syncing に渡す

**Feedback の 4 軸**（次サイクルへの還流時に整理）:
1. **Funnel Conversion**: ファネル段階ごとの転換率変化
2. **Segment Response**: セグメント別の反応差
3. **Attribution**: チャネル・接点の寄与
4. **Unit Economics Update**: LTV / CAC / Payback の更新

**担い手スキル**: `/contents-edit` `/ads-manager` `/optimize` `/feedback`（次サイクル還流のゲート）

## SURFStack のスキル対応表

| Syncing（入力） | Understanding（出力） | Releasing（解放） | Fitting（適合・shipping・還流） | Meta |
|----------------|---------------------|------------------|------------------------------|------|
| /set-organization | /cmo-review | /release-assumptions | /contents-edit | /surf-check |
| /set-brand | /ceo-review | /consultant-review | /ads-manager | /next |
| /set-workspace | /seo | | /optimize | |
| /set-update | /creative-direction | | /feedback（還流ゲート） | |
| /init-private | /ui-design | | | |
| /workspace | /customer-research | | | |
| | /data-analytics | | | |
| | /pricing-strategy | | | |
| | /churn-prevention | | | |
| | /estimate | | | |

## 4 つの「徹底」 — SURF を支える思想

SURF は「徹底」という思想の動詞化である:

- **徹底した共有** → Syncing
- **徹底した理解** → Understanding
- **徹底した解放** → Releasing
- **徹底した適合** → Fitting

「とりあえず」の対極にある思想であり、責任の所在を曖昧にしないための実践でもある（詳細は `marketing-structural-issues.md` `responsibility-design.md`）。

## Marketing Extension（Optional）

SURF はマーケに特化した OS であるため、各段階に「マーケ固有の次元」を重ねると出力精度が段違いに上がる。これらは **オプトイン**（記入は任意）。空欄なら通常の SURF として動作する。

> 推奨: 余裕ができた段階で 1 次元ずつ埋めていく。全部を一気に揃える必要はない。

### Syncing の 5 次元（推奨）

| 次元 | 内容 | 書き込み先（例） |
|------|------|-----------------|
| **Funnel Stage** | TOFU / MOFU / BOFU（または AARRR のどこ） | `private/memory/workspaces/active/profile/icp.md` のカスタマージャーニー |
| **Segment** | ICP のどの層・どのユースケースに打つか | `icp.md`（Primary / Secondary / Anti-Persona） |
| **Unit Economics** | CAC / LTV / Payback / 許容 CPA | `performance-data.md`（サマリー） |
| **Measurement** | どの KPI を、どのツールで、どの粒度で測れるか | `business-overview.md`（使用ツール） |
| **Baseline KPI** | 現状 CVR / CPA / ROAS / 順位 | `performance-data.md`（ベースライン） |

これらが埋まっているかは `/surf-check` が advisory として報告する（fail させない）。

### Understanding のマーケ固有フィールド（推奨）

問いを組むとき以下 3 フィールドを明示する:

- **Target Funnel Stage**: この問いはどの段階への介入か（TOFU / MOFU / BOFU / Retention / Referral）
- **Target Segment**: 誰向けの問いか
- **Primary KPI**: 判定基準となる主 KPI

各 SKILL.md の `SURF Alignment` セクションに optional フィールドとして追加されている。

### Fitting の同時着地条件（推奨）

「本番反映して完了」の定義に以下を加える:

- **Tracking 実装**: UTM / 計測タグ / コンバージョン設定 / A/B テスト分岐
- **Baseline 記録**: shipping 時点の Before 数値を `performance-data.md` に記録
- **Gate 痕跡**: 法務・ブランド・予算などの承認ログ（該当する場合のみ）

計測されていない shipping は次サイクルの Syncing で比較対象を失う。

## アンチパターン

- **Syncing 丸投げ**: 「とにかくいい感じで」── AI は平均的な回答しか返せない
- **Understanding の過剰**: 1 つのプロンプトで 10 個聞く ── どれも中途半端になる。1 サイクル 1 目的
- **Releasing 不在**: 「現状の KPI を疑う」プロセスを飛ばして実行に進む ── 既成の失敗パターンを再生産する
- **Fitting 不全（shipping 欠落）**: レビューレポートを読んで満足 ── 本番反映がなければ何も変わらない
- **還流の断絶**: shipping した施策の結果を memory に書き戻さない ── 次サイクルが毎回ゼロから始まる
- **Syncing 汚染**: 検証されていない仮説を事実として `private/memory/profile/` に書く ── 以降全ての出力が歪む
- **「AI が言ったから」病**: AI の出力を判断の根拠にする ── 責任の所在が組織から蒸発する（詳細 `responsibility-design.md`）

## Practitioner's Checklist

新しい施策に着手する前に以下を確認:

- [ ] **Syncing**: 該当スキルの `Required Knowledge` ファイルは最新か？ `[TODO]` が残っていないか？ チーム内に未共有の情報がないか？
- [ ] **Understanding**: どの視点・何を判断基準に・どの形式で出させるか、スラッシュコマンドを明示しているか？
- [ ] **Releasing**: 既成の KPI・聖域・前提を一度手放したか？ ゼロベースで考えたか？
- [ ] **Fitting**: 誰が・いつまでに・どこに本番反映するか、計測まで含めて決まっているか？ 結果を次サイクルにどう還流するか決まっているか？

このチェックが通らないうちは、AI に投げても成果は出ない。SURF は省略できない。

## 関連ドキュメント

- `knowledge/base/marketing-structural-issues.md` — SURF が解こうとしている病理
- `knowledge/base/learning-organization.md` — 学習プロセスをチームに埋め込む方法
- `knowledge/base/responsibility-design.md` — 責任の所在の設計、AI 委譲時代の責任外部化問題
