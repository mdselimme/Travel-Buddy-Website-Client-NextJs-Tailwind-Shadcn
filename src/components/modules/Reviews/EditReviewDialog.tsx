"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IMyReview } from "@/types/myrevies.types";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateReviewAction } from "@/actions/review/updateReview";

// Zod Schema
const updateReviewZodSchema = z.object({
  arrangedByRating: z
    .number({ message: "Rating must be a number" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .optional(),
  arrangedByDescription: z
    .string({ message: "Description must be a string" })
    .min(10, "Description must be at least 10 characters long")
    .optional(),
  travelerRating: z
    .number({ message: "Rating must be a number" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .optional(),
  travelerDescription: z
    .string({ message: "Description must be a string" })
    .min(10, "Description must be at least 10 characters long")
    .optional(),
});

type UpdateReviewFormValues = z.infer<typeof updateReviewZodSchema>;

interface EditReviewDialogProps {
  review: IMyReview;
  isOpen: boolean;
  onClose: () => void;
  isArrangedBy: boolean;
}

const EditReviewDialog: React.FC<EditReviewDialogProps> = ({
  review,
  isOpen,
  onClose,
  isArrangedBy,
}) => {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);

  const form = useForm<UpdateReviewFormValues>({
    resolver: zodResolver(updateReviewZodSchema),
    defaultValues: {
      arrangedByRating: isArrangedBy ? undefined : review.rating,
      arrangedByDescription: isArrangedBy ? undefined : review.description,
      travelerRating: isArrangedBy ? review.rating : undefined,
      travelerDescription: isArrangedBy ? review.description : undefined,
    },
  });

  const onSubmit = async (data: UpdateReviewFormValues) => {
    try {
      // Prepare the update data based on user role
      const updateData = isArrangedBy
        ? {
            travelerRating: data.travelerRating,
            travelerDescription: data.travelerDescription,
          }
        : {
            arrangedByRating: data.arrangedByRating,
            arrangedByDescription: data.arrangedByDescription,
          };

      const result = await updateReviewAction(review._id, updateData);

      if (result && result.success) {
        toast.success("Review updated successfully");
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update review"
      );
    }
  };

  const renderEditableStars = (
    value: number,
    onChange: (value: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoveredStar || value)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>
            {isArrangedBy
              ? "Edit your review for the traveler"
              : "Edit your review for the trip organizer"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Travel Plan Info - Read Only */}
            <div className="space-y-2 bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-semibold">Travel Plan</h3>
              <p className="text-sm text-muted-foreground">
                {review.travelPlan.travelTitle}
              </p>
            </div>

            {/* Reviewing Info */}
            <div className="space-y-2 bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-semibold">
                {isArrangedBy ? "Reviewing Traveler" : "Reviewing Organizer"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isArrangedBy
                  ? review.traveler.profile.fullName
                  : review.user.profile.fullName}
              </p>
            </div>

            <Form {...form}>
              {/* Editable Rating */}
              <FormField
                control={form.control}
                name={isArrangedBy ? "travelerRating" : "arrangedByRating"}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Rating <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        {renderEditableStars(field.value || 0, field.onChange)}
                        <span className="text-sm text-muted-foreground">
                          {field.value || 0}/5
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Editable Description */}
              <FormField
                control={form.control}
                name={
                  isArrangedBy ? "travelerDescription" : "arrangedByDescription"
                }
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Description <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your review description..."
                        rows={5}
                        className="resize-none"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Share your experience and thoughts about{" "}
                      {isArrangedBy ? "the traveler" : "the trip organizer"}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewDialog;
