import { MessageCircle, Smartphone, Hash, Twitter, MessageSquare, Linkedin, Slack } from "lucide-react";

const platforms = [
  { name: "WhatsApp", icon: <MessageCircle className="w-6 h-6" />, color: "bg-green-500", text: "text-green-500" },
  { name: "iMessage", icon: <MessageSquare className="w-6 h-6" />, color: "bg-blue-500", text: "text-blue-500" },
  { name: "Instagram", icon: <Smartphone className="w-6 h-6" />, color: "bg-pink-500", text: "text-pink-500" },
  { name: "Discord", icon: <Hash className="w-6 h-6" />, color: "bg-indigo-500", text: "text-indigo-500" },
  { name: "X (Twitter)", icon: <Twitter className="w-6 h-6" />, color: "bg-black dark:bg-white", text: "text-black dark:text-white" },
  { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, color: "bg-blue-700", text: "text-blue-700" },
  { name: "Slack", icon: <Slack className="w-6 h-6" />, color: "bg-purple-600", text: "text-purple-600" },
];

export function PlatformShowcase() {
  return (
    <section id="platforms" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support for 10+ Platforms</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Design mockups for all major social and messaging apps. Each platform is recreated with pixel-perfect accuracy, matching native UI components perfectly.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <div 
              key={platform.name}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className={`p-2 rounded-xl bg-muted group-hover:${platform.text} transition-colors`}>
                {platform.icon}
              </div>
              <span className="font-semibold">{platform.name}</span>
            </div>
          ))}
          <div className="flex items-center justify-center px-6 py-4 rounded-2xl bg-background border border-dashed border-muted-foreground/50 text-muted-foreground font-medium">
            + Telegram, Teams, Threads & more
          </div>
        </div>
      </div>
    </section>
  );
}
