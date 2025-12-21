"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getMyReview = async () => {
    try {

        const response = await serverFetch.get("/review/my-reviews", {
            next: {
                tags: ["my-reviews"]
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch review.");
        }
        return data?.data;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching review.");
    }
}