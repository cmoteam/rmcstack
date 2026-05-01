"use client";

import Link from "next/link";
import { useSession } from "@/lib/store";

export default function BriefPage() {
  const meta = useSession((s) => s.meta);
  const brief = useSession((s) => s.brief);
  const setBrief = useSession((s) => s.setBrief);
  const releaseItems = useSession((s) => s.releaseItems);

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

  const required = [
    brief.targetCustomer,
    brief.message,
    brief.channel,
    brief.successMetric,
    brief.retreatCondition,
    brief.learnDate,
    brief.owner,
  ];
  const filled = required.filter((v) => v.trim()).length;
  const ready = filled === required.length;

  const stopCount = releaseItems.filter((r) => r.bucket === "stop").length;
  const testCount = releaseItems.filter((r) => r.bucket === "test").length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Activate</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          1 施策に絞る — Activate Brief
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Release で残った Keep / Test 候補から、{" "}
          <strong>本サイクルで実行する 1 施策</strong>を決め切ります。撤退条件と Learn 日は省略不可です（Activate Gate Core）。
        </p>
        {(stopCount > 0 || testCount > 0) && (
          <p className="mt-2 text-xs text-zinc-500">
            参考: Release で Stop {stopCount} 件 / Test {testCount} 件
          </p>
        )}
      </header>

      <section className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <Field label="対象顧客（誰に）" required>
          <textarea
            className={textareaCls}
            value={brief.targetCustomer}
            onChange={(e) => setBrief({ targetCustomer: e.target.value })}
            placeholder="ICP のうち、どのセグメントを対象にするか"
          />
        </Field>
        <Field label="メッセージ（何を伝えるか）" required>
          <textarea
            className={textareaCls}
            value={brief.message}
            onChange={(e) => setBrief({ message: e.target.value })}
            placeholder="一文で。Customer Sync の事実に対応していること"
          />
        </Field>
        <Field label="チャネル（どこで届けるか）" required>
          <input
            className={inputCls}
            value={brief.channel}
            onChange={(e) => setBrief({ channel: e.target.value })}
            placeholder="例: 自社 LP / Meta 広告 / 既存顧客向けニュースレター"
          />
        </Field>
        <Field label="成功指標（KPI）" required>
          <input
            className={inputCls}
            value={brief.successMetric}
            onChange={(e) => setBrief({ successMetric: e.target.value })}
            placeholder="例: 商談化率 8% / CAC 30,000 円以下"
          />
        </Field>
        <Field label="撤退条件（Stop ライン）" required>
          <textarea
            className={textareaCls}
            value={brief.retreatCondition}
            onChange={(e) => setBrief({ retreatCondition: e.target.value })}
            placeholder="例: 4 週間で商談 3 件未満なら停止 / CPA 50,000 超で 2 週連続なら停止"
          />
        </Field>
        <Field label="次回 Learn 日" required>
          <input
            type="date"
            className={inputCls}
            value={brief.learnDate}
            onChange={(e) => setBrief({ learnDate: e.target.value })}
          />
        </Field>
        <Field label="担当（責任者）" required>
          <input
            className={inputCls}
            value={brief.owner}
            onChange={(e) => setBrief({ owner: e.target.value })}
            placeholder="決裁・撤退判断を含めて 1 名"
          />
        </Field>
      </section>

      <p className="mt-3 text-xs text-zinc-500">
        必須項目: {filled} / 7 入力済み
      </p>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/release"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← Release に戻る
        </Link>
        <Link
          href="/export"
          aria-disabled={!ready}
          className={`rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 ${
            !ready ? "pointer-events-none opacity-40" : ""
          }`}
        >
          Export に進む →
        </Link>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100";
const textareaCls =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100 min-h-[60px] resize-y";

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
