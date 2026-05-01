export type Participant = {
  id: string;
  name: string;
  customerWho: string;
  customerPain: string;
  workingTactics: string;
  hardToStop: string;
  kpis: string;
  weirdAssumptions: string;
};

export type CustomerFact = {
  id: string;
  text: string;
  source: string;
};

export type SyncCategory = "aligned" | "misaligned" | "customer-gap" | "kpi-gap";

export type SyncItem = {
  id: string;
  text: string;
  category: SyncCategory;
  status: "pending" | "accepted" | "rejected" | "hold";
  note: string;
};

export type ReleaseBucket = "keep" | "test" | "stop" | "hold" | null;

export type ReleaseItem = {
  id: string;
  text: string;
  bucket: ReleaseBucket;
  note: string;
};

export type Brief = {
  targetCustomer: string;
  message: string;
  channel: string;
  successMetric: string;
  retreatCondition: string;
  learnDate: string;
  owner: string;
};

export type SessionMeta = {
  company: string;
  product: string;
  theme: string;
  createdAt: string;
};

export type SessionState = {
  meta: SessionMeta;
  participants: Participant[];
  customerFacts: CustomerFact[];
  syncItems: SyncItem[];
  releaseItems: ReleaseItem[];
  brief: Brief;
};

export type SyncApiInput = {
  meta: SessionMeta;
  participants: Participant[];
  customerFacts: CustomerFact[];
};

export type SyncApiOutput = {
  alignments: string[];
  misalignments: string[];
  customerGaps: string[];
  kpiGaps: string[];
  releaseCandidates: string[];
};
