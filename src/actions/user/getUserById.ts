"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IUser } from "@/types/user.types";

export const getUserById = async (userId: string) => {
    try {
        const response = await serverFetch.get(`/user/${userId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch user by ID.");
        }
        return data.data as IUser;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching user by ID.");
    }
};