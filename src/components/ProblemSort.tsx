import { useState } from 'react';
import type { SortProblem } from '../data/types';
import { roleMeta } from '../lib/roles';
import type { SortAttempt } from '../lib/check';
import RoleAvatar from './RoleAvatar';

interface Props {
  problem: SortProblem;
  attempt: SortAttempt;
  onChange: (attempt: SortAttempt) => void;
  locked: boolean;
}

export default function ProblemSort({ problem, attempt, onChange, locked }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function placeInBox(boxRole: string) {
    if (locked || !selectedId) return;
    onChange({ ...attempt, [selectedId]: boxRole });
    setSelectedId(null);
  }

  function returnToTray(wordId: string) {
    if (locked) return;
    onChange({ ...attempt, [wordId]: null });
    setSelectedId(null);
  }

  const trayWords = problem.words.filter((w) => attempt[w.id] === null);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center font-body text-sm text-ink/60">カードをタップして選び、下の搬入口をタップして仕分けよう</p>

      <div className="flex min-h-[60px] flex-wrap justify-center gap-2 rounded-xl border-[3px] border-dashed border-ink/40 bg-paper/70 p-3">
        {trayWords.length === 0 && <span className="text-xs text-ink/40">(仕分け完了)</span>}
        {trayWords.map((w) => (
          <button
            key={w.id}
            type="button"
            disabled={locked}
            onClick={() => setSelectedId(selectedId === w.id ? null : w.id)}
            className={`rounded-lg border-[3px] border-ink bg-paper px-3 py-2 font-body font-semibold shadow-brut-sm transition-transform
              ${selectedId === w.id ? '-translate-x-[3px] -translate-y-[3px] shadow-brut bg-help/20' : ''}
              active:translate-x-0 active:translate-y-0 disabled:opacity-50`}
          >
            {w.text}
          </button>
        ))}
      </div>

      <div className={`grid gap-2 ${problem.boxes.length > 3 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
        {problem.boxes.map((box) => {
          const meta = roleMeta[box];
          const placed = problem.words.filter((w) => attempt[w.id] === box);
          return (
            <button
              key={box}
              type="button"
              onClick={() => placeInBox(box)}
              disabled={locked}
              className={`flex min-h-[92px] flex-col items-center gap-1.5 rounded-xl border-[3px] border-ink p-2 shadow-brut-sm
                ${selectedId ? 'ring-4 ring-help/60' : ''} bg-bone`}
            >
              <span className={`inline-flex items-center gap-1 rounded-full border-2 border-ink py-0.5 pl-0.5 pr-2 text-xs font-bold ${meta.box} text-paper`}>
                <RoleAvatar role={box} size="xs" />
                {meta.short} {meta.label}
              </span>
              <div className="flex flex-wrap justify-center gap-1">
                {placed.map((w) => (
                  <span
                    key={w.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      returnToTray(w.id);
                    }}
                    className={`rounded-md border-2 ${meta.border} ${meta.soft} ${meta.text} px-2 py-1 text-sm font-semibold`}
                  >
                    {w.text}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
