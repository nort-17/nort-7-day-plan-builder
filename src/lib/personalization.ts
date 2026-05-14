import type { QuizAnswers } from "../types";

export function getPersonalizationReasons(answers: QuizAnswers) {
  const reasons: string[] = [];

  if (answers.limitations.includes("knee") || answers.limitations.includes("no_jumping")) {
    reasons.push("Because you flagged knee discomfort or no jumping, your plan keeps impact low.");
  }

  if (answers.confidence === "low" || answers.fitnessLevel === "beginner") {
    reasons.push("Because you are building confidence, the goal is momentum first, not punishment.");
  }

  if (answers.obstacle === "busy" || answers.sessionTime === 10) {
    reasons.push("Because time is the obstacle, your plan includes a 5-minute fallback instead of an all-or-nothing miss.");
  }

  if (answers.workoutStyle === "strength" || answers.mainGoal === "strength") {
    reasons.push("Because you chose strength, the plan prioritises controlled reps and simple resistance work.");
  }

  if (answers.workoutStyle === "circuits" || answers.mainGoal === "fitness") {
    reasons.push("Because you want fitness, the plan includes conditioning without turning every day into a max-effort session.");
  }

  if (answers.equipment !== "none") {
    reasons.push("Because you have equipment at home, some exercises adapt to what you already own.");
  }

  if (answers.obstacle === "motivation" || answers.obstacle === "all_or_nothing") {
    reasons.push("Because consistency is the real bottleneck, missing one day does not restart the plan.");
  }

  return reasons.slice(0, 3);
}
