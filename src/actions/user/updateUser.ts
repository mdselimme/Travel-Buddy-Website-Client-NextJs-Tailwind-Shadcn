"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";




export const updateUserAction = async (uploadFormData: FormData) => {
    try {

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