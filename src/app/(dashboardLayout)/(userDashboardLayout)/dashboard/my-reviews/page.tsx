import { getMyReview } from "@/actions/review/getMyReview";
import { getUserInfo } from "@/actions/user/getUserInfo";
import MyReviewsTable from "@/components/modules/Reviews/MyReviewsTable";
import React from "react";

const MyReviewsPage = async () => {
  const myReviews = await getMyReview();
  const currentUser = await getUserInfo();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">
          Please log in to view your reviews
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Reviews</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all your travel reviews
        </p>
      </div>
      <MyReviewsTable
        reviews={myReviews || []}
        currentUserId={currentUser._id}
      />
    </div>
  );
};

export default MyReviewsPage;
