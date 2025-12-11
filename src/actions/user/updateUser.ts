"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
import { getUserInfo } from "./getUserInfo";
import { revalidateTag } from "next/cache";




export const updateUserAction = async (formData: FormData) => {
    try {

        const user = await getUserInfo();

        const visitedPlaces = formData.get("visitedPlaces");
        const interests = formData.get("interests");

        formData.set("userId", user?._id as string);

        const uploadFormData = new FormData();
        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });


        if (visitedPlaces) {
            data.visitedPlaces = (visitedPlaces as string).split(",").map(item => item.trim());
        }

        if (interests) {
            data.interests = (interests as string).split(",").map(item => item.trim());
        }

        // Add the data as JSON string
        uploadFormData.append('data', JSON.stringify(data));

        // Add the file if it exists
        const file = formData.get('file');
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('file', file);
        }

        const response = await serverFetch.patch(`/user`, {
            body: uploadFormData,
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to update user");
        }

        revalidateTag("user-info", { expire: 0 });
        revalidateTag("user-profile", { expire: 0 });

        return {
            success: true,
            message: result.message || "User updated successfully",
        };



    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message || "User Update failed");
    }
};