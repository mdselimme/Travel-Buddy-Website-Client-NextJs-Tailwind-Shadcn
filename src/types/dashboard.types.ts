import { UserRole } from "./auth.types";




export interface NavItem {
    title: string;
    href: string;
    icon: string;
    badgeCount?: number | string;
    roles?: UserRole[];
    isActive?: boolean;
}

export interface NavSection {
    title?: string;
    items: NavItem[];
};