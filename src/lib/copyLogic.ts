import type { FitnessLevel, Obstacle } from "../types";

export const fitnessCopy: Record<FitnessLevel, string> = {
  beginner:
    "You do not need to train like an athlete this week. You need to build proof that you can show up consistently.",
  returning:
    "You have done this before. This week is about rebuilding rhythm without trying to make up for lost time.",
  active:
    "You already have a base. This plan gives you structure so your effort turns into consistency.",
  advanced:
    "You are ready for more challenge, but the goal is still smart training, not random punishment.",
};

export const obstacleCopy: Record<Obstacle, string> = {
  busy:
    "Your plan includes short workouts and a fallback option so your schedule does not become the reason you stop.",
  motivation:
    "Motivation will come and go. Your plan is designed to make starting easier.",
  confusion: "No more guessing. Follow the plan exactly for 7 days.",
  soreness:
    "Your plan uses controlled effort so you can recover and keep training.",
  all_or_nothing:
    "You do not need a perfect week. You need a repeatable one.",
};
