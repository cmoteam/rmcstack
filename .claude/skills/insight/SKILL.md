---
name: insight
description: RMC の Insight 段（抽出）。4 視点（ceo / consultant / gemba / customer）に切り替えて、選択肢と判断材料を出す。引数 role で視点を指定。引数なしなら role を質問する。
version: 1.0.0
---

# Insight — 4 パースペクティブを統一エントリで切り替える

`/insight <role>` の形で呼び出す。RMC（`knowledge/base/reframing-marketing-cycle.md`）の **Insight 段** を担う唯一の skill。**4 つの視点**から workspace の状態・成果物・戦略を批評し、選択肢と判断材料を出す。

## RMC Alignment

- **Position**: Insight（4 視点の統一エントリ）
- **Sync Preflight**: アクティブ workspace に Listen 出力（profile / customer-signal / results）が揃っている前提。`[TODO]` 残存は Set 不足として明記する
- **Learn Hook**: なし（書き込み副作用なし、判断材料の提示のみ）

## Role（引数）

| role | 軸 | 視点 | 委譲先 agent | 主な観点 |
|------|----|------|------------|---------|
| `ceo` | 上から（経営） | 全体最適・財務・ポートフォリオ | `subagent_type: ceo-review` | ROI 判定 / GO・PIVOT・KILL / 資本配分 |
| `consultant` | 外から（ゼロベース） | 聖域否定・既成枠の解体 | `subagent_type: consultant-review` | リフレーミング / 前提への疑義 / 戦略再設計案 |
| `gemba` | 下から（現場） | 顧客接点・施策感応度・実装制約 | `subagent_type: insight-gemba` | 1 次情報 / 暗黙知 / 実装可能性 |
| `customer` | 外から（受け手） | ICP 本人・購買者・離脱者の立場で | `subagent_type: insight-customer` | LP / 広告 / 価格 / オファーを顧客視点で読み返す |

引数が省略されたら、ユーザーに「どの視点でレビューしますか？」と上記表を見せて選んでもらう。

## 動作

1. role を確定（引数 or ユーザー選択）
2. Task tool で対応する subagent_type を起動
3. ユーザーの依頼内容（対象施策・成果物・論点）をそのまま prompt に渡す
4. agent の返却結果をそのまま提示する（追加の編集や要約は原則しない。長すぎる場合のみ短いサマリを先頭に付ける）

### 指示テンプレ（agent への prompt）

```
RMCStack リポジトリで <role> 視点のレビューを実行してください。

依頼:
<ユーザーの依頼をそのまま貼る>

手順は agent 定義（.claude/agents/<agent-name>.md）に従ってください。
- scope: workspace（アクティブ workspace の profile / customer-signal / results / brand を前提）
- [TODO] 残存は Listen 不足として明記
- 忖度しない・書き込み副作用なし
- 出力は判断材料（選択肢・トレードオフ・推奨）の提示まで。本番反映は Activate 段の責務
```

## なぜ 4 視点か

`marketing-structural-issues.md` Section 0.2 の「戦略と戦術の双方向の断絶」を解くには、**上から（ceo）/ 外から（consultant）/ 下から（gemba）** の 3 方向同時レビューが必要。これに加え、マーケ OS の独自性として **受け手（customer）** 視点を加える。Customer Sync（Listen 段）の素材を読み返す段としても機能する。

CMO 視点は構造的に「ceo の戦略視点 + gemba の現場視点」の中間役なので、独立 role として持たない（`reframing-marketing-cycle.md` 参照）。

## Role の使い分け（迷ったら）

- **新規施策の go/no-go 判定** → `ceo`（ROI / 資本配分）
- **既存戦略のリフレーミング** → `consultant`（聖域否定）
- **施策の実装可能性 / 現場リアル** → `gemba`（暗黙知・1 次情報）
- **LP / 広告 / オファーが刺さるかどうか** → `customer`（受け手視点）

複数視点が必要なら、順に呼ぶ：`/insight ceo` → `/insight gemba` → `/insight customer` のように triangulate する。

## Required Knowledge

```
Read: knowledge/base/reframing-marketing-cycle.md
Read: private/memory/workspaces/active/profile/*.md
Read: private/memory/workspaces/active/results/*.md
```

agent 側で必要な追加読み込みは agent 定義に記述。

## Principles

- **視点を混ぜない**: 1 回の `/insight` 呼び出しで 1 視点。複数欲しければ複数回呼ぶ
- **判断材料の提示まで**: 「どれを選ぶか」は人間。AI は選択肢とトレードオフを示すまで
- **忖度しない**: workspace の現状に対して率直に。聖域も否定する
- **Customer Sync 依存**: `customer` role の品質は `customer-signal.md` の充実度に依存。空なら一般論しか出ない

## Anti-Patterns

- 1 視点で 10 個聞く（複数論点を 1 回に詰め込む）
- agent の出力を勝手に要約・改変する（canonical は agent 側）
- Listen が薄いまま `customer` role を呼ぶ（一般的な ICP 像を語るだけになる）

## Chaining

- **前工程**: `/listen`（4 同期源を埋める）
- **後工程**: `/release`（Insight で出た不一致・聖域候補を手放しに回す）/ `/brand`（ブランド適合の専門チェック）
