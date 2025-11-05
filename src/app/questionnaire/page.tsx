"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import {useRouter} from "next/navigation"
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const PROGRAMS = [
  "National Youth Service Corps (NYSC)",
  "Big Data Analytics",
  "Practical Ship Design and Construction",
  "Optimization of Oil Well",
  "Process Piping and Piping Systems Design",
  "Automation Instrumentation and Control",
  "Class Welding and Fabrication",
  "Electrical Power Transformer Repairs",
] as const;
type Program = typeof PROGRAMS[number];

const A = {
  q1: "When faced with conflicting priorities from multiple department heads:",
  q2: "During a project crisis with tight deadlines:",
  q3: "When a team member consistently misses deadlines:",
  q4: "How do you handle receiving critical feedback about your work?",
  q5: "When leading a diverse team with different working styles:",
} as const;

const AOptions = {
  q1: [
    "A) I create a detailed priority matrix and get formal sign-off from all stakeholders",
    "B) I listen to each perspective, then make a decision based on overall project impact",
    "C) I escalate immediately to higher management for direction",
    "D) I focus on the most vocal or influential stakeholder's needs",
  ],
  q2: [
    "A) I immediately implement our contingency plan and document everything",
    "B) I gather the team for a quick huddle to brainstorm solutions",
    "C) I take charge and assign specific tasks to each team member",
    "D) I focus on maintaining team morale and reducing panic",
  ],
  q3: [
    "A) I review their workload and create a more detailed schedule with checkpoints",
    "B) I have a private conversation to understand their challenges",
    "C) I reassign their critical tasks to more reliable team members",
    "D) I organize team training on time management",
  ],
  q4: [
    "A) I analyze it systematically and create an improvement plan",
    "B) I consider the source and context before deciding how to respond",
    "C) I implement changes immediately to address the concerns",
    "D) I seek additional opinions to validate the feedback",
  ],
  q5: [
    "A) I establish clear standard operating procedures for everyone",
    "B) I adapt my leadership approach to suit different personalities",
    "C) I focus on achieving results regardless of personal styles",
    "D) I facilitate team-building to improve collaboration",
  ],
} as const;

const aKeys = ["q1", "q2", "q3", "q4", "q5"] as const;
type AKey = typeof aKeys[number];
type Choice = "A" | "B" | "C" | "D";
type SectionA = Partial<Record<AKey, Choice>>;

const bKeys = ["q6", "q7", "q8", "q9", "q10"] as const;
type BKey = typeof bKeys[number];
type SectionB = Partial<Record<BKey, string>>;

const cKeys = ["pressure", "disagree", "strength", "struggle", "success"] as const;
type CKey = typeof cKeys[number];
type SectionC = Partial<Record<CKey, string>>;

export default function Page() {
  const [locked, setLocked] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // New step structure: 0=Info, 1=A, 2=B, 3=C, 4=Review
const steps = ["Student info", "Section A", "Section B", "Section C", "Review & Submit"] as const;
  const [step, setStep] = useState<number>(0);

  // Basic info
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [program, setProgram] = useState<Program | "">("");

  // Answers
  const [AAns, setAAns] = useState<SectionA>({});
  const [BAns, setBAns] = useState<SectionB>({});
  const [CAns, setCAns] = useState<SectionC>({});

  // Submit state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Per-step validation
  const canNextInfo = !!fullName.trim() && /\S+@\S+\.\S+/.test(email) && !!program;
  const filledA = useMemo(() => aKeys.every((k) => !!AAns[k]), [AAns]);
  const filledB = useMemo(() => bKeys.every((k) => (BAns[k] || "").trim().length > 0), [BAns]);
  const filledC = useMemo(() => cKeys.every((k) => (CAns[k] || "").trim().length > 0), [CAns]);

    useEffect(() => {
    try {
      if (localStorage.getItem("cmotd-apply-submitted") === "1") {
        setLocked(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [step]);

  async function handleSubmit(): Promise<void> {
    if (submitting) return;
    setSubmitting(true);
    setMsg(null);

    try {
      const payload = {
        fullName,
        email,
        program,
        sectionA: { q1: AAns.q1, q2: AAns.q2, q3: AAns.q3, q4: AAns.q4, q5: AAns.q5 },
        sectionB: { q6: BAns.q6, q7: BAns.q7, q8: BAns.q8, q9: BAns.q9, q10: BAns.q10 },
        sectionC: {
          pressure: CAns.pressure,
          disagree: CAns.disagree,
          strength: CAns.strength,
          struggle: CAns.struggle,
          success: CAns.success,
        },
      };

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const r: { ok: boolean; error?: string } = await res.json().catch(() => ({ ok: false, error: "Invalid server response" }));

      if (!res.ok || !r.ok) {
        throw new Error(r.error || `HTTP ${res.status}`);
      }

      try { localStorage.setItem("cmotd-apply-submitted", "1"); } catch {}

      router.push("/questionnaire/thank-you");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setMsg(`Error: ${message}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (locked) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">Submission received</h2>
          <p className="text-gray-700">You’ve already submitted this assessment. If you believe this is an error, please contact <a className="text-primary underline" href="mailto:info@cmotd.org">info@cmotd.org</a>.</p>
        </div>
      </main>
    );
  }
  return (
    <div className={`relative min-h-screen bg-[#f6f6f8] text-gray-800 font-sans antialiased`}>
      <Header />

      <h1 className="text-2xl md:text-3xl text-center mt-2 mb-6 text-black">
        Please Answer Correctly
      </h1>

      <StepIndicator steps={[...steps]} current={step} />

      <main ref={mainRef} className="max-w-3xl mx-auto p-4 pb-16">
        {step === 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 text-black">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-800">Full name</span>
                <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-800">Email</span>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm text-gray-800">Program</span>
                <select
                  className="input"
                  value={program}
                  onChange={(e) => setProgram(e.target.value as Program | "")}
                  required
                >
                  <option value="">Select a programme</option>
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex justify-between">
              <span />
              <button
                className="btn-primary uppercase"
                disabled={!canNextInfo}
                onClick={() => setStep(1)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Section A */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Section A: Scenario-Based Multiple Choice</h2>
            {aKeys.map((k, idx) => (
              <div className="card my-4" key={k}>
                <fieldset className="mb-4">
                  <legend className="font-medium pt-3">{A[k]} <span className="text-red-400 text-2xl">*</span></legend>
                  <div className="mt-2 grid gap-2">
                    {AOptions[`q${idx + 1}` as keyof typeof AOptions].map((opt, i) => {
                      const val: Choice = (["A", "B", "C", "D"] as const)[i];
                      const selected = AAns[k] === val;
                      return (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setAAns({ ...AAns, [k]: val })}
                          className={`text-left pill ${selected ? "pill-selected" : ""}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(0)} type="button">
                Back
              </button>
              <button
                className="btn-primary"
                onClick={() => setStep(2)}
                type="button"
                disabled={!filledA}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Section B */}
        {step === 2 && (
          <div className="">
            <h2 className="text-lg font-semibold mt-2 mb-2">Section B: Short Answers</h2>
            {bKeys.map((k, i) => {
              const labels = [
                "Describe a time you had to adapt your communication style. What was challenging about it?",
                "What frustrates you most when working in teams, and how do you typically respond?",
                "When you're under significant stress, what are your tell-tale signs, and how do you recover?",
                "Describe a situation where you had to make an unpopular decision. How did you handle the aftermath?",
                "What personal achievement are you most proud of, and why does it matter to you?",
              ] as const;
              return (
                <label key={k} className="block mb-4 bg-white rounded border border-gray-300">
                  <div className="font-medium mb-1 py-4 pt-6 px-4">{`${i + 6}. ${labels[i]}`}</div>
                  <textarea
                    className="textarea min-h-[200px] border-t-0 px-6"
                    value={BAns[k] || ""}
                    onChange={(e) => setBAns({ ...BAns, [k]: e.target.value })}
                    placeholder="Provide your answer..."
                  />
                </label>
              );
            })}

            <div className="mt-6 flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(1)} type="button">
                Back
              </button>
              <button
                className="btn-primary"
                onClick={() => setStep(3)}
                type="button"
                disabled={!filledB}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Section C */}
        {step === 3 && (
          <div className="">
            <h2 className="text-lg font-semibold mt-2 mb-2">Section C: Rapid Word Association</h2>
            {cKeys.map((k, i) => {
              const labels = [
                "Under pressure, I become more...",
                "When others disagree, I typically...",
                "My greatest strength is...",
                "I struggle most with...",
                "Success means...",
              ] as const;
              return (
                <label key={k} className="block mb-4 bg-white rounded px-4 pb-8 border border-gray-200">
                  <div className="mb-1 py-3">&ldquo;{labels[i]}&rdquo; <span className="text-red-400 text-2xl">*</span></div>
                  <input
                    className="w-[90%] border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent"
                    value={CAns[k] || ""}
                    onChange={(e) => setCAns({ ...CAns, [k]: e.target.value })}
                  />
                </label>
              );
            })}

            <div className="mt-6 flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(2)} type="button">
                Back
              </button>
              <button
                className="btn-primary"
                onClick={() => setStep(4)}
                type="button"
                disabled={!filledC}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Review & submit</h2>
            <div className="grid gap-2 text-sm">
              <div><span className="font-medium">Name:</span> {fullName}</div>
              <div><span className="font-medium">Email:</span> {email}</div>
              {program && <div><span className="font-medium">Program:</span> {program}</div>}
              <hr className="my-3" />
              <div className="font-medium">Section A</div>
              <div>A1: {AAns.q1} | A2: {AAns.q2} | A3: {AAns.q3} | A4: {AAns.q4} | A5: {AAns.q5}</div>
              <div className="font-medium mt-2">Section B</div>
              <div>Q6: {BAns.q6}</div>
              <div>Q7: {BAns.q7}</div>
              <div>Q8: {BAns.q8}</div>
              <div>Q9: {BAns.q9}</div>
              <div>Q10: {BAns.q10}</div>
              <div className="font-medium mt-2">Section C</div>
              <div>Pressure: {CAns.pressure}</div>
              <div>Disagree: {CAns.disagree}</div>
              <div>Strength: {CAns.strength}</div>
              <div>Struggle: {CAns.struggle}</div>
              <div>Success: {CAns.success}</div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="btn-ghost" onClick={() => setStep(3)} type="button">
                Back
              </button>
              <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {msg && <p className="mt-3 text-sm">{msg}</p>}
          </div>
        )}

        {step === 5 && (
          <div className="card text-center py-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Thank you for completing the assessment 🎉</h2>
            <p className="text-gray-700 max-w-md mx-auto">
              Your submission has been received successfully. 
              Our team will review your responses and contact you via email soon.
            </p>

            <button
              className="btn-primary mt-8"
              onClick={() => {
                // Now reset everything when leaving the thank you page
                setStep(0);
                setFullName(""); setEmail(""); setProgram("");
                setAAns({}); setBAns({}); setCAns({});
              }}
            >
              Start Over
            </button>
          </div>
)}

      </main>

      <Footer />
    </div>
  );
}