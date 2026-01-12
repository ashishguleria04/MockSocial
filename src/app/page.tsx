import { ChatCanvas } from "@/components/ChatCanvas";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-hidden relative">
      {/* Dark Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Subtle blue accent overlay */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.15) 0px, transparent 50%)
          `
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <Sidebar />
      <div className="flex-1 flex items-center justify-center relative z-10">
         <ChatCanvas />
      </div>
    </main>
  );
}
