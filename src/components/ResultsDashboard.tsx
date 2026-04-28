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

  return (
    <main className="px-5 py-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <BrandMark />
        </header>

        <div className="space-y-6">
          <ResultHeroCard lead={lead} answers={answers} result={result} onReset={onReset} />

          <section className="grid gap-4 md:grid-cols-3">
            <InfoCard title="Your weekly goal" body={result.weeklyGoal} />
            <InfoCard title="Step target" body={result.stepTarget} />
            <InfoCard title="Consistency rule" body={result.consistencyRule} />
          </section>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <ProgressTracker completedDays={completedDays} onToggle={onToggleDay} />
              <WeeklySchedule
                schedule={result.schedule}
                selectedDay={selectedDay}
                completedDays={completedDays}
                onSelect={onSelectDay}
              />
            </div>
            <div className="space-y-6">
              <WorkoutDetail day={day} completed={completedDays.includes(day.day)} onComplete={() => onToggleDay(day.day)} />
              <BadDayWorkout workout={result.badDayWorkout} />
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-2">
            <FatLossChecklist nutritionFocus={result.nutritionFocus} />
            <div className="card">
              <p className="eyebrow">Recovery Advice</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">Protect the habit</h2>
              <p className="mt-3 leading-7 text-zinc-300">{result.recoveryAdvice}</p>
              <p className="mt-5 rounded-lg border-l-4 border-lime bg-void p-4 text-sm leading-6 text-muted">
                {result.nextStepRecommendation}
              </p>
            </div>
          </section>

          <ExerciseSwaps swaps={result.exerciseSwaps} />
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
