"use server"

import { serverFetch } from "@/lib/serverFetch";
import { MatchStatus } from "@/types/matches.types";

interface IMatchStatusUpdate {
    matchId: string;
    status: MatchStatus;
}


export const matchStatusUpdateAction = async ({ matchId, status }: IMatchStatusUpdate) => {
    try {
        const response = await serverFetch.patch(`/matches/${matchId}`, {
            body: JSON.stringify({ status }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to update match status.");
        }
        return data.data;
    }
    catch (error) {
        console.log("Error in matchStatusUpdateAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error updating match status.");
    }
};