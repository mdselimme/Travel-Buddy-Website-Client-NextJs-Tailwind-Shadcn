"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getMyMatchesTravelPlan = async () => {
    try {
        const response = await serverFetch.get(`/travel-plan/my-matches`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch matched travel plans.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching matched travel plans.");
    }
};