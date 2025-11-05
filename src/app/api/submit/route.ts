import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { appendResponse } from "@/lib/sheets";

const schema = z.object({
  sectionA: z.object({
    q1: z.enum(["A","B","C","D"]),
    q2: z.enum(["A","B","C","D"]),
    q3: z.enum(["A","B","C","D"]),
    q4: z.enum(["A","B","C","D"]),
    q5: z.enum(["A","B","C","D"]),
  }),
  sectionB: z.object({
    q6: z.string().min(1),
    q7: z.string().min(1),
    q8: z.string().min(1),
    q9: z.string().min(1),
    q10:z.string().min(1),
  }),
  sectionC: z.object({
    pressure: z.string().min(1),
    disagree: z.string().min(1),
    strength: z.string().min(1),
    struggle: z.string().min(1),
    success: z.string().min(1),
  }),
  fullName: z.string().min(1),
  email: z.string().email(),
  program: z.string().optional().default(""),
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body); 

    const ts = new Date().toISOString();
    await appendResponse([
      ts,
      data.fullName,
      data.email,
      data.program,
      data.sectionA.q1, data.sectionA.q2, data.sectionA.q3, data.sectionA.q4, data.sectionA.q5,
      data.sectionB.q6, data.sectionB.q7, data.sectionB.q8, data.sectionB.q9, data.sectionB.q10,
      data.sectionC.pressure, data.sectionC.disagree, data.sectionC.strength, data.sectionC.struggle, data.sectionC.success,
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", issues: err.flatten() },
        { status: 422 }
      );
    }
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
