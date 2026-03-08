import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import GrainOverlay from "./components/GrainOverlay";
import Scanlines from "./components/Scanlines";
import { AuroraBackground } from "./components/AuroraBackground";
import { GridSpotlight } from "./components/GridSpotlight";
import Preloader from "./components/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deniz Kaya | Media Designer",
  description: "Portfolio of Deniz Kaya - Media Designer (Bild und Ton)",
};

import SmoothScroll from "./components/SmoothScroll";
import SiteProtection from "./components/SiteProtection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen relative bg-[var(--background)] text-[var(--foreground)] selection:bg-purple-500 selection:text-white`}>
        {/* Anti-Theft Protection */}
        <SiteProtection />
        {/* SmoothScroll Client Component */}
        <SmoothScroll>
          <Preloader />
          <SessionWrapper>
            <main className="flex flex-col min-h-screen w-full">
              {children}
            </main>
          </SessionWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
