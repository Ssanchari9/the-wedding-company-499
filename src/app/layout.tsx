import type { Metadata } from "next";
import { Caveat_Brush, DM_Serif_Display, Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const caveatBrush = Caveat_Brush({
  variable: "--font-caveat-brush",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test Your Knowledge",
  description: "Interactive quiz application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveatBrush.variable} ${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
