"use client";

import { IMyReview } from "@/types/myrevies.types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";
import ReviewActions from "./ReviewActions";

interface ReviewTableRowProps {
  review: IMyReview;
}

const ReviewTableRow = ({ review }: ReviewTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {review.travelPlan.travelTitle}
      </TableCell>
      <TableCell>{review.user.profile.fullName}</TableCell>
      <TableCell>{review.traveler.profile.fullName}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{review.rating}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-xs truncate">{review.description}</TableCell>
      <TableCell className="text-right">
        <ReviewActions review={review} />
      </TableCell>
    </TableRow>
  );
};

export default ReviewTableRow;
