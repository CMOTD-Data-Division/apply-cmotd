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


export const metadata: Metadata = {
  title: "Center for Marine and Offshore Technology Development",
  description: "Internship Application Form",
  icons: {
    icon: "/Logo.png",
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
