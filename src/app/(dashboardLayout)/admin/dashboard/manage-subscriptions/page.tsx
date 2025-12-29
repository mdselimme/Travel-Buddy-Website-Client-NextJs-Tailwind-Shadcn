import { getAllSubscription } from "@/actions/subscription/getAllSubscription";
import SubscriptionsManagementTable from "@/components/modules/Subscription/SubscriptionsManagementTable";
export const dynamic = "force-dynamic";
const ManageSubscriptionsAdminPage = async () => {
  const allSubscriptions = await getAllSubscription();

  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all subscription plans.
        </p>
      </div>

      {/* Subscriptions Table */}
      <div className="mt-10">
        <SubscriptionsManagementTable subscriptions={allSubscriptions} />
      </div>
    </div>
  );
};

export default ManageSubscriptionsAdminPage;
