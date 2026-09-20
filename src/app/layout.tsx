import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-aan-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-aan-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "AAN Legacy Foundation",
    template: "%s | AAN Legacy Foundation",
  },
  description:
    "Building legacies, impacting lives, and transforming the world through opportunity and community.",
  openGraph: {
    type: "website",
    siteName: "AAN Legacy Foundation",
    title: "AAN Legacy Foundation",
    description: "Building legacies, impacting lives, and transforming the world through opportunity and community.",
    url: "/",
    images: [{ url: "/brand/AAN_logo1.png", width: 1080, height: 1080, alt: "AAN Legacy Foundation logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAN Legacy Foundation",
    description: "Building legacies, impacting lives, and transforming the world through opportunity and community.",
    images: ["/brand/AAN_logo1.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AAN Legacy Foundation",
              url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
              logo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/brand/AAN_logo1.png`,
              description: "AAN Legacy Foundation creates opportunities through education, scholarships, youth empowerment, humanitarian support, and community development.",
            }),
          }}
        />
      </body>
    </html>
  );
}
