# RMC — Reframing Marketing Cycle

## 定義

**RMC（Reframing Marketing Cycle）** は CMOFlow の canonical マーケティング OS である。**AI エージェントと協働しながら学習し続ける、マーケ組織のためのオペレーティング・システム**であり、個別フレームワーク（AARRR・STP・RAM-CE 等）の上位に位置して、それらを**組織学習として機能させる**ための型を定義する。

5 段階のサイクル ── **Listen → Insight → Release → Activate → Learn**。

```
Listen ─→ Insight ─→ Release ─→ Activate ─→ Learn ─┐
   ↑                                                    │
   └────────────────────────────────────────────────────┘
              （Learn の終端は次サイクルの Listen 起点）
```

| 段 | 動詞 | 性格 | 役割 |
|----|------|------|------|
| **L — Listen** | 受信する | 入力 | 4 つの同期源（Team / Customer / Market / Performance）から認識・実態を取り込む |
| **I — Insight** | 抽出する | 出力 | 視点を切り替えて選択肢と判断材料を出す。JTBD・ICP 差分・Positioning 機会を言語化する |
| **R — Release** | 手放す | 認知の手放し | 既成 KPI・聖域・「ねばならない」を機械的に列挙して手放し、リフレーミングの余白を作る |
| **A — Activate** | 起動する | 実行・shipping | セグメント × チャネル × コンテンツに実装し、計測同時着地で本番反映する |
| **L — Learn** | 学ぶ | 還流 | 結果を ICP / Positioning / Playbook に書き戻し、次サイクルの Listen 入力に変える |

## なぜ RMC か

### マーケ OS の独自性は「顧客との同期」を構造に埋めること

汎用の組織学習ループ（OODA / PDCA / Double-Loop Learning）は、内部の意思決定サイクルを駆動するためのものである。マーケティングがこれらと違うのは、**意思決定の前提として「顧客との継続的な同期」を構造に埋めなければ機能しない**ことだ。RMC が **Listen** を 4 つの源（中でも **Customer Sync** を独立源）として明示しているのは、これを OS レベルで強制するためである（詳細は Listen 節）。

### Reframing を骨格名に昇格させる

マーケ組織の最大のボトルネックは、引き継いだ KPI・看板施策・「ねばならない」が思考を縛ること。RMC が **Reframing**（既成枠の組み替え）を骨格名に昇格させているのは、**Release を独立段として死守**することで、戦術最適化の高速化（既存 "Adaptive Marketing" / Real-time Marketing 系統）と差別化するためである。Release は OODA / PDCA との差別化軸でもある。

### マーケティングとは何か — 最適化としての定義

RMC が前提とするマーケティングの定義（`marketing-structural-issues.md` 冒頭）：

> **マーケティングとは、最適化である。**

勝者になることでも数字を増やすことでもなく、**自社の能力・リソース・現在地に合わせて適した戦略・目標・ポジショニング・チャネル・KPI を選び、整合させ続ける営為**。RMC の Activate（適合させて shipping する）はこの定義を段階として動詞化したものである。

### MVDF Domains — マーケティング活動の 8 領域（Listen 充足チェックリスト）

RMC は AMA 定義（マーケティング = 顧客・クライアント・パートナー・社会にとって価値ある提供物を創造・伝達・届け・交換する活動）の全工程を扱う。Listen 段で「自社のマーケが**どの領域をカバーできていて、どこが空白か**」を点検するためのチェックリストが以下 8 領域。RMC は **どう回すか**（サイクル）、8 領域は **何を見落とさないか**（カバレッジ）を担う。

この 8 領域を CMOFlow では **MVDF Domains** と呼ぶ。MVDF（Marketing Value Delivery Framework）は RMC と並ぶ別サイクルではなく、RMC に内蔵される coverage model である。RMC の canonical な段階は常に **Listen / Insight / Release / Activate / Learn** の 5 段であり、MVDF Domains は各段階で点検する管理対象を定義する。

| # | 領域 | 価値提供フェーズ | 主な問い |
|---|------|----------------|---------|
| 1 | **市場・顧客理解** | （前提） | 誰のどんな問題を扱うのか |
| 2 | **戦略・ポジショニング** | 創造 | どこで勝つのか |
| 3 | **ブランド・コミュニケーション** | 伝達 | 何者として記憶されるか |
| 4 | **提供価値・商品連携** | 創造 | 何をどう価値化するか |
| 5 | **チャネル・顧客接点** | 提供 | どこで出会い、どう体験させるか |
| 6 | **需要創出・キャンペーン** | 伝達 + 提供 | どう認知・興味・検討・購買を生むか |
| 7 | **顧客関係・成長** | 交換 | どう継続・拡張・紹介につなげるか |
| 8 | **測定・ガバナンス** | （横断） | 成果をどう判断し、改善するか |

8 領域はすべて**並行して動く**（プロジェクトのフェーズではない）。あるキャンペーンが進行中でも、市場理解は更新され続け、ブランドは検証され続ける。

#### Listen 段での使い方

- `/listen team-workspace` `/listen customer` 後に、「うちは領域 7（顧客関係）が空白」「領域 8（測定）の KPI ツリーがない」を可視化する
- 空白領域は次サイクルの Listen 入力 / Release 候補になる
- 領域別の道具対応は本ドキュメント末尾「MVDF Domains × CMOFlow スキル対応表」を参照

## 5 段階の詳細

### L — Listen（受信する）

**原則**: マーケはチームの頭の中だけでは動かない。**4 つの独立した同期源**を継続的に取り込み続けることが、すべての判断の起点になる。サイロの中で持っている情報は、組織にとって存在しないのと同じ。

#### Listen の 4 同期源

| 同期源 | 内容 | 主なソース | 書き込み先（例） |
|--------|------|----------|----------------|
| **1. Team Sync**（内部認識） | メンバー間の言葉・前提・存在意義・優先順位 | サーベイ・対話・各メンバーの独立記述 | `private/memory/organization/` `private/memory/workspaces/active/profile/` |
| **2. Customer Sync**（顧客同期） | 顧客の生の声・行動・反応・JTBD・離脱理由・刺さった言葉 | 営業ログ / サポート問い合わせ / レビュー / SNS 言及 / サイト行動 / 購買履歴 / 解約理由 / インタビュー | `private/memory/workspaces/active/profile/customer-signal.md`（推奨）/ `customer-research-jtbd.md` を参照 |
| **3. Market Sync**（市場・競合同期） | 競合の動き / プラットフォーム仕様 / 業界トレンド | 外部揮発情報、競合 SERP、広告ライブラリ | `knowledge/update/` |
| **4. Performance Sync**（自社実績同期） | 過去の成功 / 失敗 / 現状数値 / ベースライン | GA4 / 広告管理画面 / 売上 / 解約レポート | `private/memory/workspaces/active/results/` |

#### なぜ Customer Sync を独立源として置くか

顧客情報を「ICP」（内部仮説）と「Performance Data」（メトリクス）だけに吸収すると、構造的に **「ICP 仮説 ≠ 実際の顧客」のズレを検出できない**。RMC は Customer Sync を独立源として置くことで:

- **仮説（ICP）と実態（Customer Sync）のズレ**が自動的に Release 段の入力になる
- **顧客の生の言葉**が KPI ノイズに埋もれずに残る
- **「自社の最適は誰の最適か」**が常に問い直される構造が組み込まれる

これがマーケ OS と汎用組織学習ループ（OODA / PDCA）を分かつ最大の構造的違いである。

#### やること

- **言葉の定義を揃える**: 「マーケティング」「成果」「顧客」「施策」がチーム内で同じ意味を指しているかを確認する
- **個人の存在意義を言語化する**: 各メンバーが「自分は事業のどの課題に効いているのか」を自分の言葉で言える状態にする
- **同期的戦略の駆動**: 各メンバーが独立に書き出した認識（自社認識 / 市場認識 / 目標 / 優先順位）を**同期して合成する**。一致箇所を確からしい前提に、不一致箇所を Release の入力にする（詳細は `marketing-structural-issues.md` Section 0.7）
- **顧客接点の構造的吸い上げ**: 営業・サポート・解約・レビュー・問い合わせ・サイト行動を、**個人の頭の中ではなく** `customer-signal.md` 等に書き戻す
- **市場・競合・プラットフォームの揮発情報**を `/listen market` 経由で取り込む
- **過去の成功・失敗、現在のパフォーマンス**を `private/memory/results/` に記録する

#### Listen が成立しているかのチェック

- [ ] チーム内で「マーケティング」が指す範囲が一致しているか
- [ ] 各メンバーが自分の役割を職能ではなく**事業課題への寄与**で語れるか
- [ ] **Customer Sync が独立した記録として残っているか**（performance metrics に埋もれていないか）
- [ ] 直近の顧客接点ログ（営業・サポート・レビュー）が memory に書き戻されているか
- [ ] `[TODO]` が残っていないか
- [ ] 「弊社は」ではなく具体的な固有名詞・数値で書かれているか
- [ ] 担当者の頭の中だけにある情報がないか（属人化検出）

#### 担い手スキル

`/listen team-org`（Team Sync）/ `/listen team-brand`（Team Sync）/ `/listen team-workspace`（Team Sync）/ `/listen customer`（Customer Sync）/ `/listen market`（Market Sync）/ `/workspace`

Customer Sync は `/listen customer` で **`profile/customer-signal.md` に顧客の生の声・行動ログを独立に保持する**。ICP 仮説は `icp.md`、顧客実態は `customer-signal.md` に分ける（`customer-research-jtbd.md` プレイブック参照）。

### I — Insight（抽出する）

**原則**: データそのものは Insight ではない。**「何を理解しているか／していないか」**「**どの視点で何を抽出するか**」を意識的に切り替えなければ、Listen で集めたシグナルは雑音のまま終わる。漠然とした問いには漠然とした答えしか返らない。

#### やること

- 視点を切り替えて選択肢と判断材料を出す（ceo / consultant / gemba / customer）
- JTBD（Job To Be Done）・潜在需要・購買決定要因を顧客の言葉で抽出する
- 自社の Positioning と市場期待のギャップを言語化する
- 既存施策の効率と感応度（`marketing-structural-issues.md` Section 2.2）を診断する
- 何を理解しているか／していないかを実測する（サーベイ・診断・既存成果物のレビュー）

#### 良い Insight の構造

1. **誰の視点で**（ceo / consultant / gemba / customer）
2. **何を**（評価 / 制作 / 分析 / 比較 / 予測）
3. **どの深さで**（案出し 3 つ / 完成品 / レビュー付き / A/B パターン）
4. **何を判断基準に**（ICE / ROI / ブランド整合 / CVR 予測）
5. **どの形式で**（表 / チェックリスト / コード / 原稿）

#### Insight のサブタイプ

| サブタイプ | 何をするか | 主な skill / playbook |
|----------|----------|---------------------|
| **Design** | ゼロから設計（戦略 / ICP 仮説 / LP 構成案 / キーワード戦略） | `seo-playbook.md` `customer-research-jtbd.md` とインライン対話 |
| **Review** | 既存成果物を評価（コピー / LP CVR / 広告整合 / 経営インパクト） | `/insight ceo` `/insight customer` `/brand` |
| **Analytics** | データから理解を更新する | `web-analytics-practice.md` `measurement-incrementality.md` |

#### サイクル内での回り方

`Design Insight → Activate（叩き台 shipping） → Review Insight → Activate（本番 shipping）` のように、Insight と Activate が入れ子で回る。

#### 担い手スキル

`/insight <ceo|consultant|gemba|customer>` と `/brand`（判断ゲート）。専門領域の Design / Analytics は `knowledge/base/` のプレイブックを参照しながらインライン対話で進める。

### R — Release（手放す）

**原則**: マーケ組織の最大のボトルネックは、既成の KPI・聖域・「ねばならない」が思考を縛ること。これらを意識的に手放さない限り、リフレーミングは起きない。

> **Release は本番反映ではない**。本番反映は Activate の責務。Release は**認知・前提・組織心理の解放**である。

#### やること

- 「ねばならない」を一旦手放す（KPI・スケジュール・既存の戦略）
- 引き継いだ KPI を機械的に列挙し、P0–P3 の整合性で篩にかける（`marketing-structural-issues.md` Section 2.1）
- 走っている施策を列挙し、感応度 High / Mid / Low で篩にかける（同 Section 2.2）。Low は撤退候補
- 聖域（過去の意思決定 / 看板施策 / 既存 ICP 像 / 慣習チャネル）を否定して並べる
- Listen 段の Customer Sync が示す**実態**と既存 ICP 仮説のズレを並べ、仮説の方を手放し候補にする
- Listen 段で出た「不一致箇所」を手放し候補として読み直す
- 個人が抱えている負荷を表に出して解放する
- ゼロベースで「もし制約がなかったら何をするか」を問い直す

#### Release が成立しているかのチェック

- [ ] 「現状の KPI に縛られない場合、別の指標になりうるか」が議論されたか
- [ ] 「聖域として触れていなかった前提」が機械的に列挙されたか
- [ ] P3 × Low（経営に紐付かず施策にも反応しない指標）がゼロになっているか
- [ ] **既存 ICP 仮説 vs Customer Sync 実態のズレ**が手放し候補に含まれたか
- [ ] 「ねばならない」と「やりたい」が区別されているか
- [ ] チームメンバーが個別に抱えている負担・不満が場に出ているか
- [ ] 捨てた後に「最後まで残る一本」が言語化されているか（`marketing-structural-issues.md` Section 0.4）

#### 重要な制約

Release は人間にしか引き受けられない判断である。AI は「聖域」「前提」「ねばならない」を機械的に列挙できるが、**実際に手放す決断**は人間に残る。組織政治を超えて「これは違う」と言うのは AI の役割ではない。

#### 担い手スキル

`/release`（前提・KPI・聖域の機械的列挙→手放し議論の触媒）/ `/insight consultant`（外部コンサル視点でのゼロベース率直レビュー）

### A — Activate（起動する）

**原則**: 自社プロダクトの実力に適合しない目標は、いくら立派でも機能しない。**自分たちのプロダクトに何ができるかを正確に理解した上で**、適した目標とステップに再構成し、本番環境で動く形に落として、計測可能な状態で稼働させる。

> **マーケティングの定義そのもの**: マーケティングとは最適化である ── 自社の能力・リソース・現在地に合わせて適した戦略・目標・ポジショニングを選び続けること。Activate はこの定義を段階として動詞化したものである。**正解は一つではない**。

#### やること

1. **適合**: 自社の実力・リソース・制約に適合した目標とステップを再構成する
2. **セグメント × チャネル × コンテンツの実装**: 誰に / どこで / 何を / どう届けるかを具体化
3. **shipping**: 原稿公開、広告入稿、LP デプロイ、価格変更、解約フロー改修 ── 本番環境に反映されて初めて Activate 完了
4. **計測の同時着地**: UTM / 計測タグ / コンバージョン設定 / A/B テスト分岐を**同じリリースで揃える**
5. **ベースライン記録**: shipping 時点の Before 数値を `private/memory/workspaces/active/results/` に記録

#### Activate の責務

- **選ぶ**: 複数案の中から自社の文脈に最も合うものを選択する
- **削る**: AI が出しがちな冗長な要素・汎用的な装飾を削る
- **足す**: AI が持ちえない現場の暗黙知・1 次情報を足す
- **shipping する**: 本番環境に反映する
- **計測する**: ベースラインと差分が測れる状態を作る

#### 担い手

専門領域の実行 skill は持たず、`knowledge/base/` プレイブックを参照しながらインライン対話で進める：

| 領域 | 参照する knowledge/base/ |
|------|------------------------|
| 広告運用 | `digital-advertising.md` |
| コンテンツ制作 | `content-marketing.md` `narrative-storytelling.md` |
| CVR 最適化（page / signup-flow / onboarding / form / popup / paywall） | `cvr-optimization-playbook.md` |
| 価格設計 | `pricing-strategy.md` |
| 解約防止・リテンション | `retention-lifecycle.md` |
| 顧客調査 | `customer-research-jtbd.md` |
| 見積り・工数計算 | `estimate-playbook.md` |
| ブランド戦略 | `brand-strategy.md` |
| UI / LP レビュー | `cvr-optimization-playbook.md` の page セクション |
| データ分析・計測 | `web-analytics-practice.md` `measurement-incrementality.md` |

ブランド適合の判断ゲートとしては `/brand` を使う。shipping 可否そのものは、以下の Activate Gate で確認する。

#### Activate Gate（shipping 前の最低条件）

Activate は skill を持たないが、shipping 前に以下 7 項目を満たす。これは PMBOK 風の重い承認プロセスではなく、**本番反映・計測・責任の所在を同時に成立させるための軽量 gate** である。対応 artifact は `agent-catalog.md` の Artifact Catalog に定義する。

| Gate | 確認すること | 対応 artifact |
|---|---|---|
| **Owner** | 結果に accountable な個人が 1 名決まっているか。チーム名だけで済ませていないか | `activation-brief.md` |
| **Scope** | 何を出すか / 出さないか、対象セグメント、対象チャネル、対象期間が明確か | `activation-brief.md` |
| **Budget** | 媒体費・制作費・工数・外注費の上限が決まっているか。超過時の判断者がいるか | `activation-brief.md` |
| **Risk** | ブランド、法務、顧客体験、計測、オペレーション上のリスクを列挙したか | `activation-brief.md` / `approval-log.md` |
| **Measurement** | Before 数値、判定指標、観測期間、計測方法、成功 / 撤退条件が決まっているか | `measurement-plan.md` |
| **Approval** | ブランド・法務・予算・実装の承認が必要な場合、誰がいつ承認したか残っているか | `approval-log.md` |
| **Rollback** | 何が起きたら止めるか、止める権限者、元に戻す方法が決まっているか | `measurement-plan.md` |

#### No-Go 条件

以下のいずれかに該当する場合、CMOFlow 上では Activate 未成立と扱う。例外的に shipping する場合も、例外理由を `activation-brief.md` に残す。

- **Owner 不在**: accountable な個人がいない
- **Scope 不明**: 対象セグメント・チャネル・期間・非 scope が曖昧
- **Measurement 不在**: Before 数値、判定期間、撤退条件がない
- **Risk 未確認**: ブランド毀損・法務・顧客体験・計測破綻のいずれかを見ていない
- **Approval 不在**: 承認が必要な施策なのに承認ログがない
- **Rollback 不在**: 広告停止、LP 差し戻し、価格戻し、配信停止などの手順がない

Gate を通っていない shipping は、実行作業としては完了していても Learn 段で比較・責任・再現ができない。したがって「やった」ではなく「組織学習に接続されていない実行」として扱う。

#### Activate の同時着地条件

「本番反映して完了」の定義に以下を加える:

- **Tracking 実装**: UTM / 計測タグ / コンバージョン設定 / A/B テスト分岐
- **Baseline 記録**: shipping 時点の Before 数値を `results/` に記録
- **Gate 痕跡**: 法務・ブランド・予算などの承認ログ（該当する場合のみ）

計測されていない shipping は Learn 段で比較対象を失う。

### L — Learn（学ぶ）

**原則**: shipping した結果は、**書き戻されて初めて次サイクルの前提**になる。書き戻されない学びは個人の頭の中にだけ残り、組織知にならない。Learn は単なる「振り返り」ではなく、**次サイクルの Listen の入力を能動的に作る段階**である。

#### やること

1. **結果の収集**: shipping 後の数字（CVR / CPA / ROAS / 順位 / 売上）と定性（顧客反応 / 営業の声 / サポート問い合わせ）を集める
2. **4 軸で整理**:
   - **Funnel Conversion**: ファネル段階ごとの転換率変化
   - **Segment Response**: セグメント別の反応差
   - **Attribution**: チャネル・接点の寄与
   - **Unit Economics Update**: LTV / CAC / Payback の更新
3. **書き戻し**: 検証済みの知見だけを以下に書き戻す
   - `private/memory/workspaces/active/results/` — 実績数値・施策検証ログ
   - `private/memory/workspaces/active/profile/` — ICP / Positioning の更新（仮説ではなく検証済みの事実のみ）
   - `private/memory/workspaces/active/profile/customer-signal.md` — 顧客の新しい声・行動パターン
   - `knowledge/update/` — 外部揮発情報（プラットフォーム仕様変更等）
4. **AI 出力の採否ログ**: AI が出した提案のうち何を採用し何を捨てたか、なぜかを `/learn` の差分セクションに残す（`responsibility-design.md`）
5. **次サイクルへの引き継ぎ**: 残課題と新仮説を Listen 段の入力として明示する

#### Evidence Level（知見の格上げ基準）

Learn で扱う情報は、検証度に応じて E0〜E3 に分類する。これは「思いつき」を profile 層に混入させないための基準であり、`/learn` の検証ゲートより上位の共通語彙である。

| Level | 定義 | 置き場所 | profile 反映 | 例 |
|---|---|---|---|---|
| **E0: Hypothesis** | 未検証の仮説・解釈・アイデア | `private/output/` / `results/` の Archive | 不可 | 「この訴求は刺さるはず」 |
| **E1: Observation** | 単発の観測。顧客の声、1 施策の結果、少数サンプル | `customer-signal.md` / `results/` | 不可 | インタビュー 1 件、広告 1 本の反応 |
| **E2: Repeated Signal** | 複数接点・複数施策・十分な期間で同じ傾向が再現 | `results/` + profile 反映候補 | 承認後に可 | 複数商談で同じ反論、2 週間以上の広告傾向 |
| **E3: Validated Learning** | 数値・定性・顧客行動が揃い、反証条件も確認した検証済み知見 | `profile/` / 必要に応じて `knowledge/update/` | 可 | ICP の更新、Positioning の修正、真の ROAS 係数 |

#### Evidence Write Rules

- **E0 / E1 は profile に書かない**: 次サイクルの前提を汚染するため。`results/` や `customer-signal.md` に観測として残す
- **E2 は profile 反映候補**: `/learn` で差分を提示し、ユーザー承認後に `profile/` へ反映する
- **E3 は検証済み知見**: `profile/` に反映できる。外部環境・プラットフォーム仕様など workspace 固有でないものは `knowledge/update/` に残す
- **`knowledge/base/` へは直接昇格しない**: 複数 workspace で再現し、汎用プレイブックとして抽象化できる場合のみ、別途レビューして反映する
- **Evidence Level は下げられる**: 後続サイクルで反証が出た場合、E3 を E2 / E1 に戻し、profile の記述も修正候補にする

#### Learn が成立しているかのチェック

- [ ] 結果の数字と定性が両方残っているか
- [ ] 「うまくいった理由 / うまくいかなかった理由」が仮説ではなく検証済みの言葉で書かれているか
- [ ] **Customer Sync 側に新しい知見が書き戻されているか**（数値メトリクスだけで終わっていないか）
- [ ] 次サイクルの Listen に渡す引き継ぎ事項が明文化されているか
- [ ] AI 出力の採否ログが残っているか

#### 担い手スキル

`/learn`（次サイクル還流のゲート）/ `/listen market`（外部揮発情報の更新）

## RMC のスキル対応表

| Listen（受信） | Insight（抽出） | Release（手放し） | Activate（起動・shipping） | Learn（還流） | Meta / Ops |
|---|---|---|---|---|---|
| `/listen team-org` | `/insight ceo` | `/release` | `knowledge/base/` プレイブック参照のインライン実行 | `/learn` | `/next` |
| `/listen team-brand` | `/insight consultant` |  |  |  | `/next --verbose` |
| `/listen team-workspace` | `/insight gemba` |  |  |  | `/workspace` |
| `/listen customer` | `/insight customer` |  |  |  |  |
| `/listen market` | `/brand` |  |  |  |  |

**設計思想**: 専門領域の実行（広告運用・コンテンツ・CVR 最適化・価格・解約・調査・分析・UI レビュー・見積り）は skill 化せず `knowledge/base/` のプレイブックでカバーする。skill は「サイクルを駆動する」「workspace 知識を前提に判断する」役割に絞る（詳細: `agent-catalog.md`）。

`/next` と `/next --verbose` は Meta（サイクル全体の進行確認）として運用する。

## MVDF Domains × CMOFlow スキル対応表

Listen 充足チェックリスト（前出 MVDF Domains）を各 CMOFlow の道具にマップしたもの。「自社のマーケで領域 X が空白」と分かったとき、どの skill / プレイブックから手を付けるかの早見表。

| 領域 | 主に使う CMOFlow の道具 |
|------|------------------------|
| 1. 市場・顧客理解 | `customer-research-jtbd.md`、`/listen team-workspace`（ICP 入力）、`/listen customer` |
| 2. 戦略・ポジショニング | `/insight ceo`、`/release`、`/insight consultant` |
| 3. ブランド・コミュニケーション | `/listen team-brand`、`/brand` |
| 4. 提供価値・商品連携 | `pricing-strategy.md`、`/insight ceo` |
| 5. チャネル・顧客接点 | `cvr-optimization-playbook.md`、`seo-playbook.md` |
| 6. 需要創出・キャンペーン | `digital-advertising.md`、`content-marketing.md`、`seo-playbook.md` |
| 7. 顧客関係・成長 | `retention-lifecycle.md`、`cvr-optimization-playbook.md`（signup-flow / onboarding） |
| 8. 測定・ガバナンス | `web-analytics-practice.md`、`/learn`、`/insight ceo` |

## アンチパターン

- **Listen 丸投げ**: 「とにかくいい感じで」── AI は平均的な回答しか返せない
- **Customer Sync の不在**: ICP 仮説と Performance Data だけで Listen を済ませ、顧客の生の声を構造的に取り込まない ── 「ICP ≠ 実態」を検出できなくなる
- **Insight の過剰**: 1 つのプロンプトで 10 個聞く ── どれも中途半端になる。1 サイクル 1 目的
- **Insight 量産**: Listen 段の不一致を Release に渡さず、Insight 段で AI に「正解の戦略」を量産させる ──「より洗練された無意味さ」を再生産する（`marketing-structural-issues.md` Section 0.5）
- **Release 不在**: 「現状の KPI を疑う」プロセスを飛ばして Activate に進む ── 既成の失敗パターンを再生産する
- **Release の儀式化**: 「とりあえず手放した」と言うだけで、引き継ぎ KPI も看板施策も実際は残る ── 手放したのは言葉だけ
- **「強み信仰」での施策増殖**: Release で篩にかけずに Activate で施策を増やし続ける ──「何かやらなきゃ」と「上手く行かなそう」の挟撃に対する防衛反応そのもの（`marketing-structural-issues.md` Section 0.4）
- **Activate 偏重（shipping 欠落）**: レビューレポートを読んで満足 ── 本番反映がなければ何も変わらない
- **計測の取りこぼし**: shipping を急ぎ、UTM / 計測タグ / ベースライン記録を省略 ── Learn 段で比較対象を失う
- **Learn の断絶**: shipping した施策の結果を memory に書き戻さない ── 次サイクルが毎回ゼロから始まる
- **Listen 汚染**: 検証されていない仮説を事実として `private/memory/profile/` に書く ── 以降全ての出力が歪む
- **「AI が言ったから」病**: AI の出力を判断の根拠にする ── 責任の所在が組織から蒸発する（詳細 `responsibility-design.md`）

## Practitioner's Checklist

新しい施策に着手する前に以下を確認:

- [ ] **Listen**: 4 同期源（Team / Customer / Market / Performance）が最新か？ `[TODO]` が残っていないか？ チーム内に未共有の情報がないか？ 顧客の生の声が直近で記録されているか？
- [ ] **Insight**: どの視点・何を判断基準に・どの形式で出させるか、スラッシュコマンドを明示しているか？
- [ ] **Release**: 既成の KPI・聖域・前提を一度手放したか？ Customer Sync 実態と ICP 仮説のズレを篩にかけたか？ ゼロベースで考えたか？
- [ ] **Activate**: Owner / Scope / Budget / Risk / Measurement / Approval / Rollback が埋まり、shipping 前に `activation-brief.md` と `measurement-plan.md` が作られているか？
- [ ] **Learn**: 結果を次サイクルの Listen にどう還流するか決まっているか？ Customer Sync への書き戻しがあるか？

このチェックが通らないうちは、AI に投げても成果は出ない。**ただし RMC は context（規模・成熟度・速度・リスク）に応じて縮約・拡張するもので、一律のフル運用を強制するものではない**。テーラリングの規定は次節「Tailoring」を参照。

## Tailoring — RMC の縮約・拡張パス

**原則**: RMC は省略不可な **Core** と、context に応じて軽量化・拡張する **Tailorable** の二層に分かれる。テーラリングは「**省略の正当化を残すこと**」が条件。「やらなかった」と「意図して外した」は別物として扱う。

### Core（context に関わらず省略不可）

これを欠くと RMC が機能しない要素：

- **Customer Sync の独立保持** — 規模に関係なく ICP 仮説と顧客実態を別ノードとして残す。1 人事業でも `customer-signal.md` 1 ファイルは持つ
- **Release 段の存在** — 1 行のメモでも良い。「何を、なぜ手放したか」を残すこと自体が省略不可
- **Activate Gate の Owner / Measurement / Rollback の 3 項目** — 個人事業でも「自分が Owner」「Before 数値と判定期間」「止めるトリガ」は決める
- **Learn 段の書き戻し** — 検証済みかどうかの判定だけは残す。書き戻し先が `results/` 1 ファイルでも可
- **AI 出力の採否ログ** — 「AI が言ったから」病の予防。これは規模と無関係

これら Core を context を理由に削るのはテーラリングではなく Core 違反として扱う。

### Tailorable（規模・成熟度・速度・リスクで調整）

| 要素 | Lite（1 人事業 / スタートアップ初期） | Standard（小〜中チーム） | Full（規制業種 / 複数事業部） |
|------|-----------------------------------|----------------------|----------------------------|
| Listen 4 同期源 | Team Sync は自分自身のみで可。Customer / Performance は必須 | 4 同期源すべて | 4 同期源 + 部門別並走 |
| MVDF Domains 8 領域 | 該当領域のみ点検 | 全領域を四半期に 1 回点検 | 領域別 owner、月次点検 |
| Insight 4 視点 | 1〜2 視点で十分（多くは ceo + customer） | 案件に応じて切替 | 4 視点 + 外部 advisory |
| `/brand` | スキップ可（個人ブランド一致） | 案件単位 | リリース毎、法務同席 |
| Activate Gate 7 項目 | Core 3（Owner / Measurement / Rollback） | 7 項目 | 7 項目 + Approval log + 法務 / 計測監査 |
| Release 段の頻度 | 四半期 | 月次 | 週次（複数事業部の portfolio 含む） |
| `/learn` の書き戻し先 | `results/` のみ | `results/` + `profile/` | `results/` + `profile/` + `organization/` + `knowledge/update/` |
| AI 採否ログ粒度 | 1 行サマリ | 採用 / 不採用 / 理由 | 採用 / 不採用 / 理由 / 代替案 / 法務確認 |

### テーラリング判断軸

1. **規模**: 1 人 / 小チーム（〜10）/ 事業部（〜100）/ 複数事業部
2. **成熟度**: workspace 立ち上げ初週 / PMF 前 / 安定運用 / 改善フェーズ / 再構築
3. **速度**: 週単位 shipping / 月単位 / 四半期単位
4. **リスク**: 個人ブログ / B2C SMB / B2B エンタープライズ / 規制業種（金融・医療・公共）

リスクが高いほど Activate Gate と Approval を厚く、速度が速いほど Listen の周期を短くする。規模が大きくなるほど Release を上位（portfolio）にも引き上げる。

### シナリオ別の入口

| シナリオ | 推奨パス | 重点 |
|---------|---------|------|
| 個人事業 / 1 人 workspace | Lite | `/listen customer` → Activate Gate Core 3 → `/learn` を週次で |
| スタートアップ初期（PMF 前） | Lite → Standard へ移行 | Customer Sync 最重視。Release は週次、Activate は当週中 shipping を前提 |
| 既存事業の改善サイクル | Standard | `/listen team-org` `/listen team-workspace` から開始。Release で引き継ぎ KPI を篩 |
| 規制業種 / 大企業 | Full | Activate Gate 7 項目 + Approval log の徹底、`organization/` 層を portfolio Reframing の場として併走 |
| エージェンシー / 複数クライアント | Standard / クライアント = workspace | `organization/` にエージェンシー共通知、各 workspace に固有 ICP / Brand |

### アンチパターン

- **テーラリング名目の Core 省略**: 「うちは小さいから」で Customer Sync を削る → ICP と実態のズレ検出が効かず、RMC の構造的優位が消える
- **省略の不文律化**: 何を外したかを記録しない → 次サイクルで「なぜ Activate Gate 4 項目しか見ていないのか」が再現できない
- **Lite のまま固定化**: 規模が拡大してもテーラリングを更新しない → 後から責任所在不明になる
- **Full の過剰適用**: 1 人事業に Approval log と法務監査を要求 → サイクルが止まり、結局回らないので「RMC は重い」と誤解される
- **Tailoring を「妥協」と読む**: テーラリングは妥協ではなく**設計判断**。判断したことを記録すれば妥協ではなくなる

### テーラリングの記録

各 workspace の `private/memory/workspaces/<slug>/profile/tailoring.md`（任意）に以下を残す:

- 採用パス（Lite / Standard / Full / 部分カスタム）
- 省略・縮約した Tailorable 要素と理由（context のどの軸に依拠したか）
- 拡張した要素と理由
- 次回見直し時期（規模変化・成熟度変化のトリガ）

これがないテーラリングは「忘れた」と区別がつかない。記録の有無自体が Core（責任設計）の一部である。

## Canonical Flow

初回プロジェクトの推奨順:

0. `/workspace new <slug>` — workspace を 1 つ作成（実在する事業名で）
1. `/listen team-org` — 組織情報（Listen / Team Sync）
2. `/listen team-brand` — ブランドガイドライン（Listen / Team Sync）
3. `/listen team-workspace` — workspace 固有情報（Listen / Team + Customer Sync）
4. `/next` — 次の一歩確認（詳細は `/next --verbose`）。不足があれば 1〜3 に戻る
5. `/insight ceo`（Insight 単体）or 横断ワークフロー（Listen〜Learn、未実装）
6. `/release` or `/insight consultant` — Release。既成枠の手放し
7. 実行（広告運用・コンテンツ・CVR 改善・分析等）は `knowledge/base/` プレイブックを参照しながらインライン対話で進め、shipping（Activate）
8. `/listen market` + `/learn` — Listen 層への還流（Learn → 次サイクルへ）

## 関連ドキュメント

- `knowledge/base/marketing-structural-issues.md` — RMC が解こうとしているマーケの構造的病理
- `knowledge/base/signature-frameworks.md` — 他のマーケティング体系（AARRR / STP / ZMOT 等）との並置
- `knowledge/base/learning-organization.md` — 学習プロセスをチームに埋め込む方法
- `knowledge/base/responsibility-design.md` — 責任の所在の設計、AI 委譲時代の責任外部化問題
- `knowledge/base/customer-research-jtbd.md` — Customer Sync の実装プレイブック
- `knowledge/base/mvdf.md` — RMC に内蔵される coverage model（MVDF Domains）の詳細
