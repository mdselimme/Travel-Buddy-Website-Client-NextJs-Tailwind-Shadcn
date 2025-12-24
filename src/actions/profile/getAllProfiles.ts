"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAllProfiles = async () => {
    try {
        const response = await serverFetch.get("/profile");
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch profiles.");
        }
        return data.data;
    }
    catch (error) {
        console.log("Error in getAllProfilesAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error fetching profiles.");
    }
};