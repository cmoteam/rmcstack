---
name: set-organization
description: SURFのSyncing段階（organization層）。bin/set-organization でフォーム入力を促し、完了後に充足チェックを行う。
version: 2.0.0
---

# Set Organization

## SURF Alignment

- **Position**: Syncing（組織全体の前提情報を埋める最上位層）
- **Sync Preflight**: なし（SURF の起点（Syncing 入力））
- **Fitting Hook**: 組織ミッション・ポートフォリオ変更は `/feedback` 経由で `organization/organization-overview.md` に検証ゲート付きで反映

`bin/set-organization` に委譲します。以下を Bash ツールで実行してください。

```bash
bin/set-organization
```

スクリプトが `private/memory/organization/organization-overview.md` の TODO 項目を順番に質問します。
空 Enter でスキップ、再実行でいつでも補完できます。

## 実行後の確認（Claude の役割）

スクリプト完了後、`/surf-check` を使って充足率と品質を確認してください。
