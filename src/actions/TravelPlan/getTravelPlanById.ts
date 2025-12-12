import { serverFetch } from "@/lib/serverFetch";


export const getTravelPlanById = async (planId: string) => {
    try {
        const response = await serverFetch.get(`/travel-plan/${planId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch travel plan.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching travel plan.");
    }
};