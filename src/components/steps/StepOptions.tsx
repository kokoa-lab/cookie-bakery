import { useState } from "react";
import Quiz from "@/components/Quiz";

const StepOptions = ({ onQuizCorrect }: { onQuizCorrect?: () => void }) => {
  const [secure, setSecure] = useState(false);
  const [httpOnly, setHttpOnly] = useState(false);
  const [sameSite, setSameSite] = useState<"Strict" | "Lax" | "None">("Lax");

  const options = [
    {
      id: "secure",
      label: "🔒 Secure",
      bakeryLabel: "밀봉 포장",
      desc: "HTTPS에서만 전송! 마치 쿠키를 밀봉 포장해서 안전하게 배달하는 것과 같아요.",
      active: secure,
      toggle: () => setSecure(!secure),
    },
    {
      id: "httpOnly",
      label: "🛡️ HttpOnly",
      bakeryLabel: "직원 전용",
      desc: "JavaScript로 접근 불가! 주방 직원(서버)만 쿠키를 만질 수 있어요. 도둑(XSS)으로부터 보호!",
      active: httpOnly,
      toggle: () => setHttpOnly(!httpOnly),
    },
  ];

  const sameSiteOptions = [
    {
      value: "Strict" as const,
      emoji: "🏠",
      label: "Strict",
      bakeryDesc: "우리 가게에서만!",
      desc: "같은 사이트에서 온 요청에만 쿠키를 보내요. 이웃집에는 절대 안 나눠줘요!",
    },
    {
      value: "Lax" as const,
      emoji: "🏘️",
      label: "Lax",
      bakeryDesc: "링크로 방문하면 OK",
      desc: "다른 곳에서 링크를 클릭해 오면 쿠키를 줘요. 기본값!",
    },
    {
      value: "None" as const,
      emoji: "🌍",
      label: "None",
      bakeryDesc: "누구에게나!",
      desc: "어디서든 요청하면 쿠키를 보내요. Secure 필수!",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl text-foreground">📦 포장 옵션</h2>
        <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
          쿠키를 어떻게 포장할까요? <strong className="text-primary">보안 옵션</strong>은
          쿠키를 안전하게 보관하고 배달하는 포장 방법이에요!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={opt.toggle}
            className={`bakery-card text-left cursor-pointer transition-all duration-300 ${
              opt.active
                ? "ring-2 ring-primary bg-primary/5 scale-105"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-sm">{opt.label}</span>
              <div
                className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center px-1 ${
                  opt.active ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-primary-foreground transition-transform duration-300 ${
                    opt.active ? "translate-x-4" : ""
                  }`}
                />
              </div>
            </div>
            <p className="font-body font-bold text-xs text-primary mb-1">{opt.bakeryLabel}</p>
            <p className="font-body text-xs text-muted-foreground">{opt.desc}</p>
          </button>
        ))}
      </div>

      <div className="max-w-lg mx-auto space-y-3">
        <h3 className="text-xl text-center text-foreground">
          🏘️ 이웃집에 나눠줄 수 있나? (SameSite)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sameSiteOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSameSite(opt.value)}
              className={`bakery-card text-center cursor-pointer transition-all duration-300 ${
                sameSite === opt.value
                  ? "ring-2 ring-primary scale-105 shadow-xl"
                  : "hover:scale-102"
              }`}
            >
              <div className="text-3xl mb-2">{opt.emoji}</div>
              <p className="font-display text-sm text-foreground">{opt.label}</p>
              <p className="font-body font-bold text-xs text-primary mt-1">{opt.bakeryDesc}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bakery-card max-w-lg mx-auto bg-bakery-chocolate text-primary-foreground">
        <p className="font-body text-xs mb-2 opacity-70">실제 쿠키 설정 코드:</p>
        <code className="font-body text-sm break-all">
          document.cookie = "name=value
          {secure ? "; Secure" : ""}
          {httpOnly ? "; HttpOnly" : ""}
          ; SameSite={sameSite}"
        </code>
      </div>

      <Quiz
        stepId="options"
        onCorrect={onQuizCorrect}
        question="HttpOnly 쿠키의 특징은 무엇일까요?"
        options={[
          "HTTP 요청에서만 사용 가능",
          "JavaScript에서 접근할 수 없음",
          "HTTPS에서만 전송됨",
          "한 시간만 유효함",
        ]}
        correctIndex={1}
        explanation="HttpOnly 쿠키는 JavaScript(document.cookie)로 읽을 수 없어서 XSS 공격을 방어해요!"
      />
    </div>
  );
};

export default StepOptions;
