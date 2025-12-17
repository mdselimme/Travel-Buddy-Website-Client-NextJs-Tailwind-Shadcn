"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReviewSection from "../MyPlans/ReviewSection";
import { IMatch } from "@/types/matches.types";

interface ReviewModalProps {
  plan: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  arrangedBy: string;
  traveler: string;
}

export default function ReviewModal({
  plan,
  open,
  onOpenChange,
  arrangedBy,
  traveler,
}: ReviewModalProps) {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Leave a Review for &quot;{matches.travelPlanId.travelTitle}&quot;
          </DialogTitle>
        </DialogHeader>
        <ReviewSection
          travelPlanId={matches.travelPlanId._id as string}
          isCompleted={true}
          arrangedBy={arrangedBy}
          traveler={traveler}
        />
      </DialogContent>
    </Dialog>
  );
}
