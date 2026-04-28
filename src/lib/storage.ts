import type { LeadData, PlanResult, QuizAnswers } from "../types";

const keys = {
  answers: "nort-plan-builder-answers",
  lead: "nort-plan-builder-lead",
  result: "nort-plan-builder-result",
  completed: "nort-plan-builder-completed",
};

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export const storage = {
  loadAnswers: () => readJson<Partial<QuizAnswers>>(keys.answers),
  saveAnswers: (answers: Partial<QuizAnswers>) =>
    localStorage.setItem(keys.answers, JSON.stringify(answers)),
  loadLead: () => readJson<LeadData>(keys.lead),
  saveLead: (lead: LeadData) => localStorage.setItem(keys.lead, JSON.stringify(lead)),
  loadResult: () => readJson<PlanResult>(keys.result),
  saveResult: (result: PlanResult) =>
    localStorage.setItem(keys.result, JSON.stringify(result)),
  loadCompleted: () => readJson<number[]>(keys.completed) ?? [],
  saveCompleted: (days: number[]) =>
    localStorage.setItem(keys.completed, JSON.stringify(days)),
  clearAll: () => Object.values(keys).forEach((key) => localStorage.removeItem(key)),
};
