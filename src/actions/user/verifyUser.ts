"use server"
import { IVerifyInput } from "@/types/user.types";

export const verifyUser = async (verifyInput: IVerifyInput) => {

    const verifyData = {
        email: verifyInput.email,
        otp: verifyInput.otp,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyData),
    });
    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to verify user.");
    }

    return data;
};

export const sendOtp = async (email: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email-send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to send OTP.");
    }

    return data;
};