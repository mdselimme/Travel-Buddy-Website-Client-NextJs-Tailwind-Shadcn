"use server";
import { serverFetch } from "@/lib/serverFetch";


export const getMyTravelPlans = async () => {
    try {
        const response = await serverFetch.get("/travel-plan/my-plans");
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch your travel plans.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching your travel plans.");
    }
};