import { useState, useEffect } from "react";
import ovenImg from "@/assets/oven.png";
import Quiz from "@/components/Quiz";

interface StepOvenProps {
  cookies: { key: string; value: string }[];
  onBaked: () => void;
  onRemoveCookie: (index: number) => void;
  onQuizCorrect?: () => void;
}

const StepOven = ({ cookies, onBaked, onRemoveCookie, onQuizCorrect }: StepOvenProps) => {
  const [baking, setBaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!baking) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setDone(true);
          cookies.forEach((c) => {
            document.cookie = `${c.key}=${c.value}; path=/; max-age=3600`;
          });
          onBaked();
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [baking, cookies, onBaked]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl text-foreground">🔥 오븐에 넣기</h2>
        <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
          반죽을 오븐에 넣으면 쿠키가 <strong className="text-primary">브라우저에 저장</strong>돼요!
          <code className="bg-bakery-dough/50 px-2 py-0.5 rounded text-xs ml-1">document.cookie</code>에 실제로 저장됩니다.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className={`relative transition-all duration-500 ${baking ? "animate-oven-glow" : ""}`}>
          <img
            src={ovenImg}
            alt="oven"
            className={`w-48 h-48 object-contain transition-all duration-500 ${baking ? "brightness-110" : ""}`}
          />
          {baking && !done && (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute -top-2 animate-steam"
                  style={{
                    left: `${30 + i * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                    fontSize: "1.5rem",
                  }}
                >
                  ☁️
                </div>
              ))}
            </>
          )}
        </div>

        {cookies.length > 0 && !baking && (
          <div className="flex flex-wrap gap-2 justify-center">
            {cookies.map((c, i) => (
              <div
                key={i}
                className="bg-bakery-dough text-bakery-chocolate px-3 py-1.5 rounded-full font-body font-semibold text-sm flex items-center gap-2"
              >
                🍪 {c.key}={c.value}
                <button
                  onClick={() => onRemoveCookie(i)}
                  className="text-destructive hover:text-destructive/80 text-xs"
                  title="삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {baking && (
          <div className="w-full max-w-xs space-y-2">
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-bakery-golden to-primary rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center font-body font-semibold text-sm text-muted-foreground">
              {done ? "✅ 완성!" : `굽는 중... ${progress}%`}
            </p>
          </div>
        )}

        {!baking && !done && (
          <button
            className="bakery-btn"
            onClick={() => setBaking(true)}
            disabled={cookies.length === 0}
          >
            {cookies.length === 0 ? "먼저 반죽을 만들어주세요!" : "🔥 오븐에 넣기!"}
          </button>
        )}

        {done && (
          <div className="bakery-card bg-bakery-cream/60 text-center animate-bake">
            <p className="font-body text-lg font-semibold text-foreground">
              🎉 쿠키가 브라우저에 저장되었어요!
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              개발자 도구 &gt; Application &gt; Cookies에서 확인해보세요!
            </p>
          </div>
        )}
      </div>

      <Quiz
        stepId="oven"
        onCorrect={onQuizCorrect}
        question="document.cookie에 값을 저장하면 어디에 저장될까요?"
        options={[
          "서버의 데이터베이스",
          "브라우저의 로컬 저장소",
          "브라우저의 쿠키 저장소",
          "운영체제 파일 시스템",
        ]}
        correctIndex={2}
        explanation="document.cookie는 브라우저의 쿠키 저장소에 데이터를 저장해요!"
      />
    </div>
  );
};

export default StepOven;
