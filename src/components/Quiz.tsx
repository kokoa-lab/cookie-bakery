import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  stepId: string;
  onCorrect?: () => void;
}

const Quiz = ({ question, options, correctIndex, explanation, stepId, onCorrect }: QuizProps) => {
  const storageKey = `cookiebakery-quiz-${stepId}`;
  const [selected, setSelected] = useState<number | null>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? Number(saved) : null;
  });
  const isCorrect = selected === correctIndex;

  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem(storageKey, String(selected));
      if (selected === correctIndex) {
        onCorrect?.();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#d97706", "#f59e0b", "#fbbf24", "#92400e", "#fff7ed"],
        });
      }
    }
  }, [selected, storageKey, correctIndex, onCorrect]);

  const handleRetry = () => {
    setSelected(null);
    localStorage.removeItem(storageKey);
  };

  return (
    <div className="bakery-card max-w-md mx-auto space-y-3 border-2 border-dashed border-primary/30">
      <p className="font-display text-sm text-foreground">🧠 퀴즈를 맞춰야 다음 단계로!</p>
      <p className="font-body text-sm text-foreground">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            disabled={selected !== null}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-200 ${
              selected === null
                ? "bg-secondary hover:bg-primary/10 hover:scale-[1.02] cursor-pointer"
                : i === correctIndex
                ? "bg-green-100 text-green-800 ring-2 ring-green-400"
                : i === selected
                ? "bg-red-100 text-red-800 ring-2 ring-red-400"
                : "bg-secondary opacity-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className={`p-3 rounded-xl font-body text-sm animate-bake ${
            isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {isCorrect ? "🎉 정답! 다음 단계로 넘어갈 수 있어요!" : "❌ 아쉬워요!"} {explanation}
          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="block mt-2 text-xs underline opacity-70 hover:opacity-100"
            >
              🔄 다시 도전하기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
