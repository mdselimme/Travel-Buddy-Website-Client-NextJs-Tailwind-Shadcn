"use server";
import { serverFetch } from "@/lib/serverFetch";
import { deleteCookie } from "@/lib/tokenHandlers";



export const logOutUser = async () => {

    const response = await serverFetch.post("/auth/logout");

    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to log out");
    }

    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");


    return data;
};