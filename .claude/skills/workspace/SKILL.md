---
name: workspace
description: CMOFlow のアクティブ workspace を初期化・切替・一覧・新規作成・削除する。bin/workspace と bin/init-private に委譲する薄いラッパー。
version: 2.0.0
---

# Workspace — Workspace 操作の統一エントリ

`/workspace <subcommand>` の形で呼び出す。CMOFlow の workspace（事業部・クライアント・プロダクト単位）を扱うすべての ops を担う。

## RMC Alignment

- **Position**: Ops（RMC サイクル外。サイクルが回る土台を整備する）
- **Listen Preflight**: なし
- **Learn Hook**: なし

## Subcommands

| 引数 | 動作 | 委譲先 |
|------|------|--------|
| `init` | `private/` 全体をブートストラップ（organization / workspaces / output 雛形を生成） | `bin/init-private` |
| `list` | workspace 一覧 + アクティブ表示 | `bin/workspace list` |
| `current` | アクティブ slug を表示 | `bin/workspace current` |
| `new <slug>` | 新規 workspace 作成 + 即アクティブ化 | `bin/workspace new <slug>` |
| `switch <slug>` | アクティブ workspace 切替 | `bin/workspace switch <slug>` |
| `remove <slug>` | workspace 削除（確認プロンプトあり） | `bin/workspace remove <slug>` |

引数なしなら、上記表をユーザーに見せて選んでもらう。

## 動作

Bash で対応する `bin/` スクリプトを実行する：

```bash
bin/init-private               # init
bin/workspace list             # list
bin/workspace current          # current
bin/workspace new <slug>       # new
bin/workspace switch <slug>    # switch
bin/workspace remove <slug>    # remove
```

`new` 実行後は `/listen team-org` → `/listen team-brand` → `/listen team-workspace` → `/listen customer` の順で情報を入力するよう案内する。

## 命名規則

- slug は **実在する事業名**（`acme-saas` / `client-beta` / `b2b-onboarding` 等）
- `default` は使わない（workspace の意味を空にする）
- 半角英数 + ハイフン推奨

## 初回プロジェクトの典型フロー

```
1. /workspace init          # private/ ブートストラップ
2. /workspace new acme-saas # 最初の workspace
3. /listen team-org         # 組織情報
4. /listen team-brand       # ブランド
5. /listen team-workspace   # workspace 固有情報
6. /listen customer         # Customer Sync
7. /next                    # 次の一歩確認
```

## 注意事項

- `remove` は破壊的操作なので **必ずユーザー確認を取る**（bin/workspace 内でも確認する）

## Principles

- **薄いラッパーに徹する**: ロジックは bin スクリプト側。skill は dispatch のみ
- **`default` 禁止**: workspace は事業実体に紐付ける

## Chaining

- **前工程**: なし（リポジトリ初期化の起点）
- **後工程**: `/listen team-*` → `/next`
