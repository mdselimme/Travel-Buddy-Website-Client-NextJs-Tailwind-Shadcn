"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";


export const userStatusUpdate = async (userId: string, isActive: string) => {
    try {
        const response = await serverFetch.patch(`/user/update-status/${userId}`, {
            body: JSON.stringify({ isActive }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to update user status");
        }
        revalidateTag("users", { expire: 0 });
        return data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "User status update error");
    }
}