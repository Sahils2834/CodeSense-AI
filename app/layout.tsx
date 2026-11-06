
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeLens AI | Intelligent Code Reviewer",
  description:
    "Analyse your source code with AI. Detect bugs, identify security vulnerabilities, improve performance, and receive actionable code recommendations.",
  applicationName: "CodeLens AI",
  keywords: [
    "AI Code Reviewer",
    "Code Analysis",
    "Bug Detection",
    "Code Security",
    "Code Optimization",
    "Developer Tools",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
