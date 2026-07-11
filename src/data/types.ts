// SVOC + 補助パーツの役割。Role が増えたら roleMeta (lib/roles.ts) の Record を必ず更新する。
export type Role = 'S' | 'V' | 'O' | 'C' | 'HELP' | 'MOD';

export interface Word {
  id: string;
  text: string;
  role: Role;
}

interface BaseProblem {
  id: string;
  jp: string;
  hint?: string;
  advanced?: boolean; // trueの問題は「ちょっと先取り」バッジを表示する
}

// Lv.0 専用: 日本語の「主役｜説明」分解 → 工場用の形 → 英語 の3段接続
export interface DecomposeProblem extends BaseProblem {
  type: 'decompose';
  jpSentence: string;
  stage1: { main: string; desc: string };
  stage2: { subject: string; link: string; content: string };
  english: Word[];
}

// 仕分け問題: カードをS/V/O/C等の箱に入れる
export interface SortProblem extends BaseProblem {
  type: 'sort';
  sentenceEn: string;
  words: Word[];
  boxes: Role[];
}

// 選択問題: 選択肢を空欄にはめ込み、文全体の色分けプレビューを見せる
export interface SelectProblem extends BaseProblem {
  type: 'select';
  before: string;
  after: string;
  options: string[];
  answer: string;
  blankRole: Role;
  previewWords: Word[];
  keyword?: string;
}

// 組み立て問題: 単語カードをタップ/ドラッグで並べ替える
export interface BuildProblem extends BaseProblem {
  type: 'build';
  cards: Word[];
  answerOrder: string[];
  progressive?: string[];
}

// コンベア仕分けゲーム: 主語カードが流れてきて、正しい搬入口へドラッグ/タップで仕分ける
export interface ConveyorLane {
  key: string;
  label: string;
  sub?: string;
}

export interface ConveyorItem {
  id: string;
  subject: string;
  laneKey: string;
  reason: string;
  equation: string; // 例: "He + play + s" 結合前
  combined: string; // 例: "plays" 結合後
}

export interface ConveyorProblem extends BaseProblem {
  type: 'conveyor';
  lanes: ConveyorLane[];
  items: ConveyorItem[];
}

export type Problem = DecomposeProblem | SortProblem | SelectProblem | BuildProblem | ConveyorProblem;

export interface Level {
  id: string;
  lineId: 'line1' | 'line2';
  number: number;
  title: string;
  factoryTerm: string;
  explain: string;
  keyword?: string;
  problems: Problem[];
  hasComicIntro?: boolean;
  hasPronounTable?: boolean;
}

export interface ProductionLine {
  id: 'line1' | 'line2';
  title: string;
  subtitle: string;
  levels: Level[];
}
