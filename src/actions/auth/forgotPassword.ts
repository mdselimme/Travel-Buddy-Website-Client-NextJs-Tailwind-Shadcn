"use server"
import { serverFetch } from "@/lib/serverFetch";
import { IResetPasswordInput } from "@/types/auth.types";


//FORGOT PASSWORD EMAIL SEND ACTION
export const forgotPasswordEmailSend = async (email: string) => {

    const response = await serverFetch.post(
        `/auth/forgot-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        }
    );

    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to send reset link.");
    }

    return data;
};

//RESET PASSWORD ACTION
export const resetPasswordAction = async (resetData: IResetPasswordInput) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetData),
        });
        const data = await response.json();

        if (!response.ok || data.success === false) {
            throw new Error(data.message || "Failed to reset password.");
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error resetting password.");
    }
};