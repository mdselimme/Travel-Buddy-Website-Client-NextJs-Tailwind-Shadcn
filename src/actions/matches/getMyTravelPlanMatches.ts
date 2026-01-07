"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getMyTravelPlanMatches = async (planId: string) => {
    try {
        const response = await serverFetch.get(`/matches/matches-plan/${planId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch my travel plan matches.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching my travel plan matches.");
    }
};