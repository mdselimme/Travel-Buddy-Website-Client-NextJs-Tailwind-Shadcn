import { getAllTravelsPlans } from "@/actions/TravelPlan/getAllTravelPlans";
import ManageTravelPlansTable from "@/components/modules/TravelPlan/ManageTravelPlansTable";

const ManagePlanPage = async () => {
  const { data: allTravelPlans } = await getAllTravelsPlans();

  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Manage Travel Plans</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all travel plans submitted by users.
        </p>
      </div>

      {/* Travel Plans Table */}
      <div className="mt-10">
        <ManageTravelPlansTable travelPlans={allTravelPlans} />
      </div>
    </div>
  );
};

export default ManagePlanPage;
