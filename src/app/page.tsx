import { ChatCanvas } from "@/components/ChatCanvas";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-100 overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center bg-gray-200/50">
         <ChatCanvas />
      </div>
    </main>
  );
}
