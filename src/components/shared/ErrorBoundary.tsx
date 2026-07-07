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
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-secondary/50 rounded-2xl border border-foreground/30 border-dashed">
           <AlertCircle className="w-10 h-10 text-foreground mb-3" />
           <h3 className="text-lg font-bold text-foreground">Something went wrong</h3>
           <p className="text-xs text-muted-foreground mt-1 max-w-[200px] break-words">
              {this.state.error?.message || "Failed to render this skin."}
           </p>
           <button
             type="button"
             onClick={() => this.setState({ hasError: false })}
             className="mt-4 px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
           >
             Try Again
           </button>
        </div>
      );
    }

    return this.props.children;
  }
}
