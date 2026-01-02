"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ITravelBuddyProfile } from "@/types/travelBuddy.types";
import { MapPin, User, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TravelBuddyCardProps {
  profile: ITravelBuddyProfile;
}

export default function TravelBuddyCard({ profile }: TravelBuddyCardProps) {
  return (
    <Card className="p-6 bg-white hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Profile Picture */}
      <div className="mb-4">
        {profile.profileImage ? (
          <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-blue-500">
            <Image
              src={profile.profileImage}
              alt={profile.fullName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="text-center text-xl font-bold text-foreground mb-2">
        {profile.fullName}
      </h4>

      {/* Average Rating */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= profile.averageRating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span
          className="ml-1 text-xs text-muted-foreground"
          title="Average Rating"
        >
          {profile.averageRating.toFixed(1)}
        </span>
      </div>

      {/* Location */}
      {profile.currentLocation && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-sm text-foreground">{profile.currentLocation}</p>
        </div>
      )}

      {/* Interests */}
      {profile.interests && profile.interests.length > 0 && (
        <div className="mb-6 grow">
          <p className="text-xs text-muted-foreground mb-2 text-center">
            Interests
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {profile.interests.slice(0, 3).map((interest, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {interest.typeName}
              </Badge>
            ))}
            {profile.interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.interests.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* View Profile Button */}
      <Link href={`/profile/${profile.user}`} className="mt-auto">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          View Full Profile
        </button>
      </Link>
    </Card>
  );
}
