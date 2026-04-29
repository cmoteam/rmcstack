---
name: brand
description: ブランド適合チェック。コピー・ビジュアル・LP・広告素材のブランド一貫性とトーン&マナーをレビュー。アクティブ workspace のブランドガイドラインと照合し、適合度スコアと修正指示を返す。
version: 1.0.0
---

# Brand — ブランド適合チェック（agent ディスパッチャ）

この skill は `/brand` を slash コマンドから呼び出すための薄いラッパーです。実体は `.claude/agents/creative-direction.md`（Creative Direction agent）にあります。

## RMC Alignment

- **Position**: Insight（軸違いの専門チェック ── 視点ではなく「ブランド適合」という専門性軸）
- **Sync Preflight**: `private/memory/organization/brand-guidelines.md` または workspace 固有の `brand-guidelines.md` が存在する前提
- **Learn Hook**: なし（書き込み副作用なし）

## なぜ `/insight` の role に統合しないか

`/insight` の 4 role（ceo / consultant / gemba / customer）は「視点の高さ」軸で揃っている。ブランド適合は「専門性」軸であり、軸が違うものを同居させると意図が乱れる。独立 skill として維持する。

## 動作

1. Task tool で `subagent_type: creative-direction` を起動する
2. ユーザーの依頼内容（対象成果物・論点）をそのまま prompt に渡す
3. agent の返却結果をそのまま提示する（追加の編集や要約は原則しない。長すぎる場合のみ短いサマリを先頭に付ける）

## 指示テンプレ（agent への prompt）

```
SURFStack リポジトリでブランド適合チェックを実行してください。

依頼:
<ユーザーの依頼をそのまま貼る>

手順は agent 定義（.claude/agents/creative-direction.md）に従ってください。
- scope: workspace（アクティブ workspace の brand-guidelines.md を前提）
- 出力: 適合度スコア + 不適合箇所の特定 + 修正指示（具体的な代替案）
- 忖度しない・書き込み副作用なし
```

## Chaining

- **前工程**: `/insight ceo` `/insight customer` などで成果物の方向性が定まった後
- **後工程**: Activate（playbook 参照のインライン対話で本番反映）
