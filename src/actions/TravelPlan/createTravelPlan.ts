import { serverFetch } from "@/lib/serverFetch";



export const createTravelPlanAction = async (travelPlanData: FormData) => {
    try {
        console.log(travelPlanData)

        const response = await serverFetch.post("/travel-plan/create-plan", {
            body: travelPlanData
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to create travel plan.");
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error creating travel plan.");
    }
};