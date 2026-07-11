const KEY = 'bunpou-factory-progress-v1';

export interface ProgressState {
  clearedLevels: Record<string, number>; // levelId -> stars(1-3)
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { clearedLevels: {} };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.clearedLevels) return parsed;
  } catch {
    // ignore corrupt storage
  }
  return { clearedLevels: {} };
}

function save(state: ProgressState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getProgress(): ProgressState {
  return load();
}

export function markLevelCleared(levelId: string, stars: number) {
  const state = load();
  const prevStars = state.clearedLevels[levelId] ?? 0;
  state.clearedLevels[levelId] = Math.max(prevStars, stars);
  save(state);
  return state;
}

export function isLevelCleared(levelId: string): boolean {
  return load().clearedLevels[levelId] !== undefined;
}

export function totalStars(): number {
  const state = load();
  return Object.values(state.clearedLevels).reduce((a, b) => a + b, 0);
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}
