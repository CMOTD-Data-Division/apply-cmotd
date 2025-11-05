import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f6f8] text-gray-800 font-sans">
      <Header />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              Personality & Programme Readiness Assessment
            </h1>
            <p className="mt-4 text-gray-700">
              This short assessment helps us understand your natural work style,
              decision-making approach, and communication preferences. It takes
              about <span className="font-medium">10–15 minutes</span> and
              includes scenario questions, short answers, and a rapid word
              association section.
            </p>

            <ul className="mt-6 grid gap-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span><strong>Section A:</strong> Scenario-based multiple choice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span><strong>Section B:</strong> Short, reflective answers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span><strong>Section C:</strong> Rapid word association</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/apply" className="btn-primary">
                Take the Assessment
              </Link>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              By proceeding, you agree to provide accurate information. You’ll receive
              an email once your submission is reviewed.
            </p>
          </div>

          {/* Right side card (no Programmes list) */}
          <div className="card">
            <h2 className="text-lg font-semibold text-black">What to expect</h2>
            <div className="mt-3 text-gray-700 space-y-2">
              <p>• Estimated time: <strong>10–15 minutes</strong></p>
              <p>• One submission per candidate (no retakes)</p>
              <p>• You’ll see a confirmation page after submission</p>
            </div>

            <div className="mt-6">
              <Link href="/apply" className="btn-primary w-full inline-flex justify-center">
                Start Now
              </Link>
            </div>
          </div>
        </section>

        {/* Optional: How it works */}
        <section className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="card">
            <div className="text-sm text-gray-500">Step 1</div>
            <h4 className="font-semibold text-black mt-1">Provide basic info</h4>
            <p className="text-gray-700 mt-1">Your full name, email, and programme of interest.</p>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500">Step 2</div>
            <h4 className="font-semibold text-black mt-1">Complete the assessment</h4>
            <p className="text-gray-700 mt-1">Answer Sections A, B, and C in sequence.</p>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500">Step 3</div>
            <h4 className="font-semibold text-black mt-1">Submit &amp; await email</h4>
            <p className="text-gray-700 mt-1">We’ll review and get back to you shortly.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}