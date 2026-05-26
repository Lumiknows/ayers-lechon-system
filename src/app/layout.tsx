import type { Metadata } from "next";
import { Prompt, Fira_Sans_Condensed, Mulish } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const firaSansCondensed = Fira_Sans_Condensed({
  variable: "--font-fira-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Cebu's Ayers Lechon | Authentic Cebu Lechon",
    template: "%s | Cebu's Ayers Lechon",
  },
  description:
    "Authentic Cebu lechon roasted to perfection. Crispy skin, flavorful meat, and the tradition of Cebu. Order for family gatherings and celebrations.",
  keywords: [
    "Cebu lechon",
    "Ayers Lechon",
    "roasted pig",
    "Filipino food",
    "Cebu City",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${prompt.variable} ${firaSansCondensed.variable} ${mulish.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-charcoal">
        {children}
      </body>
    </html>
  );
}
