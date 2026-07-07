import { cn } from "@/lib/utils"
import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const buttonVariants = (variant: string = "default", size: string = "default", className: string = "") => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]"

  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground shadow-medium hover:bg-primary/90 hover:-translate-y-0.5",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-border bg-background shadow-sm hover:bg-secondary hover:text-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
    ghost: "hover:bg-secondary hover:text-foreground text-muted-foreground",
    link: "text-foreground underline-offset-4 hover:underline",
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
