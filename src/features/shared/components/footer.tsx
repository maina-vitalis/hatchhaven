import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/src/components/ui/separator";

export function Footer() {
  const footerLinks = {
    "Quick Links": [
      { name: "About Us", path: "/about" },
      { name: "Our Products", path: "/products" },
      { name: "Services", path: "/#services" },
      { name: "Team", path: "/team" },
      { name: "Contact", path: "/contact" },
    ],
    Products: [
      { name: "Fresh Eggs", path: "/products" },
      { name: "Chicken", path: "/products" },
      { name: "Turkey", path: "/products" },
      { name: "Duck", path: "/products" },
      { name: "Gift Boxes", path: "/products" },
    ],
    Support: [
      { name: "FAQ", path: "/faq" },
      { name: "Shipping Info", path: "/#shipping" },
      { name: "Returns", path: "/#returns" },
      { name: "Privacy Policy", path: "/#privacy" },
      { name: "Terms of Service", path: "/#terms" },
    ],
  };

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <span className="text-primary-foreground text-xl">🐔</span>
              </div>
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
                href="#"
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
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
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@hatchhaven.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>123 Farm Road, Countryside</span>
            </div>
          </div>
          <p className="text-sm">© 2025 Hatch Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
