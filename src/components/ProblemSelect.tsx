import type { SelectProblem } from '../data/types';
import { roleMeta } from '../lib/roles';
import type { SelectAttempt } from '../lib/check';
import RoleAvatar from './RoleAvatar';

interface Props {
  problem: SelectProblem;
  attempt: SelectAttempt;
  onChange: (attempt: SelectAttempt) => void;
  locked: boolean;
}

export default function ProblemSelect({ problem, attempt, onChange, locked }: Props) {
  const isFullSentenceMode = problem.before === '' && problem.after === '' && problem.previewWords.length === 0;
  const blankMeta = roleMeta[problem.blankRole];

  return (
    <div className="flex flex-col gap-4">
      {!isFullSentenceMode && (
        <div className="rounded-xl border-[3px] border-ink bg-paper p-4 text-center shadow-brut-sm">
          <p className="font-body text-lg leading-relaxed">
            {problem.before}
            <span
              className={`mx-1 inline-block min-w-[64px] rounded-md border-2 border-dashed px-2 py-0.5 align-middle font-bold
                ${attempt ? `${blankMeta.box} border-ink text-paper` : 'border-ink/40 text-ink/30'}`}
            >
              {attempt ?? '？'}
            </span>
            {problem.after}
          </p>
          {problem.previewWords.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1">
              {problem.previewWords.map((w) => {
                const meta = roleMeta[w.role];
                const isBlank = w.id === 'b';
                return (
                  <span
                    key={w.id}
                    className={`inline-flex items-center gap-1 rounded-md border-2 border-ink py-0.5 pl-0.5 pr-2 text-xs font-semibold
                      ${isBlank ? (attempt ? `${meta.box} text-paper` : 'bg-paper text-ink') : `${meta.box} text-paper`}`}
                  >
                    <RoleAvatar role={w.role} size="xs" />
                    {isBlank ? (attempt ?? '(  )') : w.text} <span className="opacity-80">{meta.short}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {problem.hint && !isFullSentenceMode && (
        <p className="text-center text-xs text-ink/50">{problem.hint}</p>
      )}

      <div className={isFullSentenceMode ? 'flex flex-col gap-2' : 'flex flex-wrap justify-center gap-2'}>
        {problem.options.map((opt) => (
          <button
            key={opt}
            type="button"
            disabled={locked}
            onClick={() => onChange(opt)}
            className={`rounded-lg border-[3px] border-ink font-body font-semibold shadow-brut-sm transition-transform
              ${isFullSentenceMode ? 'px-4 py-3 text-left text-base' : 'px-4 py-2 text-base'}
              ${attempt === opt ? 'bg-help text-paper -translate-x-[3px] -translate-y-[3px] shadow-brut' : 'bg-paper'}
              active:translate-x-0 active:translate-y-0 disabled:opacity-60`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
