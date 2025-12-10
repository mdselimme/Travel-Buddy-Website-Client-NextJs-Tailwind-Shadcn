import { NextRequest, NextResponse } from "next/server";
import { getNewAccessToken } from "./actions/auth/refreshToken";
import { deleteCookie, getCookie } from "./lib/tokenHandlers";
import { UserRole } from "./types/auth.types";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authRouteUtils";
import { getUserInfo } from "./actions/user/getUserInfo";


export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    const hasTokenRefreshedParam = request.nextUrl.searchParams.get('tokenRefreshed');

    if (hasTokenRefreshedParam) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('tokenRefreshed');
        return Response.redirect(url);
    };

    const resultOfTokenRefresh = await getNewAccessToken();

    if (resultOfTokenRefresh.tokenRefreshed) {
        const url = request.nextUrl.clone();
        url.searchParams.set('tokenRefreshed', 'true');
        return NextResponse.redirect(url);
    };

    const accessToken = await getCookie("accessToken");

    let userRole: UserRole | null = null;

    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string);
        if (typeof verifiedToken === "string") {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
        userRole = verifiedToken.role;
    };

    const routeOwner = getRouteOwner(pathname);

    const isAuth = isAuthRoute(pathname);

    if (isAuth && accessToken) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole),
                request.url
            ));
    };

    if (routeOwner === "COMMON") {
        if (!accessToken) {
            const logInUrl = new URL("/login", request.url);
            logInUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(logInUrl);
        }
        return NextResponse.next();
    }

    if (routeOwner === "ADMIN" || routeOwner === "SUPER_ADMIN" || routeOwner === "USER") {
        if (!accessToken) {
            const logInUrl = new URL("/login", request.url);
            logInUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(logInUrl);
        }

        if (routeOwner === "ADMIN" && (userRole === "ADMIN" || userRole === "SUPER_ADMIN")) {
            return NextResponse.next();
        }
        if (userRole !== routeOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
    };

    if (routeOwner === null) {
        return NextResponse.next();
    };

    if (!accessToken) {
        const logInUrl = new URL("/login", request.url);
        logInUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(logInUrl);
    };

    if (accessToken) {
        const userInfo = await getUserInfo();
        //If profile not completed, redirect to /my-profile force them finish setting up profile
        if (!userInfo?.isProfileCompleted) {
            if (pathname !== "/my-profile") {
                const updateProfileUrl = new URL("/my-profile", request.url);
                updateProfileUrl.searchParams.set("redirect", pathname);
                return NextResponse.redirect(updateProfileUrl);
            }
            // If they are already on /my-profile, let them stay there to finish.
            return NextResponse.next();
        }

        // SCENARIO 2: Profile IS Completed
        // We simply allow navigation. We deleted the block that redirected 
        // /my-profile to the dashboard.

        if (pathname === "/") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userInfo.role), request.url));
        }

        // Allow them to go anywhere, INCLUDING /my-profile
        return NextResponse.next();
    }


    return NextResponse.next();
};


export const config = {
    matcher: [
        /* Match all request paths except for the ones starting with:
         * - api (API routes)
         * - static (static files)
         * _next (Next.js internals)
         * favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
};