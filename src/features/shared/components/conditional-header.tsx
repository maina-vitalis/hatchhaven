"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on admin and auth routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login") || pathname?.startsWith("/signup")) {
    return null;
  }
  
  return <Header />;
}

