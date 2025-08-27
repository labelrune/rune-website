import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "src/molecules/Navbar";
import { Footer } from "src/molecules/footer";
import Link from "next/link";
import FacebookPixel from "src/molecules/common/FacebookPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rune",
  description: "Rune Website",
};

const MetaPixelID = process.env.META_PIXEL_ID ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-28">{children}</div>
        <Footer />
        <Link
          href="https://wa.me/+919008255433?text=Hey!"
          target="_blank"
          className="fixed bottom-8 right-8 md:bottom-16 md:right-16 animate-pulse hover:animate-none w-12 md:w-16 aspect-square"
          aria-label="rune-whatsapp"
        >

          <img
            src="/whatsapp.svg"
            alt="whatsapp_image"
            className="w-full h-full object-cover"
          />

        </Link>
        <FacebookPixel pixelID={MetaPixelID} />
      </body>
    </html>
  );
}
