"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Brief,
  CustomerFact,
  Participant,
  ReleaseBucket,
  ReleaseItem,
  SessionMeta,
  SessionState,
  SyncCategory,
  SyncItem,
} from "./types";

const emptyBrief: Brief = {
  targetCustomer: "",
  message: "",
  channel: "",
  successMetric: "",
  retreatCondition: "",
  learnDate: "",
  owner: "",
};

const initialState: SessionState = {
  meta: { company: "", product: "", theme: "", createdAt: "" },
  participants: [],
  customerFacts: [],
  syncItems: [],
  releaseItems: [],
  brief: emptyBrief,
};

const uid = () => Math.random().toString(36).slice(2, 10);

type Actions = {
  reset: () => void;
  setMeta: (meta: Partial<SessionMeta>) => void;
  addParticipant: (name: string) => void;
  updateParticipant: (id: string, patch: Partial<Participant>) => void;
  removeParticipant: (id: string) => void;
  addCustomerFact: () => void;
  updateCustomerFact: (id: string, patch: Partial<CustomerFact>) => void;
  removeCustomerFact: (id: string) => void;
  loadSyncItems: (
    items: { text: string; category: SyncCategory }[],
    candidates: string[]
  ) => void;
  setSyncStatus: (
    id: string,
    status: SyncItem["status"],
    note?: string
  ) => void;
  addReleaseItem: (text: string) => void;
  setReleaseBucket: (id: string, bucket: ReleaseBucket, note?: string) => void;
  removeReleaseItem: (id: string) => void;
  setBrief: (patch: Partial<Brief>) => void;
};

export const useSession = create<SessionState & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      reset: () =>
        set({ ...initialState, meta: { ...initialState.meta, createdAt: "" } }),
      setMeta: (meta) =>
        set((s) => ({
          meta: {
            ...s.meta,
            ...meta,
            createdAt: s.meta.createdAt || new Date().toISOString(),
          },
        })),
      addParticipant: (name) =>
        set((s) => ({
          participants: [
            ...s.participants,
            {
              id: uid(),
              name,
              customerWho: "",
              customerPain: "",
              workingTactics: "",
              hardToStop: "",
              kpis: "",
              weirdAssumptions: "",
            },
          ],
        })),
      updateParticipant: (id, patch) =>
        set((s) => ({
          participants: s.participants.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        })),
      removeParticipant: (id) =>
        set((s) => ({
          participants: s.participants.filter((p) => p.id !== id),
        })),
      addCustomerFact: () =>
        set((s) => ({
          customerFacts: [
            ...s.customerFacts,
            { id: uid(), text: "", source: "" },
          ],
        })),
      updateCustomerFact: (id, patch) =>
        set((s) => ({
          customerFacts: s.customerFacts.map((f) =>
            f.id === id ? { ...f, ...patch } : f
          ),
        })),
      removeCustomerFact: (id) =>
        set((s) => ({
          customerFacts: s.customerFacts.filter((f) => f.id !== id),
        })),
      loadSyncItems: (items, candidates) =>
        set((s) => ({
          syncItems: items.map((it) => ({
            id: uid(),
            text: it.text,
            category: it.category,
            status: "pending",
            note: "",
          })),
          releaseItems: [
            ...s.releaseItems.filter((r) => r.bucket !== null),
            ...candidates.map((text) => ({
              id: uid(),
              text,
              bucket: null,
              note: "",
            })),
          ],
        })),
      setSyncStatus: (id, status, note) =>
        set((s) => ({
          syncItems: s.syncItems.map((it) =>
            it.id === id
              ? { ...it, status, note: note ?? it.note }
              : it
          ),
        })),
      addReleaseItem: (text) =>
        set((s) => ({
          releaseItems: [
            ...s.releaseItems,
            { id: uid(), text, bucket: null, note: "" },
          ],
        })),
      setReleaseBucket: (id, bucket, note) =>
        set((s) => ({
          releaseItems: s.releaseItems.map((r) =>
            r.id === id
              ? { ...r, bucket, note: note ?? r.note }
              : r
          ),
        })),
      removeReleaseItem: (id) =>
        set((s) => ({
          releaseItems: s.releaseItems.filter((r) => r.id !== id),
        })),
      setBrief: (patch) =>
        set((s) => ({ brief: { ...s.brief, ...patch } })),
    }),
    { name: "cmoflow-workshop-session" }
  )
);
