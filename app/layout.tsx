import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ReduxProvider from "@/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewsHub - Your Global News Source",
  description:
    "Stay informed with the latest news from trusted sources around the world. Search and filter articles by category, source, and more.",
  keywords:
    "news, articles, breaking news, world news, technology, business, sports",
  authors: [{ name: "NewsHub Team" }],
  openGraph: {
    title: "NewsHub - Your Global News Source",
    description:
      "Stay informed with the latest news from trusted sources around the world.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewsHub - Your Global News Source",
    description:
      "Stay informed with the latest news from trusted sources around the world.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

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
          {/* <Provider store={store}> */}
          <Navbar
            onSearchToggle={undefined}
            onMobileMenuToggle={undefined}
            isMobileMenuOpen={undefined}
          />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* </Provider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
