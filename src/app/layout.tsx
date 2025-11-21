import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConditionalHeader } from "@/src/features/shared/components/conditional-header";
import { Providers } from "./providers";
import { Toaster } from "@/src/components/ui/sonner";
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
  title: "Fresh Poultry - Premium Quality Poultry Delivered Fresh",
  description:
    "Premium quality poultry including chickens, turkeys, ducks and fresh eggs. Free delivery on orders over $50. Award-winning poultry farm since 2010.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <ConditionalHeader />
          <main>{children}</main>
          {/* Footer will be added conditionally based on route */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
