import { useState } from "react";
import Quiz from "@/components/Quiz";

interface StepExpiryProps {
  cookies: { key: string; value: string }[];
  onRemoveCookie: (index: number) => void;
  onQuizCorrect?: () => void;
}

const StepExpiry = ({ cookies, onRemoveCookie, onQuizCorrect }: StepExpiryProps) => {
  const [expiry, setExpiry] = useState("1hour");
  const [applied, setApplied] = useState(false);

  const expiryOptions = [
    { id: "session", label: "🍪 세션 쿠키", desc: "브라우저 닫으면 사라짐", emoji: "💨", maxAge: "" },
    { id: "1hour", label: "⏰ 1시간", desc: "1시간 후 유통기한 만료", emoji: "🕐", maxAge: "max-age=3600" },
    { id: "1day", label: "📅 1일", desc: "하루 동안 신선하게!", emoji: "🌅", maxAge: "max-age=86400" },
    { id: "1year", label: "🏠 1년", desc: "장기 보관용 쿠키", emoji: "📦", maxAge: "max-age=31536000" },
  ];

  const handleApply = () => {
    const selected = expiryOptions.find((o) => o.id === expiry);
    if (!selected) return;
    cookies.forEach((c) => {
      const cookieStr = selected.maxAge
        ? `${c.key}=${c.value}; path=/; ${selected.maxAge}`
        : `${c.key}=${c.value}; path=/`;
      document.cookie = cookieStr;
    });
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl text-foreground">⏰ 유통기한 설정</h2>
        <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
          쿠키에도 <strong className="text-primary">유통기한(expires / max-age)</strong>이 있어요!
          언제까지 보관할지 정해주세요.
        </p>
      </div>

      {/* Cookie list with delete */}
      {cookies.length > 0 && (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
        {expiryOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setExpiry(opt.id)}
            className={`bakery-card cursor-pointer text-left transition-all duration-200 ${
              expiry === opt.id
                ? "ring-2 ring-primary scale-105 shadow-xl"
                : "hover:scale-102"
            }`}
          >
            <div className="text-2xl mb-1">{opt.emoji}</div>
            <p className="font-display text-sm text-foreground">{opt.label}</p>
            <p className="font-body text-xs text-muted-foreground">{opt.desc}</p>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button className="bakery-btn" onClick={handleApply}>
          {applied ? "✅ 적용 완료!" : "📦 유통기한 적용!"}
        </button>
      </div>

      <div className="bakery-card max-w-md mx-auto bg-bakery-cream/50">
        <p className="font-body text-sm text-muted-foreground">
          💡 <strong>코드로 보면:</strong><br />
          <code className="bg-bakery-dough/50 px-2 py-0.5 rounded text-xs">
            {expiry === "session"
              ? 'document.cookie = "name=value"'
              : `document.cookie = "name=value; ${expiryOptions.find(o => o.id === expiry)?.maxAge}"`}
          </code>
          {expiry === "session" && (
            <span className="block mt-1 text-xs opacity-70">※ 아무 옵션 없으면 세션 쿠키 (브라우저 닫으면 삭제)</span>
          )}
        </p>
      </div>

      <Quiz
        stepId="expiry"
        onCorrect={onQuizCorrect}
        question="세션 쿠키(Session Cookie)는 언제 삭제될까요?"
        options={[
          "설정한 시간이 지나면",
          "브라우저를 닫으면",
          "컴퓨터를 재시작하면",
          "직접 삭제해야만",
        ]}
        correctIndex={1}
        explanation="세션 쿠키는 만료 시간을 설정하지 않아 브라우저를 닫으면 자동으로 삭제돼요!"
      />
    </div>
  );
};

export default StepExpiry;
