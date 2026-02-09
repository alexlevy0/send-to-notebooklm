import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-neutral-200">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-sm text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-notebook-pen"
            >
              <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
              <path d="M2 6h4" />
              <path d="M2 10h4" />
              <path d="M2 14h4" />
              <path d="M2 18h4" />
              <path d="M18.4 2.6a2.1 2.1 0 1 1 3 3L11 16l-4 1 1-4Z" />
            </svg>
          </div>
          <span>Send to NotebookLM</span>
        </div>
        <nav className="flex gap-4">
          <Button
            variant="ghost"
            className="text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            asChild
          >
            <Link
              href="https://github.com/alexlevy0/send-to-notebooklm"
              target="_blank"
            >
              GitHub
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Background Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900">
            Your Research. <br />
            <span className="text-indigo-600">Instantly.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed">
            Stop copy-pasting. Send entire articles, PDFs, and web pages
            directly to Google NotebookLM with a single click. Optimize your
            research workflow today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-neutral-900 text-white hover:bg-neutral-800 h-12 px-8 text-base font-semibold shadow-xl shadow-indigo-500/10"
            >
              Add to Chrome
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-neutral-200 text-neutral-800 hover:bg-neutral-50 h-12 px-8 text-base"
            >
              View Demo
            </Button>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="px-6 py-24 border-t border-neutral-200 bg-neutral-50/50"
        >
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Simple, transparent pricing
              </h2>
              <p className="text-neutral-600">
                Choose the plan that fits your research needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-6 flex flex-col shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-neutral-900">Free</h3>
                  <div className="text-4xl font-extrabold text-neutral-900">
                    0€{" "}
                    <span className="text-base font-normal text-neutral-500">
                      /mo
                    </span>
                  </div>
                  <p className="text-neutral-500">
                    Perfect for casual researchers.
                  </p>
                </div>
                <div className="flex-1 space-y-4">
                  <li className="flex gap-3 text-sm text-neutral-600">
                    <Check className="size-5 text-indigo-600" />
                    <span>10 captures per day</span>
                  </li>
                  <li className="flex gap-3 text-sm text-neutral-600">
                    <Check className="size-5 text-indigo-600" />
                    <span>Basic support</span>
                  </li>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-neutral-200 bg-neutral-50 text-neutral-400 hover:bg-neutral-50 cursor-not-allowed"
                  disabled
                >
                  Current Plan
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="relative rounded-2xl border border-indigo-200 bg-white p-8 space-y-6 flex flex-col shadow-2xl shadow-indigo-500/10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-indigo-600">Pro</h3>
                  <div className="text-4xl font-extrabold text-neutral-900">
                    3€{" "}
                    <span className="text-base font-normal text-neutral-500">
                      /mo
                    </span>
                  </div>
                  <p className="text-neutral-500">
                    For power users and researchers.
                  </p>
                </div>
                <div className="flex-1 space-y-4">
                  <li className="flex gap-3 text-sm text-neutral-700">
                    <Check className="size-5 text-indigo-600" />
                    <span>Unlimited captures</span>
                  </li>
                  <li className="flex gap-3 text-sm text-neutral-700">
                    <Check className="size-5 text-indigo-600" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex gap-3 text-sm text-neutral-700">
                    <Check className="size-5 text-indigo-600" />
                    <span>Early access to new features</span>
                  </li>
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" asChild>
                  <Link href="https://buy.stripe.com/test_28E28s8BcgZd2Td4Z6cfK00">
                    Upgrade to Pro
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-neutral-200 text-center text-neutral-500 text-sm bg-neutral-50">
        <p>
          &copy; {new Date().getFullYear()} Send to NotebookLM. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
