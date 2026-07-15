import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Header from "./components/Navigation";
import { Analytics } from '@vercel/analytics/next';
const outfit = localFont({
  src: [
    { path: './fonts/Outfit/Outfit-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Outfit/Outfit-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-outfit',
  display: 'swap',
});

const moralana = localFont({
  src: './fonts/moralana/Moralana DEMO.otf',
  variable: '--font-moralana',
  display: 'swap',
});



export const metadata: Metadata = {
  title: "Adithya Nagamuneendran — Portfolio",
  description:
    "Final-year Computer Science (Data Science) student at Dayananda Sagar University, Bengaluru — building across full stack development, AI, and data science.",
};

import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${outfit.variable} ${moralana.variable} antialiased`}
      >
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
