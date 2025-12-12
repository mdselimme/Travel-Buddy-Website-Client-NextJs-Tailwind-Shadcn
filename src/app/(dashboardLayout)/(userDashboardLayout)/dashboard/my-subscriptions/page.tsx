import { getAllSubscription } from "@/actions/subscription/getAllSubscription";
import MySubscriptionCard from "@/components/modules/Subscription/MySubscriptionCard";
import React from "react";

const MySubscriptionPage = async () => {
  const subscriptions = await getAllSubscription();
  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">My Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal subscription plan and billing information.
        </p>
      </div>
      <MySubscriptionCard subscriptions={subscriptions} />
    </div>
  );
};

export default MySubscriptionPage;
