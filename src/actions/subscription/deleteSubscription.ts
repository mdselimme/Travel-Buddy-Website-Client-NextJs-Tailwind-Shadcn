"use server"
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";


export const deleteSubscriptionAction = async (subscriptionId: string) => {
    try {
        const response = await serverFetch.delete(`/subscription/${subscriptionId}`, {
            headers: {
                "Content-Type": "application/json",
            },

        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to delete subscription");
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