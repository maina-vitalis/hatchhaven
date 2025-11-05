"use client";

import { Menu, ShoppingCart, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group transition-opacity hover:opacity-90"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-primary-foreground text-xl">🐔</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">Hatch Haven</span>
              <span className="text-xs text-muted-foreground leading-tight">
                Fresh & Ethical
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                  <span className="absolute inset-0 rounded-md bg-primary/5 opacity-0 hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Contact us"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button 
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all px-6"
            >
              Get Started
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <span className="text-primary-foreground text-lg">🐔</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-foreground">Hatch Haven</span>
                        <span className="text-xs text-muted-foreground">Fresh & Ethical</span>
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={cn(
                            "px-4 py-3 rounded-lg text-base font-medium transition-all",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="mt-auto pt-8 border-t space-y-3">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary"
                    >
                      <Phone className="h-5 w-5" />
                      Contact Us
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Cart
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
