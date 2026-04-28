import { FormEvent, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import type { LeadData } from "../types";
import { BrandMark } from "./BrandMark";

type LeadCaptureProps = {
  onSubmit: (lead: LeadData) => Promise<void>;
};

export function LeadCapture({ onSubmit }: LeadCaptureProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!firstName.trim()) {
      setError("Enter your first name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    await onSubmit({ firstName: firstName.trim(), email: email.trim() });
    setSubmitting(false);
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-8">
      <section className="w-full max-w-xl rounded-xl border border-border bg-surface p-5 shadow-lime sm:p-8">
        <BrandMark />
        <div className="mt-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-lime">
            <Lock size={14} />
            Plan unlocked
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white">
            Your 7-Day Plan Is Ready
          </h1>
          <p className="leading-7 text-muted">
            Enter your details below and we'll show your personalised plan.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white">First name</span>
            <input
              className="input"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Allan"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white">Email address</span>
            <input
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              type="email"
            />
          </label>

          {error ? <p className="rounded-lg border border-red/30 bg-red/10 p-3 text-sm font-semibold text-red">{error}</p> : null}

          <button className="btn-primary w-full justify-center" disabled={submitting}>
            {submitting ? "Preparing..." : "Show My Plan"}
            <ArrowRight size={18} />
          </button>
        </form>
      </section>
    </main>
  );
}
