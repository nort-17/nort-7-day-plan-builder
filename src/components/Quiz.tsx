import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { QuizQuestion, type QuizOption } from "./QuizQuestion";
import type {
  Confidence,
  Equipment,
  FitnessLevel,
  Limitation,
  MainGoal,
  Obstacle,
  QuizAnswers,
  WorkoutStyle,
} from "../types";

type QuizProps = {
  answers: Partial<QuizAnswers>;
  onChange: (answers: Partial<QuizAnswers>) => void;
  onComplete: () => void;
};

type Question =
  | {
      key: keyof QuizAnswers;
      question: string;
      multiple?: false;
      options: QuizOption<string | number>[];
    }
  | {
      key: "limitations";
      question: string;
      multiple: true;
      options: QuizOption<Limitation>[];
    };

const questions: Question[] = [
  {
    key: "fitnessLevel",
    question: "How would you describe your current fitness level?",
    options: [
      { label: "Complete beginner", description: "I have not trained consistently in months.", value: "beginner" },
      { label: "Getting back into it", description: "I have exercised before, but I am inconsistent right now.", value: "returning" },
      { label: "Somewhat active", description: "I train or move a few times per week.", value: "active" },
      { label: "Advanced", description: "I already train regularly and want a challenge.", value: "advanced" },
    ],
  },
  {
    key: "mainGoal",
    question: "What is your main goal right now?",
    options: [
      { label: "Lose body fat", value: "fat_loss" },
      { label: "Get fitter", value: "fitness" },
      { label: "Build strength", value: "strength" },
      { label: "Build consistency", value: "consistency" },
      { label: "Feel more confident", value: "confidence" },
    ],
  },
  {
    key: "sessionTime",
    question: "How much time can you realistically train per session?",
    options: [
      { label: "10 minutes", value: 10 },
      { label: "20 minutes", value: 20 },
      { label: "30 minutes", value: 30 },
      { label: "45 minutes", value: 45 },
    ],
  },
  {
    key: "equipment",
    question: "What equipment do you have at home?",
    options: [
      { label: "No equipment", value: "none" },
      { label: "Resistance bands", value: "bands" },
      { label: "Dumbbells", value: "dumbbells" },
      { label: "Kettlebell", value: "kettlebell" },
      { label: "Full home setup", value: "full" },
    ],
  },
  {
    key: "workoutStyle",
    question: "What type of workout do you prefer?",
    options: [
      { label: "Low-impact", description: "No jumping, joint-friendly, beginner-friendly.", value: "low_impact" },
      { label: "Strength-focused", description: "Slower workouts focused on muscle and control.", value: "strength" },
      { label: "Sweaty circuits", description: "Faster-paced workouts that get your heart rate up.", value: "circuits" },
      { label: "Mix of everything", description: "Strength, steps, recovery, and conditioning.", value: "mixed" },
    ],
  },
  {
    key: "limitations",
    question: "Do you have any movements you want to avoid?",
    multiple: true,
    options: [
      { label: "No jumping", value: "no_jumping" },
      { label: "Knee discomfort", value: "knee" },
      { label: "Back discomfort", value: "back" },
      { label: "Shoulder discomfort", value: "shoulder" },
      { label: "No major limitations", value: "none" },
    ],
  },
  {
    key: "obstacle",
    question: "What usually gets in the way of staying consistent?",
    options: [
      { label: "I am too busy", value: "busy" },
      { label: "I lose motivation", value: "motivation" },
      { label: "I do not know what to do", value: "confusion" },
      { label: "I get sore and stop", value: "soreness" },
      { label: "I start strong then fall off", value: "all_or_nothing" },
    ],
  },
  {
    key: "confidence",
    question: "How confident are you that you can complete this 7-day plan?",
    options: [
      { label: "Not confident", value: "low" },
      { label: "Somewhat confident", value: "medium" },
      { label: "Very confident", value: "high" },
    ],
  },
];

export function Quiz({ answers, onChange, onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const currentValue = answers[current.key];
  const canContinue = Array.isArray(currentValue) ? currentValue.length > 0 : currentValue !== undefined;

  function updateAnswer(value: string | number | Limitation[]) {
    const key = current.key;
    onChange({ ...answers, [key]: value });
  }

  function continueQuiz() {
    if (!canContinue) return;
    if (step === questions.length - 1) {
      onComplete();
      return;
    }
    setStep(step + 1);
  }

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-xl border border-border bg-surface p-5">
          <ProgressBar value={progress} label={`Question ${step + 1} of ${questions.length}`} />
        </div>

        <section className="rounded-xl border border-border bg-void p-5 sm:p-8">
          {current.multiple ? (
            <QuizQuestion
              question={current.question}
              options={current.options}
              multiple
              value={(answers.limitations ?? []) as Limitation[]}
              onChange={(value) => updateAnswer(value as Limitation[])}
            />
          ) : (
            <QuizQuestion
              question={current.question}
              options={current.options}
              value={currentValue as string | number | undefined}
              onChange={(value) => updateAnswer(value as string | number)}
            />
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              className="btn-secondary"
              disabled={step === 0}
              onClick={() => setStep(Math.max(0, step - 1))}
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button className="btn-primary" disabled={!canContinue} onClick={continueQuiz}>
              {step === questions.length - 1 ? "Get My Plan" : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export function isCompleteAnswers(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return Boolean(
    answers.fitnessLevel &&
      answers.mainGoal &&
      answers.sessionTime &&
      answers.equipment &&
      answers.workoutStyle &&
      answers.limitations &&
      answers.limitations.length > 0 &&
      answers.obstacle &&
      answers.confidence,
  );
}

export function labelsForAnswers(answers: QuizAnswers) {
  const labels = {
    fitnessLevel: {
      beginner: "Complete beginner",
      returning: "Getting back into it",
      active: "Somewhat active",
      advanced: "Advanced",
    } satisfies Record<FitnessLevel, string>,
    mainGoal: {
      fat_loss: "Lose body fat",
      fitness: "Get fitter",
      strength: "Build strength",
      consistency: "Build consistency",
      confidence: "Feel more confident",
    } satisfies Record<MainGoal, string>,
    equipment: {
      none: "No equipment",
      bands: "Resistance bands",
      dumbbells: "Dumbbells",
      kettlebell: "Kettlebell",
      full: "Full home setup",
    } satisfies Record<Equipment, string>,
    workoutStyle: {
      low_impact: "Low-impact",
      strength: "Strength-focused",
      circuits: "Sweaty circuits",
      mixed: "Mix of everything",
    } satisfies Record<WorkoutStyle, string>,
    obstacle: {
      busy: "Too busy",
      motivation: "Lose motivation",
      confusion: "Not sure what to do",
      soreness: "Soreness",
      all_or_nothing: "All-or-nothing",
    } satisfies Record<Obstacle, string>,
    confidence: {
      low: "Not confident",
      medium: "Somewhat confident",
      high: "Very confident",
    } satisfies Record<Confidence, string>,
  };

  return {
    fitnessLevel: labels.fitnessLevel[answers.fitnessLevel],
    mainGoal: labels.mainGoal[answers.mainGoal],
    equipment: labels.equipment[answers.equipment],
    workoutStyle: labels.workoutStyle[answers.workoutStyle],
    obstacle: labels.obstacle[answers.obstacle],
    confidence: labels.confidence[answers.confidence],
  };
}
