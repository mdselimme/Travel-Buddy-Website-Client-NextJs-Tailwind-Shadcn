"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";



export const createTravelPlanAction = async (travelPlanData: FormData) => {
    try {

        const response = await serverFetch.post("/travel-plan/create-plan", {
            body: travelPlanData
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to create travel plan.");
        }

        revalidateTag("travel-plans", { expire: 0 });

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error creating travel plan.");
    }
};