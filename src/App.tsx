import { useEffect, useMemo, useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LeadCapture } from "./components/LeadCapture";
import { isCompleteAnswers, Quiz } from "./components/Quiz";
import { ResultsDashboard } from "./components/ResultsDashboard";
import { submitLead } from "./lib/lead";
import { trackEvent } from "./lib/analytics";
import { generatePlan } from "./lib/planLogic";
import { storage } from "./lib/storage";
import type { LeadData, PlanResult, QuizAnswers } from "./types";

type View = "landing" | "quiz" | "lead" | "results";

export function App() {
  const initialAnswers = storage.loadAnswers() ?? {};
  const initialLead = storage.loadLead();
  const initialResult = storage.loadResult();
  const [view, setView] = useState<View>(() =>
    initialLead && initialResult && isCompleteAnswers(initialAnswers) ? "results" : "landing",
  );
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(initialAnswers);
  const [lead, setLead] = useState<LeadData | null>(initialLead);
  const [result, setResult] = useState<PlanResult | null>(initialResult);
  const [completedDays, setCompletedDays] = useState<number[]>(() => storage.loadCompleted());
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    if (Object.keys(answers).length > 0) storage.saveAnswers(answers);
  }, [answers]);

  useEffect(() => {
    storage.saveCompleted(completedDays);
  }, [completedDays]);

  useEffect(() => {
    trackEvent("page_view", { view });
  }, [view]);

  const completeAnswers = useMemo(
    () => (isCompleteAnswers(answers) ? answers : null),
    [answers],
  );

  function completeQuiz() {
    if (!completeAnswers) return;
    const generated = generatePlan(completeAnswers);
    trackEvent("quiz_completed", {
      planType: generated.planType,
      intensity: generated.intensity,
      sessionTime: generated.recommendedSessionTime,
    });
    setResult(generated);
    storage.saveResult(generated);
    setView("lead");
  }

  async function handleLeadSubmit(data: LeadData) {
    if (!completeAnswers || !result) return;
    await submitLead(data, completeAnswers, result);
    trackEvent("lead_submitted", {
      planType: result.planType,
      goal: completeAnswers.mainGoal,
      fitnessLevel: completeAnswers.fitnessLevel,
    });
    setLead(data);
    storage.saveLead(data);
    setView("results");
  }

  function toggleDay(day: number) {
    setCompletedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day].sort((a, b) => a - b),
    );
  }

  function reset() {
    storage.clearAll();
    setAnswers({});
    setLead(null);
    setResult(null);
    setCompletedDays([]);
    setSelectedDay(1);
    setView("landing");
  }

  if (view === "quiz") {
    return (
      <Quiz
        answers={answers}
        onChange={setAnswers}
        onComplete={completeQuiz}
      />
    );
  }

  if (view === "lead") {
    return <LeadCapture onSubmit={handleLeadSubmit} />;
  }

  if (view === "results" && completeAnswers && lead && result) {
    return (
      <ResultsDashboard
        lead={lead}
        answers={completeAnswers}
        result={result}
        selectedDay={selectedDay}
        completedDays={completedDays}
        onSelectDay={setSelectedDay}
        onToggleDay={toggleDay}
        onReset={reset}
      />
    );
  }

  return (
    <LandingPage
      onStart={() => {
        if (completeAnswers && result && lead) {
          trackEvent("resume_results_clicked");
          setView("results");
          return;
        }
        trackEvent("quiz_started");
        setView("quiz");
      }}
    />
  );
}
