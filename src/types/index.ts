export type FitnessLevel = "beginner" | "returning" | "active" | "advanced";
export type MainGoal = "fat_loss" | "fitness" | "strength" | "consistency" | "confidence";
export type Equipment = "none" | "bands" | "dumbbells" | "kettlebell" | "full";
export type WorkoutStyle = "low_impact" | "strength" | "circuits" | "mixed";
export type Limitation = "no_jumping" | "knee" | "back" | "shoulder" | "none";
export type Obstacle = "busy" | "motivation" | "confusion" | "soreness" | "all_or_nothing";
export type PreferredTime = "morning" | "lunch" | "evening" | "flexible";
export type Confidence = "low" | "medium" | "high";

export type QuizAnswers = {
  fitnessLevel: FitnessLevel;
  mainGoal: MainGoal;
  sessionTime: 10 | 20 | 30 | 45;
  trainingDays: 2 | 3 | 4 | 5;
  equipment: Equipment;
  workoutStyle: WorkoutStyle;
  limitations: Limitation[];
  obstacle: Obstacle;
  preferredTime: PreferredTime;
  confidence: Confidence;
};

export type LeadData = {
  firstName: string;
  email: string;
};

export type Exercise = {
  name: string;
  sets?: number;
  reps?: string;
  time?: string;
  rest?: string;
  notes?: string;
  easierOption?: string;
  harderOption?: string;
};

export type Workout = {
  title: string;
  description: string;
  duration: number;
  exercises: Exercise[];
};

export type WorkoutDay = {
  day: number;
  title: string;
  focus: string;
  duration: number;
  description: string;
  exercises: Exercise[];
  finisher?: Exercise[];
  checklist: string[];
};

export type ExerciseSwap = {
  insteadOf: string;
  useThis: string;
  reason: string;
};

export type PlanResult = {
  planType: string;
  planSubtitle: string;
  planDescription: string;
  intensity: "low" | "medium" | "high";
  recommendedSessionTime: number;
  weeklyGoal: string;
  stepTarget: string;
  consistencyRule: string;
  recoveryAdvice: string;
  nutritionFocus: string;
  schedule: WorkoutDay[];
  badDayWorkout: Workout;
  exerciseSwaps: ExerciseSwap[];
  nextStepRecommendation: string;
};
