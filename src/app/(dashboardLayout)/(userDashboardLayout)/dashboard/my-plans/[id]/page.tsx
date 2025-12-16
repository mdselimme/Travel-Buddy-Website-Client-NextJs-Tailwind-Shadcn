import { getMyMatches } from "@/actions/matches/getMyMatches";
import { getTravelPlanById } from "@/actions/TravelPlan/getTravelPlanById";
import { getUserInfo } from "@/actions/user/getUserInfo";
import MatchesTable from "@/components/modules/MyPlans/MatchesTable";
import ReviewSection from "@/components/modules/MyPlans/ReviewSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMatch } from "@/types/matches.types";
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";

const ManageTravelPlans = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const plan = (await getTravelPlanById(id)) as ITravelPlan;
  console.log({ plan });
  const myMatches = (await getMyMatches()) as IMatch[];
  const user = await getUserInfo();

  if (!myMatches || myMatches.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Travel Plans</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your travel plan matches
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No matches found for this travel plan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Travel Plans</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your travel plan matches
        </p>
      </div>

      {/* Review Section - Show only if travel plan is completed */}
      {plan?.travelPlanStatus === TravelPlanStatus.COMPLETED && (
        <ReviewSection
          travelPlanId={id}
          isCompleted={true}
          arrangedBy={plan.user}
          traveler={user?._id as string}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Travel Plan Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchesTable matches={myMatches} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTravelPlans;
