import { getMyReview } from "@/actions/review/getMyReview";
import { IMyReview } from "@/types/myrevies.types";
import MyReviewsTable from "@/components/modules/Reviews/MyReviewsTable";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard My Reviews || Travel Buddy`,
  description: "Travel Buddy My Reviews Page to view your reviews.",
};

const MyReviewsPage = async () => {
  const myReviews = (await getMyReview()) as IMyReview[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Reviews</h1>
      <MyReviewsTable reviews={myReviews} />
    </div>
  );
};

export default MyReviewsPage;
