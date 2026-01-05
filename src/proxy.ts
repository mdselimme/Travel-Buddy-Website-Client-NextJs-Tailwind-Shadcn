import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "./types/auth.types";
import {
    getDefaultDashboardRoute,
    getRouteOwner,
    isAuthRoute,
} from "./lib/authRouteUtils";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ✅ Read cookie directly from request (Edge-safe)
    const accessToken = request.cookies.get("accessToken")?.value ?? null;

    let userRole: UserRole | null = null;

    // ✅ Decode token ONLY (do NOT verify in middleware)
    if (accessToken) {
        try {
            const decoded = jwt.decode(accessToken) as JwtPayload | null;
            userRole = decoded?.role ?? null;
        } catch {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    /* ---------------- AUTH ROUTES ---------------- */
    // If already logged in, block /login, /register, etc.
    if (isAuth && accessToken && userRole) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url)
        );
    }

    /* ---------------- PROTECTED ROUTES ---------------- */
    if (routeOwner) {
        if (!accessToken || !userRole) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Admin access check
        if (
            routeOwner === "ADMIN" &&
            userRole !== "ADMIN" &&
            userRole !== "SUPER_ADMIN"
        ) {
            return NextResponse.redirect(
                new URL(getDefaultDashboardRoute(userRole), request.url)
            );
        }

        // User role mismatch
        if (
            routeOwner === "USER" &&
            userRole !== "USER"
        ) {
            return NextResponse.redirect(
                new URL(getDefaultDashboardRoute(userRole), request.url)
            );
        }
    }

    /* ---------------- HOME ROUTE ---------------- */
    if (pathname === "/" && accessToken && userRole) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};
