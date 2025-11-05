import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";


const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-questrial",
});

const siteName = "Center For Marine and Offshore Technology Development";
const siteDesc =
  "Official website & API for the Research Center for Marine and Offshore Technology Development.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDesc,
  applicationName: siteName,
  keywords: [
    "Marine Technology",
    "Offshore Engineering",
    "Research Center",
    "Maritime Innovation",
    "Ocean Systems",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "science",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: siteDesc,
    siteName,
    locale: "en_GB",
    images: [
      {
        url: "/logo_transparent.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    creator: "@MarselDokubo",
    images: ["/logo_transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo_transparent.png" },
      { url: "/logo_transparent.png", sizes: "32x32", type: "image/png" },
      { url: "/logo_transparent.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/logo_transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={questrial.variable}>
      <body
        className={`font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
