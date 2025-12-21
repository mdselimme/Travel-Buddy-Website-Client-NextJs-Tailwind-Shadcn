"use server";

import { serverFetch } from "@/lib/serverFetch";


export const getAllReviews = async () => {
    try {
        const response = await serverFetch.get("/review", {
            next: {
                tags: ["all-reviews"]
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch reviews.");
        }
        return data?.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching reviews.");
    }
};