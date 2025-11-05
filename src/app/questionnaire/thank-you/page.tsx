import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = { title: "Thank you - CMOTD" };

export default function ThanksPage() {
  return (
    <div className={`min-h-screen relative bg-[#f6f6f8] text-gray-800 font-sans antialiased`}>
        <Header />
        <main className="mx-auto px-6 py-12 bg-[#f6f6f8] max-w-max">
        <div className="thank-you-card text-center py-32 flex flex-col items-center justify-center">
            <div className="mx-auto h-32 w-32 mt-6 flex items-center justify-center rounded-full bg-green-100 border-2 border-green-600">
                <span className="text-green-600 text-5xl">✓</span>
            </div>
            <div className="max-w-md text-center pb-12">
                <h1 className="text-2xl font-semibold text-primary mt-4 mb-3">Thank you for your submission</h1>
                <p className="text-gray-700">
                We’ve received your assessment. Our team will review your responses and contact you via email soon.
                </p>
            </div>
        </div>
        </main>
        <Footer />
    </div>
  );
}
