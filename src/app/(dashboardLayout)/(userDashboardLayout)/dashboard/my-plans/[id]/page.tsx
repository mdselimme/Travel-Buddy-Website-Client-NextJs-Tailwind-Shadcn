import { getMyMatches } from "@/actions/matches/getMyMatches";
import { getTravelPlanById } from "@/actions/TravelPlan/getTravelPlanById";
import { getTravelPlanReviews } from "@/actions/TravelPlan/getTravelPlanReviews";
import MatchesTable from "@/components/modules/MyMatches/MatchesTable";
import ReviewsTable from "@/components/modules/MyPlans/ReviewsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMatch } from "@/types/matches.types";
import { IMyTravelPlanReviews } from "@/types/myrevies.types";
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";

const ManageTravelPlans = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const plan = (await getTravelPlanById(id)) as ITravelPlan;
  const myMatches = (await getMyMatches()) as IMatch[];
  const myTravelPlanReviews = (await getTravelPlanReviews(
    id
  )) as IMyTravelPlanReviews[];

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

  const isCompleted = plan.travelPlanStatus === TravelPlanStatus.COMPLETED;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Travel Plans</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your travel plan matches
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Travel Plan Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchesTable matches={myMatches} />
        </CardContent>
      </Card>

      {isCompleted && <ReviewsTable reviews={myTravelPlanReviews} />}
    </div>
  );
};

export default ManageTravelPlans;
