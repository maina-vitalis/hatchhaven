"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FolderTree,
  Egg,
  FileText,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import { NavUser } from "./nav-user";

const menuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        title: "Add Products",
        url: "/admin/products",
        icon: Package,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: FolderTree,
      },
      {
        title: "Breeds",
        url: "/admin/breeds",
        icon: Egg,
      },
      {
        title: "Variants",
        url: "/admin/variants",
        icon: Package,
      },
    ],
  },
  {
    title: "Blog",
    items: [
      {
        title: "Posts",
        url: "/admin/blog",
        icon: FileText,
      },
      {
        title: "Comments",
        url: "/admin/blog/comments",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Media",
    items: [
      {
        title: "Gallery",
        url: "/admin/gallery",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "All Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Team",
        url: "/admin/team",
        icon: Users,
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Hatch Haven</span>
                  <span className="">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
