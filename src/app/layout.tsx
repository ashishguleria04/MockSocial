import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AuthProvider } from "@/components/providers/auth-provider";
import { UrlHydrator } from "@/components/shared/url-hydrator";
import { ToastProvider } from "@/components/shared/toast";
import { Suspense } from "react";

const font = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
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
      <body className={`${font.variable} ${monoFont.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <Suspense fallback={null}>
                <UrlHydrator />
              </Suspense>
              {children}
              <div className="fixed top-4 right-4 z-[100]">
                <ThemeToggle />
              </div>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
