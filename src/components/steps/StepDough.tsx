import { useState } from "react";
import cookieImg from "@/assets/cookie.png";
import Quiz from "@/components/Quiz";

interface StepDoughProps {
  onAddCookie: (key: string, value: string) => void;
  onRemoveCookie: (index: number) => void;
  cookies: { key: string; value: string }[];
  onQuizCorrect?: () => void;
}

const StepDough = ({ onAddCookie, onRemoveCookie, cookies, onQuizCorrect }: StepDoughProps) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (key.trim() && value.trim()) {
      onAddCookie(key.trim(), value.trim());
      setKey("");
      setValue("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <img src={cookieImg} alt="cookie" className="w-20 h-20 mx-auto animate-float" />
        <h2 className="text-2xl md:text-3xl text-foreground">🧑‍🍳 반죽 만들기</h2>
        <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
          쿠키는 <strong className="text-primary">key=value</strong> 쌍으로 이루어져요.
          마치 반죽에 재료를 넣는 것처럼, 이름과 값을 넣어 쿠키 반죽을 만들어 보세요!
        </p>
      </div>

      <div className="bakery-card max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <label className="font-body font-semibold text-sm text-muted-foreground">재료 이름 (Key)</label>
          <input
            className="bakery-input w-full"
            placeholder="예: username"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="font-body font-semibold text-sm text-muted-foreground">재료 양 (Value)</label>
          <input
            className="bakery-input w-full"
            placeholder="예: cookie_lover"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button className="bakery-btn w-full" onClick={handleAdd}>
          🍪 반죽에 넣기!
        </button>
      </div>

      {cookies.length > 0 && (
        <div className="max-w-md mx-auto space-y-2">
          <p className="font-body font-semibold text-sm text-muted-foreground">만들어진 반죽:</p>
          <div className="flex flex-wrap gap-2">
            {cookies.map((c, i) => (
              <div
                key={i}
                className="bg-bakery-dough text-bakery-chocolate px-4 py-2 rounded-full font-body font-semibold text-sm animate-bake flex items-center gap-2"
              >
                🍪 {c.key}={c.value}
                <button
                  onClick={() => onRemoveCookie(i)}
                  className="text-destructive hover:text-destructive/80 text-xs ml-1"
                  title="삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bakery-card max-w-md mx-auto bg-bakery-cream/50">
        <p className="font-body text-sm text-muted-foreground">
          💡 <strong>실제 브라우저 쿠키</strong>도 이와 같아요! <br />
          <code className="bg-bakery-dough/50 px-2 py-0.5 rounded text-xs">document.cookie = "username=cookie_lover"</code>
        </p>
      </div>

      <Quiz
        stepId="dough"
        onCorrect={onQuizCorrect}
        question="브라우저 쿠키는 어떤 형태로 저장될까요?"
        options={[
          "JSON 객체 { key: value }",
          "key=value 문자열 쌍",
          "배열 [key, value]",
          "XML 태그 <key>value</key>",
        ]}
        correctIndex={1}
        explanation="쿠키는 key=value 형태의 문자열로 저장돼요!"
      />
    </div>
  );
};

export default StepDough;
