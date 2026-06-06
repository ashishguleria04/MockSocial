import Link from "next/link";
import { MessageSquare, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-indigo-100/60 dark:border-border/40 bg-gradient-to-b from-indigo-50/40 to-background dark:from-transparent dark:to-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-lg shadow-glow">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">MockSocial</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              The ultimate open-source mockup generator for chat applications and social media platforms.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://github.com/ashishguleria04/MockSocial" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="hover:text-foreground transition-colors disabled">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/editor" className="hover:text-primary transition-colors">Mockup Editor</Link></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#platforms" className="hover:text-primary transition-colors">Platforms</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal & Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="https://github.com/ashishguleria04/MockSocial/issues" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Report an Issue</a></li>
              <li><a href="https://github.com/ashishguleria04/MockSocial" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Source Code</a></li>
              <li><a href="#" className="hover:text-primary transition-colors cursor-not-allowed">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors cursor-not-allowed">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} MockSocial. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed with <span className="text-red-500">♥</span> for creators
          </p>
        </div>
      </div>
    </footer>
  );
}
