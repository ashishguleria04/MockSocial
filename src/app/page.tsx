import { ChatCanvas } from "@/components/ChatCanvas";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-hidden relative">
      {/* Rich Dark Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Enhanced blue/purple accent overlay */}
      <div 
        className="fixed inset-0 opacity-25"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.2) 0px, transparent 50%)
          `
        }}
      />
      
      {/* Refined grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      <Sidebar />
      <div className="flex-1 flex items-center justify-center relative z-10">
         <ChatCanvas />
      </div>
    </main>
  );
}
