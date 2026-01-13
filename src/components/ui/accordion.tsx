"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple"
    collapsible?: boolean
    defaultValue?: string
  }
>(({ className, children, ...props }, ref) => (
  // Ideally this needs state management context, but for simplicity in this "mock" shadcn:
  // We will assume the parent manages state or we just render styling.
  // actually, to be useful in Sidebar without complex state lifting, let's just make it a styling wrapper
  // and let specific implementation handle logic OR build a simple context.
  // Let's build a simple context version.
  <AccordionContextImpl {...props} ref={ref} className={className}>
    {children}
  </AccordionContextImpl>
))
Accordion.displayName = "Accordion"

// Simple Context Implementation
type AccordionContextType = {
  activeItem: string | null
  setActiveItem: (value: string | null) => void
}
const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

const AccordionContextImpl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string }
>(({ className, children, defaultValue, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(defaultValue || null)
  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})
AccordionContextImpl.displayName = "AccordionContextImpl"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    // Clone children to pass value? No, use context in trigger/content
    return (
        <div 
            ref={ref} 
            className={cn("border-b border-slate-200/50 last:border-0", className)} 
            data-value={value} 
            {...props} 
        />
    )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  // Find parent Item value
  // In a real radix imp, this is cleaner. Here we cheat slightly by using explicit value prop if needed,
  // or relying on the user to ensure structure.
  // Actually, let's just use the `Accordion` in Sidebar manually if this gets too complex for a single file without Radix.
  // WE WILL USE A SIMPLER PROP DRILLING PATTERN or just simple stylings if used individually.
  
  // WAIT: To make it easy for the sidebar, let's use the explicit `value` context approach properly.
  // But strictly, triggers don't know their parent Item's value without Context nesting.
  
  // SIMPLIFICATION: We will require `value` on Item, and Trigger/Content will technically peek at it contextually?
  // No, let's just making it so the `AccordionItem` creates a sub-context.
  
  return (
    <AccordionItemContextConsumer>
      {(value) => {
          const isOpen = context?.activeItem === value
          return (
            <div className="flex">
                <button
                ref={ref}
                onClick={() => context?.setActiveItem(isOpen ? null : value)}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-bold text-sm transition-all hover:text-slate-900 text-slate-700 [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                data-state={isOpen ? "open" : "closed"}
                {...props}
                >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-slate-400" />
                </button>
            </div>
          )
      }}
    </AccordionItemContextConsumer>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    return (
        <AccordionItemContextConsumer>
            {(value) => {
                const isOpen = context?.activeItem === value
                if (!isOpen) return null
                return (
                    <div
                    ref={ref}
                    className={cn(
                        "overflow-hidden text-sm transition-all animate-in slide-in-from-top-1 duration-200",
                        className
                    )}
                    {...props}
                    >
                    <div className="pb-4 pt-0">{children}</div>
                    </div>
                )
            }}
        </AccordionItemContextConsumer>
  )
})
AccordionContent.displayName = "AccordionContent"

// Helper for Item Context
const AccordionItemContext = React.createContext<string>("")
const AccordionItemContextConsumer = ({ children }: { children: (value: string) => React.ReactNode }) => {
    // This assumes it's used inside an element where we can grab value? 
    // Actually, AccordionItem should PROVIDE this.
    return (
        <AccordionItemContext.Consumer>
            {value => children(value)}
        </AccordionItemContext.Consumer>
    )
}

// Redefine Item to be a provider
const AccordionItemProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={value}>
        <div ref={ref} className={cn("", className)} {...props}>
            {children}
        </div>
    </AccordionItemContext.Provider>
))
AccordionItemProvider.displayName = "AccordionItem"

export { Accordion, AccordionItemProvider as AccordionItem, AccordionTrigger, AccordionContent }
