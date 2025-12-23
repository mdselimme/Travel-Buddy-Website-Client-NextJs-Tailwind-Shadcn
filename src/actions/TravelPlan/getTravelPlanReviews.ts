"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getTravelPlanReviews = async (travelPlanId: string) => {
    try {
        const response = await serverFetch.get(`/review/travel-plan/${travelPlanId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch travel plan reviews.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching travel plan reviews.");
    }
};