import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dra. Aline Foganholi - Especialista em Prótese Dentária e DTM",
  description: "Encontrando propósito em cada sorriso com tratamentos personalizados e de qualidade em Prótese Dentária e DTM.",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        playfair.variable
      )}>
        {children}
      </body>
    </html>
  );
}
