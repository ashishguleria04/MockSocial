import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ 
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
    <html lang="en">
      <body className={`${font.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
