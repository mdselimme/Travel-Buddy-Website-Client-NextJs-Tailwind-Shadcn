import CreateSubscription from "@/components/modules/Subscription/CreateSubscription";

const AddSubscriptionPage = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Add New Subscription
        </h1>
        <p className="text-muted-foreground mt-2">
          Create a new subscription plan for your users
        </p>
      </div>
      <CreateSubscription />
    </div>
  );
};

export default AddSubscriptionPage;
