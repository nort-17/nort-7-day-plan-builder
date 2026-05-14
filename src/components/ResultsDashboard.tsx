import type { LeadData, PlanResult, QuizAnswers } from "../types";
import { BrandMark } from "./BrandMark";
import { BadDayWorkout } from "./BadDayWorkout";
import { CoachingCTA } from "./CoachingCTA";
import { ExerciseSwaps } from "./ExerciseSwaps";
import { FatLossChecklist } from "./FatLossChecklist";
import { ProgressTracker } from "./ProgressTracker";
import { ResultHeroCard } from "./ResultHeroCard";
import { WeeklySchedule } from "./WeeklySchedule";
import { WorkoutDetail } from "./WorkoutDetail";
import { getPersonalizationReasons } from "../lib/personalization";

type ResultsDashboardProps = {
  lead: LeadData;
  answers: QuizAnswers;
  result: PlanResult;
  selectedDay: number;
  completedDays: number[];
  onSelectDay: (day: number) => void;
  onToggleDay: (day: number) => void;
  onReset: () => void;
};

export function ResultsDashboard({
  lead,
  answers,
  result,
  selectedDay,
  completedDays,
  onSelectDay,
  onToggleDay,
  onReset,
}: ResultsDashboardProps) {
  const day = result.schedule.find((item) => item.day === selectedDay) ?? result.schedule[0];
  const dayOne = result.schedule[0];
  const reasons = getPersonalizationReasons(answers);

  return (
    <main className="px-5 py-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <BrandMark />
        </header>

        <div className="space-y-6">
          <ResultHeroCard lead={lead} answers={answers} result={result} onReset={onReset} />

          <section className="grid gap-4 md:grid-cols-3">
            <InfoCard title="Step 1" body={`Do ${dayOne.title}. It takes ${dayOne.duration} minutes.`} />
            <InfoCard title="Step target" body={result.stepTarget} />
            <InfoCard title="If life gets busy" body="Do the 5-minute fallback workout instead of skipping." />
          </section>

          {reasons.length > 0 ? (
            <section className="rounded-xl border border-lime/25 bg-lime/10 p-5 sm:p-6">
              <p className="eyebrow">Why this plan fits</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {reasons.map((reason) => (
                  <p key={reason} className="rounded-lg border border-lime/20 bg-void p-4 text-sm font-semibold leading-6 text-zinc-200">
                    {reason}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <WorkoutDetail day={day} completed={completedDays.includes(day.day)} onComplete={() => onToggleDay(day.day)} />
            <div className="space-y-6">
              <ProgressTracker completedDays={completedDays} onToggle={onToggleDay} />
              <BadDayWorkout workout={result.badDayWorkout} />
            </div>
          </div>

          <WeeklySchedule
            schedule={result.schedule}
            selectedDay={selectedDay}
            completedDays={completedDays}
            onSelect={onSelectDay}
          />

          <details className="rounded-xl border border-border bg-surface p-5 sm:p-6">
            <summary className="cursor-pointer list-none">
              <p className="eyebrow">Optional Details</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">Nutrition, recovery, and swaps</h2>
              <p className="mt-2 text-sm text-muted">Open this when you want the extra detail. You do not need it to start Day 1.</p>
            </summary>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <FatLossChecklist nutritionFocus={result.nutritionFocus} />
              <div className="card bg-void">
                <p className="eyebrow">Recovery Advice</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">Protect the habit</h2>
                <p className="mt-3 leading-7 text-zinc-300">{result.recoveryAdvice}</p>
                <p className="mt-5 rounded-lg border-l-4 border-lime bg-surface p-4 text-sm leading-6 text-muted">
                  {result.consistencyRule}
                </p>
              </div>
              <div className="lg:col-span-2">
                <ExerciseSwaps swaps={result.exerciseSwaps} />
              </div>
            </div>
          </details>

          <CoachingCTA />
          <Footer />
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="card">
      <p className="eyebrow">{title}</p>
      <p className="mt-3 leading-7 text-zinc-300">{body}</p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm leading-6 text-muted">
      <p className="font-extrabold uppercase tracking-[0.12em] text-lime">NORT</p>
      <p>No gym. No guesswork. No starting over.</p>
      <p className="mt-4 max-w-4xl">
        Disclaimer: This plan is for general fitness education only and is not medical advice. If you have injuries, medical conditions, or are unsure whether exercise is safe for you, consult a qualified professional before starting. Stop any exercise that causes sharp pain.
      </p>
      <p className="mt-4">Copyright 2026 NORT. All rights reserved.</p>
    </footer>
  );
}
