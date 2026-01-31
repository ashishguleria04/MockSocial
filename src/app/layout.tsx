import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AuthProvider } from "@/components/providers/auth-provider";

const font = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MockSocial",
  description: "Generate fake chat mockups for Signal, iMessage, and WhatsApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <div className="fixed top-4 right-4 z-[100]">
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
