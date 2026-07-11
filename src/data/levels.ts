import type { ProductionLine } from './types';
import { line1Levels } from './line1';
import { line2Levels } from './line2';

export const productionLines: ProductionLine[] = [
  {
    id: 'line1',
    title: '生産ライン1',
    subtitle: '英文の部品を見つける',
    levels: line1Levels,
  },
  {
    id: 'line2',
    title: '生産ライン2',
    subtitle: '形チェンジ工場',
    levels: line2Levels,
  },
];

export function findLevel(levelId: string) {
  for (const line of productionLines) {
    const level = line.levels.find((l) => l.id === levelId);
    if (level) return level;
  }
  return undefined;
}

export function nextLevelId(levelId: string): string | undefined {
  const all = productionLines.flatMap((l) => l.levels);
  const idx = all.findIndex((l) => l.id === levelId);
  if (idx === -1 || idx === all.length - 1) return undefined;
  return all[idx + 1].id;
}
