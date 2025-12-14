"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";


interface IEditTravelType {
    travelId: string;
    typeName: string;
};

export const editTravelTypeAction = async (data: IEditTravelType) => {
    try {
        const response = await serverFetch.patch(`/travel-type/${data.travelId}`, {
            body: JSON.stringify({ typeName: data.typeName }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const resData = await response.json();
        if (!response.ok || !resData.success) {
            throw new Error(resData.message || "Failed to edit travel type.");
        }
        revalidateTag("TRAVEL-TYPES", { expire: 0 });
        return resData;
    } catch (error) {
        console.log("Error in editTravelTypeAction:", error);
        throw new Error(error instanceof Error ? error.message : "Error editing travel type.");
    }
};