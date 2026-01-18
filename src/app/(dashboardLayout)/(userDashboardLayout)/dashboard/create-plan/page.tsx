import { getUserInfo } from "@/actions/user/getUserInfo";
import CreateNewPlanForm from "@/components/modules/TravelPlan/CreateNewPlanForm";
import { Metadata } from "next";
import { getAllTravelTypeUsers } from "../../../../../actions/travelType/getAllTravelTypeUsers";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard Create New Plan || Travel Buddy`,
  description: "Travel Buddy Create New Plan Page to create new travel plans.",
};

const CreateANewPlanPage = async () => {
  const allTravelTypes = await getAllTravelTypeUsers();
  const user = await getUserInfo();

  return (
    <div>
      <CreateNewPlanForm travelTypes={allTravelTypes} userId={user?._id} />
    </div>
  );
};

export default CreateANewPlanPage;
