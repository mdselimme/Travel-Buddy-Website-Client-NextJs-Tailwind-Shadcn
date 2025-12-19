"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IMyReview } from "@/types/myrevies.types";
import { Eye, Pencil } from "lucide-react";
import EditReviewDialog from "./EditReviewDialog";
import ViewReviewDialog from "./ViewReviewDialog";

interface MyReviewsTableProps {
  reviews: IMyReview[];
  currentUserId: string;
}

const MyReviewsTable: React.FC<MyReviewsTableProps> = ({
  reviews,
  currentUserId,
}) => {
  const [selectedReview, setSelectedReview] = useState<IMyReview | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleView = (review: IMyReview) => {
    setSelectedReview(review);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (review: IMyReview) => {
    setSelectedReview(review);
    setIsEditDialogOpen(true);
  };

  const isArrangedBy = (review: IMyReview) => {
    return review.arrangedBy._id === currentUserId;
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Travel Title</TableHead>
              <TableHead>Traveler</TableHead>
              <TableHead>Arranged By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No reviews found
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review, index) => (
                <TableRow
                  key={review._id}
                  className={`transition-colors hover:bg-muted/50 ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <TableCell className="font-medium">
                    {review.travelPlan.travelTitle}
                  </TableCell>
                  <TableCell>{review.traveler.profile.fullName}</TableCell>
                  <TableCell>{review.arrangedBy.profile.fullName}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(review)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(review)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedReview && (
        <>
          <ViewReviewDialog
            review={selectedReview}
            isOpen={isViewDialogOpen}
            onClose={() => {
              setIsViewDialogOpen(false);
              setSelectedReview(null);
            }}
          />
          <EditReviewDialog
            review={selectedReview}
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedReview(null);
            }}
            isArrangedBy={isArrangedBy(selectedReview)}
          />
        </>
      )}
    </div>
  );
};

export default MyReviewsTable;
