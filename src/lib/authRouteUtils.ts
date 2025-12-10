import { UserRole } from "@/types/auth.types";


export type RouteConfig = {
    exact: string[];
    patterns: RegExp[];
};

export const authRoutes: string[] = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
];

export const commonProtectedRoutes: RouteConfig = {
    exact: [
        "/my-profile",
        "/change-password",
    ],
    patterns: [],
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin(\/.*)?$/],
    exact: [],
};

export const userProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard(\/.*)?$/],
    exact: [],
};

export const isAuthRoute = (pathname: string): boolean => {
    return authRoutes.some((route) => route === pathname);
}

export const isRoutesMatches = (pathname: string, routeConfig: RouteConfig): boolean => {
    // Check exact matches
    if (routeConfig.exact.includes(pathname)) {
        return true;
    }
    return routeConfig.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "USER" | "SUPER_ADMIN" | "COMMON" | null => {
    if (isRoutesMatches(pathname, adminProtectedRoutes)) {
        return "SUPER_ADMIN";
    }
    if (isRoutesMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRoutesMatches(pathname, userProtectedRoutes)) {
        return "USER";
    }
    if (isRoutesMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
};


export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "SUPER_ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "USER") {
        return "/dashboard";
    }
    return "/";
}


export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}