import { Check } from "lucide-react";
import type { Limitation } from "../types";

export type QuizOption<T extends string | number> = {
  label: string;
  description?: string;
  value: T;
};

type QuizQuestionProps<T extends string | number> = {
  question: string;
  options: QuizOption<T>[];
  value?: T | T[];
  multiple?: boolean;
  onChange: (value: T | T[]) => void;
};

export function QuizQuestion<T extends string | number>({
  question,
  options,
  value,
  multiple = false,
  onChange,
}: QuizQuestionProps<T>) {
  const values = Array.isArray(value) ? value : value !== undefined ? [value] : [];

  function toggle(optionValue: T) {
    if (!multiple) {
      onChange(optionValue);
      return;
    }

    const current = values as T[];
    if (optionValue === ("none" as Limitation)) {
      onChange([optionValue]);
      return;
    }

    const withoutNone = current.filter((item) => item !== ("none" as T));
    const next = withoutNone.includes(optionValue)
      ? withoutNone.filter((item) => item !== optionValue)
      : [...withoutNone, optionValue];
    onChange(next);
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
        {question}
      </h1>
      <div className="grid gap-3">
        {options.map((option) => {
          const selected = values.includes(option.value);
          return (
            <button
              key={String(option.value)}
              type="button"
              className={`flex min-h-[88px] w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-lime bg-lime/10 shadow-lime"
                  : "border-border bg-surface hover:border-lime/40 hover:bg-surface2"
              }`}
              onClick={() => toggle(option.value)}
            >
              <span>
                <span className="block text-base font-extrabold text-white">{option.label}</span>
                {option.description ? (
                  <span className="mt-1 block text-sm leading-6 text-muted">{option.description}</span>
                ) : null}
              </span>
              <span
                className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  selected ? "border-lime bg-lime text-void" : "border-border text-transparent"
                }`}
              >
                <Check size={16} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
