# SURF — 歴史的経緯（RMC の前身）

> **このドキュメントは歴史的経緯の記録**である。SURFStack の現行 canonical OS は **RMC（Reframing Marketing Cycle）**であり、定義は `knowledge/base/reframing-marketing-cycle.md` にある。

## SURF と RMC の関係

SURFStack は当初 **SURF**（Syncing / Understanding / Releasing / Fitting）という 4 段の汎用組織学習ループを OS として採用していた。しかし、これには以下の構造的限界があった:

1. **マーケ OS としての差別化が弱い** — Syncing / Understanding / Releasing / Fitting は OODA / PDCA と同じく汎用ループであり、マーケに固有の何かを構造に埋めていなかった
2. **顧客との同期が独立源として立っていなかった** — 顧客情報は ICP（内部仮説）と Performance Data（メトリクス）に分散吸収されていて、「ICP 仮説 ≠ 実態」のズレを構造的に検出できなかった
3. **shipping と還流が同じ段（Fitting）にまとまっていた** — 「shipping したけど学習に還流していない」状態が構造的に検出できなかった

これらを解消するため、SURFStack は **RMC（Reframing Marketing Cycle）** に移行した。

## SURF → RMC 段階対応

| SURF（旧） | RMC（現行） | 変更点 |
|----------|----------|-------|
| Syncing | **Listen** | 4 同期源を明示化（Team / **Customer** / Market / Performance）。Customer Sync を独立源として昇格 |
| Understanding | **Insight** | 動詞をマーケ native に。役割は不変 |
| Releasing | **Release** | 動詞をマーケ native に。**Release を独立段として死守**する点は維持（OODA / PDCA との差別化軸） |
| Fitting | **Activate** + **Learn** | shipping と還流を別段に分離。「shipping したけど還流していない」の検出可能化 |

## 用語の取り扱い

- **「SURFStack」**: プロダクト・リポジトリ名として継続使用。ブランド継続性のため改名しない
- **「SURF Alignment」セクション**: 各 SKILL.md 冒頭の Position / Sync Preflight / Fitting Hook フィールド。**漸進的に「RMC Alignment」へリネーム**するが、現状はそのまま運用しても動作する
- **`/surf-check` `/next`**: skill 名は SURFStack ブランド由来として維持
- **「SURF サイクル」**: ドキュメント・コミュニケーション上は **「RMC サイクル」**と呼ぶ

## RMC への移行理由（要約）

1. **マーケ OS としての構造的アイデンティティ** — 「顧客との継続的同期」を OS の段に組み込んだ瞬間、汎用組織学習ループから独立する
2. **戦略フローの双方向化** — Customer Sync を独立源として置くことで、内部仮説（ICP）を顧客実態が常時検査する構造になる（`marketing-structural-issues.md` Section 0.2 / 0.7 への直接対症）
3. **shipping ≠ 還流の分離** — Activate / Learn を分けることで、`marketing-structural-issues.md` の構造的病理「学習しないチーム」（Section 3）への対症が明確になる

## 関連ドキュメント

- `knowledge/base/reframing-marketing-cycle.md` — **現行 canonical OS**
- `knowledge/base/marketing-structural-issues.md` — RMC が解こうとしている病理
- `knowledge/base/mvdf.md` — RMC サイクル内で何を管理・指標化するか
