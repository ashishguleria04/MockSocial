import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground shadow-sm ring-offset-background transition-all duration-75 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-accent focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
