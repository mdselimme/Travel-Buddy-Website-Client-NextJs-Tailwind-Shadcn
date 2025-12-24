"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IReview } from "@/types/review.types";

export const createReviewAction = async (reviewData: IReview) => {
    console.log({ reviewData })
    try {
        const response = await serverFetch.post("/review/create", {
            body: JSON.stringify(reviewData),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to create review.");
        }

        return data;
    }
    catch (error) {
        console.log("Error in createReviewAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error creating review.");
    }
};