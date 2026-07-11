interface Props {
  onClose: () => void;
}

const PANELS = [
  { emoji: '🧑‍🏭', text: '昔むかし、do は一般動詞のそばに\nいつもいた助手だったんだ。' },
  { emoji: '🙈', text: '肯定文では do は姿を隠して\n見えなくなっちゃった…' },
  { emoji: '💪', text: 'でも疑問文・否定文では\n今も現役でバリバリ活躍中！' },
  { emoji: '💬', text: '"Yes, I do." の do の後ろには\n実は play soccer が隠れてるんだ。' },
];

export default function DoComicModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl border-[4px] border-ink bg-paper p-5 shadow-brut-lg animate-pop">
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-v text-lg font-bold text-white shadow-brut-sm"
        >
          ×
        </button>
        <h3 className="mb-3 text-center font-head text-xl font-extrabold">Doのミニ漫画</h3>
        <div className="flex flex-col gap-3">
          {PANELS.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border-[3px] border-ink bg-paper p-3 shadow-brut-sm">
              <span className="text-3xl">{p.emoji}</span>
              <p className="whitespace-pre-line text-sm font-medium leading-snug">{p.text}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl border-[3px] border-ink bg-factory-orange py-2 font-head font-bold text-white shadow-brut-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          わかった！生産ラインへ
        </button>
      </div>
    </div>
  );
}
