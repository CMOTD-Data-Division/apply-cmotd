import React from "react";

type Props = {
  steps: string[];
  current: number; // 0-based
};
export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className="max-w-4xl mx-auto pt-3 pb-6 hidden md:flex items-center justify-center">
      <div className="flex items-center gap-3">
        {steps.map((s, i) => {
          const active = i <= current;
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${active ? "bg-primary" : "bg-gray-300"}`}
                aria-hidden
              />
              <span className={` ${i === current ? "text-primary font-semibold" : "text-gray-500"}`}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className={`h-[2px] w-12 ${i < current ? "bg-primary" : "bg-gray-300"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
