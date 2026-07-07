import { Bot, Share2, Image as ImageIcon, Smartphone, HardDrive, Layout } from "lucide-react";

const features = [
  {
    title: "Gemini AI Generator",
    description: "Describe a scenario and watch as Google's Gemini AI generates a realistic, multi-participant conversation in seconds.",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    title: "Zero-Database Sharing",
    description: "Share your exact mockup state via a unique URL. No accounts, no database, no limits. The entire state lives in the link.",
    icon: <Share2 className="w-6 h-6" />,
  },
  {
    title: "High-Res Exports",
    description: "Download 1x, 2x, or 3x pixel-ratio PNGs, or generate smooth animated GIFs directly in your browser.",
    icon: <ImageIcon className="w-6 h-6" />,
  },
  {
    title: "Pixel-Perfect UI",
    description: "Authentic typography, native icons, dynamic islands, and interactive emoji reactions match real apps 1:1.",
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    title: "Local Save System",
    description: "Save unlimited mockups locally to your browser. Revisit and edit them anytime without ever logging in.",
    icon: <HardDrive className="w-6 h-6" />,
  },
  {
    title: "Drag & Drop Ordering",
    description: "Easily reorder messages, change sides, and adjust timestamps using our intuitive drag-and-drop editor.",
    icon: <Layout className="w-6 h-6" />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">Everything you need. Nothing you don&apos;t.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create convincing chat screenshots, fake conversations, and social media posts — all in the browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-card hover:border-foreground/25 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-border bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
