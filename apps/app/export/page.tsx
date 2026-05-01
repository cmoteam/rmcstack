"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSession } from "@/lib/store";
import { toMarkdown } from "@/lib/markdown";

export default function ExportPage() {
  const session = useSession();
  const md = useMemo(
    () =>
      toMarkdown({
        meta: session.meta,
        participants: session.participants,
        customerFacts: session.customerFacts,
        syncItems: session.syncItems,
        releaseItems: session.releaseItems,
        brief: session.brief,
      }),
    [
      session.meta,
      session.participants,
      session.customerFacts,
      session.syncItems,
      session.releaseItems,
      session.brief,
    ]
  );

  const [copied, setCopied] = useState(false);

  if (!session.meta.company) {
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

  const copy = async () => {
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const slug = session.meta.product
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    a.href = url;
    a.download = `${date}-workshop-${slug || "session"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Export</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          セッション結果を書き出す
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          CMOFlow の{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            private/memory/workspaces/&lt;slug&gt;/results/
          </code>{" "}
          に貼り付けて、次サイクルの Listen 入力にしてください。
        </p>
      </header>

      <div className="mb-4 flex gap-2">
        <button
          onClick={copy}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          {copied ? "コピーしました" : "Markdown をコピー"}
        </button>
        <button
          onClick={download}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          .md ファイルでダウンロード
        </button>
      </div>

      <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-4 text-xs leading-relaxed dark:border-zinc-800 dark:bg-zinc-950">
        {md}
      </pre>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/brief"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← Brief に戻る
        </Link>
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ホームへ
        </Link>
      </div>
    </div>
  );
}
