"use server";

import { serverFetch } from "@/lib/serverFetch";


export const getStats = async () => {
    // Simulate fetching stats data from a database or external API
    const response = await serverFetch.get("/stats");

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch stats.");
    }

    return data;
}