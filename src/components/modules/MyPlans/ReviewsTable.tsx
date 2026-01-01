"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IMyTravelPlanReviews } from "@/types/myrevies.types";
import { Star, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import GiveReviewModal from "./GiveReviewModal";

interface ReviewsTableProps {
  reviews: IMyTravelPlanReviews[];
  travelPlanId: string;
  currentUserId: string;
}

export default function ReviewsTable({
  reviews,
  travelPlanId,
  currentUserId,
}: ReviewsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleOpenModal = (reviewerId: string, reviewerName: string) => {
    setSelectedTraveler({ id: reviewerId, name: reviewerName });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTraveler(null);
  };
  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Travel Plan Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No reviews yet for this travel plan
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Travel Plan Reviews ({reviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Traveler</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">
                        {review.reviewed?.profile.fullName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">
                        {review.rating}/5
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {review.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    {review.createdAt
                      ? format(new Date(review.createdAt), "MMM dd, yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleOpenModal(
                          review.reviewer._id,
                          review.reviewer.profile.fullName
                        )
                      }
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Give Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Review Modal */}
      {selectedTraveler && (
        <GiveReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          reviewerName={selectedTraveler.name}
          reviewerId={selectedTraveler.id}
          currentUserId={currentUserId}
          travelPlanId={travelPlanId}
        />
      )}
    </Card>
  );
}
