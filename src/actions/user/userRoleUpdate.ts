"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

interface IInputData {
    email: string;
    role: "USER" | "ADMIN";
}

export const userRoleUpdateAction = async (inputData: IInputData) => {
    try {
        const response = await serverFetch.patch("/user/update-role", {
            body: JSON.stringify(inputData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch user roles.");
        }
        revalidateTag("users", { expire: 0 });
        return data;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Error fetching user roles.",
        }
    }
};