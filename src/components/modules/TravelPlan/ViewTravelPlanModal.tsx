"use client";

import React, { useEffect, useState } from "react";
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ITravelType } from "@/types/travel.type";
import { getAllTravelTypeUsers } from "../../../actions/travelType/getAllTravelTypeUsers";

interface ViewTravelPlanModalProps {
  plan: ITravelPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewTravelPlanModal({
  plan,
  open,
  onOpenChange,
}: ViewTravelPlanModalProps) {
  const [travelTypeOptions, setTravelTypeOptions] = useState<ITravelType[]>([]);

  useEffect(() => {
    const fetchTravelTypes = async () => {
      const allTravelTypes = await getAllTravelTypeUsers();
      setTravelTypeOptions(allTravelTypes.data);
    };
    fetchTravelTypes();
  }, []);

  const getStatusBadge = (status: TravelPlanStatus) => {
    const statusConfig = {
      [TravelPlanStatus.UPCOMING]: {
        className: "bg-blue-600 text-white",
        label: "Upcoming",
      },
      [TravelPlanStatus.COMPLETED]: {
        className: "bg-green-600 text-white",
        label: "Completed",
      },
      [TravelPlanStatus.CANCELLED]: {
        className: "bg-red-600 text-white",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle>Travel Plan Details</DialogTitle>
          <DialogDescription>
            View all details of your travel plan
          </DialogDescription>
        </DialogHeader>

        {plan && (
          <div className="space-y-6">
            {/* Image */}
            {plan.thumbnail && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                <Image
                  src={plan.thumbnail}
                  alt={plan.travelTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Title and Status */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {plan.travelTitle}
                </h2>
              </div>
              <div>{getStatusBadge(plan.travelPlanStatus)}</div>
            </div>

            <Separator />

            {/* Destination */}
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Destination
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium text-foreground">
                    {plan.destination.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium text-foreground">
                    {plan.destination.country}
                  </p>
                </div>
              </div>
            </Card>

            {/* Dates */}
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Travel Dates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium text-foreground">
                    {formatDate(plan.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium text-foreground">
                    {formatDate(plan.endDate)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Budget */}
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Budget Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Minimum</p>
                  <p className="font-medium text-foreground">
                    ${plan.budgetRange.min.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maximum</p>
                  <p className="font-medium text-foreground">
                    ${plan.budgetRange.max.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Travel Types */}
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Travel Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {plan.travelTypes && plan.travelTypes.length > 0 ? (
                  plan.travelTypes.map((type, index) => {
                    const typeId =
                      typeof type === "string"
                        ? type
                        : (type as unknown as Record<string, string>)._id;
                    const travelType = travelTypeOptions.find(
                      (t) => t._id === typeId,
                    );
                    return (
                      <Badge
                        key={index}
                        variant="default"
                        className="bg-blue-600 text-white"
                      >
                        {travelType?.typeName || typeId}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground">No travel types</p>
                )}
              </div>
            </Card>

            {/* Description */}
            {plan.travelDescription && (
              <Card className="p-4 bg-secondary/50">
                <h3 className="font-semibold text-foreground mb-3">
                  Description
                </h3>
                <p className="text-foreground whitespace-pre-wrap">
                  {plan.travelDescription}
                </p>
              </Card>
            )}

            {/* Itinerary */}
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">Itinerary</h3>
              <div className="space-y-2">
                {plan.itinerary && plan.itinerary.length > 0 ? (
                  plan.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <span className="font-semibold text-primary bg-primary/20 px-2 py-1 rounded text-sm">
                        Day {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{item}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No itinerary</p>
                )}
              </div>
            </Card>

            {/* Metadata */}
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium text-foreground">
                    {plan.createdAt ? formatDate(plan.createdAt) : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">
                    {plan.updatedAt ? formatDate(plan.updatedAt) : "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Close Button */}
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
