"use client";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
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

interface GiveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewerName: string;
  reviewerId: string;
  currentUserId: string;
  travelPlanId: string;
}

export default function GiveReviewModal({
  isOpen,
  onClose,
  reviewerName,
  reviewerId,
  currentUserId,
  travelPlanId,
}: GiveReviewModalProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewer: currentUserId,
      reviewed: reviewerId,
      travelPlan: travelPlanId,
      rating: 0,
      description: "",
    },
  });

  const handleClose = () => {
    onClose();
    form.reset({
      reviewer: currentUserId,
      reviewed: reviewerId,
      travelPlan: travelPlanId,
      rating: 0,
      description: "",
    });
    setHoveredRating(0);
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const result = await createReviewAction(data);
      if (result.success) {
        toast.success("Review submitted successfully!");
        handleClose();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review"
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Give Review</DialogTitle>
          <DialogDescription>
            Share your experience with {reviewerName}
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
                onClick={handleClose}
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
  );
}
