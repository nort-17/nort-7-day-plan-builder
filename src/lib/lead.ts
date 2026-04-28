import type { LeadData, PlanResult, QuizAnswers } from "../types";

export async function submitLead(
  data: LeadData,
  answers: QuizAnswers,
  result: PlanResult,
) {
  console.log("Lead submitted", { data, answers, result });
}
