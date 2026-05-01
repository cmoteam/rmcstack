"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/store";
import type { SyncApiInput, SyncApiOutput, SyncCategory, SyncItem } from "@/lib/types";

const categoryLabels: Record<SyncCategory, string> = {
  aligned: "一致している認識",
  misaligned: "ズレている認識",
  "customer-gap": "顧客理解のギャップ",
  "kpi-gap": "KPI のズレ",
};

const categoryHints: Record<SyncCategory, string> = {
  aligned: "全員が同じ前提に立てている部分",
  misaligned: "参加者間で食い違っている部分",
  "customer-gap": "Team の仮説 vs Customer の事実",
  "kpi-gap": "テーマ達成に対し追うべき KPI とのズレ",
};

export default function SyncPage() {
  const meta = useSession((s) => s.meta);
  const participants = useSession((s) => s.participants);
  const customerFacts = useSession((s) => s.customerFacts);
  const syncItems = useSession((s) => s.syncItems);
  const loadSyncItems = useSession((s) => s.loadSyncItems);
  const setSyncStatus = useSession((s) => s.setSyncStatus);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const body: SyncApiInput = { meta, participants, customerFacts };
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "AI Sync 失敗");
      const out = data as SyncApiOutput;
      const items: { text: string; category: SyncCategory }[] = [
        ...out.alignments.map((t) => ({ text: t, category: "aligned" as const })),
        ...out.misalignments.map((t) => ({ text: t, category: "misaligned" as const })),
        ...out.customerGaps.map((t) => ({ text: t, category: "customer-gap" as const })),
        ...out.kpiGaps.map((t) => ({ text: t, category: "kpi-gap" as const })),
      ];
      loadSyncItems(items, out.releaseCandidates);
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (!meta.company) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-zinc-600">
          まずはセッション情報を入力してください。{" "}
          <Link className="underline" href="/">
            ホームへ戻る
          </Link>
        </p>
      </div>
    );
  }

  const categories: SyncCategory[] = [
    "aligned",
    "misaligned",
    "customer-gap",
    "kpi-gap",
  ];
  const acceptedCount = syncItems.filter((it) => it.status === "accepted").length;
  const pendingCount = syncItems.filter((it) => it.status === "pending").length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Insight</p>
        <h1 className="text-2xl font-semibold tracking-tight">AI による認識ズレ抽出</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          AI が抽出した項目を <strong>採用 / 不採用 / 保留</strong>で人間が判定します。AI の出力をそのまま使うのではなく、責任を曖昧にしないための採否ログです。
        </p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={run}
          disabled={loading || participants.length === 0}
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {loading ? "AI 抽出中…" : syncItems.length ? "再抽出する" : "AI で認識ズレを抽出"}
        </button>
        {syncItems.length > 0 && (
          <span className="text-xs text-zinc-500">
            合計 {syncItems.length} 件 / 採用 {acceptedCount} / 未判定 {pendingCount}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {syncItems.length === 0 && !loading && (
        <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          まだ抽出されていません。「AI で認識ズレを抽出」を押してください。
        </p>
      )}

      <div className="space-y-6">
        {categories.map((cat) => {
          const items = syncItems.filter((it) => it.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat}>
              <header className="mb-2">
                <h2 className="text-sm font-medium">{categoryLabels[cat]}</h2>
                <p className="text-xs text-zinc-500">{categoryHints[cat]}</p>
              </header>
              <div className="space-y-2">
                {items.map((it) => (
                  <SyncItemRow
                    key={it.id}
                    item={it}
                    onSetStatus={(status) => setSyncStatus(it.id, status)}
                    onSetNote={(note) =>
                      setSyncStatus(it.id, it.status, note)
                    }
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/listen"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← Listen に戻る
        </Link>
        <Link
          href="/release"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Release に進む →
        </Link>
      </div>
    </div>
  );
}

function SyncItemRow({
  item,
  onSetStatus,
  onSetNote,
}: {
  item: SyncItem;
  onSetStatus: (status: SyncItem["status"]) => void;
  onSetNote: (note: string) => void;
}) {
  const statusStyles: Record<SyncItem["status"], string> = {
    pending: "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
    accepted:
      "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950",
    rejected:
      "border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 opacity-60",
    hold: "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950",
  };

  return (
    <div className={`rounded-lg border p-3 transition-colors ${statusStyles[item.status]}`}>
      <p className="text-sm">{item.text}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <StatusBtn current={item.status} value="accepted" onClick={onSetStatus}>
          採用
        </StatusBtn>
        <StatusBtn current={item.status} value="hold" onClick={onSetStatus}>
          保留
        </StatusBtn>
        <StatusBtn current={item.status} value="rejected" onClick={onSetStatus}>
          不採用
        </StatusBtn>
        <input
          className="ml-2 flex-1 rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-xs outline-none focus:border-zinc-900 dark:border-zinc-800 dark:focus:border-zinc-100"
          placeholder="判断理由・補足（任意）"
          value={item.note}
          onChange={(e) => onSetNote(e.target.value)}
        />
      </div>
    </div>
  );
}

function StatusBtn({
  current,
  value,
  onClick,
  children,
}: {
  current: SyncItem["status"];
  value: SyncItem["status"];
  onClick: (v: SyncItem["status"]) => void;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          : "border border-zinc-300 text-zinc-600 hover:border-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
      }`}
    >
      {children}
    </button>
  );
}
