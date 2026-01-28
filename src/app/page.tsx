import { ChatCanvas } from "@/components/canvas/ChatCanvas";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen lg:overflow-hidden overflow-x-hidden relative bg-background text-foreground">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-[float_8s_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-[float_10s_infinite_reverse]" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px] animate-[float_12s_infinite]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="flex flex-col lg:flex-row w-full relative z-10">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-y-auto overflow-x-hidden">
           <ChatCanvas />
        </div>
      </div>
    </main>
  );
}
