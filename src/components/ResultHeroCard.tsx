import { useEffect, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";
import type { LeadData, PlanResult, QuizAnswers } from "../types";
import { labelsForAnswers } from "./Quiz";
import { buildApplyUrl, trackEvent } from "../lib/analytics";
import { createPlanPdfUrl, downloadPlanPdf } from "../lib/pdf";

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

const goalPhrases: Record<QuizAnswers["mainGoal"], string> = {
  recomp: "losing fat and building muscle at the same time",
  fat_loss: "fat loss first",
  muscle: "looking leaner and stronger",
  consistency: "rebuilding consistency",
};

const stylePhrases: Record<QuizAnswers["workoutStyle"], string> = {
  hypertrophy: "controlled muscle work",
  low_impact: "low-impact resistance work",
  strength: "simple heavy sets",
  circuits: "faster fat-loss circuits",
};

function buildResultSummary(
  answers: QuizAnswers,
  labels: ReturnType<typeof labelsForAnswers>,
  result: PlanResult,
) {
  const goal = goalPhrases[answers.mainGoal];
  // When the plan is low-impact (knee flag or explicit choice), the summary
  // must match the badge instead of echoing a heavy-sets style choice.
  const lowImpactPlan = result.planType.toLowerCase().includes("low-impact");
  const style = lowImpactPlan ? "joint-friendly strength work" : stylePhrases[answers.workoutStyle];

  if (answers.trainingLocation === "gym" && answers.equipment === "bodyweight") {
    return `Your plan uses a gym-friendly setup, but keeps Day 1 bodyweight-first so you can start without waiting for equipment. Do Day 1 first. Everything else is backup.`;
  }

  if (answers.trainingLocation === "gym") {
    return `Your plan is built around ${goal}, using your gym setup, ${style}, and the equipment you want to rely on this week. Do Day 1 first. Everything else is backup.`;
  }

  if (answers.trainingLocation === "hotel") {
    return `Your plan is built around ${goal} while travelling, using ${style} and equipment you can reliably access. Do Day 1 first. Everything else is backup.`;
  }

  if (answers.trainingLocation === "calisthenics_park") {
    return `Your plan is built around ${goal} at a park, using ${style} and bodyweight-friendly progressions. Do Day 1 first. Everything else is backup.`;
  }

  return `Your plan is built around ${goal} at home, using ${style} and ${labels.equipment.toLowerCase()}. Do Day 1 first. Everything else is backup.`;
}

export function ResultHeroCard({ lead, answers, result, onReset }: ResultHeroCardProps) {
  const labels = labelsForAnswers(answers);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dayOneCommitted, setDayOneCommitted] = useState(false);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  function openPdfPreview() {
    if (!dayOneCommitted) {
      trackEvent("pdf_blocked_until_day_1_commitment", {
        planType: result.planType,
        obstacle: answers.obstacle,
      });
      return;
    }
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    trackEvent("pdf_preview_opened", {
      planType: result.planType,
      obstacle: answers.obstacle,
      sessionTime: result.recommendedSessionTime,
    });
    setPdfUrl(createPlanPdfUrl(lead, answers, result));
  }

  function commitToDayOne() {
    setDayOneCommitted(true);
    trackEvent("day_1_committed", {
      planType: result.planType,
      obstacle: answers.obstacle,
      sessionTime: result.recommendedSessionTime,
    });
  }

  function handlePdfDownload() {
    trackEvent("pdf_downloaded", {
      planType: result.planType,
      obstacle: answers.obstacle,
      sessionTime: result.recommendedSessionTime,
    });
    downloadPlanPdf(lead, answers, result);
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-5 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-start lg:gap-10">
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
            {buildResultSummary(answers, labels, result)}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Want this run with you properly?{" "}
            <a
              href={buildApplyUrl("workout-planner")}
              onClick={() => trackEvent("coaching_cta_clicked", { source: "hero_inline" })}
              className="font-bold text-lime underline-offset-2 hover:underline"
            >
              Apply for NORT coaching.
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
          <button
            className={dayOneCommitted ? "btn-primary justify-center" : "btn-secondary justify-center"}
            onClick={commitToDayOne}
            aria-pressed={dayOneCommitted}
          >
            {dayOneCommitted ? "Day 1 Locked In" : "I Will Do Day 1"}
          </button>
          <button
            className="btn-secondary justify-center disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!dayOneCommitted}
            onClick={openPdfPreview}
            title={dayOneCommitted ? "Open your PDF preview" : "Tap I Will Do Day 1 first to unlock the download"}
          >
            <Download size={17} />
            Download Plan
          </button>
          <button className="btn-secondary justify-center" onClick={onReset}>
            <RefreshCcw size={17} />
            Retake
          </button>
          {!dayOneCommitted ? (
            <p className="text-xs font-bold text-zinc-500 sm:w-full lg:w-auto">
              Tap I Will Do Day 1 to unlock the download.
            </p>
          ) : null}
        </div>
      </div>
      {pdfUrl ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Workout plan PDF preview"
        >
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
            <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">PDF preview</p>
                <h2 className="mt-1 text-xl font-extrabold text-white">Your full 7-day plan</h2>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary justify-center" onClick={handlePdfDownload}>
                  <Download size={17} />
                  Download PDF
                </button>
                <button className="btn-secondary justify-center" onClick={() => setPdfUrl(null)}>
                  Close
                </button>
              </div>
            </div>
            <iframe
              className="h-[72vh] w-full bg-white"
              src={pdfUrl}
              title="NORT workout planner PDF preview"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
