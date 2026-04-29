---
name: listen
description: RMC の Listen 段（受信）。4 つの同期源（Team / Customer / Market / Performance）に分けて認識・実態を取り込む。引数 scope で対象を切替。引数なしなら scope を質問する。
version: 1.0.0
---

# Listen — 4 同期源を統一エントリで取り込む

`/listen <scope>` の形で呼び出す。RMC（`knowledge/base/reframing-marketing-cycle.md`）の **Listen 段** を担う唯一の skill。**4 つの独立した同期源**（Team / Customer / Market / Performance）から認識・実態を取り込む責務を持つ。

## RMC Alignment

- **Position**: Listen（4 同期源の統一エントリ）
- **Listen Preflight**: なし（Listen は RMC サイクルの起点）
- **Learn Hook**: 外部揮発情報・顧客接点ログの更新は `/learn` 経由でも書き戻される。Listen はその受け皿でもある

## Scope（引数）

| scope | 同期源 | 委譲先 | 書き込み先 |
|-------|-------|--------|-----------|
| `team-org` | Team Sync（組織層） | `bin/listen team-org` | `private/memory/organization/` |
| `team-brand` | Team Sync（ブランド層） | `bin/listen team-brand` | `private/memory/organization/brand-guidelines.md` |
| `team-workspace` | Team Sync（workspace 層） | `bin/listen team-workspace` | `private/memory/workspaces/active/profile/` |
| `customer` | **Customer Sync** | `bin/listen customer` で雛形を作成し、対話で `customer-signal.md` を埋める | `private/memory/workspaces/active/profile/customer-signal.md` |
| `market` | Market Sync（外部揮発情報） | `bin/listen market` | `knowledge/update/` |

引数が省略されたら、ユーザーに「どの同期源を更新しますか？」と上記表を見せて選んでもらう。

## 動作

### scope = `team-org` / `team-brand` / `team-workspace` / `market`

Bash で統一 dispatcher を実行する：

```bash
bin/listen team-org
bin/listen team-brand
bin/listen team-workspace
bin/listen market
```

スクリプトが対話で TODO 項目を埋める。完了後、`/next` を促して次の一歩を確認する。

### scope = `customer` （Customer Sync の構造的取り込み）

Customer Sync は `bin/listen customer` で雛形を bootstrap し、直接対話で埋める。以下の Intake で進める：

#### Step 0: Bootstrap

`private/memory/workspaces/active/profile/customer-signal.md` が未存在なら、以下を実行して `templates/memory/profile/customer-signal.md` から新規作成する：

```bash
bin/listen customer
```

テンプレートの基本構造：

```markdown
# Customer Signal — <workspace>

> **目的**: ICP 仮説と実態のズレを検出するための、顧客の生の声・行動・反応の記録。
> Performance Data（数値）に埋もれず、顧客の言葉そのものを残す。
> `/learn` でも追記される。

## 直近の顧客接点ログ
- [YYYY-MM-DD] 接点種別（営業 / サポート / レビュー / SNS / インタビュー）: 顧客の言葉（引用）

## 刺さった言葉（採用が決まった瞬間の表現）
- [YYYY-MM-DD] セグメント: 言葉

## 刺さらなかった言葉（離脱・反論された表現）
- [YYYY-MM-DD] セグメント: 言葉

## 解約・離脱の理由
- [YYYY-MM-DD] セグメント: 理由（顧客の言葉で）

## JTBD（顧客が雇おうとしている用事）
- 機能的 Job: ...
- 情緒的 Job: ...
- 社会的 Job: ...
（詳細は `knowledge/base/customer-research-jtbd.md` 参照）

## ICP 仮説 vs 実態のズレ
- ICP（仮説）: ...
- 実態（観測）: ...
- ズレの方向: ...
- → Release 候補 / Insight 候補
```

#### Step 1: Intake（1 メッセージで一括質問）

ユーザーに以下を尋ねる：

- 直近 1〜3 ヶ月で顧客から聞いた**生の言葉**（営業ログ / サポート / レビュー / SNS）
- 採用が決まった瞬間に響いた表現
- 離脱・解約の理由（具体的な言葉で）
- 既存 ICP 仮説と違うと感じた箇所

#### Step 2: 書き戻し

- 該当セクションに追記
- ICP との乖離が見つかったら、末尾に `### Release 候補（次サイクル）` として記録
- ユーザーに「Release 段で `/release` を起動するときに自動入力されます」と告知

#### Step 3: 完了報告

`/next` を促し、次の一歩を確認する。

## Required Knowledge

```
Read: knowledge/base/reframing-marketing-cycle.md
Read: knowledge/base/customer-research-jtbd.md  # scope=customer のとき
Read: private/memory/workspaces/active/profile/  # 全ファイル（scope=customer のとき）
```

## Principles

- **同期源を混ぜない**: Team / Customer / Market / Performance を別ファイルで持つ。Customer の声を Performance Data に書かない
- **顧客の言葉をそのまま残す**: 解釈・要約は別レイヤー（Insight 段）で行う。Listen は引用ベース
- **検証ゲートはここでは緩い**: Listen は仮説・観測・引用すべて受け入れる。検証は Release / Insight / Learn 段の責務
- **Marketing Extension（Optional）**: Funnel Stage / Segment / Unit Economics / Measurement / Baseline KPI はこの段の入力で揃える（`reframing-marketing-cycle.md` 参照）

## Anti-Patterns

- 顧客の声を ICP に直接書き込む（仮説と実態を混ぜる）
- Customer Sync を空のまま Insight / Release / Activate に進む（実態を見ずに判断する）
- Performance Data だけで Listen を済ませる（数値に埋もれて顧客の言葉が残らない）

## Chaining

- **前工程**: なし（RMC サイクルの起点）。または `/learn` の還流結果
- **後工程**: `/insight`（Customer Sync を `customer` role で読み返す）/ `/release`（ICP 仮説と実態のズレを手放し候補に）
