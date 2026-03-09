import { useState, useEffect } from "react";
import cookieImg from "@/assets/cookie.png";
import Quiz from "@/components/Quiz";

const StepResult = () => {
  const [browserCookies, setBrowserCookies] = useState<string[]>([]);

  const readCookies = () => {
    const raw = document.cookie;
    if (!raw) {
      setBrowserCookies([]);
      return;
    }
    setBrowserCookies(raw.split("; "));
  };

  useEffect(() => {
    readCookies();
  }, []);

  const clearAll = () => {
    const cookies = document.cookie.split("; ");
    cookies.forEach((c) => {
      const name = c.split("=")[0];
      document.cookie = `${name}=; path=/; max-age=0`;
    });
    readCookies();
  };

  const deleteSingle = (cookieStr: string) => {
    const name = cookieStr.split("=")[0];
    document.cookie = `${name}=; path=/; max-age=0`;
    readCookies();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <img src={cookieImg} alt="cookie" className="w-16 h-16 mx-auto animate-float" />
        <h2 className="text-2xl md:text-3xl text-foreground">🎉 쿠키 완성!</h2>
        <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
          축하해요! 이제 브라우저 쿠키가 뭔지 알게 되었어요!
          아래에서 실제 저장된 쿠키를 확인하세요.
        </p>
      </div>

      <div className="bakery-card max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm text-foreground">🍪 브라우저에 저장된 쿠키</p>
          <div className="flex gap-2">
            <button className="bakery-btn-secondary text-xs !px-3 !py-1.5" onClick={readCookies}>
              🔄 새로고침
            </button>
            <button
              className="bg-destructive text-destructive-foreground font-body font-bold text-xs px-3 py-1.5 rounded-lg"
              onClick={clearAll}
            >
              🗑️ 모두 삭제
            </button>
          </div>
        </div>

        {browserCookies.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground text-center py-4">
            저장된 쿠키가 없어요. 처음부터 다시 구워보세요! 🍪
          </p>
        ) : (
          <div className="space-y-2">
            {browserCookies.map((c, i) => (
              <div
                key={i}
                className="bg-bakery-dough/60 px-4 py-2 rounded-xl font-body text-sm animate-bake flex items-center justify-between"
              >
                <span>🍪 <code>{c}</code></span>
                <button
                  onClick={() => deleteSingle(c)}
                  className="text-destructive hover:text-destructive/80 text-xs ml-2 shrink-0"
                  title="삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <h3 className="text-lg text-center text-foreground">📝 오늘 배운 것</h3>
        <div className="grid grid-cols-1 gap-2">
          {[
            { emoji: "🧑‍🍳", label: "Key=Value", desc: "쿠키는 이름과 값의 쌍" },
            { emoji: "🔥", label: "document.cookie", desc: "오븐에 넣기 = 브라우저에 저장" },
            { emoji: "⏰", label: "Expires / Max-Age", desc: "유통기한 = 쿠키 수명" },
            { emoji: "🔒", label: "Secure", desc: "밀봉 포장 = HTTPS만 허용" },
            { emoji: "🛡️", label: "HttpOnly", desc: "직원 전용 = JS 접근 차단" },
            { emoji: "🏘️", label: "SameSite", desc: "이웃 나눠주기 정책" },
          ].map((item, i) => (
            <div key={i} className="bakery-card !p-3 flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="font-display text-sm text-foreground">{item.label}</p>
                <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Quiz
        stepId="result"
        question="쿠키를 삭제하려면 어떻게 해야 할까요?"
        options={[
          "delete document.cookie",
          "document.cookie.remove(name)",
          "max-age=0으로 설정",
          "브라우저를 재설치",
        ]}
        correctIndex={2}
        explanation="쿠키를 삭제하려면 max-age=0 또는 과거 날짜의 expires를 설정하면 돼요!"
      />
    </div>
  );
};

export default StepResult;
