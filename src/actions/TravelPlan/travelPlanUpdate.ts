"use server";
import { serverFetch } from "@/lib/serverFetch";


export const travelPlanUpdateAction = async (travelId: string, formData: FormData) => {
    try {
        const response = await serverFetch.patch(`/travel-plan/${travelId}`, {
            body: formData
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to update travel plan.");
        }
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error updating travel plan.");
    }
};