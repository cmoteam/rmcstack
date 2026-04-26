---
name: powerpoint
description: PowerPoint (.pptx) スライドを python-pptx で生成するスキル。SURFStack のダーク基調デザインシステムに準拠した再利用可能なヘルパーを提供し、private/output/<workspace>/ に build script + .pptx を一緒に書き出す
version: 1.0.0
---

# PowerPoint Generator — pptx 生成スキル

`python-pptx` を使って、編集可能な `.pptx` スライドデッキを生成します。HTML プレビューと違い、PowerPoint / Keynote / Google Slides で開いてそのまま編集できる成果物を出力します。

## SURF Alignment

- **Position**: Fitting（編集可能な shipping artifact を出す）
- **Sync Preflight**: スライドの中身を「自分たちの言葉」で書くために、`workspaces/active/profile/` の前提が揃っている必要がある。`[TODO]` が残っていれば一般論の資料になりがちなので、冒頭で警告し `/set-workspace` を推奨する
- **Brand Preflight**: 顧客 / 経営層に出す可能性があれば `private/memory/organization/brand-guidelines.md` のロゴ・配色・フォント方針を反映する。未整備なら警告
- **Fitting Hook**: 配布後の反応（読了率・反論された論点・採用された主張）を `/feedback` に戻す。次サイクルでデッキ構成を直す
- **[Optional] Target Audience**: 経営層 / 現場 / 顧客 / 社内勉強会で粒度と語彙を変える。未指定なら経営層向けの粒度（1 スライド 1 メッセージ）
- **[Optional] Theme**: `dark`（既定）/ `light`。社外配布で印刷を想定する場合は `light` を選ぶ
- **[Optional] Aspect**: `16:9`（既定）/ `4:3`

## Required

- **python-pptx** が必要（`python3 -c "import pptx"` で確認）。未導入なら `pip3 install python-pptx` を案内
- 出力先は **必ず** `private/output/<workspace>/`（`<workspace>` は `readlink private/memory/workspaces/active`）
- ファイル命名: `YYYYMMDD-{topic-slug}.pptx` と、再生成用に `build_{topic-slug}.py` を併置

## Workflow

1. **題材確認**: 何のスライドか、対象オーディエンス、想定スライド数、ライト / ダーク
2. **アウトライン設計**: 1 スライド 1 メッセージで章立て。Title → Intro → 各セクション（Section divider + 中身）→ Closing / CTA
3. **Build script 生成**: 下の Design System を import / 流用して `build_{slug}.py` を書き出す
4. **実行**: `python3 build_{slug}.py` で `.pptx` を生成、最後にスライド数とファイルパスを報告
5. **再生成可能にする**: build script は残す（後でフォント・パレット・文言を変えて再ビルドできるように）

## Design System

ダーク基調（既定）。HTML デッキと同じパレット・タイポを揃えると、HTML プレビュー → PPTX 配布の二段構えが組める。

```python
# パレット
BG       = RGBColor(0x0E, 0x11, 0x16)  # 背景
SECTION  = RGBColor(0x11, 0x16, 0x1E)  # セクション区切り背景
CARD     = RGBColor(0x16, 0x1B, 0x23)  # カード背景
LINE     = RGBColor(0x1F, 0x24, 0x2D)  # 罫線
FG       = RGBColor(0xE8, 0xEC, 0xF1)  # 本文
MUTED    = RGBColor(0x8A, 0x93, 0xA3)  # 補助
ACCENT   = RGBColor(0x7C, 0xC4, 0xFF)  # アクセント（見出し・リンク）
ACCENT2  = RGBColor(0xFF, 0xB8, 0x6B)  # 二次アクセント（カード見出し）
WARN     = RGBColor(0xFF, 0x7A, 0x7A)  # 警告
GOOD     = RGBColor(0x7B, 0xE3, 0xA4)  # 肯定

# ライト版（theme=light の時に差し替え）
LIGHT_BG = RGBColor(0xFA, 0xFB, 0xFD)
LIGHT_FG = RGBColor(0x16, 0x1B, 0x23)

# フォント
FONT = "Yu Gothic"  # macOS / Windows 両対応 JP

# サイズ
prs.slide_width  = Inches(13.333)  # 16:9
prs.slide_height = Inches(7.5)
```

**スライド型**（1 スライド 1 型に絞ると見やすい）:

| 型 | 用途 |
|----|------|
| `title` | 表紙・章末カード |
| `section` | セクション区切り（大きい番号 + タイトル） |
| `bullets` | 箇条書き 3〜5 項目 |
| `two-col` | 対比（左右で対立構造） |
| `cards` | 3〜6 枚のカードグリッド（症状リスト等） |
| `quote` | 強調引用（左に 4px の縦線） |
| `big-stat` | 1 つの大きな数字 / フレーズ |
| `table` | 比較表・対応表 |

## Helpers

スキルの `helpers.py`（このディレクトリの隣）を import して使う。生成スクリプトは:

```python
import sys
sys.path.insert(0, "/Users/yumaendo/repos/cmoteam/surfstack/.claude/skills/powerpoint")
from helpers import Deck

deck = Deck(theme="dark", aspect="16:9", footer="SURFStack — <topic>")
deck.title("メインタイトル", subtitle="サブタイトル", kicker="WORKSPACE / TOPIC")
deck.section(num="01", tag="1", title="セクション名", sub="補足")
deck.bullets("見出し", ["項目 1", "項目 2", "項目 3"], kicker="KICKER")
deck.two_col("見出し", left=("左タイトル", ["項目"]), right=("右タイトル", ["項目"]))
deck.cards("見出し", [("タイトル", "本文"), ...])  # 自動で 3 列グリッド
deck.quote("見出し", "強調したい一文。")
deck.big("見出し", "余白の欠如", caption="補足の一文")
deck.table("見出し", [["列A", "列B"], ["値1", "値2"], ...])
deck.cta("見出し", [("ステップ1", "詳細"), ("ステップ2", "詳細")], kicker="CALL TO ACTION")
deck.end("締めの一言。", subtitle="フッター用文言")
deck.save("/.../private/output/<ws>/YYYYMMDD-<slug>.pptx")
```

各メソッドはフッター（ページ番号 + 進捗バー + テキスト）を自動で付ける。

## Preflight Checks

開始前に以下を確認:

1. `python3 -c "import pptx; print(pptx.__version__)"` が通る
2. `readlink private/memory/workspaces/active` でアクティブ workspace が解決できる
3. 出力先ディレクトリが存在する（なければ `mkdir -p`）

## Output Format

成果物の構成:

```
private/output/<workspace>/
  YYYYMMDD-<slug>.pptx          # 配布用
  build_<slug>.py                # 再生成スクリプト（残す）
```

最後にユーザーに報告するもの:

- ファイルパス（`.pptx` と `build_*.py` の両方）
- スライド数
- 章立て（目次） ─ どの章がどのスライド番号か
- 編集ポイント（フォント / パレット / 文言の差し替え方）

## Principles

- **1 スライド 1 メッセージ** ─ 詰め込まない。読み手の認知負荷を下げる
- **テーブルとリストを混ぜない** ─ 同じスライドで型を混在させない
- **章扉を必ず置く** ─ 5〜10 枚ごとに section divider を挟むと迷子にならない
- **再生成可能性を残す** ─ build script を成果物として残す。コピペで上書きしない
- **knowledge と矛盾しない** ─ `knowledge/base/` の用語と齟齬がないか、生成前に該当ファイルを確認する

## Anti-Patterns

- ❌ アニメーション・装飾過多。SURFStack のテンプレは思考の透明性が目的なので最小限の装飾に留める
- ❌ 1 スライドに 7 項目以上の箇条書き。3〜5 で章を分ける
- ❌ 出力先がプロジェクトルート / `.claude/skills/` 以下。必ず `private/output/<ws>/`
- ❌ HTML 版のスタイルとパレットを揃えない（HTML / PPTX を行き来する時に違和感が出る）

## Chaining

- **前工程**: `/cmo-review` `/consultant-review` `/data-analytics`（中身の論理を固める）、`/creative-direction`（トーン確認）
- **後工程**: `/feedback`（配布後の反応を還流）、HTML プレビュー版を併設したい時は手元で同じ題材の HTML デッキも書き出す

## Integrations（optional）

- **Google Drive** MCP: 生成 PPTX をチームの Drive にアップロード（承認ゲート必須）
- **Slack** MCP: 完成通知 + ファイル添付（同上）
- **Notion** MCP: ストック先のデータベースに行を追加
