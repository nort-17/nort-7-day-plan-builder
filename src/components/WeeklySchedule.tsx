import type { WorkoutDay } from "../types";

type WeeklyScheduleProps = {
  schedule: WorkoutDay[];
  selectedDay: number;
  completedDays: number[];
  onSelect: (day: number) => void;
};

export function WeeklySchedule({ schedule, selectedDay, completedDays, onSelect }: WeeklyScheduleProps) {
  return (
    <section className="card">
      <p className="eyebrow">7-Day Schedule</p>
      <h2 className="mt-2 text-2xl font-extrabold text-white">Your week at a glance</h2>
      <div className="mt-5 grid gap-3">
        {schedule.map((day) => {
          const selected = selectedDay === day.day;
          const completed = completedDays.includes(day.day);
          return (
            <button
              id={day.day === 1 ? "day-1" : undefined}
              key={day.day}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-lime bg-lime/10"
                  : "border-border bg-void hover:border-lime/40 hover:bg-surface2"
              }`}
              onClick={() => onSelect(day.day)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-lime">
                    Day {day.day} · {day.duration} min
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-white">{day.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-zinc-300">{day.focus}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{day.description}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    completed ? "bg-lime text-void" : "bg-surface text-muted"
                  }`}
                >
                  {completed ? "Done" : "Open"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
