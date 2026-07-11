import type { Role } from '../data/types';

interface RoleMeta {
  label: string;
  short: string;
  name: string; // キャラクターの呼び名
  img: string; // 小人キャラクター画像
  box: string; // 濃色bg + 白文字用(バッジ・箱見出し)
  soft: string; // 淡色bg(カード本体用)
  border: string; // 枠線色
  text: string; // 淡色bg上の文字色
  boxShadow: string;
}

// Record-map indirection: すべて全リテラルのTailwindクラス(補間しない = JITパージ対策)
export const roleMeta: Record<Role, RoleMeta> = {
  S: {
    label: '主語',
    short: 'S',
    name: 'Sくん',
    img: '/characters/worker-s.png',
    box: 'bg-s',
    soft: 'bg-s/15',
    border: 'border-s-dark',
    text: 'text-s-dark',
    boxShadow: 'shadow-brut-sm',
  },
  V: {
    label: '動詞',
    short: 'V',
    name: 'Vくん',
    img: '/characters/worker-v.png',
    box: 'bg-v',
    soft: 'bg-v/15',
    border: 'border-v-dark',
    text: 'text-v-dark',
    boxShadow: 'shadow-brut-sm',
  },
  O: {
    label: '目的語',
    short: 'O',
    name: 'Oくん',
    img: '/characters/worker-o.png',
    box: 'bg-o',
    soft: 'bg-o/15',
    border: 'border-o-dark',
    text: 'text-o-dark',
    boxShadow: 'shadow-brut-sm',
  },
  C: {
    label: '補語',
    short: 'C',
    name: 'Cくん',
    img: '/characters/worker-c.png',
    box: 'bg-c',
    soft: 'bg-c/15',
    border: 'border-c-dark',
    text: 'text-c-dark',
    boxShadow: 'shadow-brut-sm',
  },
  HELP: {
    label: 'お助けパーツ',
    short: '助',
    name: 'Aくん',
    img: '/characters/worker-help.png',
    box: 'bg-help',
    soft: 'bg-help/15',
    border: 'border-help-dark',
    text: 'text-help-dark',
    boxShadow: 'shadow-brut-sm',
  },
  MOD: {
    label: '名詞の前パーツ',
    short: '前',
    name: 'Mさん',
    img: '/characters/worker-mod.png',
    box: 'bg-mod',
    soft: 'bg-mod/15',
    border: 'border-mod-dark',
    text: 'text-mod-dark',
    boxShadow: 'shadow-brut-sm',
  },
};
