import { UserRole } from "@/types/auth.types";
import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute } from "./authRouteUtils";


export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            items: [{
                title: 'Dashboard',
                href: defaultDashboard,
                icon: 'LayoutDashboard',
                roles: ["SUPER_ADMIN", "ADMIN", "USER"],
            }]
        },
        {
            title: 'Profile Management',
            items: [

                {
                    title: 'My Profile',
                    href: '/my-profile',
                    icon: 'User',
                    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
                }
            ]
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Change Password',
                    href: '/change-password',
                    icon: 'Settings',
                    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
                }
            ]
        }
    ]
};


export const adminNavItems: NavSection[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'Manage Users',
                href: '/admin/dashboard/manage-users',
                icon: 'Users',
                roles: ["SUPER_ADMIN", "ADMIN"],
            },
            {
                title: "Manage Plans",
                href: "/admin/dashboard/manage-plans",
                icon: "CreditCard",
                roles: ["SUPER_ADMIN", "ADMIN"],
            },
            {
                title: "Manage Subscriptions",
                href: "/admin/dashboard/manage-subscriptions",
                icon: "Box",
                roles: ["SUPER_ADMIN", "ADMIN"],
            },
            {
                title: "Travel Types",
                href: "/admin/dashboard/travel-types",
                icon: "PlaneTakeoff",
                roles: ["SUPER_ADMIN", "ADMIN"],
            },
        ]
    }
];

const superAdminNavItems: NavSection[] = [
    {
        title: 'Super Admin Tools',
        items: [
            {
                title: 'Admin Management',
                href: '/admin/dashboard/admin-management',
                icon: "ShieldCheck",
                roles: ["SUPER_ADMIN"],
            }
        ]
    }
];


const userNavItems: NavSection[] = [
    {
        title: 'Plans Management',
        items: [
            {
                title: 'My Plans',
                href: '/dashboard/my-plans',
                icon: 'CreditCard',
                roles: ["USER"],
            },
            {
                title: 'My Matches',
                href: '/dashboard/my-matches',
                icon: 'Users',
                roles: ["USER"],
            },
            {
                title: "My Subscriptions",
                href: "/dashboard/my-subscriptions",
                icon: "Box",
                roles: ["USER"],
            },
            {
                title: "Create New Plan",
                href: "/dashboard/create-plan",
                icon: "PlusCircle",
                roles: ["USER"],
            },
            {
                title: "My Reviews",
                href: "/dashboard/my-reviews",
                icon: "Star",
                roles: ["USER"],
            }
        ]
    }
];


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);
    switch (role) {
        case "SUPER_ADMIN":
            return [...commonNavItems, ...adminNavItems, ...superAdminNavItems]
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems]
        case "USER":
            return [...commonNavItems, ...userNavItems]
        default:
            return [];
    }
};