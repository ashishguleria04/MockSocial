import { ChatCanvas } from "@/components/canvas/ChatCanvas";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const metadata = {
  title: "Editor | MockSocial",
  description: "Customize and export high-fidelity chat mockups in real-time.",
};

export default function EditorPage() {
  return (
    <main className="flex min-h-screen lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden relative bg-background text-foreground overflow-x-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-[float_1.5s_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-[float_2s_infinite_reverse]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px] animate-[float_2.5s_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* On lg+: row layout (sidebar left, canvas right).
          On mobile: column — canvas first, sidebar becomes a floating bottom sheet. */}
      <div className="flex flex-col lg:flex-row w-full h-full lg:min-h-0 relative z-10">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-y-auto lg:overflow-hidden overflow-x-hidden min-h-[100svh] lg:min-h-0 lg:h-full">
          <ErrorBoundary>
            <ChatCanvas />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
}
