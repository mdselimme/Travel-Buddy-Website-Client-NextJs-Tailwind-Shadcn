"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ISubscription } from "@/types/subscription";
import { revalidateTag } from "next/cache";

export const updateSubscriptionAction = async (updateData: ISubscription) => {
    console.log({ updateData })
    try {
        const response = await serverFetch.patch(`/subscription/${updateData._id}`, {
            body: JSON.stringify(updateData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to update subscription");
        }
        revalidateTag("subscriptions", { expire: 0 });
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Subscription update error");
    }
};