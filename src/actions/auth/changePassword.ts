"use server";
import { serverFetch } from "@/lib/serverFetch";

interface ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export const changePasswordAction = async (passwordData: ChangePasswordInput) => {
    try {
        const response = await serverFetch.post('/auth/change-password', {
            body: JSON.stringify(passwordData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok || data.success === false) {
            throw new Error(data.message || "Failed to change password.");
        }
        return data;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || "Failed to change password."
        };
    }
};