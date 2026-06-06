import { MessageCircle, Smartphone, Hash, Twitter, MessageSquare, Linkedin, Slack } from "lucide-react";
import Link from "next/link";

const platforms = [
  { id: "whatsapp", name: "WhatsApp", icon: <MessageCircle className="w-6 h-6" />, color: "bg-green-500", text: "text-green-500" },
  { id: "imessage", name: "iMessage", icon: <MessageSquare className="w-6 h-6" />, color: "bg-blue-500", text: "text-blue-500" },
  { id: "instagram", name: "Instagram", icon: <Smartphone className="w-6 h-6" />, color: "bg-pink-500", text: "text-pink-500" },
  { id: "discord", name: "Discord", icon: <Hash className="w-6 h-6" />, color: "bg-indigo-500", text: "text-indigo-500" },
  { id: "x", name: "X (Twitter)", icon: <Twitter className="w-6 h-6" />, color: "bg-black dark:bg-white", text: "text-black dark:text-white" },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, color: "bg-blue-700", text: "text-blue-700" },
  { id: "slack", name: "Slack", icon: <Slack className="w-6 h-6" />, color: "bg-purple-600", text: "text-purple-600" },
];

export function PlatformShowcase() {
  return (
    <section id="platforms" className="py-24 bg-gradient-to-b from-indigo-50/80 via-purple-50/40 to-background dark:from-transparent dark:via-transparent dark:to-transparent border-y border-indigo-100/60 dark:border-border/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-foreground">Support for 10+ Platforms</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Design mockups for all major social and messaging apps. Each platform is recreated with pixel-perfect accuracy, matching native UI components perfectly. Click a platform to start.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <Link
              href={`/editor?platform=${platform.id}`}
              key={platform.name}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-card border border-indigo-100/60 dark:border-border shadow-sm shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1 hover:border-indigo-300/60 dark:hover:border-primary/30 cursor-pointer group"
            >
              <div className={`p-2 rounded-xl bg-muted group-hover:${platform.text} transition-colors duration-300`}>
                {platform.icon}
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{platform.name}</span>
            </Link>
          ))}
          <div className="flex items-center justify-center px-6 py-4 rounded-2xl bg-transparent border border-dashed border-muted-foreground/50 text-muted-foreground font-medium select-none">
            + Telegram, Teams, Threads & more
          </div>
        </div>
      </div>
    </section>
  );
}
