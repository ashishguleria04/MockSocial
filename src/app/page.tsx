import { ChatCanvas } from "@/components/ChatCanvas";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-hidden relative">
      {/* Light Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      
      {/* Subtle accent overlay */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.05) 0px, transparent 50%)
          `
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
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
