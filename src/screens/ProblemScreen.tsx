import { useEffect, useRef, useState } from 'react';
import { findLevel } from '../data/levels';
import SvocLegend from '../components/SvocLegend';
import ProblemSort from '../components/ProblemSort';
import ProblemSelect from '../components/ProblemSelect';
import ProblemBuild from '../components/ProblemBuild';
import ProblemDecompose from '../components/ProblemDecompose';
import ConveyorGame from '../components/ConveyorGame';
import DoComicModal from '../components/DoComicModal';
import ConfettiOverlay from '../components/ConfettiOverlay';
import PronounTable from '../components/PronounTable';
import { checkBuild, checkSelect, checkSort, initSortAttempt, isSortComplete } from '../lib/check';
import type { BuildAttempt, SelectAttempt, SortAttempt } from '../lib/check';
import { markLevelCleared } from '../lib/progress';
import { playCorrect, playLevelClear, playWrong } from '../lib/sound';

interface Props {
  levelId: string;
  onExit: () => void;
  onLevelCleared: () => void;
}

type Status = 'answering' | 'correct' | 'wrong';

export default function ProblemScreen({ levelId, onExit, onLevelCleared }: Props) {
  const level = findLevel(levelId);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>('answering');
  const [sortAttempt, setSortAttempt] = useState<SortAttempt>({});
  const [selectAttempt, setSelectAttempt] = useState<SelectAttempt>(null);
  const [buildAttempt, setBuildAttempt] = useState<BuildAttempt>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [showComic, setShowComic] = useState(!!level?.hasComicIntro);
  const [showCelebration, setShowCelebration] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const problem = level?.problems[index];

  useEffect(() => {
    if (!problem) return;
    if (problem.type === 'sort') setSortAttempt(initSortAttempt(problem));
    else setSortAttempt({});
    setSelectAttempt(null);
    setBuildAttempt([]);
    setStatus('answering');
  }, [problem?.id]);

  useEffect(() => {
    if (status === 'correct' && nextBtnRef.current) {
      nextBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  if (!level || !problem) return null;

  const isLast = index === level.problems.length - 1;

  function judge() {
    let correct = false;
    if (problem!.type === 'sort') correct = isSortComplete(problem!, sortAttempt) && checkSort(problem!, sortAttempt);
    if (problem!.type === 'select') correct = checkSelect(problem!, selectAttempt);
    if (problem!.type === 'build') correct = checkBuild(problem!, buildAttempt);

    if (correct) {
      setStatus('correct');
      playCorrect();
    } else {
      setStatus('wrong');
      setWrongCount((c) => c + 1);
      playWrong();
    }
  }

  function retry() {
    if (problem!.type === 'sort') setSortAttempt(initSortAttempt(problem!));
    if (problem!.type === 'select') setSelectAttempt(null);
    if (problem!.type === 'build') setBuildAttempt([]);
    setStatus('answering');
  }

  function goNext() {
    if (isLast) {
      const stars = wrongCount === 0 ? 3 : wrongCount <= 2 ? 2 : 1;
      markLevelCleared(level!.id, stars);
      playLevelClear();
      setShowCelebration(true);
      setTimeout(() => {
        onLevelCleared();
      }, 2200);
    } else {
      setIndex((i) => i + 1);
      requestAnimationFrame(() => {
        questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  const canJudge =
    (problem.type === 'sort' && isSortComplete(problem, sortAttempt)) ||
    (problem.type === 'select' && selectAttempt !== null) ||
    (problem.type === 'build' && buildAttempt.length === problem.answerOrder.length);

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-4 px-4 py-6">
      {showComic && <DoComicModal onClose={() => setShowComic(false)} />}
      {showCelebration && <ConfettiOverlay />}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40">
          <div className="animate-pop rounded-2xl border-[4px] border-ink bg-help px-8 py-6 text-center shadow-brut-lg">
            <p className="font-display text-3xl">検品OK!!</p>
            <p className="mt-1 font-head font-bold">{level.title} クリア！</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label="レベル一覧へ戻る"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-paper shadow-brut-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          ←
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-head text-sm font-bold">{level.title}</p>
          <p className="truncate text-xs text-ink/50">{level.factoryTerm}</p>
        </div>
        <div className="shrink-0 rounded-full border-[3px] border-ink bg-paper px-3 py-1 text-xs font-bold shadow-brut-sm">
          {index + 1} / {level.problems.length}
        </div>
      </div>

      <div className="h-2 w-full rounded-full border-2 border-ink bg-paper">
        <div
          className="h-full rounded-full bg-factory-orange transition-all"
          style={{ width: `${((index + (status === 'correct' ? 1 : 0)) / level.problems.length) * 100}%` }}
        />
      </div>

      {level.keyword && (
        <div className="rounded-lg border-2 border-dashed border-ink/40 bg-paper/70 px-3 py-1.5 text-center text-xs font-bold text-ink/70">
          合言葉: {level.keyword}
        </div>
      )}

      <SvocLegend />

      {level.hasPronounTable && index === 0 && <PronounTable />}

      <div ref={questionRef} className="flex flex-col gap-3 scroll-mt-4">
        {problem.advanced && (
          <div className="mx-auto inline-flex items-center gap-1 rounded-full border-2 border-ink bg-help px-3 py-1 text-xs font-bold text-ink shadow-brut-sm">
            <span>⚡</span>
            <span>ちょっと先取り(中3の内容)</span>
          </div>
        )}
        <div className="rounded-xl border-[3px] border-ink bg-paper p-3 text-center shadow-brut-sm">
          <p className="font-body text-base font-semibold">{problem.jp}</p>
        </div>

        {problem.type === 'decompose' && <ProblemDecompose key={problem.id} problem={problem} onDone={goNext} />}
        {problem.type === 'conveyor' && <ConveyorGame key={problem.id} problem={problem} onComplete={goNext} />}
        {problem.type === 'sort' && (
          <ProblemSort key={problem.id} problem={problem} attempt={sortAttempt} onChange={setSortAttempt} locked={status !== 'answering'} />
        )}
        {problem.type === 'select' && (
          <ProblemSelect key={problem.id} problem={problem} attempt={selectAttempt} onChange={setSelectAttempt} locked={status !== 'answering'} />
        )}
        {problem.type === 'build' && (
          <ProblemBuild key={problem.id} problem={problem} attempt={buildAttempt} onChange={setBuildAttempt} locked={status !== 'answering'} />
        )}

        {problem.type !== 'decompose' && problem.type !== 'conveyor' && problem.hint && status === 'answering' && (
          <p className="text-center text-xs text-ink/50">ヒント: {problem.hint}</p>
        )}

        {status === 'wrong' && (
          <div className="animate-shake rounded-xl border-[3px] border-ink bg-v/20 p-3 text-center">
            <p className="font-head font-bold text-v-dark">おしい！もう一度検品しよう</p>
            <button
              type="button"
              onClick={retry}
              className="mt-2 rounded-lg border-[3px] border-ink bg-paper px-4 py-2 font-bold shadow-brut-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              選び直す
            </button>
          </div>
        )}

        {status === 'correct' && (
          <div className="animate-pop rounded-xl border-[3px] border-ink bg-o/20 p-3 text-center">
            <p className="font-head font-bold text-o-dark">検品OK！正解です</p>
            {problem.type === 'build' && problem.progressive && (
              <div className="mt-2 flex flex-col items-center gap-1">
                {problem.progressive.map((p, i) => (
                  <p key={i} className="text-sm text-ink/70">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <button
              ref={nextBtnRef}
              type="button"
              onClick={goNext}
              className="mt-3 w-full rounded-xl border-[3px] border-ink bg-factory-orange py-3 font-head font-bold text-white shadow-brut-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              {isLast ? 'レベルクリア！' : '次の問題へ'}
            </button>
          </div>
        )}

        {status === 'answering' && problem.type !== 'decompose' && problem.type !== 'conveyor' && (
          <button
            type="button"
            onClick={judge}
            disabled={!canJudge}
            className="rounded-xl border-[3px] border-ink bg-ink py-3 font-head font-bold text-bone shadow-brut-sm transition-opacity active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-30"
          >
            検品する
          </button>
        )}
      </div>
    </div>
  );
}
