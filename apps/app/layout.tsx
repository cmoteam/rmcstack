import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Stepper } from "@/components/Stepper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMOFlow Workshop",
  description: "RMC サイクルをワークショップで体感する装置",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
        <Stepper />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
