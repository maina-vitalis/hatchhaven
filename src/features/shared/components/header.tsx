"use client";

import { Menu, ShoppingCart, Phone, User, LogOut, LogIn, UserPlus, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isAdmin = (session?.user as any)?.role === "ADMIN";

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

            {/* Authentication Section */}
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex gap-2"
                    asChild
                  >
                    <Link href="/admin">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden sm:flex gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="max-w-[120px] truncate">
                        {session?.user?.name || session?.user?.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user?.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex gap-2"
                  asChild
                >
                  <Link href="/login">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all px-6 gap-2"
                  asChild
                >
                  <Link href="/signup">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}

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
              <SheetContent className="w-[320px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header Section */}
                  <div className="px-6 pt-6 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-sm">
                        <span className="text-primary-foreground text-xl">🐔</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-foreground leading-tight">Hatch Haven</span>
                        <span className="text-xs text-muted-foreground leading-tight">Fresh & Ethical</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Section */}
                  <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                              "px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Footer Actions */}
                  <div className="px-4 pt-4 pb-6 border-t border-border/50 space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-11 text-base hover:bg-muted/50"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Contact Us</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-11 text-base hover:bg-muted/50"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart</span>
                    </Button>

                    {/* Mobile Auth Section */}
                    {isAuthenticated ? (
                      <>
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 h-11 text-base hover:bg-muted/50"
                            asChild
                          >
                            <Link href="/admin">
                              <Shield className="h-5 w-5" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </Button>
                        )}
                        <div className="pt-2 space-y-2">
                          <div className="px-4 py-2 text-sm">
                            <p className="font-medium">{session?.user?.name || "User"}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {session?.user?.email}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 h-11 text-base hover:bg-muted/50"
                            asChild
                          >
                            <Link href="/profile">
                              <User className="h-5 w-5" />
                              <span>Profile</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 h-11 text-base hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => signOut({ callbackUrl: "/" })}
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-11 text-base hover:bg-muted/50"
                          asChild
                        >
                          <Link href="/login">
                            <LogIn className="h-5 w-5" />
                            <span>Sign In</span>
                          </Link>
                        </Button>
                        <Button
                          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all mt-2 font-semibold gap-2"
                          asChild
                        >
                          <Link href="/signup">
                            <UserPlus className="h-4 w-4" />
                            Sign Up
                          </Link>
                        </Button>
                      </>
                    )}
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
