import type { BuildProblem } from '../data/types';
import type { BuildAttempt } from '../lib/check';
import { roleMeta } from '../lib/roles';
import RoleAvatar from './RoleAvatar';

interface Props {
  problem: BuildProblem;
  attempt: BuildAttempt;
  onChange: (attempt: BuildAttempt) => void;
  locked: boolean;
}

export default function ProblemBuild({ problem, attempt, onChange, locked }: Props) {
  const trayCards = problem.cards.filter((c) => !attempt.includes(c.id));

  function addCard(id: string) {
    if (locked) return;
    onChange([...attempt, id]);
  }

  function removeCard(id: string) {
    if (locked) return;
    onChange(attempt.filter((cid) => cid !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center font-body text-sm text-ink/60">パーツをタップして正しい順に並べよう</p>

      <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-xl border-[3px] border-ink bg-paper p-3 shadow-brut-sm">
        {attempt.length === 0 && <span className="text-xs text-ink/30">ここに組み立てる</span>}
        {attempt.map((id) => {
          const card = problem.cards.find((c) => c.id === id)!;
          const meta = roleMeta[card.role];
          return (
            <button
              key={id}
              type="button"
              disabled={locked}
              onClick={() => removeCard(id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border-[3px] border-ink py-1.5 pl-1 pr-3 font-body font-semibold shadow-brut-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-80 ${meta.box} text-paper`}
            >
              <RoleAvatar role={card.role} size="xs" />
              {card.text}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-[56px] flex-wrap justify-center gap-2 rounded-xl border-[3px] border-dashed border-ink/40 bg-paper/70 p-3">
        {trayCards.length === 0 && <span className="text-xs text-ink/40">(パーツトレイは空)</span>}
        {trayCards.map((c) => (
          <button
            key={c.id}
            type="button"
            disabled={locked}
            onClick={() => addCard(c.id)}
            className="rounded-lg border-[3px] border-ink bg-paper px-3 py-2 font-body font-semibold shadow-brut-sm transition-transform active:translate-x-0 active:translate-y-0 disabled:opacity-50"
          >
            {c.text}
          </button>
        ))}
      </div>
    </div>
  );
}
