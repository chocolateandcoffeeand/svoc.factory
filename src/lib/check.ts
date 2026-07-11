import type { BuildProblem, SelectProblem, SortProblem } from '../data/types';

export type SortAttempt = Record<string, string | null>; // wordId -> Role | null
export type SelectAttempt = string | null;
export type BuildAttempt = string[]; // ordered word ids

export function initSortAttempt(problem: SortProblem): SortAttempt {
  const attempt: SortAttempt = {};
  problem.words.forEach((w) => {
    attempt[w.id] = null;
  });
  return attempt;
}

export function isSortComplete(problem: SortProblem, attempt: SortAttempt): boolean {
  return problem.words.every((w) => attempt[w.id] !== null);
}

export function checkSort(problem: SortProblem, attempt: SortAttempt): boolean {
  return problem.words.every((w) => attempt[w.id] === w.role);
}

export function checkSelect(problem: SelectProblem, attempt: SelectAttempt): boolean {
  return attempt === problem.answer;
}

export function checkBuild(problem: BuildProblem, attempt: BuildAttempt): boolean {
  if (attempt.length !== problem.answerOrder.length) return false;
  return attempt.every((id, i) => id === problem.answerOrder[i]);
}
