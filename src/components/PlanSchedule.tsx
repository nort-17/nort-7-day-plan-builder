import { CheckCircle2 } from "lucide-react";
import type { Exercise, WorkoutDay } from "../types";
import { ProgressBar } from "./ProgressBar";

type PlanScheduleProps = {
  schedule: WorkoutDay[];
  selectedDay: number;
  completedDays: number[];
  onSelect: (day: number) => void;
  onToggleDay: (day: number) => void;
};

export function PlanSchedule({
  schedule,
  selectedDay,
  completedDays,
  onSelect,
  onToggleDay,
}: PlanScheduleProps) {
  const selected = schedule.find((day) => day.day === selectedDay) ?? schedule[0];
  const progress = (completedDays.length / 7) * 100;

  return (
    <section id="plan" className="card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-start lg:gap-10">
        <div>
          <p className="eyebrow">Your 7-day program</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white">
            Seven days. One clear plan.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Tap any day to see the exact workout, checklist, and completion button in the same place.
          </p>
        </div>
        <div className="min-w-56">
          <p className="mb-2 text-sm font-extrabold text-white">{completedDays.length}/7 days complete</p>
          <ProgressBar value={progress} />
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-7">
        {schedule.map((day) => {
          const active = selected.day === day.day;
          const complete = completedDays.includes(day.day);
          return (
            <button
              id={day.day === 1 ? "day-1" : undefined}
              key={day.day}
              className={`rounded-lg border p-3 text-left transition ${
                active
                  ? "border-lime bg-lime/10 text-white shadow-[0_0_0_2px_rgba(195,247,74,0.55)_inset]"
                  : "border-border bg-void text-white hover:border-lime/40"
              }`}
              onClick={() => onSelect(day.day)}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.12em]">Day {day.day}</span>
                {complete ? <CheckCircle2 size={16} /> : null}
              </div>
              <p className={`mt-2 text-sm font-extrabold leading-5 ${active ? "text-lime" : "text-white"}`}>{day.title}</p>
              <p className="mt-1 text-xs font-bold text-muted">{day.duration} min</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-void p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-start md:gap-8">
          <div>
            <p className="eyebrow">Day {selected.day}</p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">{selected.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{selected.description}</p>
          </div>
          <button className="btn-primary shrink-0 justify-center" onClick={() => onToggleDay(selected.day)}>
            <CheckCircle2 size={18} />
            {completedDays.includes(selected.day) ? "Completed" : "Mark Complete"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="mb-4 text-lg font-extrabold text-white">Workout</h4>
            <div className="grid gap-3">
              {selected.exercises.map((exercise, index) => (
                <ExerciseRow key={`${exercise.name}-${index}`} exercise={exercise} />
              ))}
            </div>
            {selected.finisher?.length ? (
              <div className="mt-5 border-t border-border pt-5">
                <h4 className="mb-4 text-lg font-extrabold text-white">Finisher</h4>
                <div className="grid gap-3">
                  {selected.finisher.map((exercise, index) => (
                    <ExerciseRow key={`${exercise.name}-${index}`} exercise={exercise} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="mb-4 text-lg font-extrabold text-white">Action checklist</h4>
            <div className="grid gap-3">
              {selected.checklist.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <CheckCircle2 className="mt-1 shrink-0 text-lime" size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExerciseRow({ exercise }: { exercise: Exercise }) {
  return (
    <div className="rounded-lg border border-border bg-void p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-extrabold text-white">{exercise.name}</p>
          {exercise.notes ? <p className="mt-1 text-sm leading-6 text-muted">{exercise.notes}</p> : null}
        </div>
        <p className="text-sm font-bold text-lime">
          {[exercise.sets ? `${exercise.sets} sets` : "", exercise.reps, exercise.time]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>
      {exercise.rest || exercise.easierOption || exercise.harderOption ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
          {exercise.rest ? <span className="rounded-full bg-surface px-2 py-1">Rest: {exercise.rest}</span> : null}
          {exercise.easierOption ? <span className="rounded-full bg-surface px-2 py-1">Easier: {exercise.easierOption}</span> : null}
          {exercise.harderOption ? <span className="rounded-full bg-surface px-2 py-1">Harder: {exercise.harderOption}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
