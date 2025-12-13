"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";
import { Calendar, DollarSign, MapPin } from "lucide-react";

interface TravelPlanDetailsDisplayProps {
  travelPlan: ITravelPlan;
}

const formatDate = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusBadge = (status: TravelPlanStatus) => {
  const statusConfig: Record<
    TravelPlanStatus,
    { className: string; label: string }
  > = {
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

export default function TravelPlanDetailsDisplay({
  travelPlan,
}: TravelPlanDetailsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Plan Overview */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Plan Overview</h2>
          {getStatusBadge(travelPlan.travelPlanStatus)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Start Date
            </p>
            <p className="font-semibold text-foreground">
              {formatDate(travelPlan.startDate)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" /> End Date
            </p>
            <p className="font-semibold text-foreground">
              {formatDate(travelPlan.endDate)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Destination
            </p>
            <p className="font-semibold text-foreground">
              {travelPlan.destination.city}, {travelPlan.destination.country}
            </p>
          </div>
        </div>
      </Card>

      {/* Budget Range */}
      <Card className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" /> Budget Range
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Minimum</p>
            <p className="text-3xl font-bold text-foreground">
              ${travelPlan.budgetRange.min.toLocaleString("en-US")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Maximum</p>
            <p className="text-3xl font-bold text-foreground">
              ${travelPlan.budgetRange.max.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </Card>

      {/* Travel Preferences */}
      <Card className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-4">Travel Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {travelPlan.travelTypes && travelPlan.travelTypes.length > 0 ? (
            travelPlan.travelTypes.map((type, index) => (
              <Badge
                key={index}
                variant="default"
                className="bg-blue-600 text-white"
              >
                {typeof type === "string" ? type : type.typeName}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">
              No travel preferences specified
            </p>
          )}
        </div>
      </Card>

      {/* Description */}
      {travelPlan.travelDescription && (
        <Card className="p-6 bg-white">
          <h3 className="text-xl font-bold mb-4">Description</h3>
          <p className="text-foreground whitespace-pre-wrap">
            {travelPlan.travelDescription}
          </p>
        </Card>
      )}

      {/* Full Itinerary */}
      <Card className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-4">Full Itinerary</h3>
        <div className="space-y-3">
          {travelPlan.itinerary && travelPlan.itinerary.length > 0 ? (
            travelPlan.itinerary.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="font-semibold text-primary bg-primary/20 px-3 py-1 rounded text-sm min-w-fit">
                  Day {index + 1}
                </span>
                <p className="text-foreground pt-1">{item}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No itinerary specified</p>
          )}
        </div>
      </Card>
    </div>
  );
}
