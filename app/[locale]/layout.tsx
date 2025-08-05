import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import ReduxProvider from "@/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <ReduxProvider>
          <Navbar
            onSearchToggle={undefined}
            onMobileMenuToggle={undefined}
            isMobileMenuOpen={undefined}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
