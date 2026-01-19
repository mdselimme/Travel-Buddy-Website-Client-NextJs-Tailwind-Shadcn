"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAllProfiles = async ({
    page,
    limit,
}: {
    page?: number;
    limit?: number;
}) => {
    try {
        const params = new URLSearchParams();
        if (page) params.set("page", page.toString());
        if (limit) params.set("limit", limit.toString());
        const paramsUrl = params.toString();
        const url = paramsUrl ? `/profile?${paramsUrl}` : `/profile`;
        const response = await serverFetch.get(url);
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