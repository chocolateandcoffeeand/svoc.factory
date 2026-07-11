import { productionLines } from '../data/levels';
import { getProgress, resetProgress, totalStars } from '../lib/progress';
import { useState } from 'react';

interface Props {
  onSelectLine: (lineId: string) => void;
}

export default function TopScreen({ onSelectLine }: Props) {
  const [, forceRerender] = useState(0);
  const stars = totalStars();
  const progress = getProgress();

  function handleReset() {
    if (window.confirm('すべての進捗をリセットしますか？検品OKの記録も消えます。')) {
      resetProgress();
      forceRerender((n) => n + 1);
    }
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-help px-4 py-1 shadow-brut-sm">
          <span className="text-lg">🏭</span>
          <span className="font-head text-sm font-bold tracking-wide">GRAMMAR FACTORY</span>
        </div>
        <h1 className="font-display text-4xl tracking-wide text-ink sm:text-5xl">文法工場</h1>
        <p className="mt-2 font-body text-sm text-ink/70">英文の部品を見つけて、組み立てるSVOCトレーニング</p>
      </header>

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1 rounded-full border-[3px] border-ink bg-paper px-3 py-1 shadow-brut-sm">
          <span>⭐</span>
          <span className="font-head font-bold">{stars}</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border-[3px] border-ink bg-paper px-3 py-1 text-xs font-bold text-ink/70 shadow-brut-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          進捗をリセット
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-5">
        {productionLines.map((line) => {
          const clearedCount = line.levels.filter((l) => progress.clearedLevels[l.id] !== undefined).length;
          const accent = line.id === 'line1' ? 'bg-s' : 'bg-factory-orange';
          return (
            <button
              key={line.id}
              type="button"
              onClick={() => onSelectLine(line.id)}
              className={`group relative overflow-hidden rounded-2xl border-[4px] border-ink bg-paper p-5 text-left shadow-brut transition-transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`}
            >
              <div className={`absolute -right-6 -top-6 h-24 w-24 rotate-12 rounded-xl border-[3px] border-ink ${accent}`} />
              <p className="font-head text-xs font-bold tracking-widest text-ink/60">{line.title.toUpperCase()}</p>
              <h2 className="mt-1 font-head text-2xl font-extrabold text-ink">{line.subtitle}</h2>
              <p className="mt-2 text-sm text-ink/70">
                検品OK: {clearedCount} / {line.levels.length} レベル
              </p>
              <div className="mt-3 h-2 w-full rounded-full border-2 border-ink bg-bone">
                <div
                  className={`h-full rounded-full ${accent}`}
                  style={{ width: `${(clearedCount / line.levels.length) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
