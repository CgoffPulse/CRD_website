import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const copperplateBold = localFont({
  src: "../public/font/Copperplate Bold.ttf",
  variable: "--font-copperplate-bold",
  display: "swap",
  weight: "700",
});

const copperplateMedium = localFont({
  src: "../public/font/Copperplate-Cd Medium.ttf",
  variable: "--font-copperplate-medium",
  display: "swap",
  weight: "500",
});

export const metadata: Metadata = {
  title: "CRD Real Estate & Development",
  description:
    "Community Focused Results Driven - Providing comprehensive commercial and residential real estate services, including acquisitions, dispositions, leasing, and development.",
  keywords: [
    "real estate",
    "commercial real estate",
    "residential real estate",
    "property development",
    "CRD",
  ],
  openGraph: {
    title: "CRD Real Estate & Development",
    description: "Community Focused Results Driven",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${copperplateBold.variable} ${copperplateMedium.variable}`}
      lang="en"
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
