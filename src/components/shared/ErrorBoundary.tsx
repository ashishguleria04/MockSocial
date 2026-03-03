"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/50">
           <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
           <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Something went wrong</h3>
           <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1 max-w-[200px] break-words">
              {this.state.error?.message || "Failed to render this skin."}
           </p>
           <button 
             onClick={() => this.setState({ hasError: false })}
             className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-xs font-semibold rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
           >
             Try Again
           </button>
        </div>
      );
    }

    return this.props.children;
  }
}
