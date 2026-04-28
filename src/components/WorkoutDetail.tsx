import { CheckCircle2 } from "lucide-react";
import type { Exercise, WorkoutDay } from "../types";

type WorkoutDetailProps = {
  day: WorkoutDay;
  completed: boolean;
  onComplete: () => void;
};

export function WorkoutDetail({ day, completed, onComplete }: WorkoutDetailProps) {
  return (
    <section className="card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow">Daily Workout Detail</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-white">
            Day {day.day}: {day.title}
          </h2>
          <p className="mt-2 text-muted">{day.description}</p>
        </div>
        <button className="btn-primary justify-center" onClick={onComplete}>
          <CheckCircle2 size={18} />
          {completed ? "Completed" : "Mark Complete"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-border bg-void p-4">
          <h3 className="mb-4 text-lg font-extrabold text-white">Main session</h3>
          <div className="grid gap-3">
            {day.exercises.map((exercise, index) => (
              <ExerciseRow key={`${exercise.name}-${index}`} exercise={exercise} />
            ))}
          </div>
          {day.finisher?.length ? (
            <div className="mt-5 border-t border-border pt-5">
              <h3 className="mb-4 text-lg font-extrabold text-white">Finisher</h3>
              <div className="grid gap-3">
                {day.finisher.map((exercise, index) => (
                  <ExerciseRow key={`${exercise.name}-${index}`} exercise={exercise} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-border bg-void p-4">
          <h3 className="mb-4 text-lg font-extrabold text-white">Today's checklist</h3>
          <div className="grid gap-3">
            {day.checklist.map((item) => (
              <div key={item} className="flex gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="mt-0.5 shrink-0 text-lime" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExerciseRow({ exercise }: { exercise: Exercise }) {
  return (
    <div className="rounded-lg border border-border bg-surface2 p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-extrabold text-white">{exercise.name}</p>
          {exercise.notes ? <p className="mt-1 text-sm leading-6 text-muted">{exercise.notes}</p> : null}
        </div>
        <p className="text-sm font-bold text-lime">
          {[exercise.sets ? `${exercise.sets} sets` : "", exercise.reps, exercise.time]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      {exercise.rest || exercise.easierOption || exercise.harderOption ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
          {exercise.rest ? <span className="rounded-full bg-void px-2 py-1">Rest: {exercise.rest}</span> : null}
          {exercise.easierOption ? <span className="rounded-full bg-void px-2 py-1">Easier: {exercise.easierOption}</span> : null}
          {exercise.harderOption ? <span className="rounded-full bg-void px-2 py-1">Harder: {exercise.harderOption}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
