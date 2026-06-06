import { Bot, Share2, Image as ImageIcon, Smartphone, HardDrive, Layout } from "lucide-react";

const features = [
  {
    title: "Gemini AI Generator",
    description: "Describe a scenario and watch as Google's Gemini AI generates a realistic, multi-participant conversation in seconds.",
    icon: <Bot className="w-6 h-6 text-indigo-500" />,
    color: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "Zero-Database Sharing",
    description: "Share your exact mockup state via a unique URL. No accounts, no database, no limits. The entire state lives in the link.",
    icon: <Share2 className="w-6 h-6 text-green-500" />,
    color: "bg-green-500/10 border-green-500/20",
  },
  {
    title: "High-Res Exports",
    description: "Download 1x, 2x, or 3x pixel-ratio PNGs, or generate smooth animated GIFs directly in your browser.",
    icon: <ImageIcon className="w-6 h-6 text-pink-500" />,
    color: "bg-pink-500/10 border-pink-500/20",
  },
  {
    title: "Pixel-Perfect UI",
    description: "Authentic typography, native icons, dynamic islands, and interactive emoji reactions match real apps 1:1.",
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Local Save System",
    description: "Save unlimited mockups locally to your browser. Revisit and edit them anytime without ever logging in.",
    icon: <HardDrive className="w-6 h-6 text-amber-500" />,
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Drag & Drop Ordering",
    description: "Easily reorder messages, change sides, and adjust timestamps using our intuitive drag-and-drop editor.",
    icon: <Layout className="w-6 h-6 text-purple-500" />,
    color: "bg-purple-500/10 border-purple-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create convincing chat screenshots, fake conversations, and social media posts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${feature.color} group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
