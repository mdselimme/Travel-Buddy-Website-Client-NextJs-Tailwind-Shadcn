"use server";
import { serverFetch } from "@/lib/serverFetch";
import { getUserInfo } from "../user/getUserInfo"

interface InitPaymentResponse {
    subscription: string;
    user: string;
}

export const initSubscriptionPayment = async (subscriptionId: string) => {
    try {

        const user = await getUserInfo();
        const initPaymentData: InitPaymentResponse = {
            subscription: subscriptionId,
            user: user?._id as string
        };

        const response = await serverFetch.post("/payment/init", {
            body: JSON.stringify(initPaymentData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || "Failed to initiate payment.");
        };

        return data;


    } catch (error) {
        console.log("Error in initSubscriptionPayment:", error);
    }
};