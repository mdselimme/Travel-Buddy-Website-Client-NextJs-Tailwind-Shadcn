import { serverFetch } from "@/lib/serverFetch";


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
        return data;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred",
        }
    }
};