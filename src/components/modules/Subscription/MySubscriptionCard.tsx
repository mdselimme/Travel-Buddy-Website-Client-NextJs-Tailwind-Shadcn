/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { initSubscriptionPayment } from "@/actions/payment/initPayment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ISubscription } from "@/types/subscription";
import { toast } from "sonner";

interface MySubscriptionCardProps {
  subscriptions: ISubscription[];
}

const MySubscriptionCard = ({ subscriptions }: MySubscriptionCardProps) => {
  const handleInitiateSubscription = async (subscriptionId: string) => {
    try {
      const result = await initSubscriptionPayment(subscriptionId);
      toast.success("Payment initiated successfully!");
      if (result.success) {
        window.open(result?.data?.paymentUrl);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate payment.");
    }
  };

  return (
    <div className="flex mt-6 gap-4 flex-col md:flex-row">
      {subscriptions && subscriptions.length > 0 ? (
        subscriptions.map((subscription) => (
          <Card
            key={subscription._id}
            className="mb-4 sm:w-full md:w-1/2 text-center"
          >
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <p>{subscription.plan}</p>
            </CardHeader>
            <CardContent>
              <p>
                Price: {subscription.price} {subscription.currency}
              </p>
              {subscription.discount ? (
                <p>Discount: {subscription.discount}%</p>
              ) : (
                <p>No Discount</p>
              )}
            </CardContent>
            <CardFooter className="mx-auto">
              <Button
                onClick={() =>
                  handleInitiateSubscription(subscription._id as string)
                }
                className="text-secondary"
              >
                Select This
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No subscriptions found.</p>
      )}
    </div>
  );
};

export default MySubscriptionCard;
