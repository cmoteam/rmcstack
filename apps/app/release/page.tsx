"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/store";
import type { ReleaseBucket, ReleaseItem } from "@/lib/types";

const buckets: { value: NonNullable<ReleaseBucket>; label: string; hint: string; color: string }[] = [
  { value: "keep", label: "Keep", hint: "明確に成果が出ている。継続", color: "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950" },
  { value: "test", label: "Test", hint: "効果が不明。期限と撤退条件付きで検証", color: "border-blue-300 bg-blue-50 dark:border-blue-900 dark:bg-blue-950" },
  { value: "stop", label: "Stop", hint: "今すぐ手放す。Activate に進まない", color: "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950" },
  { value: "hold", label: "Hold", hint: "判断保留。Why 不明確のため次回再検討", color: "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950" },
];

export default function ReleasePage() {
  const meta = useSession((s) => s.meta);
  const releaseItems = useSession((s) => s.releaseItems);
  const addReleaseItem = useSession((s) => s.addReleaseItem);
  const setReleaseBucket = useSession((s) => s.setReleaseBucket);
  const removeReleaseItem = useSession((s) => s.removeReleaseItem);

  const [newText, setNewText] = useState("");

  const submitNew = () => {
    if (!newText.trim()) return;
    addReleaseItem(newText.trim());
    setNewText("");
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

  const unbucketed = releaseItems.filter((r) => r.bucket === null);
  const bucketed = (b: NonNullable<ReleaseBucket>) =>
    releaseItems.filter((r) => r.bucket === b);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Release</p>
        <h1 className="text-2xl font-semibold tracking-tight">手放しの仕分け</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          AI が拾った候補と、議論で出た候補を <strong>Keep / Test / Stop / Hold</strong> に仕分けます。Stop と判断したものは Activate には進めません。
        </p>
      </header>

      <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-2 text-sm font-medium">候補を追加</h2>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitNew()}
            placeholder="例: 月次の MQL 報告会、ホワイトペーパー DL を主 KPI にする運用、..."
          />
          <button
            onClick={submitNew}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            + 追加
          </button>
        </div>
      </section>

      {unbucketed.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-medium">
            未仕分け <span className="text-zinc-500">({unbucketed.length})</span>
          </h2>
          <div className="space-y-2">
            {unbucketed.map((r) => (
              <ReleaseRow
                key={r.id}
                item={r}
                onBucket={(b, n) => setReleaseBucket(r.id, b, n)}
                onRemove={() => removeReleaseItem(r.id)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {buckets.map((b) => {
          const items = bucketed(b.value);
          return (
            <section
              key={b.value}
              className={`rounded-lg border p-4 ${b.color}`}
            >
              <header className="mb-2">
                <h2 className="text-sm font-semibold">
                  {b.label} <span className="text-zinc-500">({items.length})</span>
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{b.hint}</p>
              </header>
              {items.length === 0 ? (
                <p className="text-xs text-zinc-500">（未割り当て）</p>
              ) : (
                <div className="space-y-2">
                  {items.map((r) => (
                    <ReleaseRow
                      key={r.id}
                      item={r}
                      onBucket={(b, n) => setReleaseBucket(r.id, b, n)}
                      onRemove={() => removeReleaseItem(r.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/sync"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← AI Sync に戻る
        </Link>
        <Link
          href="/brief"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Activate Brief に進む →
        </Link>
      </div>
    </div>
  );
}

function ReleaseRow({
  item,
  onBucket,
  onRemove,
}: {
  item: ReleaseItem;
  onBucket: (b: ReleaseBucket, note?: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-2">
        <p className="flex-1">{item.text}</p>
        <button
          onClick={onRemove}
          className="text-xs text-zinc-400 hover:text-red-600"
        >
          削除
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {buckets.map((b) => (
          <button
            key={b.value}
            onClick={() => onBucket(b.value, item.note)}
            className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
              item.bucket === b.value
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border border-zinc-300 text-zinc-600 hover:border-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
            }`}
          >
            {b.label}
          </button>
        ))}
        {item.bucket && (
          <button
            onClick={() => onBucket(null, item.note)}
            className="ml-1 text-xs text-zinc-400 hover:text-zinc-700"
          >
            戻す
          </button>
        )}
      </div>
      <input
        className="mt-2 w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-xs outline-none focus:border-zinc-900 dark:border-zinc-800 dark:focus:border-zinc-100"
        placeholder="判断の根拠（任意）"
        value={item.note}
        onChange={(e) => onBucket(item.bucket, e.target.value)}
      />
    </div>
  );
}
