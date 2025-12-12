"use server";
import { serverFetch } from "@/lib/serverFetch";


export const getAllTravelsPlans = async () => {
    try {
        const response = await serverFetch.get("/travel-plan", {
            next: {
                tags: ["travel-plans"]
            }
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch travel plans.");
        }

        return data.data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching travel plans.");
    }
};