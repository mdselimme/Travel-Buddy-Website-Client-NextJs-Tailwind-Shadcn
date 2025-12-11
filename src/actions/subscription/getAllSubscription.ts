import { serverFetch } from "@/lib/serverFetch";



export const getAllSubscription = async () => {
    try {
        const response = await serverFetch.get("/subscription");
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch subscriptions");
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Subscription fetch error");
    }
};