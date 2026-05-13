export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="./nort-logo.png"
        alt="NORT"
        className="h-11 w-11 rounded-md object-contain"
      />
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-lime">
          NORT Fitness
        </p>
        <p className="text-xs text-muted">No gym. No guesswork.</p>
      </div>
    </div>
  );
}
