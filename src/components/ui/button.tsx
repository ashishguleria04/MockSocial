import { cn } from "@/lib/utils"
import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const buttonVariants = (variant: string = "default", size: string = "default", className: string = "") => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]"
  
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5",
    destructive: "bg-red-500 text-slate-50 shadow-sm hover:bg-red-600",
    outline: "border-[1.5px] border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    ghost: "hover:bg-slate-100/50 hover:text-slate-900 text-slate-500",
    link: "text-slate-900 underline-offset-4 hover:underline",
  }

  const sizes: Record<string, string> = {
    default: "h-12 px-8 py-3",
    sm: "h-10 rounded-xl px-4 text-xs",
    lg: "h-14 rounded-3xl px-10 text-base",
    icon: "h-11 w-11 shrink-0 rounded-full",
  }

  return cn(base, variants[variant], sizes[size], className)
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants(variant, size, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
