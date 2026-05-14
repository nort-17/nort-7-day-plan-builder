import { ArrowRight, CheckCircle2, Clock, Dumbbell, Flame, ListChecks, ShieldCheck } from "lucide-react";
import { BrandMark } from "./BrandMark";

type LandingPageProps = {
  onStart: () => void;
};

const benefits = [
  {
    icon: CheckCircle2,
    title: "Personalised to you",
    copy: "Based on your fitness level, available time, equipment, and goal.",
  },
  {
    icon: Clock,
    title: "Built for real life",
    copy: "Includes 10, 20, and 30-minute options plus a 5-minute fallback workout.",
  },
  {
    icon: Flame,
    title: "Fat loss focused",
    copy: "Combines home workouts, steps, protein, recovery, and consistency.",
  },
];

const checklist = [
  "7-day no-gym workout schedule",
  "Beginner, intermediate, and advanced options",
  "Low-impact exercise swaps",
  "Daily step target",
  "Simple protein checklist",
  "Recovery day plan",
  "5-minute bad day workout",
  "Progress tracker",
  "Next-step recommendation",
];

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <main>
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <BrandMark />
          <button className="btn-secondary hidden sm:inline-flex" onClick={onStart}>
            Start Quiz
          </button>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-lime">
              <Dumbbell size={14} />
              Free 7-day plan
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
                Build Your Free 7-Day No-Gym Fat Loss Plan
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-300">
                Answer a few quick questions and get a simple home workout plan built around your fitness level, schedule, equipment, and goal.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="btn-primary group" onClick={onStart}>
                Build My Free Plan
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </button>
              <p className="flex items-center text-sm font-semibold text-muted">
                No gym. No guesswork. No extreme workouts.
              </p>
            </div>
            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              <ProofStat value="33 lbs" label="Allan lost in 6 months" />
              <ProofStat value="30 lbs" label="Robert lost in 90 days" />
              <ProofStat value="20 lbs" label="3-month coaching guarantee" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 shadow-lime">
            <div className="rounded-lg bg-void p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-white">Your plan preview</p>
                <span className="rounded-full bg-lime px-3 py-1 text-xs font-extrabold text-void">
                  7 DAYS
                </span>
              </div>
              <div className="space-y-3">
                {["Full Body Starter", "Steps + Core", "Lower Body Strength", "Recovery + Mobility"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-surface2 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-lime/10 text-sm font-extrabold text-lime">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-white">{item}</p>
                      <p className="text-sm text-muted">Adapts after the quiz</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface2 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title} className="card">
                <Icon className="mb-5 text-lime" size={28} />
                <h2 className="mb-2 text-xl font-extrabold text-white">{benefit.title}</h2>
                <p className="leading-7 text-muted">{benefit.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 rounded-xl border border-lime/25 bg-surface p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-4 inline-flex rounded-lg bg-lime p-3 text-void">
              <ShieldCheck />
            </div>
            <p className="eyebrow">Why NORT</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-white">
              Built for busy professionals who have tried before.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-8 text-zinc-300">
            <p>
              The plan uses the same practical NORT principles Allan teaches: protein, steps, resistance training, recovery, and tracking. No two-a-day workouts. No crash diet. No pretending your schedule is empty.
            </p>
            <p>
              Allan lost 33 lbs in 6 months. Client Robert lost 30 lbs, or 13 kg, in 90 days. This free plan is the starting version: simple enough to do today, structured enough to stop guessing.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.02em] text-white">
            Three steps. Then start Day 1 today.
          </h2>
          <div className="mt-8 grid gap-3">
            {["Answer the quiz", "Get your plan", "Start Day 1 today"].map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-lime text-sm font-extrabold text-void">
                  {index + 1}
                </span>
                <p className="font-bold text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-5 flex items-center gap-3">
            <ListChecks className="text-lime" />
            <h2 className="text-2xl font-extrabold text-white">What You'll Get</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="flex gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="mt-0.5 shrink-0 text-lime" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mx-auto max-w-6xl rounded-xl border border-lime/25 bg-lime/10 p-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-white">Ready to build your plan?</h2>
          <button className="btn-primary mx-auto mt-6" onClick={onStart}>
            Start The Quiz
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-lime/20 bg-lime/10 p-3">
      <p className="text-2xl font-extrabold text-lime">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-300">{label}</p>
    </div>
  );
}
