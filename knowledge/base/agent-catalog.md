# Agent Catalog — SARFStack スキル詳細定義

各スキルの **役割 / 入力 / 出力 / 知識 / トリガー** を網羅的に記載。`CLAUDE.md` の `## Available Skills` 一覧から詳細が必要になった時に参照する。

## Set / Meta（SARF Ops）

### Set Organization (`/set-organization`)
- **役割**: 組織プロフィールを対話でヒアリングし `private/memory/organization/organization-overview.md` を埋める
- **入力**: 組織・ミッション・事業ポートフォリオに関する情報（崩れた文体でも可）
- **出力**: organization-overview.md への書き込み + 充足率サマリー
- **知識**: organization + sarf-framework
- **トリガー**: 組織の初回セットアップ、新規事業追加時

### Set Brand (`/set-brand`)
- **役割**: 組織共通のブランドガイドラインを対話でヒアリングし `private/memory/organization/brand-guidelines.md` を埋める
- **入力**: トーン・ビジュアル・表記ルール・Logo Usage・OK/NG表現
- **出力**: brand-guidelines.md への書き込み + 充足率サマリー
- **知識**: organization + brand-strategy + sarf-framework
- **トリガー**: ブランド初回セットアップ、リブランディング時、クリエイティブ生成系スキルが `[TODO]` を検知してアラートしたとき

### Set Workspace (`/set-workspace`)
- **役割**: workspace 固有情報を対話でヒアリングし `private/memory/workspaces/active/profile/` を埋める
- **入力**: 事業概要・ICP・Positioning・競合
- **出力**: business-overview.md / icp.md / positioning.md / competitors.md + 充足率サマリー
- **知識**: profile + organization + sarf-framework
- **トリガー**: workspace 初回セットアップ、ICP や Positioning 更新時

### Set Update (`/set-update`)
- **役割**: 最新数値・トレンド・仕様変更を `knowledge/update/` に書き戻す
- **入力**: パフォーマンスデータ、業界ニュース、プラットフォーム仕様変更
- **出力**: update ファイルの更新 + 更新サマリー
- **知識**: update + sarf-framework
- **トリガー**: 週次（performance-data）、月次（industry-trends）、仕様変更時（platform-updates）

### SARF Check (`/sarf-check`)
- **役割**: SARFサイクルの現在地を診断し、充足率と次の一手を提示
- **入力**: なし（knowledge/ を走査）
- **出力**: 診断ダッシュボード + 推奨アクション Top 3
- **知識**: knowledge/ 全層
- **トリガー**: 任意のタイミング、特にプロジェクト開始時・フェーズ切替時

### Feedback (`/feedback`)
- **役割**: 施策結果を検証ゲート付きで knowledge 層に反映
- **入力**: 数字（KPI実績）＋定性（顧客反応・学び）
- **出力**: カテゴリ分類（反映 / 候補 / 却下）＋ diff ベースの書き込み
- **知識**: base/sarf-framework + profile + update
- **トリガー**: キャンペーン終了時、`/weekly-retro` の Step 5

### Next (`/next`)
- **役割**: 未初期化検知＋次の一歩を1件推薦。詳細モードは `/sarf-check`
- **入力**: なし
- **出力**: 推薦コマンド1つ＋理由1〜2文
- **トリガー**: 何を叩けばいいかわからない時の最初の一押し

### Workspace (`/workspace`)
- **役割**: `bin/workspace` のラッパー。list / current / new / switch / remove
- **トリガー**: workspace 管理が必要な時

## Executive Review（company-wide / agent化済）

### CEO Review (`/ceo-review`)
- **役割**: 経営者の視点で施策の収益性・ROI・事業インパクトを評価
- **入力**: マーケティング施策案、予算計画、KPI設定
- **出力**: GO / PIVOT / KILL 判定 + 理由 + 改善指示
- **知識**: base + profile
- **トリガー**: 新規施策の承認前、大型予算の投下前

### CMO Review (`/cmo-review`)
- **役割**: マーケティング戦略全体の整合性・優先順位・リソース配分を統括
- **入力**: 個別施策、チャネル戦略、ファネル設計
- **出力**: 戦略評価レポート + 優先順位マトリクス + 改善指示
- **知識**: base + profile
- **トリガー**: 施策の企画段階、四半期計画、チャネルミックス見直し

### Consultant Review (`/consultant-review`)
- **役割**: 外部コンサルタント視点で、前提・戦略・施策にゼロベースの率直なフィードバック
- **入力**: 戦略・施策・意思決定プロセス
- **出力**: 前提の棚卸し、聖域の指摘、Kill候補、ゼロベース再設計案
- **知識**: base + profile + update + results
- **トリガー**: 戦略の停滞感、施策のマンネリ化、四半期／年次見直し

## Specialist Agents

### SEO (`/seo`)
- **役割**: 検索エンジン最適化の分析・戦略立案・技術監査・実装
- **入力**: URL、キーワード候補、コンテンツ原稿、サイト構造
- **出力**: キーワード戦略、技術SEO監査レポート、コンテンツ最適化案、実装コード
- **知識**: base + profile + update
- **トリガー**: コンテンツ制作時、サイト改修時、順位変動時

### Creative Direction (`/creative-direction`)
- **役割**: クリエイティブの品質管理・ブランド一貫性・トーン&マナーの監督
- **入力**: コピー、ビジュアル案、LP構成、広告クリエイティブ
- **出力**: クリエイティブ評価 + 修正指示 + ブランド適合度スコア
- **知識**: base + profile（特にbrand-guidelines）

### UI Design (`/ui-design`)
- **役割**: LP・広告LP のUI/UXレビューと改善
- **入力**: HTML/CSS、デザインファイル、ワイヤーフレーム
- **出力**: UI改善提案 + 修正済みコード + CVR最適化案
- **知識**: base + profile + update

### Ads Manager (`/ads-manager`)
- **役割**: デジタル広告（Google/Meta/X等）の設計・運用・最適化
- **入力**: 広告アカウント情報、クリエイティブ、ターゲティング、パフォーマンスデータ
- **出力**: 広告設計書、入稿データ、最適化提案、予算配分案
- **知識**: base + profile + update

### Contents Edit (`/contents-edit`)
- **役割**: コンテンツマーケティング（ブログ・SNS・メール・ホワイトペーパー）の企画・制作
- **入力**: テーマ、ターゲット、チャネル、参考情報
- **出力**: 完成原稿 + SEO対応メタ情報 + 配信スケジュール案
- **知識**: base + profile + update

### Data Analytics (`/data-analytics`)
- **役割**: マーケティングKPIの分析・レポーティング・アトリビューション・改善提案
- **入力**: パフォーマンスデータ、KPI目標、ファネルデータ
- **出力**: 分析レポート + インサイト + ネクストアクション提案
- **知識**: base + profile + update

### Customer Research (`/customer-research`)
- **役割**: 顧客インタビュー・JTBD・Win/Loss 分析。ICP を仮説から実証データに昇華
- **入力**: 既存 ICP / Positioning、調査テーマ、Primary Question
- **出力**: インタビュー設計書・質問票・調査レポート・ICP/Positioning 改定案
- **知識**: base + profile + results
- **トリガー**: ICP 検証、四半期レビュー、新市場参入前、解約率悪化時

### Pricing Strategy (`/pricing-strategy`)
- **役割**: 価格モデル・プラン構造・価格点・パッケージング境界を設計・レビュー
- **入力**: 既存プラン、LTV/ARPU、競合価格、ICP の価格感度
- **出力**: 新プラン表、Value Metric 推奨、Migration Plan、実験計画
- **知識**: base + profile + update + results

### Churn Prevention (`/churn-prevention`)
- **役割**: 解約防止とリテンション改善。解約タイプ分類・キャンセルフロー再設計・Save Offer 設計
- **入力**: Churn Rate、解約理由、Cohortリテンション、LTV
- **出力**: キャンセルフロー改修案、Save Offer Matrix、Early Warning System、リエンゲージメントメール
- **知識**: base + profile + update + results

### Estimate (`/estimate`)
- **役割**: 広告代理店視点の見積り・工数計算・費用対効果シミュレーション
- **入力**: 案件概要、希望スコープ
- **出力**: 見積書、工数内訳、費用対効果試算

## Optimization (`/optimize <target>`)

1つのスキルが 6 target に対応。詳細は `.claude/skills/optimize/SKILL.md` ＋ `.claude/skills/optimize/targets/<target>.md`。

| target | Primary KPI |
|---|---|
| `page` | CVR（≒ Primary CTA 到達率） |
| `signup-flow` | Signup Completion Rate |
| `onboarding` | Activation Rate |
| `form` | Form Completion Rate |
| `popup` | Capture Rate + Guardrail |
| `paywall` | Paywall Conversion Rate + LTV |

- **知識**: base + profile + update + results
- **トリガー**: 各 target の KPI 悪化時
