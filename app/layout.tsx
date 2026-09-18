import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Autonomous Credit Agent",
    template: "%s | Autonomous Credit Agent",
  },

  description:
    "AI-powered cross-chain credit infrastructure using cryptographically verified financial data, autonomous risk decisions, deterministic safety controls, and trusted on-chain execution.",

  applicationName: "Autonomous Credit Agent",

  keywords: [
    "Autonomous Credit Agent",
    "AI Credit",
    "Web3",
    "DeFi",
    "Cross-chain",
    "Creditcoin",
    "Attestcoin",
    "AI Agent",
    "On-chain Credit",
  ],

  authors: [
    {
      name: "Autonomous Credit Agent",
    },
  ],

  creator: "Autonomous Credit Agent",

  metadataBase: new URL(
    "https://autonomous-credit-agent.vercel.app"
  ),

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  openGraph: {
    title: "Autonomous Credit Agent",
    description:
      "AI-powered cross-chain credit infrastructure for verified financial data, autonomous decisions, deterministic risk controls, and trusted on-chain execution.",

    url: "https://autonomous-credit-agent.vercel.app",

    siteName: "Autonomous Credit Agent",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Autonomous Credit Agent",

    description:
      "AI-powered cross-chain credit infrastructure with verified data and autonomous on-chain execution.",
  },
};


export const viewport: Viewport = {
  themeColor: "#07090d",
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
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}