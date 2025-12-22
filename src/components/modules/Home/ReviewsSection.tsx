"use server";

import { getAllReviews } from "@/actions/review/getAllReviews";
import { IMyReview } from "@/types/myrevies.types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import Link from "next/link";

const ReviewsSection = async () => {
  const { data: allReviews } = (await getAllReviews()) as { data: IMyReview[] };

  const displayedReviews = allReviews?.slice(0, 3) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600">
            Read reviews from our community members and see why they love
            traveling with Travel Buddy.
          </p>
        </div>

        {displayedReviews.length > 0 ? (
          <>
            {/* Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {displayedReviews.map((review) => {
                // Determine which user left the review and their rating/description
                const reviewerName = review?.traveler.profile.fullName;
                const reviewName = review?.user.profile.fullName;
                const rating = review?.rating;
                const description = review?.description;

                return (
                  <Card
                    key={review._id}
                    className="hover:shadow-lg transition-shadow border-0 bg-white"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="bg-linear-to-br from-blue-100 to-cyan-100 w-12 h-12 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {reviewerName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Reviewed: {reviewName}
                          </p>
                          <div className="mt-2">{renderStars(rating)}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed line-clamp-4">
                        {description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400">
                          {formatDate(review?.createdAt as string)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Trip: {review.travelPlan.travelTitle}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* View All Reviews Button */}
            {allReviews.length > 3 && (
              <div className="text-center">
                <Link href="/reviews">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  >
                    View All Reviews ({allReviews.length})
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No reviews available yet. Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
