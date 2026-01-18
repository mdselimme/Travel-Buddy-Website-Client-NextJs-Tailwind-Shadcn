import { getAllReviews } from "@/actions/review/getAllReviews";
import { IMyReview } from "@/types/myrevies.types";
import React from "react";
import ShowAllReviewsCard from "@/components/modules/Reviews/ShowAllReviewsCard";

const ReviewsPage = async () => {
  const { data: allReviews } = (await getAllReviews()) as { data: IMyReview[] };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        What Our Travelers Say
      </h1>
      <ShowAllReviewsCard reviews={allReviews} />
    </div>
  );
};

export default ReviewsPage;
