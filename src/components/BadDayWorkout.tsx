import { TimerReset } from "lucide-react";
import type { Workout } from "../types";

type BadDayWorkoutProps = {
  workout: Workout;
};

export function BadDayWorkout({ workout }: BadDayWorkoutProps) {
  return (
    <section className="card border-lime/25 bg-lime/10">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-lime p-3 text-void">
          <TimerReset />
        </div>
        <div>
          <p className="eyebrow">Only Have 5 Minutes?</p>
          <h2 className="mt-2 text-2xl font-extrabold text-white">Do this. Do not skip. Shrink the workout.</h2>
          <p className="mt-3 leading-7 text-zinc-300">{workout.description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {workout.exercises.map((exercise) => (
          <div key={exercise.name} className="rounded-lg border border-lime/20 bg-void p-3">
            <p className="font-extrabold text-white">{exercise.name}</p>
            <p className="mt-1 text-sm font-semibold text-lime">{exercise.reps ?? exercise.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
