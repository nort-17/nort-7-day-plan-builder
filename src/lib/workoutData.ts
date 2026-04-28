import type { Exercise, ExerciseSwap, PlanResult, QuizAnswers, Workout, WorkoutDay } from "../types";

const defaultChecklist = [
  "Complete today's workout",
  "Hit your step target",
  "Eat protein with at least 2 meals",
  "Drink water",
  "Sleep target: 7+ hours if possible",
];

const recoveryChecklist = [
  "Complete mobility",
  "Go for an easy walk",
  "Eat protein with at least 2 meals",
  "Avoid turning recovery into quitting",
  "Prepare for tomorrow's workout",
];

const reviewChecklist = [
  "Complete your review",
  "Go for an easy walk",
  "Choose your workout time for next week",
  "Note your biggest win",
  "Decide your next step",
];

const lowExercises: Record<string, Exercise[]> = {
  full: [
    { name: "Chair squat", sets: 2, reps: "8-10", rest: "45 sec", easierOption: "Sit fully between reps", harderOption: "Slow 3-second lower" },
    { name: "Wall push-up", sets: 2, reps: "8-12", rest: "45 sec", harderOption: "Use a bench or desk incline" },
    { name: "Glute bridge", sets: 2, reps: "10-12", rest: "45 sec" },
    { name: "March in place", sets: 2, time: "40 sec", rest: "30 sec" },
  ],
  core: [
    { name: "Dead bug", sets: 2, reps: "6 per side", rest: "30 sec", notes: "Keep your lower back controlled" },
    { name: "Bird dog", sets: 2, reps: "6 per side", rest: "30 sec" },
    { name: "Standing knee raise", sets: 2, time: "40 sec", rest: "30 sec" },
  ],
  lower: [
    { name: "Hip hinge", sets: 3, reps: "10", rest: "45 sec" },
    { name: "Chair squat", sets: 3, reps: "8-10", rest: "45 sec" },
    { name: "Glute bridge", sets: 3, reps: "12", rest: "45 sec" },
    { name: "Calf raise", sets: 2, reps: "12-15", rest: "30 sec" },
  ],
  upper: [
    { name: "Wall push-up", sets: 3, reps: "8-12", rest: "45 sec" },
    { name: "Backpack row", sets: 3, reps: "10", rest: "45 sec", notes: "Use bands or dumbbells if available" },
    { name: "Seated shoulder press", sets: 2, reps: "10", rest: "45 sec", notes: "Use no weight or light weight" },
    { name: "Side plank from knees", sets: 2, time: "15 sec per side", rest: "30 sec" },
  ],
  circuit: [
    { name: "Step jack", time: "30 sec", rest: "20 sec", easierOption: "Tap side to side" },
    { name: "Chair squat", time: "30 sec", rest: "20 sec" },
    { name: "Incline push-up", time: "30 sec", rest: "20 sec" },
    { name: "Slow mountain climber", time: "30 sec", rest: "40 sec" },
  ],
};

const standardExercises: Record<string, Exercise[]> = {
  full: [
    { name: "Bodyweight squat", sets: 3, reps: "10-12", rest: "45 sec", easierOption: "Chair squat", harderOption: "Tempo squat" },
    { name: "Incline push-up", sets: 3, reps: "8-12", rest: "45 sec", harderOption: "Full push-up" },
    { name: "Backpack row", sets: 3, reps: "10-12", rest: "45 sec" },
    { name: "Plank", sets: 2, time: "20-30 sec", rest: "30 sec", easierOption: "Knee plank" },
  ],
  core: [
    { name: "Dead bug", sets: 2, reps: "8 per side", rest: "30 sec" },
    { name: "Bicycle crunch", sets: 2, reps: "12 per side", rest: "30 sec", easierOption: "Dead bug" },
    { name: "Plank", sets: 2, time: "30 sec", rest: "30 sec" },
  ],
  lower: [
    { name: "Reverse lunge", sets: 3, reps: "8 per side", rest: "45 sec", easierOption: "Split squat hold" },
    { name: "Bodyweight squat", sets: 3, reps: "12", rest: "45 sec" },
    { name: "Glute bridge", sets: 3, reps: "12-15", rest: "45 sec" },
    { name: "Step-up", sets: 2, reps: "8 per side", rest: "45 sec" },
  ],
  upper: [
    { name: "Push-up", sets: 3, reps: "6-12", rest: "60 sec", easierOption: "Incline push-up" },
    { name: "Backpack row", sets: 3, reps: "10-12", rest: "45 sec" },
    { name: "Shoulder taps", sets: 2, reps: "10 per side", rest: "45 sec", easierOption: "Wall shoulder taps" },
    { name: "Plank", sets: 2, time: "30 sec", rest: "30 sec" },
  ],
  circuit: [
    { name: "Bodyweight squat", time: "40 sec", rest: "20 sec" },
    { name: "Mountain climber", time: "30 sec", rest: "20 sec", easierOption: "Slow mountain climber" },
    { name: "Incline push-up", time: "35 sec", rest: "20 sec" },
    { name: "Squat pulses", time: "30 sec", rest: "45 sec" },
  ],
};

const advancedExercises: Record<string, Exercise[]> = {
  full: [
    { name: "Tempo squat", sets: 4, reps: "10", rest: "45 sec", harderOption: "Jump squat" },
    { name: "Full push-up", sets: 4, reps: "8-15", rest: "60 sec", harderOption: "Decline push-up" },
    { name: "Backpack thruster", sets: 3, reps: "10", rest: "60 sec" },
    { name: "Hollow body hold", sets: 3, time: "20-30 sec", rest: "30 sec" },
  ],
  core: [
    { name: "Hollow body hold", sets: 3, time: "25 sec", rest: "30 sec" },
    { name: "Mountain climbers", sets: 3, reps: "20", rest: "30 sec" },
    { name: "Plank up-downs", sets: 2, reps: "8 per side", rest: "45 sec" },
  ],
  lower: [
    { name: "Bulgarian split squat", sets: 4, reps: "8 per side", rest: "60 sec" },
    { name: "Jump squat", sets: 3, reps: "10", rest: "60 sec" },
    { name: "Single-leg glute bridge", sets: 3, reps: "10 per side", rest: "45 sec" },
    { name: "Lunge jumps", sets: 3, reps: "8 per side", rest: "60 sec" },
  ],
  upper: [
    { name: "Decline push-up", sets: 4, reps: "8-12", rest: "60 sec" },
    { name: "Backpack row", sets: 4, reps: "12", rest: "45 sec" },
    { name: "Pike push-up", sets: 3, reps: "6-10", rest: "60 sec" },
    { name: "Plank up-downs", sets: 2, reps: "8 per side", rest: "45 sec" },
  ],
  circuit: [
    { name: "Burpees", time: "35 sec", rest: "20 sec", easierOption: "Step-back burpees" },
    { name: "High knees", time: "35 sec", rest: "20 sec", easierOption: "March in place" },
    { name: "Jump squat", time: "35 sec", rest: "20 sec", easierOption: "Chair squat" },
    { name: "Mountain climbers", time: "35 sec", rest: "45 sec" },
  ],
};

function isLowImpact(answers: QuizAnswers) {
  return (
    answers.workoutStyle === "low_impact" ||
    answers.limitations.includes("no_jumping") ||
    answers.limitations.includes("knee") ||
    answers.confidence === "low" ||
    answers.fitnessLevel === "beginner"
  );
}

function libraryFor(result: Pick<PlanResult, "intensity">, answers: QuizAnswers) {
  if (isLowImpact(answers) || result.intensity === "low") return lowExercises;
  if (result.intensity === "high" && answers.fitnessLevel === "advanced") return advancedExercises;
  return standardExercises;
}

function adaptForEquipment(exercises: Exercise[], answers: QuizAnswers) {
  if (answers.equipment === "bands") {
    return exercises.map((exercise) =>
      exercise.name === "Backpack row"
        ? { ...exercise, name: "Band row", notes: "Anchor the band safely and row with control" }
        : exercise,
    );
  }

  if (answers.equipment === "dumbbells" || answers.equipment === "full") {
    return exercises.map((exercise) => {
      if (exercise.name === "Backpack row") return { ...exercise, name: "Dumbbell row" };
      if (exercise.name === "Seated shoulder press") return { ...exercise, name: "Dumbbell shoulder press" };
      return exercise;
    });
  }

  if (answers.equipment === "kettlebell") {
    return exercises.map((exercise) =>
      exercise.name === "Backpack thruster"
        ? { ...exercise, name: "Kettlebell thruster" }
        : exercise,
    );
  }

  return exercises;
}

function durationNote(duration: number) {
  if (duration === 10) return "2-minute warm-up, 6-minute circuit, 2-minute cooldown.";
  if (duration === 20) return "3-minute warm-up, 14-minute circuit, 3-minute cooldown.";
  if (duration === 30) return "5-minute warm-up, 20-minute workout, 5-minute cooldown.";
  return "5-minute warm-up, 30-minute workout, then 5-10 minutes of cooldown or mobility.";
}

export function buildSchedule(result: Pick<PlanResult, "intensity" | "recommendedSessionTime">, answers: QuizAnswers): WorkoutDay[] {
  const library = libraryFor(result, answers);
  const duration = result.recommendedSessionTime;
  const addNotes = (description: string) => `${description} ${durationNote(duration)}`;

  return [
    {
      day: 1,
      title: "Full Body Starter",
      focus: "Build momentum",
      duration,
      description: addNotes("A simple full-body session to get you moving and prove you can start today."),
      exercises: adaptForEquipment(library.full, answers),
      checklist: defaultChecklist,
    },
    {
      day: 2,
      title: "Steps + Core",
      focus: "Low-stress calorie burn",
      duration: Math.min(duration, 20) as 10 | 20 | 30 | 45,
      description: "A walking-focused day with simple core work to build consistency without draining recovery.",
      exercises: adaptForEquipment(library.core, answers),
      checklist: defaultChecklist,
    },
    {
      day: 3,
      title: "Lower Body Strength",
      focus: "Legs and glutes",
      duration,
      description: addNotes("Lower-body training using simple home movements that build strength and burn energy."),
      exercises: adaptForEquipment(library.lower, answers),
      checklist: defaultChecklist,
    },
    {
      day: 4,
      title: "Recovery + Mobility",
      focus: "Recovery",
      duration: 10,
      description: "A lighter day to reduce soreness, improve movement, and keep the habit alive.",
      exercises: [
        { name: "Easy walk", time: "10-20 min", notes: "Comfortable pace only" },
        { name: "Hip flexor stretch", time: "45 sec per side" },
        { name: "Cat-cow", reps: "8 slow reps" },
        { name: "Child's pose breathing", time: "60 sec" },
      ],
      checklist: recoveryChecklist,
    },
    {
      day: 5,
      title: "Upper Body + Core",
      focus: "Upper body and posture",
      duration,
      description: addNotes("A simple upper-body and core workout using bodyweight exercises and optional equipment."),
      exercises: adaptForEquipment(library.upper, answers),
      checklist: defaultChecklist,
    },
    {
      day: 6,
      title: "Fat Loss Circuit",
      focus: "Conditioning",
      duration,
      description: addNotes("A faster-paced circuit to raise your heart rate and finish the week strong."),
      exercises: adaptForEquipment(library.circuit, answers),
      finisher:
        result.intensity === "high"
          ? [{ name: "High knees or march in place", time: "60 sec", notes: "Hard effort, clean form" }]
          : [{ name: "Step jack", time: "60 sec", notes: "Low impact finisher" }],
      checklist: defaultChecklist,
    },
    {
      day: 7,
      title: "Reset + Review",
      focus: "Reflection and momentum",
      duration: 10,
      description: "A light movement day with a short review so you can see what worked and continue next week.",
      exercises: [
        { name: "Easy walk", time: "10-20 min" },
        { name: "Breathing reset", time: "2 min" },
        { name: "Plan review", time: "5 min", notes: "Write what worked, what got in the way, and your next workout time" },
      ],
      checklist: reviewChecklist,
    },
  ];
}

export function getBadDayWorkout(answers: QuizAnswers): Workout {
  const lowImpact = isLowImpact(answers);

  if (lowImpact) {
    return {
      title: "The 5-Minute Bad Day Workout",
      description:
        "Use this when life gets busy, motivation drops, or you are tempted to skip. The goal is not to crush yourself. The goal is to keep the streak alive.",
      duration: 5,
      exercises: [
        { name: "Chair squat", reps: "10 reps" },
        { name: "Wall push-up", reps: "10 reps" },
        { name: "Glute bridge", reps: "10 reps" },
        { name: "March in place", time: "30 seconds" },
        { name: "Repeat", time: "5 minutes" },
      ],
    };
  }

  if (answers.fitnessLevel === "advanced") {
    return {
      title: "The 5-Minute Bad Day Workout",
      description:
        "Use this when life gets busy, motivation drops, or you are tempted to skip. The goal is not to crush yourself. The goal is to keep the streak alive.",
      duration: 5,
      exercises: [
        { name: "Squat jump", reps: "10 reps" },
        { name: "Push-up", reps: "10 reps" },
        { name: "Mountain climbers", reps: "20 reps" },
        { name: "Burpee", reps: "5 reps" },
        { name: "Repeat", time: "5 minutes" },
      ],
    };
  }

  return {
    title: "The 5-Minute Bad Day Workout",
    description:
      "Use this when life gets busy, motivation drops, or you are tempted to skip. The goal is not to crush yourself. The goal is to keep the streak alive.",
    duration: 5,
    exercises: [
      { name: "Bodyweight squat", reps: "10 reps" },
      { name: "Incline push-up", reps: "10 reps" },
      { name: "Reverse lunge", reps: "6 reps per side" },
      { name: "Plank", time: "20 seconds" },
      { name: "Repeat", time: "5 minutes" },
    ],
  };
}

export function getExerciseSwaps(answers: QuizAnswers): ExerciseSwap[] {
  const swaps: ExerciseSwap[] = [
    { insteadOf: "Jump Squats", useThis: "Chair Squats", reason: "Lower impact and easier on knees." },
    { insteadOf: "Burpees", useThis: "Step-Back Burpees", reason: "Keeps the conditioning effect without the jump." },
    { insteadOf: "Push-Ups", useThis: "Incline Push-Ups", reason: "Easier to control and better for beginners." },
    { insteadOf: "Lunges", useThis: "Split Squat Hold", reason: "More stable and easier to balance." },
    { insteadOf: "Mountain Climbers", useThis: "Slow Mountain Climbers", reason: "Easier to control and lower impact." },
    { insteadOf: "Jumping Jacks", useThis: "Step Jacks", reason: "No jumping required." },
    { insteadOf: "Plank", useThis: "Knee Plank", reason: "Builds core strength with less strain." },
    { insteadOf: "Sit-Ups", useThis: "Dead Bugs", reason: "More back-friendly core option." },
  ];

  if (answers.limitations.includes("knee")) {
    swaps.unshift({ insteadOf: "Deep Lunges", useThis: "Glute Bridge", reason: "Keeps lower-body work pain-free and stable." });
  }
  if (answers.limitations.includes("shoulder")) {
    swaps.unshift({ insteadOf: "Plank Up-Downs", useThis: "Wall Push-Ups", reason: "Reduces shoulder load while keeping upper-body work in." });
  }
  if (answers.limitations.includes("back")) {
    swaps.unshift({ insteadOf: "Fast Twisting Crunches", useThis: "Bird Dog", reason: "Trains your core without aggressive spinal movement." });
  }

  return swaps;
}
