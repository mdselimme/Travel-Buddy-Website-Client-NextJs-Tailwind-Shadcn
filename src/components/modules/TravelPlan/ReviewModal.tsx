"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITravelPlan } from "@/types/travel.plan.types";
import ReviewSection from "../MyPlans/ReviewSection";

interface ReviewModalProps {
  plan: ITravelPlan | null;
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
            Leave a Review for &quot;{plan.travelTitle}&quot;
          </DialogTitle>
        </DialogHeader>
        <ReviewSection
          travelPlanId={plan._id}
          isCompleted={true}
          arrangedBy={arrangedBy}
          traveler={traveler}
        />
      </DialogContent>
    </Dialog>
  );
}
