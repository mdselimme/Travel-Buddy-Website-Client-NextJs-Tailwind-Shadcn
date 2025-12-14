"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/serverFetch";


export const getAllTravelType = async () => {
    try {
        const response = await serverFetch.get("/travel-type", {
            next: {
                tags: ["TRAVEL-TYPES"]
            }
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch travel types.");
        }
        return data.data;
    } catch (error: any) {
        console.log("Error in getAllTravelType:", error);
        throw new Error(error.message || "Error fetching travel types.");
    }
};

