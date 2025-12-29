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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { IMyTravelPlanReviews } from "@/types/myrevies.types";
import { Star, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createReviewAction } from "@/actions/review/createReview";
import { toast } from "sonner";

// Zod Schema
const reviewSchema = z.object({
  reviewer: z.string().min(1, "User ID is required"),
  travelPlan: z.string().min(1, "Travel plan ID is required"),
  reviewed: z.string().min(1, "Traveler ID is required"),
  rating: z
    .number({ message: "Rating is required" })
    .min(1, "Please select a rating")
    .max(5, "Rating must be at most 5"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

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
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewed: currentUserId,
      travelPlan: travelPlanId,
      reviewer: "",
      rating: 0,
      description: "",
    },
  });

  const handleOpenModal = (travelerId: string, travelerName: string) => {
    setSelectedTraveler({ id: travelerId, name: travelerName });
    form.reset({
      reviewed: travelerId,
      travelPlan: travelPlanId,
      reviewer: currentUserId,
      rating: 0,
      description: "",
    });
    setHoveredRating(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTraveler(null);
    form.reset();
    setHoveredRating(0);
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const result = await createReviewAction(data);

      if (result.success) {
        toast.success("Review submitted successfully!");
        handleCloseModal();
        // Optionally refresh the page or update the reviews list
        window.location.reload();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review"
      );
    }
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
                        {review.reviewed.profile.fullName}
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
                          review.reviewed._id,
                          review.reviewed.profile.fullName
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Give Review</DialogTitle>
            <DialogDescription>
              Share your experience with {selectedTraveler?.name}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-4"
            >
              {/* Rating Section */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating *</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (hoveredRating || field.value)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        {field.value > 0 && (
                          <span className="ml-2 text-sm font-medium text-muted-foreground">
                            {field.value}/5
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Section */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts about this traveler..."
                        rows={5}
                        className="resize-none bg-white"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {field.value.length} / 500 characters
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="text-foreground"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Review"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
