import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Animish Chopade - Full Stack Developer",
  description:
    "Full Stack Developer from Pune specializing in React, Next.js, Node.js, and modern web applications. Open to full-time roles and freelance projects.",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "https://animishchopade.in",
  },
  openGraph: {
    title: "Animish Chopade - Full Stack Developer",
    description:
      "Full Stack Developer from Pune building clean, scalable web products. React · Next.js · Node.js · TypeScript.",
    url: "https://animishchopade.in",
    siteName: "Animish Chopade",
    images: [
      {
        url: "https://res.cloudinary.com/dkv3bx51z/image/upload/f_auto,q_auto/v1776012662/IMG-20250503-WA0076.jpg_rzx0tr.jpg",
        width: 1200,
        height: 630,
        alt: "Animish Chopade - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animish Chopade - Full Stack Developer",
    description:
      "Full Stack Developer from Pune building modern web products with React, Next.js, and Node.js.",
    images: [
      "https://res.cloudinary.com/dkv3bx51z/image/upload/f_auto,q_auto/v1776012662/IMG-20250503-WA0076.jpg_rzx0tr.jpg",
    ],
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
  keywords: [
    "Animish Chopade",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Pune Developer",
    "Frontend Developer",
    "TypeScript",
    "Web Developer India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} ${serif.variable} grain`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
