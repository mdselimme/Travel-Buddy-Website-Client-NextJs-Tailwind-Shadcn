"use client";

import { IMyReview } from "@/types/myrevies.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReviewTableRow from "./ReviewTableRow";

interface MyReviewsTableProps {
  reviews: IMyReview[];
}

const MyReviewsTable = ({ reviews }: MyReviewsTableProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews found.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Travel Plan</TableHead>
            <TableHead>Reviewer</TableHead>
            <TableHead>Reviewed User</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <ReviewTableRow key={review._id} review={review} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyReviewsTable;
