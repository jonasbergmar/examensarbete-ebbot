import type { Metadata } from "next";
import { Parkinsans, Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Examination project",
  description: "Examination project Ebbot AI website redesign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${parkinsans.variable} ${interTight.variable} antialiased`}
      >
        <Header />
        <main className="overflow-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
