import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRD Real Estate & Development",
  description: "Community Focused Results Driven - Providing comprehensive commercial and residential real estate services, including acquisitions, dispositions, leasing, and development.",
  keywords: ["real estate", "commercial real estate", "residential real estate", "property development", "CRD"],
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
    <html lang="en" className={playfair.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

