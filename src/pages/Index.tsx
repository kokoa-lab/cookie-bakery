import { useState, useCallback, useEffect } from "react";
import StepIndicator from "@/components/StepIndicator";
import StepDough from "@/components/steps/StepDough";
import StepOven from "@/components/steps/StepOven";
import StepExpiry from "@/components/steps/StepExpiry";
import StepOptions from "@/components/steps/StepOptions";
import StepResult from "@/components/steps/StepResult";
import cookieImg from "@/assets/cookie.png";

const STEPS = ["반죽 만들기", "오븐에 넣기", "유통기한", "포장 옵션", "완성!"];
const STORAGE_KEY = "cookiebakery-progress";

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { currentStep: 0, completedSteps: [] as number[] };
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(() => loadProgress().currentStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => loadProgress().completedSteps);
  const [cookies, setCookies] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, completedSteps }));
  }, [currentStep, completedSteps]);

  const markCompleted = useCallback((step: number) => {
    setCompletedSteps((prev) => prev.includes(step) ? prev : [...prev, step]);
  }, []);

  const handleAddCookie = (key: string, value: string) => {
    setCookies((prev) => [...prev, { key, value }]);
  };

  const handleRemoveCookie = (index: number) => {
    setCookies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBaked = useCallback(() => {}, []);

  // Step 4 (완성) has no quiz gate
  const canGoNext = currentStep === 4 || completedSteps.includes(currentStep);

  const goNext = () => {
    if (!canGoNext) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleStepClick = (step: number) => {
    // Allow going back or to completed steps only
    if (step <= currentStep || completedSteps.includes(step - 1) || step === 0) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src={cookieImg} alt="cookie" className="w-10 h-10 animate-float" />
          <h1 className="text-3xl md:text-4xl text-foreground">CookieBakery</h1>
        </div>
        <p className="font-body text-muted-foreground text-lg">
          브라우저 쿠키를 굽기로 배우는 인터랙티브 튜토리얼 🍪
        </p>
      </header>

      <div className="px-4 mb-8">
        <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={handleStepClick} completedSteps={completedSteps} />
      </div>

      <main className="max-w-2xl mx-auto px-4 pb-8">
        {currentStep === 0 && <StepDough onAddCookie={handleAddCookie} onRemoveCookie={handleRemoveCookie} cookies={cookies} onQuizCorrect={() => markCompleted(0)} />}
        {currentStep === 1 && <StepOven cookies={cookies} onBaked={handleBaked} onRemoveCookie={handleRemoveCookie} onQuizCorrect={() => markCompleted(1)} />}
        {currentStep === 2 && <StepExpiry cookies={cookies} onRemoveCookie={handleRemoveCookie} onQuizCorrect={() => markCompleted(2)} />}
        {currentStep === 3 && <StepOptions onQuizCorrect={() => markCompleted(3)} />}
        {currentStep === 4 && <StepResult />}

        <div className="flex justify-between mt-8">
          <button
            className="bakery-btn-secondary"
            onClick={goPrev}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
          >
            ← 이전
          </button>
          {currentStep < STEPS.length - 1 && (
            <button
              className="bakery-btn"
              onClick={goNext}
              disabled={!canGoNext}
              style={{ opacity: canGoNext ? 1 : 0.4 }}
              title={!canGoNext ? "퀴즈를 먼저 맞춰주세요!" : ""}
            >
              {canGoNext ? "다음 →" : "🔒 퀴즈를 풀어주세요"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
