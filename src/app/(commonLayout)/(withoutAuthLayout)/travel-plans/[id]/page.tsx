import { getTravelPlanById } from "@/actions/TravelPlan/getTravelPlanById";

import TravelPlanDetailsDisplay from "@/components/modules/TravelPlan/TravelPlanDetailsDisplay";
import HostProfileCard from "@/components/modules/TravelPlan/HostProfileCard";
import RequestToJoinButton from "@/components/modules/TravelPlan/RequestToJoinButton";
import Image from "next/image";
import React from "react";
import { getProfileByUserId } from "@/actions/profile/getProfileByUserId";

const TravelPlanDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const travelPlan = await getTravelPlanById(id);
  const hostProfile = travelPlan
    ? await getProfileByUserId(travelPlan.user)
    : null;
  if (!travelPlan) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Travel Plan Not Found
        </h1>
        <p className="text-muted-foreground mt-2">
          The travel plan you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mt-5">
        <h1 className="text-4xl font-bold">{travelPlan.travelTitle}</h1>
        <p className="text-muted-foreground mt-2">
          {travelPlan.destination.city}, {travelPlan.destination.country}
        </p>
      </div>

      {/* Thumbnail */}
      {travelPlan.thumbnail && (
        <div className="relative w-full h-96 rounded-lg overflow-hidden border border-border">
          <Image
            src={travelPlan.thumbnail}
            alt={travelPlan.travelTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TravelPlanDetailsDisplay travelPlan={travelPlan} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {hostProfile && <HostProfileCard profile={hostProfile} />}

          <RequestToJoinButton
            travelPlanId={travelPlan._id}
            hostId={travelPlan.user}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPlanDetails;
