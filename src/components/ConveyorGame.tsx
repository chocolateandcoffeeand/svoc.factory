import { useEffect, useMemo, useRef, useState } from 'react';
import type { ConveyorProblem } from '../data/types';
import { playCorrect, playWrong } from '../lib/sound';

interface Props {
  problem: ConveyorProblem;
  onComplete: () => void;
}

type Phase = 'sorting' | 'wrong' | 'combine';

const SLIDE_POSITIONS = [6, 40, 74]; // % left anchor: 左・真ん中・右
const SLIDE_INTERVAL_MS = 5000;

export default function ConveyorGame({ problem, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('sorting');
  const [selected, setSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });
  const [reason, setReason] = useState<string | null>(null);
  const [slideStep, setSlideStep] = useState(0);

  const laneRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dragging = useRef(false);
  const moved = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const phaseRef = useRef<Phase>('sorting');
  phaseRef.current = phase;

  const item = problem.items[index];
  const cleared = index;
  const total = problem.items.length;

  useEffect(() => {
    setSlideStep(0);
    const timer = setInterval(() => {
      if (dragging.current || phaseRef.current !== 'sorting') return;
      setSlideStep((p) => (p + 1) % SLIDE_POSITIONS.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [index]);

  function resetCardPosition() {
    setIsDragging(false);
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (phase !== 'sorting') return;
    dragging.current = true;
    moved.current = false;
    startPoint.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging.current || phase !== 'sorting') return;
    if (!moved.current) {
      const dx = e.clientX - startPoint.current.x;
      const dy = e.clientY - startPoint.current.y;
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      moved.current = true;
      setIsDragging(true);
    }
    setDragPoint({ x: e.clientX, y: e.clientY });
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    if (phase !== 'sorting') return;

    if (!moved.current) {
      setSelected((s) => !s);
      resetCardPosition();
      return;
    }

    let hitLane: string | null = null;
    for (const [key, el] of Object.entries(laneRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        hitLane = key;
        break;
      }
    }
    setSelected(false);
    if (hitLane) {
      attemptDrop(hitLane);
    } else {
      resetCardPosition();
    }
  }

  function handleLaneClick(laneKey: string) {
    if (phase !== 'sorting') return;
    if (!selected) return;
    setSelected(false);
    attemptDrop(laneKey);
  }

  function attemptDrop(laneKey: string) {
    if (laneKey === item.laneKey) {
      playCorrect();
      setPhase('combine');
      setTimeout(() => {
        resetCardPosition();
        if (index + 1 >= total) {
          onComplete();
        } else {
          setIndex((i) => i + 1);
          setPhase('sorting');
        }
      }, 1300);
    } else {
      playWrong();
      setPhase('wrong');
      setReason(item.reason);
      setTimeout(() => {
        resetCardPosition();
        setPhase('sorting');
        setReason(null);
      }, 1900);
    }
  }

  const cardStyle = useMemo((): React.CSSProperties => {
    if (isDragging) {
      // ドラッグ中はビューポート基準のposition:fixedにして、
      // ベルトのoverflow-hiddenに切り取られず搬入口の上まで運べるようにする
      return {
        position: 'fixed',
        left: dragPoint.x,
        top: dragPoint.y,
        transform: 'translate(-50%, -50%)',
        transition: 'none',
        zIndex: 50,
      };
    }
    return {
      position: 'absolute',
      left: `${SLIDE_POSITIONS[slideStep]}%`,
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'left 1s ease-in-out',
    };
  }, [isDragging, dragPoint, slideStep]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center font-body text-sm text-ink/60">
        カードをレーンへドラッグ、またはタップで選んで搬入口をタップしよう ({cleared} / {total})
      </p>

      <div className="flex gap-2 rounded-xl border-[3px] border-ink p-3 shadow-brut-sm">
        <div className="belt-surface relative min-h-[112px] flex-1 overflow-hidden rounded-lg border-2 border-ink/50">
          {phase === 'combine' ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-combine-pop rounded-xl border-[3px] border-ink bg-help px-6 py-3 text-center shadow-brut-sm">
              <p className="font-body text-sm text-ink/70">{item.equation}</p>
              <p className="font-head text-2xl font-extrabold text-ink">{item.combined}</p>
            </div>
          ) : (
            <button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={cardStyle}
              className={`absolute touch-none select-none rounded-xl border-[3px] border-ink bg-paper px-5 py-3 font-head text-2xl font-extrabold shadow-brut-sm
                ${selected ? 'ring-4 ring-help/70' : ''}
                ${phase === 'wrong' ? 'animate-shake' : ''}`}
            >
              {item.subject}
            </button>
          )}
        </div>

        <div className="flex w-28 shrink-0 flex-col gap-2">
          {problem.lanes.map((lane) => (
            <button
              key={lane.key}
              ref={(el) => {
                laneRefs.current[lane.key] = el;
              }}
              type="button"
              onClick={() => handleLaneClick(lane.key)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border-[3px] border-dashed border-ink bg-bone px-1 py-3 shadow-brut-sm transition-transform
                ${selected ? 'ring-4 ring-help/70' : ''}`}
            >
              <span className="font-head text-base font-extrabold leading-tight">{lane.label}</span>
              {lane.sub && <span className="text-[10px] leading-tight text-ink/60">{lane.sub}</span>}
            </button>
          ))}
        </div>
      </div>

      {reason && (
        <div className="rounded-xl border-[3px] border-ink bg-v/15 p-3 text-center">
          <p className="font-body text-sm font-bold text-v-dark">{reason}</p>
        </div>
      )}
    </div>
  );
}
