# Results Memory Template — 企業固有の結果ログテンプレート

> **このディレクトリ（`templates/memory/results/`）はテンプレートです。**
> 実際のパフォーマンス数値・学びは `private/memory/workspaces/<slug>/results/`（gitignore対象）に格納します。
> upstream への誤コミットを避けるため、企業固有のデータは本ディレクトリには書き込まないでください。

## この層の責務

SARF の **Feedback** 段階で集まる、企業固有の結果データを記録します。

- 直近のパフォーマンスデータ（CVR・CPA・ROAS・LTV など実績値）
- 施策ごとの成功／失敗記録と検証途中の仮説
- まだ profile 層に昇華していない学び（Nが足りない・再現性未確認のもの）

検証が済んで **普遍化できた** 学びは `/feedback` スキルが `private/memory/workspaces/<slug>/profile/` に昇華します。
ここ（`results/`）は「生データ／途中段階の観測」の保管庫と考えてください。

## なぜ update/ から分離しているか

- `knowledge/update/` — 外から入ってくる共有情報（プラットフォーム仕様・業界トレンド）。公開可能で upstream で共有されうる情報。
- `private/memory/workspaces/<slug>/results/` — **中から出てくる企業固有の結果**。CVR や売上などの実数値は機密性が高く、gitignore で保護する。

これにより:
- 売上・CVR・CPAなどの機密数値が誤って public に漏れない
- `update/` は全ユーザー共通の最新情報として素直に共有可能
- SARFの4段階（S/A/R/F）と情報層が直接対応する

> 層の名前が `results/` でスキルの名前が `/feedback` と分かれているのは、SARF の F 段階（Feedback）の **保管先** がこの層である、という役割分担を明確化するためです。

## セットアップ手順

新規 workspace は `/workspace new <slug>` または `bin/init-private --workspace <slug>` で作成すると、このテンプレートが `private/memory/workspaces/<slug>/results/` にコピーされます。

### 施策ごとに実績を書き戻す

- `performance-data.md` — 週次でのKPI実績を更新（CVR・CPA・ROAS 等）
- 施策終了時は `/feedback` スキルで一括記入
- 週次振り返りは `/weekly-retro` が参照

## 注意事項

- **必ず `private/memory/workspaces/<slug>/results/` に書く**。`templates/memory/results/` に書くと upstream に流れます。
- 検証済みで普遍化できる学びは **`private/memory/workspaces/<slug>/profile/` に昇華**。ここ（results/）には生データを残す。
- トレンド・仕様変更など外部情報は `knowledge/update/` 側。ここには書かない。
