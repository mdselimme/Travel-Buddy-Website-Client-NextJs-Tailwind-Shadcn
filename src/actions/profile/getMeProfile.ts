"use server"
import { serverFetch } from "@/lib/serverFetch";


export const getMeProfile = async () => {
    const response = await serverFetch.get("/profile/me", {
        cache: "force-cache",
        next: {
            tags: ["user-profile"]
        }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
};