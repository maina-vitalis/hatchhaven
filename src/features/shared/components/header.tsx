"use client";

import {
  Menu,
  ShoppingCart,
  Phone,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/src/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { cn } from "@/src/lib/utils";
import { CartSheet } from "@/src/features/cart/components/cart-sheet";
import { useCart } from "@/src/context/cart-context";

interface user {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "CUSTOMER" | "ADMIN";
}

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cartCount } = useCart();

  // Only show authenticated state when status is confirmed, not during loading
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const isAdmin = (session?.user as user)?.role === "ADMIN";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="Hatch Haven Logo"
              width={48}
              height={48}
              className="group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">
                Hatch Haven
              </span>
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
              aria-label="Call us"
              asChild
            >
              <a href="tel:+254748645010">
                <Phone className="h-5 w-5" />
              </a>
            </Button>
            <CartSheet>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </CartSheet>

            {/* Authentication Section */}
            {isLoading ? (
              // Show a loading placeholder that matches the authenticated state to prevent flicker
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>
            ) : isAuthenticated ? (
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
                      className="hidden sm:flex gap-2 h-9 px-2"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={session?.user?.image || undefined}
                          alt={session?.user?.name || "User"}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {session?.user?.name
                            ? session.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : session?.user?.email
                            ? session.user.email[0].toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-[120px] truncate text-sm">
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
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href="/admin"
                            className="cursor-pointer text-primary font-medium"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Admin
                          </Link>
                        </DropdownMenuItem>
                      </>
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
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] p-0 flex flex-col border-l"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <Link href="/" className="flex items-center gap-3 w-fit">
                    <Image
                      src="/logo.png"
                      alt="Hatch Haven Logo"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-foreground leading-none">
                        Hatch Haven Acres
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
                        Fresh & Ethical
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <nav className="flex flex-col gap-1">
                    <div className="mb-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Menu
                    </div>
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <SheetClose key={item.name} asChild>
                          <Link
                            href={item.path}
                            className={cn(
                              "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                              isActive
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {item.name}
                            {isActive && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    {isAdmin && (
                      <SheetClose asChild>
                        <Link
                          href="/admin"
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            pathname.startsWith("/admin")
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground hover:bg-muted"
                          )}
                        >
                          <Shield className="h-4 w-4" />
                          Admin Dashboard
                          {pathname.startsWith("/admin") && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </Link>
                      </SheetClose>
                    )}
                  </nav>

                  <div className="my-8 h-px bg-border/50" />

                  <div className="flex flex-col gap-1">
                    <div className="mb-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Support & Cart
                    </div>
                    <SheetClose asChild>
                      <a
                        href="tel:+254748645010"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <Phone className="h-4 w-4" />
                        </div>
                        Call Us
                      </a>
                    </SheetClose>
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 bg-muted/10">
                  {isLoading ? (
                    <div className="flex items-center gap-3 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-muted" />
                      <div className="space-y-2">
                        <div className="w-24 h-3 bg-muted rounded" />
                        <div className="w-16 h-2 bg-muted rounded" />
                      </div>
                    </div>
                  ) : isAuthenticated ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage
                            src={session?.user?.image || undefined}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {session?.user?.name?.[0].toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold truncate text-foreground">
                            {session?.user?.name || "User"}
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <SheetClose asChild>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/login">Log In</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button className="w-full" asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
