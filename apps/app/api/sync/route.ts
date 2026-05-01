import { NextResponse } from "next/server";
import { runSync } from "@/lib/claude";
import type { SyncApiInput } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY が設定されていません" },
      { status: 500 }
    );
  }

  let input: SyncApiInput;
  try {
    input = (await request.json()) as SyncApiInput;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await runSync(input);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
