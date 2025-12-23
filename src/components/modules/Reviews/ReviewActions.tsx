"use client";

import { IMyReview } from "@/types/myrevies.types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditReviewDialog from "./EditReviewDialog";
import DeleteReviewDialog from "./DeleteReviewDialog";

interface ReviewActionsProps {
  review: IMyReview;
}

const ReviewActions = ({ review }: ReviewActionsProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="flex gap-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setEditDialogOpen(true)}
      >
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>

      <EditReviewDialog
        review={review}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
      <DeleteReviewDialog
        reviewId={review._id}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
};

export default ReviewActions;
