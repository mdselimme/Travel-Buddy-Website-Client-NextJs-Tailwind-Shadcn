import { serverFetch } from "@/lib/serverFetch";


export const getProfileByUserId = async (userId: string) => {
    try {
        const response = await serverFetch.get(`/profile/${userId}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch profile by user ID.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching profile by user ID.");
    }
};