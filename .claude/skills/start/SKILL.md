---
name: start
description: SARFStack のインタラクティブセットアップウィザードを起動する。workspace 作成・組織情報・ブランド・workspace プロフィールの入力を対話形式でガイドする。
---

# Start — Setup Wizard

以下をターミナルで実行してください。

```
! bin/start
```

ウィザードが起動します。ASCII アートとナンバードメニューで、
workspace 作成から Set 情報の入力まで完全に自律して案内します
（Claude は不要、ターミナル単体で動作）。

## できること

| 操作 | 説明 |
|------|------|
| ガイド付きセットアップ | Step 0〜3 を順番に通す推奨フロー |
| 組織情報を入力する | `organization-overview.md` の TODO を埋める |
| ブランドガイドラインを入力する | `brand-guidelines.md` の TODO を埋める |
| workspace プロフィールを入力する | `business-overview.md` / `icp.md` / `positioning.md` / `competitors.md` |
| 新規 workspace を作成 | slug を入力して新 workspace を作成 + 即アクティブ化 |
| workspace を切り替える | 既存 workspace をアクティブに変更 |
| workspace を削除する | 非アクティブ workspace を削除（確認プロンプトあり） |

## 完了後

ウィザード終了後、`/sarf-check` を実行して Set 充足率と次の推奨アクションを確認してください。
