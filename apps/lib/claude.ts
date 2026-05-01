import Anthropic from "@anthropic-ai/sdk";
import type { SyncApiInput, SyncApiOutput } from "./types";

export const MODEL = "claude-sonnet-4-6";

const client = new Anthropic();

const SYNC_TOOL: Anthropic.Messages.Tool = {
  name: "submit_sync",
  description: "ワークショップ参加者の認識と顧客実態から、認識ズレを構造化して提出する",
  input_schema: {
    type: "object",
    properties: {
      alignments: {
        type: "array",
        items: { type: "string" },
        description: "参加者間で一致している認識（具体的に）",
      },
      misalignments: {
        type: "array",
        items: { type: "string" },
        description:
          "参加者間で食い違っている認識。誰と誰がどう違うか具体名で言及",
      },
      customerGaps: {
        type: "array",
        items: { type: "string" },
        description:
          "Team Sync の仮説と Customer Sync の事実がズレている点。事実が薄い領域も含む",
      },
      kpiGaps: {
        type: "array",
        items: { type: "string" },
        description:
          "追っている KPI と、テーマ達成に必要な KPI のズレ。聖域化している指標も含む",
      },
      releaseCandidates: {
        type: "array",
        items: { type: "string" },
        description:
          "手放しを検討すべき施策・KPI・前提（短いラベルで）。Release ボードで仕分け対象になる",
      },
    },
    required: [
      "alignments",
      "misalignments",
      "customerGaps",
      "kpiGaps",
      "releaseCandidates",
    ],
  },
};

const buildPrompt = (input: SyncApiInput) => {
  const { meta, participants, customerFacts } = input;
  const teamSync = participants
    .map(
      (p, i) =>
        `### 参加者${i + 1}: ${p.name}
- 顧客は誰か: ${p.customerWho || "（未記入）"}
- 顧客は何に困っているか: ${p.customerPain || "（未記入）"}
- 今効いている施策: ${p.workingTactics || "（未記入）"}
- やめづらい施策: ${p.hardToStop || "（未記入）"}
- 追っている KPI: ${p.kpis || "（未記入）"}
- 違和感のある前提: ${p.weirdAssumptions || "（未記入）"}`
    )
    .join("\n\n");

  const customer = customerFacts.length
    ? customerFacts
        .map((f, i) => `${i + 1}. ${f.text}（出典: ${f.source || "未記入"}）`)
        .join("\n")
    : "（顧客実態の入力なし）";

  return `あなたはマーケティング組織のファシリテーターです。下記のワークショップ入力から、認識ズレと手放し候補を構造化して抽出してください。

# セッション
- 会社: ${meta.company}
- プロダクト: ${meta.product}
- テーマ: ${meta.theme}

# Team Sync（参加者の認識・仮説）
${teamSync}

# Customer Sync（顧客実態・事実）
${customer}

# 抽出ルール
- alignments / misalignments は **誰と誰の発言を根拠にしているか** を明記する
- customerGaps は Team Sync の仮説と Customer Sync の事実が衝突している箇所、または仮説に対して事実が決定的に不足している箇所
- kpiGaps はテーマ達成のために本来追うべき KPI と現状追っている KPI のズレ。"以前から追っているから" 続いている指標を含めてよい
- releaseCandidates は **手放しを検討すべき** 候補。継続を意味しない。短いラベルで（例: "週次の MQL 数報告", "ホワイトペーパー DL 数を主 KPI にする運用"）
- 各配列は **3〜7 件** を目安に。曖昧な総論ではなく具体的に
- 入力が薄ければ "情報不足: ..." として何が足りないかを返す

submit_sync ツールを呼んで結果を提出してください。`;
};

export async function runSync(input: SyncApiInput): Promise<SyncApiOutput> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    tools: [SYNC_TOOL],
    tool_choice: { type: "tool", name: "submit_sync" },
    messages: [{ role: "user", content: buildPrompt(input) }],
  });

  const toolUse = response.content.find(
    (c): c is Anthropic.Messages.ToolUseBlock => c.type === "tool_use"
  );

  if (!toolUse) {
    throw new Error("Claude did not return a tool_use block");
  }

  return toolUse.input as SyncApiOutput;
}
