"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "@/lib/tokenHandlers";
import { verifyAccessToken } from "@/lib/verifyAccessToken";


export const getUserRole = async (): Promise<string | any> => {
    try {
        const accessToken = await getCookie("accessToken");
        const verifyToken = await verifyAccessToken(accessToken as string);
        if (verifyToken.success) {
            const role = verifyToken?.payload?.role;
            return role;
        } else {
            return null;
        }
    } catch (error: any) {
        return {
            message: error.message || "Failed to get user role",
            role: null
        }
    }
};