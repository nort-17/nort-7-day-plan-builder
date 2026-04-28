import { ArrowDown, Printer, RefreshCcw, Share2 } from "lucide-react";
import type { LeadData, PlanResult, QuizAnswers } from "../types";
import { labelsForAnswers } from "./Quiz";

type ResultHeroCardProps = {
  lead: LeadData;
  answers: QuizAnswers;
  result: PlanResult;
  onReset: () => void;
};

const intensityClasses = {
  low: "border-dataBlue/30 bg-dataBlue/10 text-dataBlue",
  medium: "border-lime/30 bg-lime/10 text-lime",
  high: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
};

export function ResultHeroCard({ lead, answers, result, onReset }: ResultHeroCardProps) {
  const labels = labelsForAnswers(answers);

  async function sharePlan() {
    await navigator.clipboard.writeText("I just built my 7-day no-gym fat loss plan with NORT.");
  }

  return (
    <section className="rounded-xl border border-lime/25 bg-gradient-to-br from-lime/10 via-surface to-void p-5 shadow-lime sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Your Plan Is Ready</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
            {lead.firstName}, your plan is ready.
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${intensityClasses[result.intensity]}`}>
              {result.intensity} intensity
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-white">
              {result.recommendedSessionTime} min sessions
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-white">
              Goal: {labels.mainGoal}
            </span>
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-lime">{result.planType}</h2>
          <p className="mt-2 text-lg font-semibold text-white">{result.planSubtitle}</p>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-300">{result.planDescription}</p>
          <a className="btn-primary mt-7 w-fit" href="#day-1">
            Start Day 1
            <ArrowDown size={18} />
          </a>
        </div>

        <div className="grid gap-3 rounded-xl border border-border bg-void p-4">
          <Metric label="Fitness level" value={labels.fitnessLevel} />
          <Metric label="Workout style" value={labels.workoutStyle} />
          <Metric label="Equipment" value={labels.equipment} />
          <Metric label="Best training time" value={labels.preferredTime} />
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <button className="btn-secondary justify-center" onClick={() => window.print()}>
              <Printer size={17} />
              Print
            </button>
            <button className="btn-secondary justify-center" onClick={sharePlan}>
              <Share2 size={17} />
              Share
            </button>
            <button className="btn-secondary justify-center" onClick={onReset}>
              <RefreshCcw size={17} />
              Retake
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface2 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 font-extrabold text-white">{value}</p>
    </div>
  );
}
