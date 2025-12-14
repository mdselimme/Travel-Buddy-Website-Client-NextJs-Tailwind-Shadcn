import { serverFetch } from "@/lib/serverFetch";


export const getMyMatches = async () => {
    try {
        const response = await serverFetch.get("/matches/my-matches");
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch matches.");
        }
        return data.data;
    }
    catch (error) {
        console.log("Error in getMyMatches:", error);
        throw new Error(error instanceof Error ? error.message : "Error fetching matches.");
    }
}