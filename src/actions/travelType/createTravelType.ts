"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ITravelType } from "@/types/travel.type";

export const createTravelTypeAction = async (travelTypeData: ITravelType) => {
    try {
        const response = await serverFetch.post("/travel-type", {
            body: JSON.stringify(travelTypeData),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to create travel type.");
        }
        return data.data;
    }
    catch (error) {
        console.log("Error in createTravelTypeAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error creating travel type.");
    }
};