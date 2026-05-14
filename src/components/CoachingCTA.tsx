import { ArrowRight } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export function CoachingCTA() {
  return (
    <section className="rounded-xl border border-lime/25 bg-lime p-6 text-void sm:p-8">
      <h2 className="text-3xl font-extrabold tracking-[-0.02em]">
        Want the full fat loss plan built for you?
      </h2>
      <p className="mt-3 max-w-3xl text-base font-semibold leading-7">
        This 7-day plan helps you start. But if you want to lose weight properly, you need the full system: nutrition, workouts, tracking, recovery, and accountability.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-void px-5 py-3 font-extrabold text-white transition hover:bg-black"
          href="/apply"
          onClick={() => trackEvent("coaching_cta_clicked")}
        >
          Apply For Coaching
          <ArrowRight size={18} />
        </a>
        <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-void/30 px-5 py-3 font-extrabold text-void transition hover:bg-void/10" href="#day-1">
          Continue With My Free Plan
        </a>
      </div>
    </section>
  );
}
