"use server";
import { serverFetch } from "@/lib/serverFetch";


export const getAllTravelPlans = async ({ search, startDate, travelType, limit, page }: { search?: string, startDate?: string, travelType?: string, limit?: number, page?: number } = {}) => {
    try {
        // Build query string only if params have values
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (startDate) params.append("startDate", startDate);
        if (travelType) params.append("travelType", travelType);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());

        const queryString = params.toString();
        const url = queryString ? `/travel-plan?${queryString}` : `/travel-plan`;

        const response = await serverFetch.get(url, {
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