"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string, value?: string, onValueChange?: (val: string) => void }
>(({ className, ...props }, ref) => (
  <TabsContextImpl {...props} ref={ref} className={className} />
))
Tabs.displayName = "Tabs"

// Simple Context
type TabsContextType = {
  activeTab: string
  setActiveTab: (val: string) => void
}
const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

const TabsContextImpl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string, value?: string, onValueChange?: (val: string) => void }
>(({ className, children, defaultValue, value, onValueChange, ...props }, ref) => {
  const [internalState, setInternalState] = React.useState(defaultValue || "")
  const activeTab = value !== undefined ? value : internalState
  const setActiveTab = (val: string) => {
      setInternalState(val)
      onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
})
TabsContextImpl.displayName = "TabsContextImpl"


const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-xl bg-slate-100 p-1 text-slate-500",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, onClick, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const isActive = context?.activeTab === value
  
  return (
    <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={(e) => {
            context?.setActiveTab(value)
            onClick?.(e)
        }}
        className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm data-[state=active]:font-bold",
        className
        )}
        {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (context?.activeTab !== value) return null
  
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 animate-in fade-in-50 zoom-in-95 duration-200",
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
