import type { SessionState, SyncCategory, SyncItem } from "./types";

const categoryLabels: Record<SyncCategory, string> = {
  aligned: "一致している認識",
  misaligned: "ズレている認識",
  "customer-gap": "顧客理解のギャップ",
  "kpi-gap": "KPI のズレ",
};

const statusLabels: Record<SyncItem["status"], string> = {
  pending: "未判定",
  accepted: "採用",
  rejected: "不採用",
  hold: "保留",
};

const bucketLabels = {
  keep: "Keep",
  test: "Test",
  stop: "Stop",
  hold: "Hold",
} as const;

export function toMarkdown(s: SessionState): string {
  const lines: string[] = [];
  const date = s.meta.createdAt
    ? new Date(s.meta.createdAt).toLocaleString("ja-JP")
    : "—";

  lines.push(`# CMOFlow Workshop — ${s.meta.company} / ${s.meta.product}`);
  lines.push("");
  lines.push(`- 開催日: ${date}`);
  lines.push(`- テーマ: ${s.meta.theme}`);
  lines.push(
    `- 参加者: ${s.participants.map((p) => p.name).join(", ") || "—"}`
  );
  lines.push("");

  // Listen
  lines.push("## Listen");
  lines.push("");
  lines.push("### Team Sync（参加者の認識・仮説）");
  lines.push("");
  if (s.participants.length === 0) {
    lines.push("（入力なし）");
  } else {
    for (const p of s.participants) {
      lines.push(`#### ${p.name}`);
      lines.push("");
      lines.push(`- 顧客は誰か: ${p.customerWho || "—"}`);
      lines.push(`- 顧客は何に困っているか: ${p.customerPain || "—"}`);
      lines.push(`- 今効いている施策: ${p.workingTactics || "—"}`);
      lines.push(`- やめづらい施策: ${p.hardToStop || "—"}`);
      lines.push(`- 追っている KPI: ${p.kpis || "—"}`);
      lines.push(`- 違和感のある前提: ${p.weirdAssumptions || "—"}`);
      lines.push("");
    }
  }

  lines.push("### Customer Sync（顧客実態・事実）");
  lines.push("");
  if (s.customerFacts.length === 0) {
    lines.push("（入力なし）");
  } else {
    s.customerFacts.forEach((f, i) => {
      lines.push(`${i + 1}. ${f.text}`);
      if (f.source) lines.push(`   - 出典: ${f.source}`);
    });
  }
  lines.push("");

  // Insight / AI Sync
  lines.push("## Insight（AI Sync — 認識ズレ抽出）");
  lines.push("");
  if (s.syncItems.length === 0) {
    lines.push("（未抽出）");
    lines.push("");
  } else {
    const cats: SyncCategory[] = [
      "aligned",
      "misaligned",
      "customer-gap",
      "kpi-gap",
    ];
    for (const cat of cats) {
      const items = s.syncItems.filter((it) => it.category === cat);
      if (items.length === 0) continue;
      lines.push(`### ${categoryLabels[cat]}`);
      lines.push("");
      for (const it of items) {
        lines.push(`- [${statusLabels[it.status]}] ${it.text}`);
        if (it.note) lines.push(`  - 判断: ${it.note}`);
      }
      lines.push("");
    }
  }

  // AI 採否ログ
  if (s.syncItems.length > 0) {
    lines.push("### AI 採否ログ");
    lines.push("");
    const total = s.syncItems.length;
    const accepted = s.syncItems.filter((it) => it.status === "accepted").length;
    const rejected = s.syncItems.filter((it) => it.status === "rejected").length;
    const hold = s.syncItems.filter((it) => it.status === "hold").length;
    const pending = s.syncItems.filter((it) => it.status === "pending").length;
    lines.push(
      `- 抽出総数: ${total} 件（採用 ${accepted} / 保留 ${hold} / 不採用 ${rejected} / 未判定 ${pending}）`
    );
    lines.push(`- モデル: claude-sonnet-4-6`);
    lines.push(
      "- 注: AI 出力の採否は人間が行った。採否理由は各項目の「判断」欄を参照"
    );
    lines.push("");
  }

  // Release
  lines.push("## Release");
  lines.push("");
  if (s.releaseItems.length === 0) {
    lines.push("（候補なし）");
    lines.push("");
  } else {
    const buckets: (keyof typeof bucketLabels)[] = ["keep", "test", "stop", "hold"];
    for (const b of buckets) {
      const items = s.releaseItems.filter((r) => r.bucket === b);
      if (items.length === 0) continue;
      lines.push(`### ${bucketLabels[b]}`);
      lines.push("");
      for (const it of items) {
        lines.push(`- ${it.text}`);
        if (it.note) lines.push(`  - 根拠: ${it.note}`);
      }
      lines.push("");
    }
    const unbucketed = s.releaseItems.filter((r) => r.bucket === null);
    if (unbucketed.length > 0) {
      lines.push("### 未仕分け");
      lines.push("");
      for (const it of unbucketed) {
        lines.push(`- ${it.text}`);
      }
      lines.push("");
    }
  }

  // Activate Brief
  lines.push("## Activate Brief");
  lines.push("");
  const b = s.brief;
  lines.push(`- 対象顧客: ${b.targetCustomer || "—"}`);
  lines.push(`- メッセージ: ${b.message || "—"}`);
  lines.push(`- チャネル: ${b.channel || "—"}`);
  lines.push(`- 成功指標: ${b.successMetric || "—"}`);
  lines.push(`- **撤退条件**: ${b.retreatCondition || "—"}`);
  lines.push(`- **次回 Learn 日**: ${b.learnDate || "—"}`);
  lines.push(`- 担当: ${b.owner || "—"}`);
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push("生成: CMOFlow Workshop");

  return lines.join("\n");
}
