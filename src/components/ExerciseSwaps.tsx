import type { ExerciseSwap } from "../types";

export function ExerciseSwaps({ swaps }: { swaps: ExerciseSwap[] }) {
  return (
    <section className="card">
      <p className="eyebrow">Exercise Swaps</p>
      <h2 className="mt-2 text-2xl font-extrabold text-white">Use the pain-free version</h2>
      <div className="mt-5 grid gap-3">
        {swaps.map((swap) => (
          <div key={`${swap.insteadOf}-${swap.useThis}`} className="grid gap-2 rounded-lg border border-border bg-void p-4 sm:grid-cols-[0.8fr_0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Instead of</p>
              <p className="font-extrabold text-white">{swap.insteadOf}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-lime">Use this</p>
              <p className="font-extrabold text-white">{swap.useThis}</p>
            </div>
            <p className="text-sm leading-6 text-muted">{swap.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
