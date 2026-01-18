"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/lib/tokenHandlers";
import { IUser } from "@/types/user.types";
import { redirect } from "next/navigation";



export const getUserInfo = async (): Promise<IUser | null> => {

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
        };

        return result.data as IUser;
    } catch (error: any) {
        const msg = error?.message || "Failed to fetch user info.";
        if (msg.includes("No access token")) {
            redirect("/login");
        }
        return null;
    };
};