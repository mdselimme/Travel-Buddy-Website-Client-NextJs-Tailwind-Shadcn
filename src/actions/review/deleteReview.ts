"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

export const deleteReviewAction = async (reviewId: string) => {
    try {
        const response = await serverFetch.delete(`/review/${reviewId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to delete review.");
        }

        revalidateTag("my-reviews", { expire: 0 });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error deleting review.");
    }
};
