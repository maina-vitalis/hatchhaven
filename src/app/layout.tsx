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
  metadataBase: new URL("https://www.hatchhavenacres.co.ke"),
  title: {
    default: "Hatch Haven Acres | Premium Farm-Raised Poultry & Eggs",
    template: "%s | Hatch Haven Acres",
  },
  description:
    "Discover premium quality, ethically raised poultry including chickens, turkeys, ducks, and fresh organic eggs. Delivered fresh to your doorstep across Kenya. Award-winning poultry farm since 2010.",
  keywords: [
    "poultry farm",
    "fresh chicken",
    "organic eggs",
    "turkey",
    "ducks",
    "guinea fowl",
    "kenya poultry",
    "farm fresh",
    "free range chicken",
    "hatch haven",
  ],
  authors: [{ name: "Hatch Haven Acres" }],
  creator: "Hatch Haven Acres",
  publisher: "Hatch Haven Acres",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.hatchhavenacres.co.ke",
    title: "Hatch Haven Acres | Fresh, Ethical, Farm-Raised Poultry",
    description:
      "Order premium quality, free-range chicken, turkey, ducks, and fresh eggs. Hormone-free and ethically raised on our sustainable farm.",
    siteName: "Hatch Haven Acres",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists or use a remote URL if possible
        width: 1200,
        height: 630,
        alt: "Hatch Haven Acres - Premium Poultry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hatch Haven Acres | Premium Poultry Farm",
    description:
      "Fresh, ethical, and farm-raised poultry delivered to your door. Chickens, turkeys, ducks, and more.",
    images: ["/og-image.jpg"],
    creator: "@hatchhaven", // Replace with actual handle if known
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Assuming these files might exist or be added
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
          <Toaster richColors visibleToasts={1} />
        </Providers>
      </body>
    </html>
  );
}
