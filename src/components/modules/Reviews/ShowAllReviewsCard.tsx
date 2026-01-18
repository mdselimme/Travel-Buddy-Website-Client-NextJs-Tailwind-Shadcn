import { IMyReview } from "@/types/myrevies.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { IPaginationProps } from "@/types/pagination.types";
import PaginationBox from "@/components/Shared/PagintationBox";

const ShowAllReviewsCard = ({
  reviews,
  pagination,
}: {
  reviews: IMyReview[];
  pagination: IPaginationProps;
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews?.map((review) => (
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
                  {review.reviewer.profile.fullName.slice(0, 2).toUpperCase()}
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
                  {new Date(review.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <PaginationBox
        currentPage={pagination?.page}
        totalPages={pagination?.pages}
      />
    </div>
  );
};

export default ShowAllReviewsCard;
