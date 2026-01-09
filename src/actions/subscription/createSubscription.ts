"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

interface CreateSubscriptionData {
    plan: "MONTHLY" | "YEARLY";
    price: number;
    currency: string;
    discount?: number;
}

export const createSubscriptionAction = async (subscriptionData: CreateSubscriptionData) => {
    try {
        const response = await serverFetch.post("/subscription/create", {
            body: JSON.stringify(subscriptionData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to create subscription");
        }

        revalidateTag("subscriptions", { expire: 0 });
        return data;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred",
        }
    }
};
