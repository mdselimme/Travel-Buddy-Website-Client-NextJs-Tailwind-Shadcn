import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/lib/tokenHandlers";
import { verifyAccessToken } from "@/lib/tokenHanlder";
import { IUser } from "@/types/user.types";
import { cache } from "react";


export const getUserInfo = async (): Promise<IUser | null> => {
    let userInfo: Partial<IUser> | null;
    try {
        const response = await serverFetch.get("/user/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] },
        });

        const result = await response.json();

        if (!response.ok || result.success === false) {
            const accessToken = await getCookie("accessToken");
            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = await verifyAccessToken(accessToken);

        }

    } catch (error: any) {
        return null;
    }
};