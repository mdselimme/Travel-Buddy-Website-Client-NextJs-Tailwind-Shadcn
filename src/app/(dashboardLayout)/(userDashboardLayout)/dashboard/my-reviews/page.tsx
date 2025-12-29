import { getMyReview } from "@/actions/review/getMyReview";
import { IMyReview } from "@/types/myrevies.types";
import MyReviewsTable from "@/components/modules/Reviews/MyReviewsTable";
export const dynamic = "force-dynamic";
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
