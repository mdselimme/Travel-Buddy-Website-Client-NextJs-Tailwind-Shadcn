"use server"
import { serverFetch } from "@/lib/serverFetch";



export const getMePayment = async () => {
    try {
        const response = await serverFetch.get("/payment/me");
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to fetch payment information.");
        }
        return data.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error fetching payment information.");
    }
};