import { getMyMatches } from "@/actions/matches/getMyMatches";
import { getUserInfo } from "@/actions/user/getUserInfo";
import MyMatchesTable from "@/components/modules/MyMatches/MyMatchesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMatch } from "@/types/matches.types";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard My Matches || Travel Buddy`,
  description:
    "Travel Buddy My Matches Page to view your travel buddy matches.",
};

const MyMatchesPage = async () => {
  const myMatches = (await getMyMatches()) as IMatch[];
  const user = await getUserInfo();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Matches</h1>
        <p className="text-muted-foreground mt-1">
          View all your travel buddy matches
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <MyMatchesTable matches={myMatches} userId={user?._id as string} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyMatchesPage;
