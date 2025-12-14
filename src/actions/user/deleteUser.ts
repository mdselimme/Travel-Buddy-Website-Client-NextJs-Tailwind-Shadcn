"use server";

import { serverFetch } from "@/lib/serverFetch";

export const deleteUserAction = async (userId: string) => {
    try {
        const response = await serverFetch.delete(`/user/${userId}`);

        const data = await response.json()

        if (!response.ok || !data.success) {
            throw new Error(data.message || "User not deleted.")
        };

        return data.message || "User deleted successfully."
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "User not deleted.")
    }
};