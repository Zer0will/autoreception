import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Footer, Header } from "@/components/Shell";
import { site } from "@/lib/site";

import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AutoReception — turn missed calls into warmed jobs",
    template: "%s | AutoReception",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "AutoReception — turn missed calls into warmed jobs",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
