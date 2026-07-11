import { useState } from 'react';
import type { DecomposeProblem } from '../data/types';
import { roleMeta } from '../lib/roles';
import RoleAvatar from './RoleAvatar';

interface Props {
  problem: DecomposeProblem;
  onDone: () => void;
}

export default function ProblemDecompose({ problem, onDone }: Props) {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border-[3px] border-ink bg-paper p-4 text-center shadow-brut-sm">
        <p className="font-body text-xl font-bold">{problem.jpSentence}</p>
      </div>

      {step >= 1 && (
        <div className="flex animate-slide-in items-center justify-center gap-2 rounded-xl border-[3px] border-ink bg-bone p-3 shadow-brut-sm">
          <span className="rounded-md border-2 border-ink bg-s px-3 py-1 font-bold text-paper">{problem.stage1.main}</span>
          <span className="text-ink/40">｜</span>
          <span className="rounded-md border-2 border-ink bg-c px-3 py-1 font-bold text-paper">{problem.stage1.desc}</span>
        </div>
      )}

      {step >= 2 && (
        <div className="flex animate-slide-in items-center justify-center gap-2 rounded-xl border-[3px] border-ink bg-bone p-3 shadow-brut-sm">
          <span className="rounded-md border-2 border-ink bg-s px-3 py-1 font-bold text-paper">{problem.stage2.subject}</span>
          <span className="text-ink/40">｜</span>
          <span className="rounded-md border-2 border-ink bg-v px-3 py-1 font-bold text-paper">{problem.stage2.link}</span>
          <span className="text-ink/40">｜</span>
          <span className="rounded-md border-2 border-ink bg-c px-3 py-1 font-bold text-paper">{problem.stage2.content}</span>
        </div>
      )}

      {step >= 3 && (
        <div className="flex animate-slide-in flex-wrap items-center justify-center gap-2 rounded-xl border-[3px] border-ink bg-paper p-4 shadow-brut-sm">
          {problem.english.map((w) => {
            const meta = roleMeta[w.role];
            return (
              <span key={w.id} className={`inline-flex items-center gap-1.5 rounded-md border-2 border-ink py-1 pl-1 pr-3 font-bold ${meta.box} text-paper`}>
                <RoleAvatar role={w.role} size="xs" />
                {w.text} <span className="text-xs opacity-80">{meta.short}</span>
              </span>
            );
          })}
        </div>
      )}

      {step < 3 ? (
        <button
          type="button"
          onClick={() => setStep((s) => s + 1)}
          className="rounded-xl border-[3px] border-ink bg-factory-orange py-3 font-head font-bold text-white shadow-brut-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          {step === 0 ? '主役と説明に分ける' : step === 1 ? '工場用の形に変換する' : '英語にする'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onDone}
          className="rounded-xl border-[3px] border-ink bg-o py-3 font-head font-bold text-white shadow-brut-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          検品OK！次の問題へ
        </button>
      )}
    </div>
  );
}
