
export interface IHeaderNavItem {
    title: string;
    href: string;
}

export const headerGuestNavItems: IHeaderNavItem[] = [
    { href: "/", title: "Home", },
    { href: "/explore-travelers", title: "Explore Travelers", },
    { href: "/find-travel-buddy", title: "Find Travel Buddy", },
];

export const headerUserNavItems: IHeaderNavItem[] = [
    { href: "/", title: "Home", },
    { href: "/explore-travelers", title: "Explore Travelers", },
    { href: "/find-travel-buddy", title: "Find Travel Buddy", },
    { href: "/my-travel-plans", title: "My Travel Plans", },
    { href: "/profile", title: "Profile", },
    { href: "/admin/dashboard", title: "Admin Dashboard" },
];

export const headerAdminNavItems: IHeaderNavItem[] = [
    { href: "/", title: "Home", },
    { href: "/admin/dashboard", title: "Admin Dashboard" },
    { href: "/admin/dashboard/manage-users", title: "Manage Users" },
    { href: "/admin/dashboard/manage-plans", title: "Manage Travel Plans" },
    { href: "/my-profile", title: "Profile" },
];

