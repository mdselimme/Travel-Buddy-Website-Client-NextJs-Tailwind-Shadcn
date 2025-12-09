"use server";

import { IAuthLogin } from "@/types/auth.types";

export const authLogIn = async (credentials: IAuthLogin) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        }
    );

    const data = await response.json();

    // Handle API failure (status not 200)
    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Login failed. Please try again.");
    }

    return data;
};
