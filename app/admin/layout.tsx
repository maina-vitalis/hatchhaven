"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/src/features/admin/components/admin-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    } else if (status === "authenticated" && session?.user) {
      const userRole = (session.user as any)?.role;
      if (userRole !== "ADMIN") {
        router.push("/");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || (session?.user && (session.user as any)?.role !== "ADMIN")) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
