
export interface IHeaderNavItem {
    title: string;
    href: string;
}

export const headerGuestNavItems: IHeaderNavItem[] = [
    { href: "/", title: "Home", },
    { href: "/explore", title: "Explore", },
    { href: "/find-travel-buddy", title: "Find Travel Buddy", },
    { href: "/reviews", title: "Reviews", },
];

export const headerUserNavItems: IHeaderNavItem[] = [
    { href: "/", title: "Home", },
    { href: "/explore", title: "Explore", },
    { href: "/dashboard/my-plans", title: "My Travel Plans", },
    { href: "/my-profile", title: "Profile", },
    { href: "/admin/dashboard", title: "Dashboard" },
];

export const headerAdminNavItems: IHeaderNavItem[] = [
    { href: "/", title: "Home", },
    { href: "/admin/dashboard", title: "Admin Dashboard" },
    { href: "/admin/dashboard/manage-users", title: "Manage Users" },
    { href: "/admin/dashboard/manage-plans", title: "Manage Travel Plans" },
    { href: "/my-profile", title: "Profile" },
];

