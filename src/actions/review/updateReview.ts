"use server"

import { serverFetch } from "@/lib/serverFetch";
import { IReview } from "@/types/review.types"
import { revalidateTag } from "next/cache";


export const updateReviewAction = async (reviewId: string, reviewData: Partial<IReview>) => {
    try {
        const response = await serverFetch.patch(`/review/${reviewId}`, {
            body: JSON.stringify(reviewData),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to update review.");
        }
        revalidateTag("my-reviews", { expire: 0 });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error updating review.");
    }
};