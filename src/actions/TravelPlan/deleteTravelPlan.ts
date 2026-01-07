"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

export const deleteTravelPlanAction = async (travelId: string) => {

    try {
        const response = await serverFetch.delete(`/travel-plan/${travelId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to delete travel plan.");
        }
        revalidateTag("my-travel-plans", { expire: 0 });
        revalidateTag("travel-plans", { expire: 0 });
        revalidateTag("user-travel-plans", { expire: 0 });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error deleting travel plan.");
    }
};