"use server";

import { serverFetch } from "@/lib/serverFetch";


export const getAllReviews = async ({ page, limit }: { page?: string, limit?: string }) => {
    try {

        const params = new URLSearchParams();
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());
        const queryString = params.toString();
        const url = queryString ? `/review?${queryString}` : `/review`;
        const response = await serverFetch.get(url, {
            next: {
                tags: ["all-reviews"]
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch reviews.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching reviews.");
    }
};