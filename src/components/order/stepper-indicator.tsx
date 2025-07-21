import type React from "react"
import { cn } from "@/lib/utils"

interface StepperIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepperIndicator({ steps, currentStep }: StepperIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 flex-none",
              index === currentStep
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground text-muted-foreground",
              index < currentStep && "border-primary text-primary",
            )}
          >
            {index < currentStep ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </div>
          <span
            className={cn(
              "text-sm font-medium hidden sm:block",
              index === currentStep ? "text-primary" : "text-muted-foreground",
            )}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className={cn("h-0.5 w-8 rounded-full", index < currentStep ? "bg-primary" : "bg-muted-foreground")} />
          )}
        </div>
      ))}
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
