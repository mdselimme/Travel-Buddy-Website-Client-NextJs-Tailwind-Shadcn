"use server";

import { getAllReviews } from "@/actions/review/getAllReviews";
import { IMyReview } from "@/types/myrevies.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewsSection = async () => {
  const { data: allReviews } = (await getAllReviews({ limit: "3" })) as {
    data: IMyReview[];
  };

  const displayedReviews = allReviews?.slice(0, 3) || [];

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
                return (
                  <Card
                    key={review._id}
                    className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader className="flex flex-row items-center gap-4 py-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage
                          src={review.reviewer.profile.profileImage} // Placeholder or dynamic if available in profile
                          alt={review.reviewer.profile.fullName}
                        />
                        <AvatarFallback>
                          {review.reviewer.profile.fullName
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold leading-none">
                          {review.reviewer.profile.fullName}
                        </p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-3 h-3 ${
                                index < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grow py-2">
                      <p className="text-sm text-gray-600 italic">
                        &quot;{review.description}&quot;
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-1 py-4 border-t bg-gray-50/50 rounded-b-xl">
                      <p className="text-xs text-gray-500 font-medium">
                        Trip:{" "}
                        <span className="text-primary">
                          {review.travelPlan.travelTitle}
                        </span>
                      </p>
                      {review.createdAt && (
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* View All Reviews Button */}
            {allReviews.length > 3 && (
              <div className="text-center">
                <Link href="/reviews">
                  <Button size="lg" className="px-8 cursor-pointer text-white">
                    View All Reviews
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
