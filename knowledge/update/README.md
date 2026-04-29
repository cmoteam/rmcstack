# Update Knowledge — 外部揮発情報

このディレクトリには、**外から入ってくる** 揮発性の情報を格納します。
プラットフォームの仕様変更、業界トレンドなど、公開情報ベースで全ユーザー共通の観測。

## 含まれるファイル

- **platform-updates.md** — プラットフォーム仕様変更時に随時更新
- **industry-trends.md** — 月次で更新推奨

> 自社の実績数値（CVR・CPA・ROAS・売上）は `memory/results/` 側（gitignore対象）に格納します。
> ここ（`update/`）は機密性が低い外部観測専用です。

## 使い方

各スキル（特に実行系: SEO, Ads, Content）がこのディレクトリを参照します。
情報が古いと施策の精度が下がるので、`/listen market` で定期的に更新してください。

`/listen market` は `bin/set-update` を通じて `platform-updates.md` / `industry-trends.md` の TODO を埋める入口です。MCP やブラウザで公式ソース（Google Ads Blog / Meta for Business / X Business 等）を確認できる場合は、差分をユーザーに提示してから書き込みます。非公開観測や自社実績は `/learn` へ回します。

`/weekly-retro` ワークフローの中で、外部情報の更新もリマインドされます。
