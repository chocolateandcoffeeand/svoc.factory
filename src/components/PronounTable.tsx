import RoleAvatar from './RoleAvatar';

const ROWS = [
  { label: 'I', s: 'I', mod: 'my', o: 'me', c: 'mine' },
  { label: 'you', s: 'you', mod: 'your', o: 'you', c: 'yours' },
  { label: 'he', s: 'he', mod: 'his', o: 'him', c: 'his' },
  { label: 'she', s: 'she', mod: 'her', o: 'her', c: 'hers' },
  { label: 'we', s: 'we', mod: 'our', o: 'us', c: 'ours' },
  { label: 'they', s: 'they', mod: 'their', o: 'them', c: 'theirs' },
];

export default function PronounTable() {
  return (
    <div className="overflow-x-auto rounded-xl border-[3px] border-ink shadow-brut-sm">
      <table className="w-full min-w-[460px] border-collapse bg-paper text-center text-sm">
        <thead>
          <tr className="text-paper">
            <th className="p-2 font-head bg-s">
              <div className="flex items-center justify-center gap-1">
                <RoleAvatar role="S" size="xs" /> 主役の場所
              </div>
            </th>
            <th className="p-2 font-head bg-mod">
              <div className="flex items-center justify-center gap-1">
                <RoleAvatar role="MOD" size="xs" /> 名詞の前
              </div>
            </th>
            <th className="p-2 font-head bg-o">
              <div className="flex items-center justify-center gap-1">
                <RoleAvatar role="O" size="xs" /> 動きの相手
              </div>
            </th>
            <th className="p-2 font-head bg-c">
              <div className="flex items-center justify-center gap-1">
                <RoleAvatar role="C" size="xs" /> ひとりで「〜のもの」
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-t-2 border-ink">
              <td className="p-2 font-bold text-s-dark">{r.s}</td>
              <td className="p-2 font-bold text-mod-dark">{r.mod}</td>
              <td className="p-2 font-bold text-o-dark">{r.o}</td>
              <td className="p-2 font-bold text-c-dark">{r.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
