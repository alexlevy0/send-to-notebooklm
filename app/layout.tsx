import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Send to NotebookLM - Chrome Extension for Research",
  description: "The fastest way to capture articles, PDFs, and videos into Google NotebookLM. One-click research workflow for students, researchers, and knowledge workers. Free forever.",
  keywords: [
    "NotebookLM",
    "Chrome Extension",
    "Research Tool",
    "Knowledge Management",
    "Second Brain",
    "Note Taking",
    "PDF Capture",
    "Web Clipper"
  ],
  authors: [{ name: "Alex Levy" }],
  creator: "Alex Levy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.send-to-notebooklm.com",
    title: "Send to NotebookLM - Chrome Extension for Research",
    description: "The fastest way to capture articles, PDFs, and videos into Google NotebookLM. One-click research workflow.",
    siteName: "Send to NotebookLM",
    images: [
      {
        url: "https://www.send-to-notebooklm.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Send to NotebookLM Extension"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Send to NotebookLM - Chrome Extension for Research",
    description: "The fastest way to capture articles, PDFs, and videos into Google NotebookLM.",
    images: ["https://www.send-to-notebooklm.com/og-image.png"],
    creator: "@alexlevy" 
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
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE", // Add when available in Search Console
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Send to NotebookLM",
              "applicationCategory": "BrowserExtension",
              "operatingSystem": "Chrome",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              },
              "description": "Chrome extension to capture web pages, PDFs, and videos directly into Google NotebookLM with a single click.",
              "url": "https://www.send-to-notebooklm.com",
              "author": {
                "@type": "Person",
                "name": "Alex Levy"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        {!process.env.NEXT_PUBLIC_EXT_BUILD && <Analytics />}
      </body>
    </html>
  );
}
