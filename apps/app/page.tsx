"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const meta = useSession((s) => s.meta);
  const setMeta = useSession((s) => s.setMeta);
  const reset = useSession((s) => s.reset);
  const participants = useSession((s) => s.participants);

  const [company, setCompany] = useState(meta.company);
  const [product, setProduct] = useState(meta.product);
  const [theme, setTheme] = useState(meta.theme);

  const canStart = company.trim() && product.trim() && theme.trim();

  const start = () => {
    setMeta({ company, product, theme });
    router.push("/listen");
  };

  const startNew = () => {
    if (!confirm("現在のセッションを破棄して新規開始します。よろしいですか？")) return;
    reset();
    setCompany("");
    setProduct("");
    setTheme("");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">CMOFlow Workshop</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        RMC サイクル（Listen / Insight / Release / Activate / Learn）を 1 セッションで体感する装置です。
      </p>

      <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium">セッション情報</h2>
        <div className="mt-4 grid gap-4">
          <Field label="会社名" required>
            <input
              className={inputCls}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="例: 株式会社 Acme"
            />
          </Field>
          <Field label="事業 / プロダクト名" required>
            <input
              className={inputCls}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="例: Acme SaaS / 法人向け新プロダクト"
            />
          </Field>
          <Field label="今日のテーマ" required>
            <input
              className={inputCls}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例: 来期の獲得チャネル戦略を 1 つに絞る"
            />
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={start}
            disabled={!canStart}
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Listen に進む →
          </button>
          {(meta.createdAt || participants.length > 0) && (
            <button
              onClick={startNew}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
            >
              新規セッションを開始
            </button>
          )}
        </div>

        {meta.createdAt && (
          <p className="mt-4 text-xs text-zinc-500">
            開始: {new Date(meta.createdAt).toLocaleString("ja-JP")}
          </p>
        )}
      </section>

      <section className="mt-6 rounded-lg border border-dashed border-zinc-300 bg-transparent p-4 text-xs text-zinc-500 dark:border-zinc-700">
        <p className="font-medium">v0 の制約</p>
        <ul className="mt-1 list-disc pl-5">
          <li>データはこのブラウザの localStorage にのみ保存されます</li>
          <li>複数デバイスでの同時編集は未対応（v1 で Supabase 対応予定）</li>
          <li>AI 抽出は Claude API を使用します（環境変数 ANTHROPIC_API_KEY 必須）</li>
        </ul>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
