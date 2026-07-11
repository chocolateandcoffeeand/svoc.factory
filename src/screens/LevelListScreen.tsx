import { productionLines } from '../data/levels';
import { getProgress } from '../lib/progress';

interface Props {
  lineId: string;
  onBack: () => void;
  onSelectLevel: (levelId: string) => void;
}

export default function LevelListScreen({ lineId, onBack, onSelectLevel }: Props) {
  const line = productionLines.find((l) => l.id === lineId);
  const progress = getProgress();
  if (!line) return null;

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-4 px-4 py-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="トップへ戻る"
          className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-paper shadow-brut-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          ←
        </button>
        <div>
          <p className="font-head text-xs font-bold tracking-widest text-ink/60">{line.title.toUpperCase()}</p>
          <h1 className="font-head text-2xl font-extrabold">{line.subtitle}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {line.levels.map((level) => {
          const stars = progress.clearedLevels[level.id];
          const cleared = stars !== undefined;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelectLevel(level.id)}
              className="flex items-center gap-4 rounded-2xl border-[3px] border-ink bg-paper p-4 text-left shadow-brut-sm transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-help font-head text-lg font-extrabold">
                {level.number}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-head text-base font-bold">{level.title}</p>
                <p className="truncate text-xs text-ink/60">{level.factoryTerm}</p>
              </div>
              {cleared ? (
                <div className="flex shrink-0 flex-col items-center gap-0.5 rounded-lg border-[3px] border-ink bg-o px-2 py-1">
                  <span className="text-[10px] font-bold text-white">検品OK</span>
                  <span className="text-xs">{'⭐'.repeat(stars)}</span>
                </div>
              ) : (
                <span className="shrink-0 rounded-lg border-[3px] border-ink bg-bone px-2 py-1 text-[10px] font-bold text-ink/50">未検品</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
