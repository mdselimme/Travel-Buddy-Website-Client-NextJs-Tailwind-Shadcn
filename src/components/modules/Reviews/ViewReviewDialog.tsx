"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMyReview } from "@/types/myrevies.types";
import { Star } from "lucide-react";

interface ViewReviewDialogProps {
  review: IMyReview;
  isOpen: boolean;
  onClose: () => void;
}

const ViewReviewDialog: React.FC<ViewReviewDialogProps> = ({
  review,
  isOpen,
  onClose,
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            View complete review information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Travel Plan Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Travel Plan</h3>
            <p className="text-sm text-muted-foreground">
              {review.travelPlan.travelTitle}
            </p>
          </div>

          {/* Participants */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Traveler</h4>
              <p className="text-sm">{review.traveler.profile.fullName}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Arranged By</h4>
              <p className="text-sm">{review.user.profile.fullName}</p>
            </div>
          </div>

          {/* Arranged By Review (given by traveler) */}
          <div className="space-y-3 border-t pt-4">
            <h3 className="text-lg font-semibold">
              Review for Arranged By (by Traveler)
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                {renderStars(review.rating)}
                <span className="text-sm text-muted-foreground">
                  ({review.rating}/5)
                </span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Description:</p>
                <p className="text-sm text-muted-foreground">
                  {review.description || "No description provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Traveler Review (given by arranged by) */}
          <div className="space-y-3 border-t pt-4">
            <h3 className="text-lg font-semibold">
              Review for Traveler (by Arranged By)
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                {renderStars(review.rating)}
                <span className="text-sm text-muted-foreground">
                  ({review.rating}/5)
                </span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Description:</p>
                <p className="text-sm text-muted-foreground">
                  {review.description || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewDialog;
