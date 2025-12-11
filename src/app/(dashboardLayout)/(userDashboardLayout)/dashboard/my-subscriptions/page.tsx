import { getAllSubscription } from "@/actions/subscription/getAllSubscription";
import React from "react";

const MySubscriptionPage = async () => {
  const subscriptions = await getAllSubscription();
  console.log(subscriptions);
  return <div>MySubscriptionPage</div>;
};

export default MySubscriptionPage;
