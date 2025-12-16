import { getMyTravelPlans } from "@/actions/TravelPlan/getMyTravelPlans";
import { getUserInfo } from "@/actions/user/getUserInfo";
import TravelPlanTable from "@/components/modules/TravelPlan/TravelPlanTable";

const MyPlansPage = async () => {
  const myTravelPlans = await getMyTravelPlans();
  const user = await getUserInfo();

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Travel Plans</h1>
          <p className="text-muted-foreground mt-1">
            Manage your travel plans here.
          </p>
        </div>
      </div>

      <TravelPlanTable
        plans={myTravelPlans || []}
        userId={user?._id as string}
      />
    </div>
  );
};

export default MyPlansPage;
