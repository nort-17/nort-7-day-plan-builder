import { Printer, RefreshCcw, Share2 } from "lucide-react";
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
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow">Your Plan Is Ready</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
            {lead.firstName}, start with Day 1.
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${intensityClasses[result.intensity]}`}>
              {result.planType}
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-white">
              {result.recommendedSessionTime} min sessions
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-white">
              {labels.fitnessLevel}
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Your plan is built around {labels.mainGoal.toLowerCase()}, {labels.workoutStyle.toLowerCase()}, and the equipment you have: {labels.equipment.toLowerCase()}. Do Day 1 first. Everything else is backup.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
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
    </section>
  );
}
