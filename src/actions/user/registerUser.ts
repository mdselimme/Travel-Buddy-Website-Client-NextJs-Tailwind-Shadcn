"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IRegisterInput } from "@/types/user.types";


export const registerUser = async (userData: IRegisterInput) => {
    try {

        const response = await serverFetch.post(
            `/user/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const data = await response.json();

        if (!response.ok || data.success === false) {
            throw new Error(data.message || "Failed to register user.");
        }
        return data;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || "Failed to register user."
        };
    }
};