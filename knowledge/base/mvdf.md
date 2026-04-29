# MVDF — RMC Coverage Model

## 定義

**MVDF（Marketing Value Delivery Framework）** は、RMC に内蔵される **coverage model** である。RMCStack では、MVDF を RMC と並ぶ別サイクルや別 OS として扱わない。

RMC が定義するのは **どう回すか** である。

```
Listen → Insight → Release → Activate → Learn
```

MVDF が定義するのは **何を見落とさず管理するか** である。マーケティング活動を、属人的な施策集ではなく、顧客価値の創造・伝達・提供・交換を継続的に管理する対象領域として整理する。

土台となる定義（AMA, 2017）:

> マーケティングとは、顧客・クライアント・パートナー・社会にとって価値ある提供物を創造し、伝達し、届け、交換するための活動・制度・プロセスである。

この定義を RMCStack では **MVDF Domains** として 8 領域に分解する。

## RMC との関係

| | RMC | MVDF |
|---|---|---|
| 位置づけ | canonical operating cycle | RMC 内蔵の coverage model |
| 問い | どう受信・抽出・手放し・起動・還流させるか | 何を見落とさず管理し、成果物として残すか |
| 単位 | Listen / Insight / Release / Activate / Learn | 8 Domains |
| 起点 | Team / Customer / Market / Performance の Listen | AMA 定義の創造・伝達・提供・交換 |
| 終端 | 次サイクルの Listen 起点 | 8 領域すべての継続的成熟 |
| 主体 | 組織と AI の協働 | 組織のマーケティング管理対象 |

**canonical rule**: RMC の段階は常に **Listen / Insight / Release / Activate / Learn** の 5 段である。MVDF はこの5段に追加されるライフサイクルではなく、各段階で点検する管理対象を定義する。

## MVDF Domains

MVDF Domains は、マーケティング活動のカバレッジを点検する 8 領域である。8 領域はプロジェクトフェーズではなく、並行して成熟させる管理対象である。

| # | Domain | 価値提供フェーズ | 主な問い | 主な成果物 |
|---|---|---|---|---|
| 1 | **市場・顧客理解** | 前提 | 誰のどんな問題を扱うのか | 市場分析、顧客インサイト、ペルソナ、JTBD |
| 2 | **戦略・ポジショニング** | 創造 | どこで勝つのか | STP、ポジショニング、価値提案 |
| 3 | **ブランド・コミュニケーション** | 伝達 | 何者として記憶されるか | ブランド戦略、メッセージ、トーン&マナー |
| 4 | **提供価値・商品連携** | 創造 | 何をどう価値化するか | 価値仮説、価格方針、パッケージ設計 |
| 5 | **チャネル・顧客接点** | 提供 | どこで出会い、どう体験させるか | チャネル戦略、カスタマージャーニー |
| 6 | **需要創出・キャンペーン** | 伝達 + 提供 | どう認知・興味・検討・購買を生むか | キャンペーン計画、コンテンツ設計、メディア計画 |
| 7 | **顧客関係・成長** | 交換 | どう継続・拡張・紹介につなげるか | CRM、LTV 施策、リテンション計画 |
| 8 | **測定・ガバナンス** | 横断 | 成果をどう判断し、改善するか | KPI ツリー、ダッシュボード、予算管理、リスク管理 |

## RMC 各段での使い方

| RMC 段階 | MVDF Domains の使い方 |
|---|---|
| **Listen** | 8 領域を充足チェックリストとして使い、空白領域を特定する |
| **Insight** | 領域ごとのレンズで `/insight ceo` `/insight consultant` `/insight gemba` `/insight customer` を切り替える |
| **Release** | 領域横断で既成 KPI・聖域・前提を疑う。典型例は領域 8 の MQL 数への過剰依存 |
| **Activate** | 領域別の成果物を本番反映する。広告、LP、価格、CRM、計測などを具体物に落とす |
| **Learn** | 結果を領域別に `profile/` と `results/` へ書き戻し、次サイクルの Listen 入力にする |

## Domain × RMCStack Tools

| MVDF Domain | 主に使う RMCStack の道具 |
|---|---|
| 1. 市場・顧客理解 | `/listen team-workspace` `/listen customer`、`customer-research-jtbd.md` |
| 2. 戦略・ポジショニング | `/insight ceo` `/insight consultant` `/release` |
| 3. ブランド・コミュニケーション | `/listen team-brand`、`/brand`、`brand-strategy.md` |
| 4. 提供価値・商品連携 | `pricing-strategy.md`、`/insight ceo` |
| 5. チャネル・顧客接点 | `cvr-optimization-playbook.md`、`seo-playbook.md` |
| 6. 需要創出・キャンペーン | `digital-advertising.md`、`content-marketing.md`、`seo-playbook.md` |
| 7. 顧客関係・成長 | `retention-lifecycle.md`、`cvr-optimization-playbook.md`（signup-flow / onboarding） |
| 8. 測定・ガバナンス | `web-analytics-practice.md`、`measurement-incrementality.md`、`/learn`、`/insight ceo` |

## 業態別の重み付け

MVDF Domains はすべて重要だが、業態によって最初に厚く見る領域は変わる。

| 業態 | 重みが大きい領域 | 補足 |
|---|---|---|
| **BtoB** | 1（顧客理解 / JTBD）、2（戦略）、6（需要創出 / ABM）、7（顧客関係） | 営業連携が成否を分ける。MQL → SQL 定義の整合性は領域 8 の責務 |
| **BtoC** | 3（ブランド）、5（チャネル）、6（キャンペーン）、8（測定） | ブランド資産の継続投資と短期需要創出の両立 |
| **SaaS** | 1、4（パッケージ・価格）、7（リテンション・LTV）、8（North Star） | Activation / Retention の改善が CAC 回収に直結 |
| **新規事業** | 1、2、4 | 需要創出に走る前に Problem-Solution Fit を確認する |
| **中小企業** | 3、5、7 | 全領域を同時に厚くするより、ブランド一貫性と既存顧客の深耕を優先する |

## 原則の扱い

MVDF 旧版にあった「8 つの原則」は、独立フレームワークの原則としては扱わない。RMC の Principles と重複するため、今後は RMC の判断原則に吸収する。

| 旧 MVDF 原則 | RMC での扱い |
|---|---|
| 顧客価値を起点にする | Customer Sync と MVDF Domain 1 に吸収 |
| 市場を仮説ではなく証拠で理解する | Listen / Learn の検証ゲートに吸収 |
| 戦略と実行を分断しない | Insight → Release → Activate の接続原則に吸収 |
| ブランドは約束であり、体験で検証される | `/brand` と Domain 3 / 5 に吸収 |
| 成果は売上だけでなく将来価値で見る | Domain 7 / 8 と `/learn` に吸収 |
| 学習速度を競争優位にする | RMC の Learn 還流原則に吸収 |
| 倫理・プライバシー・社会的信頼を守る | `responsibility-design.md` と Domain 8 に吸収 |
| マーケティングは部門ではなく組織能力である | RMC の Team Sync と責任設計に吸収 |

## Reference: 非 canonical メモ

以下は RMCStack の運用ルールではなく、外向け説明・書籍化・PMBOK 風整理のための参照メモである。RMC の canonical flow には追加しない。

### 6 段階ライフサイクル

旧 MVDF では、マーケティング・イニシアチブ単位の線形フローとして以下を置いていた。

```
Diagnose → Define → Design → Deliver → Measure → Adapt
```

RMC との対応は以下。

| 旧 MVDF ライフサイクル | RMC 段階 |
|---|---|
| Diagnose, Define | Listen + Insight |
| Design | Insight + Release |
| Deliver | Activate |
| Measure, Adapt | Learn → 次サイクル Listen |

このライフサイクルは、個別キャンペーンの進行説明には使える。ただし RMCStack 上では RMC 5 段に吸収済みとみなし、運用上の段階としては使わない。

### PMBOK / ITTO 対応

MVDF は当初、PMBOK のマーケティング版として着想した。そのため、Performance Domains、Inputs / Tools & Techniques / Outputs、知識エリアという整理を試作していた。

現在の RMCStack では、これらは実行単位として採用しない。必要な要素は以下に分解して扱う。

| 旧整理 | RMCStack での置き場 |
|---|---|
| Performance Domains | MVDF Domains |
| Inputs | Listen の 4 同期源 |
| Tools & Techniques | `knowledge/base/` の各プレイブック |
| Outputs | Activate の成果物と Learn の書き戻し |
| Knowledge Areas | `knowledge/base/` の領域別ドキュメント |

### 命名の経緯

検討した候補:

| 候補 | 評価 |
|---|---|
| MMBOK: Marketing Management Body of Knowledge | PMBOK 風だが、静的な知識集に見える |
| MBOK: Marketing Body of Knowledge | シンプルだが、固有性が弱い |
| **MVDF: Marketing Value Delivery Framework** | AMA 定義の Value Delivery と整合するため採択 |
| Marketing Operating System | RMC と意味が重なるため不採用 |
| Marketing Excellence Framework | 認定制度寄りで、RMCStack の運用モデルとして広すぎる |

## 関連ドキュメント

- `knowledge/base/reframing-marketing-cycle.md` — RMC canonical OS。MVDF Domains を内蔵する主ドキュメント
- `knowledge/base/marketing-structural-issues.md` — RMC が解こうとしている構造的問題
- `knowledge/base/marketing-frameworks.md` — 個別フレームワーク（AARRR / STP / JTBD / RAM-CE）
- `knowledge/base/learning-organization.md` — RMC の Learn 還流と組織学習
- `knowledge/base/responsibility-design.md` — 責任設計、倫理、ガバナンス
- `knowledge/base/customer-research-jtbd.md` — Domain 1 / Customer Sync の実装プレイブック
