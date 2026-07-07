import { MessageCircle, Smartphone, Hash, Twitter, MessageSquare, Linkedin, Slack } from "lucide-react";
import Link from "next/link";

const platforms = [
  { id: "whatsapp", name: "WhatsApp", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "imessage", name: "iMessage", icon: <MessageSquare className="w-5 h-5" /> },
  { id: "instagram", name: "Instagram", icon: <Smartphone className="w-5 h-5" /> },
  { id: "discord", name: "Discord", icon: <Hash className="w-5 h-5" /> },
  { id: "x", name: "X (Twitter)", icon: <Twitter className="w-5 h-5" /> },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
  { id: "slack", name: "Slack", icon: <Slack className="w-5 h-5" /> },
];

export function PlatformShowcase() {
  return (
    <section id="platforms" className="py-24 border-y border-border bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Platforms</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-foreground">One editor. 14 platforms.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every platform is recreated with pixel-perfect accuracy, matching native UI components 1:1.
            Click a platform to start editing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <Link
              href={`/editor?platform=${platform.id}`}
              key={platform.name}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-background border border-border shadow-sm hover:shadow-card hover:-translate-y-1 hover:border-foreground/30 transition-all cursor-pointer group"
            >
              <span className="p-2 rounded-xl bg-secondary border border-border text-muted-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                {platform.icon}
              </span>
              <span className="font-semibold text-foreground">{platform.name}</span>
            </Link>
          ))}
          <div className="flex items-center justify-center px-5 py-3.5 rounded-2xl bg-transparent border border-dashed border-muted-foreground/40 text-muted-foreground font-medium select-none">
            + Telegram, Teams, Threads &amp; more
          </div>
        </div>
      </div>
    </section>
  );
}
