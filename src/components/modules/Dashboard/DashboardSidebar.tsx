import * as React from "react";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import WebLogo from "@/assets/icons/WebLogo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getUserInfo } from "@/actions/user/getUserInfo";
import { getNavItemsByRole } from "@/lib/navItem";
import { UserRole } from "@/types/auth.types";
import { NavSection } from "@/types/dashboard.types";
import { IUser } from "@/types/user.types";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const userInfo: IUser | null = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role as UserRole);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/"}>
                <WebLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Sidebar Content Section  */}
      <DashboardSidebarContent navItems={navItems} />
    </Sidebar>
  );
}
