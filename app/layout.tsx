import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Header from "./components/Navigation";
import Footerbar from "./components/Footer";
 
const outfit = localFont({
  src: [
    { path: './fonts/Outfit/Outfit-Thin.ttf', weight: '100', style: 'normal' },
    { path: './fonts/Outfit/Outfit-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Outfit/Outfit-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/Outfit/Outfit-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/Outfit/Outfit-Black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-outfit',
  display: 'swap',
});



export const metadata: Metadata = {
  title: "Adithya's Protfolio",
  description: "Adithya's Portfolio using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${outfit.variable} antialiased`}
      >
        <Header/>
        {children}
        
      </body>
    </html>
  );
}
