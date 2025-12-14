"use server"
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";


export const deleteTravelTypeAction = async (travelTypeId: string) => {
    try {
        const response = await serverFetch.delete(`/travel-type/${travelTypeId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to delete travel type.");
        }
        revalidateTag("TRAVEL-TYPES", { expire: 0 });
        return data;
    }
    catch (error) {
        console.log("Error in deleteTravelTypeAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error deleting travel type.");
    }
};
