import type { PlanResult, QuizAnswers } from "../types";
import { fitnessCopy, obstacleCopy, preferredTimeCopy } from "./copyLogic";
import { buildSchedule, getBadDayWorkout, getExerciseSwaps } from "./workoutData";

function hasNoMajorLimitations(answers: QuizAnswers) {
  return answers.limitations.includes("none") || answers.limitations.length === 0;
}

function getRecommendedSessionTime(answers: QuizAnswers) {
  let recommended = answers.sessionTime;
  if (answers.confidence === "low") recommended = Math.min(recommended, 20) as 10 | 20;
  if (answers.fitnessLevel === "beginner") recommended = Math.min(recommended, 30) as 10 | 20 | 30;
  if (answers.fitnessLevel === "advanced" && answers.sessionTime === 45) recommended = 45;
  if (answers.obstacle === "busy") recommended = answers.sessionTime;
  return recommended;
}

function getPlanBase(answers: QuizAnswers): Pick<PlanResult, "planType" | "planSubtitle" | "planDescription" | "intensity"> {
  const lowImpact =
    answers.limitations.includes("knee") ||
    answers.limitations.includes("no_jumping") ||
    answers.workoutStyle === "low_impact";

  if (lowImpact) {
    return {
      planType: "Low-Impact Fat Loss Plan",
      planSubtitle: "Joint-friendly fat loss without random punishment.",
      planDescription:
        "This plan keeps the impact low while still helping you move more, build strength, and create the calorie-burning habit that supports fat loss.",
      intensity: "low",
    };
  }

  if (answers.fitnessLevel === "beginner" || answers.confidence === "low") {
    return {
      planType: "Beginner Momentum Plan",
      planSubtitle: "Build momentum without crushing your body.",
      planDescription:
        "This plan is designed to help you build momentum without crushing your body. The goal is to finish the week feeling capable, not destroyed.",
      intensity: "low",
    };
  }

  if (answers.sessionTime === 10 || answers.obstacle === "busy" || answers.preferredTime === "flexible") {
    return {
      planType: "Busy Schedule Plan",
      planSubtitle: "Short workouts, simple structure, real-life backup options.",
      planDescription:
        "This plan is designed for real life. Short workouts, simple structure, and a backup option for days when everything gets busy.",
      intensity: "medium",
    };
  }

  if (
    answers.fitnessLevel === "advanced" &&
    answers.confidence === "high" &&
    answers.sessionTime >= 30 &&
    hasNoMajorLimitations(answers)
  ) {
    return {
      planType: "Advanced Challenge Plan",
      planSubtitle: "Higher intensity home training for people ready for more.",
      planDescription:
        "This plan is built to challenge you with harder bodyweight sessions, higher intensity circuits, and more weekly volume.",
      intensity: "high",
    };
  }

  if (answers.mainGoal === "strength" || answers.workoutStyle === "strength") {
    return {
      planType: "Strength Starter Plan",
      planSubtitle: "Simple strength work using the equipment you have.",
      planDescription:
        "This plan focuses on building strength using simple home exercises so you can feel stronger, more capable, and more in control.",
      intensity: "medium",
    };
  }

  if (answers.mainGoal === "fitness" || answers.workoutStyle === "circuits") {
    return {
      planType: "Fitness Builder Plan",
      planSubtitle: "Conditioning, structure, and a clear week of movement.",
      planDescription:
        "This plan is designed to improve your conditioning, get your heart rate up, and help you feel fitter by the end of the week.",
      intensity: "medium",
    };
  }

  if (
    answers.mainGoal === "consistency" ||
    answers.obstacle === "all_or_nothing" ||
    answers.obstacle === "motivation"
  ) {
    return {
      planType: "Consistency Reset Plan",
      planSubtitle: "Stop starting over. Build a repeatable week.",
      planDescription:
        "This plan is built around consistency first. The goal is not perfection. The goal is to stop starting over and prove you can keep showing up.",
      intensity: answers.confidence === "high" ? "medium" : "low",
    };
  }

  return {
    planType: "Standard Fat Loss Plan",
    planSubtitle: "Strength, steps, recovery, and simple circuits.",
    planDescription:
      "This plan combines strength, steps, simple circuits, and recovery so you can burn more calories without relying on extreme workouts.",
    intensity: "medium",
  };
}

function getStepTarget(answers: QuizAnswers) {
  if (answers.limitations.includes("knee")) {
    return "Use comfortable walking only. Your target is consistency, not pain.";
  }

  const targets = {
    beginner: "Aim for 6,000 steps per day or add 2,000 steps to your current average.",
    returning: "Aim for 7,000-8,000 steps per day.",
    active: "Aim for 8,000-10,000 steps per day.",
    advanced: "Aim for 10,000+ steps per day.",
  };

  return targets[answers.fitnessLevel];
}

function getConsistencyRule(answers: QuizAnswers) {
  const rules = {
    busy: "Your rule: never skip completely. On busy days, do the 5-minute fallback workout.",
    motivation:
      "Your rule: do not wait to feel motivated. Start with the warm-up only, then decide if you want to continue.",
    confusion:
      "Your rule: follow the plan exactly as written for 7 days. Do not swap workouts unless using the approved substitutions.",
    soreness:
      "Your rule: leave 2 reps in the tank and use the easier version whenever soreness affects your form.",
    all_or_nothing:
      "Your rule: missing one day does not restart the plan. Continue with the next day.",
  };

  return rules[answers.obstacle];
}

function getNutritionFocus(answers: QuizAnswers) {
  const focus = {
    fat_loss:
      "Focus on protein at every meal and keep your portions consistent. Workouts help, but fat loss still comes from a calorie deficit over time.",
    strength:
      "Focus on protein and regular meals so your body has enough fuel to train and recover.",
    fitness: "Focus on hydration, protein, and not under-eating before workouts.",
    consistency:
      "Do not overhaul your whole diet this week. Start with one protein serving at each meal.",
    confidence:
      "Keep nutrition simple. Build trust with yourself by hitting one easy daily target: protein with your first meal.",
  };

  return focus[answers.mainGoal];
}

function getRecoveryAdvice(answers: QuizAnswers) {
  if (answers.limitations.some((limitation) => ["back", "knee", "shoulder"].includes(limitation))) {
    return "Use the pain-free exercise options and stop any movement that causes sharp pain. This plan should feel challenging, not risky.";
  }

  if (answers.obstacle === "soreness" || answers.fitnessLevel === "beginner") {
    return "Keep the workouts controlled and avoid going to failure. Your goal is to be able to train again tomorrow.";
  }

  if (answers.workoutStyle === "circuits" || answers.fitnessLevel === "advanced") {
    return "Push the hard days, but protect your recovery. Sleep, walking, and mobility will help you perform better.";
  }

  return "Use Day 4 as your reset day. Recovery is part of the plan, not a sign that you are falling behind.";
}

function goalLabel(goal: QuizAnswers["mainGoal"]) {
  return {
    fat_loss: "fat loss",
    fitness: "fitness",
    strength: "strength",
    consistency: "consistency",
    confidence: "confidence",
  }[goal];
}

export function generatePlan(answers: QuizAnswers): PlanResult {
  const base = getPlanBase(answers);
  const recommendedSessionTime = getRecommendedSessionTime(answers);
  const weeklyGoal = `Complete ${answers.trainingDays} workouts, hit your step target on most days, and use the 5-minute fallback workout instead of skipping.`;
  const dynamicDescription = [
    base.planDescription,
    fitnessCopy[answers.fitnessLevel],
    obstacleCopy[answers.obstacle],
    preferredTimeCopy[answers.preferredTime],
  ].join(" ");

  const resultShell = {
    ...base,
    planDescription: dynamicDescription,
    recommendedSessionTime,
    weeklyGoal,
    stepTarget: getStepTarget(answers),
    consistencyRule: getConsistencyRule(answers),
    recoveryAdvice: getRecoveryAdvice(answers),
    nutritionFocus: getNutritionFocus(answers),
    schedule: [],
    badDayWorkout: getBadDayWorkout(answers),
    exerciseSwaps: getExerciseSwaps(answers),
    nextStepRecommendation: `You have your 7-day ${goalLabel(answers.mainGoal)} starting plan. If you want the full system built around your body, schedule, nutrition, tracking, and accountability, apply for NORT coaching next.`,
  } satisfies PlanResult;

  return {
    ...resultShell,
    schedule: buildSchedule(resultShell, answers),
  };
}
