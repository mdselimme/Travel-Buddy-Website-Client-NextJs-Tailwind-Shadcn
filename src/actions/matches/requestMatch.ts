"use server"

import { serverFetch } from "@/lib/serverFetch";
import { IMatch } from "@/types/matches.types"


export const requestMatchAction = async (matchData: Partial<IMatch>) => {
    try {
        const response = await serverFetch.post("/matches/create", {
            body: JSON.stringify(matchData),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to request match.");
        }
        return data;
    }
    catch (error) {
        console.log("Error in requestMatchAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error requesting match.");
    }
};