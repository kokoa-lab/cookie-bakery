import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps?: number[];
}

const StepIndicator = ({ steps, currentStep, onStepClick, completedSteps = [] }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {steps.map((label, i) => {
        const isCompleted = completedSteps.includes(i) || i < currentStep;
        const isAccessible = i <= currentStep || (i > 0 && completedSteps.includes(i - 1)) || i === 0;
        return (
          <button
            key={i}
            onClick={() => isAccessible && onStepClick(i)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-body font-semibold text-sm transition-all duration-300",
              i === currentStep
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : isCompleted
                ? "bg-bakery-golden/30 text-foreground"
                : "bg-secondary text-muted-foreground",
              !isAccessible && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              i === currentStep
                ? "bg-primary-foreground/20"
                : isCompleted
                ? "bg-bakery-golden/40"
                : "bg-muted"
            )}>
              {isCompleted && i !== currentStep ? "✓" : !isAccessible ? "🔒" : i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default StepIndicator;
