"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/store";

type Tab = "team" | "customer";

export default function ListenPage() {
  const [tab, setTab] = useState<Tab>("team");
  const meta = useSession((s) => s.meta);
  const participants = useSession((s) => s.participants);
  const customerFacts = useSession((s) => s.customerFacts);

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

  const canContinue = participants.length > 0 || customerFacts.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Listen
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          認識・実態の取り込み
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Team Sync（参加者の認識）と Customer Sync（顧客実態）を{" "}
          <strong>独立した同期源</strong>として取り込みます。
        </p>
      </header>

      <div className="mb-4 flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
        <TabButton active={tab === "team"} onClick={() => setTab("team")}>
          Team Sync
          <span className="ml-2 rounded-full bg-zinc-200 px-2 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {participants.length}
          </span>
        </TabButton>
        <TabButton active={tab === "customer"} onClick={() => setTab("customer")}>
          Customer Sync
          <span className="ml-2 rounded-full bg-zinc-200 px-2 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {customerFacts.length}
          </span>
        </TabButton>
      </div>

      {tab === "team" ? <TeamSync /> : <CustomerSync />}

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← セッション情報に戻る
        </Link>
        <Link
          href="/sync"
          aria-disabled={!canContinue}
          className={`rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 ${
            !canContinue ? "pointer-events-none opacity-40" : ""
          }`}
        >
          AI Sync に進む →
        </Link>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
          : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      }`}
    >
      {children}
    </button>
  );
}

function TeamSync() {
  const participants = useSession((s) => s.participants);
  const addParticipant = useSession((s) => s.addParticipant);
  const updateParticipant = useSession((s) => s.updateParticipant);
  const removeParticipant = useSession((s) => s.removeParticipant);
  const [name, setName] = useState("");

  const submitNew = () => {
    if (!name.trim()) return;
    addParticipant(name.trim());
    setName("");
  };

  return (
    <section>
      <p className="mb-3 text-xs text-zinc-500">
        各参加者の <strong>認識（仮説）</strong>を取り込みます。これは Customer Sync（顧客実態）とは別物として扱います。
      </p>

      <div className="mb-4 flex gap-2">
        <input
          className={inputCls}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitNew()}
          placeholder="参加者名を入力"
        />
        <button
          onClick={submitNew}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          + 追加
        </button>
      </div>

      {participants.length === 0 && (
        <p className="rounded-md border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
          参加者を追加してください
        </p>
      )}

      <div className="space-y-4">
        {participants.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-3 flex items-center justify-between">
              <input
                className="border-0 bg-transparent text-base font-medium outline-none"
                value={p.name}
                onChange={(e) => updateParticipant(p.id, { name: e.target.value })}
              />
              <button
                onClick={() => removeParticipant(p.id)}
                className="text-xs text-zinc-400 hover:text-red-600"
              >
                削除
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="顧客は誰か（仮説）">
                <textarea
                  className={textareaCls}
                  value={p.customerWho}
                  onChange={(e) => updateParticipant(p.id, { customerWho: e.target.value })}
                />
              </Field>
              <Field label="顧客は何に困っているか（仮説）">
                <textarea
                  className={textareaCls}
                  value={p.customerPain}
                  onChange={(e) => updateParticipant(p.id, { customerPain: e.target.value })}
                />
              </Field>
              <Field label="今効いている施策">
                <textarea
                  className={textareaCls}
                  value={p.workingTactics}
                  onChange={(e) => updateParticipant(p.id, { workingTactics: e.target.value })}
                />
              </Field>
              <Field label="やめづらい施策">
                <textarea
                  className={textareaCls}
                  value={p.hardToStop}
                  onChange={(e) => updateParticipant(p.id, { hardToStop: e.target.value })}
                />
              </Field>
              <Field label="追っている KPI">
                <textarea
                  className={textareaCls}
                  value={p.kpis}
                  onChange={(e) => updateParticipant(p.id, { kpis: e.target.value })}
                />
              </Field>
              <Field label="違和感のある前提">
                <textarea
                  className={textareaCls}
                  value={p.weirdAssumptions}
                  onChange={(e) => updateParticipant(p.id, { weirdAssumptions: e.target.value })}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomerSync() {
  const customerFacts = useSession((s) => s.customerFacts);
  const addCustomerFact = useSession((s) => s.addCustomerFact);
  const updateCustomerFact = useSession((s) => s.updateCustomerFact);
  const removeCustomerFact = useSession((s) => s.removeCustomerFact);

  return (
    <section>
      <p className="mb-3 text-xs text-zinc-500">
        <strong>顧客実態（事実ベース）</strong>を入力します。インタビュー発言・離脱理由・サポート問い合わせ・行動データなど。仮説や推測ではなく、出典をともなう一次情報を推奨します。
      </p>

      <button
        onClick={addCustomerFact}
        className="mb-4 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
      >
        + 顧客の事実を追加
      </button>

      {customerFacts.length === 0 && (
        <p className="rounded-md border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
          まだ顧客の事実がありません。Team Sync の仮説と独立して取り込むことで、ズレが構造的に見えるようになります。
        </p>
      )}

      <div className="space-y-3">
        {customerFacts.map((f) => (
          <div
            key={f.id}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <Field label="事実 / 発言">
              <textarea
                className={textareaCls}
                value={f.text}
                onChange={(e) => updateCustomerFact(f.id, { text: e.target.value })}
                placeholder="例: 競合 X を比較検討した上で、価格ではなくサポート対応の早さで弊社を選んだ（5/10 名）"
              />
            </Field>
            <div className="mt-3 flex gap-3">
              <div className="flex-1">
                <Field label="出典">
                  <input
                    className={inputCls}
                    value={f.source}
                    onChange={(e) => updateCustomerFact(f.id, { source: e.target.value })}
                    placeholder="例: 2026/03 既存顧客 IV / Intercom ログ / NPS コメント"
                  />
                </Field>
              </div>
              <button
                onClick={() => removeCustomerFact(f.id)}
                className="self-end pb-2 text-xs text-zinc-400 hover:text-red-600"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100";
const textareaCls =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100 min-h-[60px] resize-y";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}
