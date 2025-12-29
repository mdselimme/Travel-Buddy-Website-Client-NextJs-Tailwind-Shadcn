"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IMatch } from "@/types/matches.types";
import { createReviewAction } from "@/actions/review/createReview";

// Zod Schema
const createReviewZodSchema = z.object({
  reviewer: z
    .string({ message: "ArrangedBy is required & must be an ObjectId." })
    .min(1, "ArrangedBy is required"),
  travelPlan: z
    .string({ message: "TravelPlan is required & must be an ObjectId." })
    .min(1, "TravelPlan is required"),
  reviewed: z
    .string({ message: "Traveler is required & must be an ObjectId." })
    .min(1, "Traveler is required"),
  rating: z
    .number({ message: "Rating is required" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters long"),
});

type CreateReviewInput = z.infer<typeof createReviewZodSchema>;

interface MyMatchesReviewModalProps {
  match: IMatch;
  userId: string;
}

export default function MyMatchesReviewModal({
  match,
  userId,
}: MyMatchesReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const form = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewZodSchema),
    defaultValues: {
      reviewer: match?.travelPlanId?.user || "",
      travelPlan: match?.travelPlanId?._id || "",
      reviewed: userId,
      rating: 0,
      description: "",
    },
  });

  const onSubmit = async (data: CreateReviewInput) => {
    try {
      const result = await createReviewAction(data);
      if (result.success) {
        toast.success(result.message || "Review submitted successfully!");
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review"
      );
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <Star className="w-4 h-4" />
        Leave Review
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Leave a Review for &quot;{match.travelPlanId?.travelTitle}&quot;
            </DialogTitle>
            <DialogDescription>
              Share your experience with this travel buddy and help others make
              informed decisions.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Star Rating Field */}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Rate your travel experience
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => field.onChange(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= (hoverRating || field.value)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      {field.value > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                          You rated this experience {field.value} out of 5 stars
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Write your review
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your travel experience with this match, highlights, recommendations, and what you loved about this journey..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {field.value.length}/500 characters
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Review"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
