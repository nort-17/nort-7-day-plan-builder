import { CheckCircle2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

type ProgressTrackerProps = {
  completedDays: number[];
  onToggle: (day: number) => void;
};

export function ProgressTracker({ completedDays, onToggle }: ProgressTrackerProps) {
  const progress = (completedDays.length / 7) * 100;

  return (
    <section className="card">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Progress Tracker</p>
          <h2 className="mt-2 text-2xl font-extrabold text-white">{completedDays.length}/7 days complete</h2>
        </div>
        <CheckCircle2 className="text-lime" />
      </div>
      <ProgressBar value={progress} />
      <div className="mt-5 grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, index) => index + 1).map((day) => {
          const completed = completedDays.includes(day);
          return (
            <button
              key={day}
              className={`aspect-square rounded-lg border text-sm font-extrabold transition ${
                completed
                  ? "border-lime bg-lime text-void"
                  : "border-border bg-void text-muted hover:border-lime/40"
              }`}
              onClick={() => onToggle(day)}
              aria-label={`Toggle day ${day}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
}
