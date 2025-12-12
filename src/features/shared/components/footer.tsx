import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/src/components/ui/separator";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
  </svg>
);

export function Footer() {
  const footerLinks = {
    "Quick Links": [
      { name: "About Us", path: "/about" },
      { name: "Our Products", path: "/products" },
      { name: "Gallery", path: "/gallery" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
    Products: [
      { name: "Fresh Eggs", path: "/products" },
      { name: "Chicken", path: "/products" },
      { name: "Turkey", path: "/products" },
      { name: "Duck", path: "/products" },
    ],
    Support: [
      { name: "FAQ", path: "/faq" },
      { name: "Contact Us", path: "/contact" },
      { name: "About", path: "/about" },
    ],
  };

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Hatch Haven Logo"
                width={48}
                height={48}
              />
              <div className="flex flex-col">
                <span className="text-foreground">Hatch Haven</span>
                <span className="text-xs text-muted-foreground">
                  Fresh & Ethical
                </span>
              </div>
            </div>
            <p className="text-sm mb-4">
              Committed to providing the finest quality poultry and eggs through
              ethical farming practices and sustainable agriculture.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1KR5U8RB2W/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/hatchpoultry.ke?igsh=eXM2bXJyOWVzM3Bm&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@hatchhavenacre?_r=1&_t=ZM-922sRdeftL2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span> 0748645010</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@hatchhaven.co.ke</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Nanyuki</span>
            </div>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Hatch Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
