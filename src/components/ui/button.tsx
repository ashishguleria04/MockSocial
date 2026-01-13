import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Since I didn't install cva or radix-slot, I will implement a simpler version that doesn't depend on them
// but still maintains the API structure for future compatibility.
// Wait, I should probably install class-variance-authority and radix-ui/react-slot for the "Full" experience.
// But the user just asked for "use some component library". 
// To make it robust without too many deps, I'll write a solid reusable component first.
// ACTUALLY: Let's install `class-variance-authority` and `@radix-ui/react-slot` to do it RIGHT.

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const buttonVariants = (variant: string = "default", size: string = "default", className: string = "") => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants: Record<string, string> = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
    destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-gray-900 underline-offset-4 hover:underline",
  }

  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
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
