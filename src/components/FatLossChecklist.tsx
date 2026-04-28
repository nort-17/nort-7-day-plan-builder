import { CheckCircle2 } from "lucide-react";

const items = [
  "Protein with each meal",
  "Add 2,000 steps or hit your target",
  "Keep portions consistent",
  "Drink water",
  "Sleep 7+ hours where possible",
];

export function FatLossChecklist({ nutritionFocus }: { nutritionFocus: string }) {
  return (
    <section className="card">
      <p className="eyebrow">Fat Loss Checklist</p>
      <h2 className="mt-2 text-2xl font-extrabold text-white">Your nutrition focus</h2>
      <p className="mt-3 leading-7 text-zinc-300">{nutritionFocus}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm text-zinc-300">
            <CheckCircle2 className="mt-0.5 shrink-0 text-lime" size={16} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-lg border-l-4 border-lime bg-void p-4 text-sm leading-6 text-muted">
        This is not a crash diet. The goal is to build repeatable habits that support fat loss.
      </p>
    </section>
  );
}
