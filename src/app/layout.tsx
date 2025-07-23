import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animish Chopade - Developer, Designer",
  description:
    "Fullstack Developer and Designer from Pune. You build, then you ship. Specialized in modern web apps using React, Node.js, and Supabase.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Animish Chopade - Developer, Designer",
    description:
      "You build, then you ship. Fullstack Developer from Pune crafting clean, scalable web experiences.",
    url: "https://animishchopade.com",
    siteName: "Animish Chopade",
    images: [
      {
        url: "https://x.com/animish06/photo",
        width: 1200,
        height: 630,
        alt: "Animish Chopade - Fullstack Developer and Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animish Chopade - Developer, Designer",
    description:
      "You build, then you ship. Fullstack Developer from Pune building modern web products.",
    images: ["https://x.com/animish06/photo"],
    creator: "@animish06",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
