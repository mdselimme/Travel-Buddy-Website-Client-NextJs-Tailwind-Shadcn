"use client";
import { Badge } from "@/components/ui/badge";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getIconComponent } from "@/lib/getIcon";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
  navItems: NavSection[];
}

const DashboardSidebarContent = ({
  navItems,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu className="gap-2">
          {navItems.map((item, itemIndex) => (
            <SidebarMenuItem key={itemIndex}>
              <SidebarMenuButton asChild>
                {item.title && (
                  <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.title}
                  </h4>
                )}
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  {item.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = getIconComponent(item.icon);
                    return (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                              isActive
                                ? "bg-primary text-white"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="flex-1">{item.title}</span>
                            {item.badgeCount && (
                              <Badge
                                variant={isActive ? "secondary" : "default"}
                                className="ml-auto"
                              >
                                {item.badgeCount}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default DashboardSidebarContent;
