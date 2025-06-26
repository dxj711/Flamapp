import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import { ThemeScript } from "./theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "HR Dashboard",
  description: "A luxurious HR performance dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} antialiased min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#c7d2fe] dark:from-[#18181b] dark:via-[#23263a] dark:to-[#1e293b]`}
      >
        <nav className="w-full flex items-center justify-between px-8 py-5 bg-white/60 dark:bg-gray-900/60 shadow-lg sticky top-0 z-40 backdrop-blur-md rounded-b-2xl border-b border-blue-100 dark:border-gray-800">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 bg-clip-text text-transparent drop-shadow-lg" style={{ fontFamily: 'var(--font-heading)' }}>HR Dashboard</Link>
            <Link href="/" className="lux-nav-link">Dashboard</Link>
            <Link href="/bookmarks" className="lux-nav-link">Bookmarks</Link>
            <Link href="/analytics" className="lux-nav-link">Analytics</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-300 font-mono">Empowering HR Excellence</span>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto w-full px-4 py-12 sm:py-16">
          {children}
        </main>
        <DarkModeToggle />
      </body>
    </html>
  );
}
