type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p> : null}
      <div className="h-2 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-lime transition-all duration-300"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
