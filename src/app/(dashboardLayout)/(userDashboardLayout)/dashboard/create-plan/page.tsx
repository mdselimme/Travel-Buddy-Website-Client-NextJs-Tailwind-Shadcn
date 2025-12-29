import { getAllTravelType } from "@/actions/travelType/getAllTravelType";
import { getUserInfo } from "@/actions/user/getUserInfo";
import CreateNewPlanForm from "@/components/modules/TravelPlan/CreateNewPlanForm";
export const dynamic = "force-dynamic";
const CreateANewPlanPage = async () => {
  const { data: allTravelTypes } = await getAllTravelType();
  const user = await getUserInfo();

  return (
    <div>
      <CreateNewPlanForm travelTypes={allTravelTypes} userId={user?._id} />
    </div>
  );
};

export default CreateANewPlanPage;
