/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { setCookie } from "@/lib/tokenHandlers";
import { IAuthLogin } from "@/types/auth.types";
import { parse } from "cookie";



export const authLogIn = async (credentials: IAuthLogin) => {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include",
        }
    );

    const data = await response.json();

    // Handle API failure (status not 200)
    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Login failed. Please try again.");
    }

    const getCookieHeader = response.headers.getSetCookie();

    if (getCookieHeader && getCookieHeader.length > 0) {
        getCookieHeader.forEach((cookie: string) => {
            const parsedCookie = parse(cookie);

            if (parsedCookie['accessToken']) {
                accessTokenObject = parsedCookie;
            }
            if (parsedCookie['refreshToken']) {
                refreshTokenObject = parsedCookie;
            }
        })
    } else {
        throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
        throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
        throw new Error("Tokens not found in cookies");
    }

    console.log({ accessTokenObject, refreshTokenObject })


    await setCookie("accessToken", accessTokenObject.accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: parseInt(accessTokenObject['Max-Age']),
        path: accessTokenObject.Path || "/",
        sameSite: accessTokenObject['SameSite'] || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: parseInt(refreshTokenObject['Max-Age']),
        path: refreshTokenObject.Path || "/",
        sameSite: refreshTokenObject['SameSite'] || "none",
    });


    return data;
};
