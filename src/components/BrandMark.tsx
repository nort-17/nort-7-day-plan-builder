export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-lime text-sm font-extrabold text-void">
        N
      </div>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-lime">
          NORT Fitness
        </p>
        <p className="text-xs text-muted">No gym. No guesswork.</p>
      </div>
    </div>
  );
}
