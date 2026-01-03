"use client";

import { IProfile } from "@/types/profile.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Phone,
  MapIcon,
  Calendar,
  Heart,
  Star,
} from "lucide-react";
import Image from "next/image";
import { ITravelType } from "@/types/travel.type";

interface ProfileDisplayProps {
  profile: IProfile;
  travelTypes: ITravelType[];
}

export default function ProfileDisplay({
  profile,
  travelTypes,
}: ProfileDisplayProps) {
  // Filter travel types to only show those matching user interests
  const matchedTravelTypes = travelTypes.filter((type) =>
    profile.interests?.includes(type._id)
  );

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      {/* Header Card with Profile Image and Basic Info */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Profile Image */}
            <div className="shrink-0 mx-auto sm:mx-0">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.fullName}
                  width={150}
                  height={150}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover border-4 border-primary w-24 h-24 sm:w-32 sm:h-32 md:w-[150px] md:h-[150px]"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-[150px] md:h-[150px] bg-linear-to-br from-primary to-primary/50 rounded-lg flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  {profile.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl mb-2 text-center sm:text-left">
                {profile.fullName}
              </CardTitle>

              {/* Average Rating */}
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-3 sm:mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= profile.averageRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {profile.averageRating.toFixed(1)} / 5.0
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="text-sm sm:text-base truncate">
                    {profile.email}
                  </span>
                </div>
                {profile.contactNumber && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className="text-sm sm:text-base">
                      {profile.contactNumber}
                    </span>
                  </div>
                )}
                {profile.currentLocation && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                    <MapIcon className="w-4 h-4 shrink-0" />
                    <span className="text-sm sm:text-base">
                      Currently in {profile.currentLocation}
                    </span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-sm sm:text-base text-center sm:text-left">
                      {profile.address}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Member since {formatDate(profile.createdAt)}
                  </span>
                </div>
              </div>

              {/* Subscription Status Badge */}
              <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                {profile.isSubscribed ? (
                  <Badge className="bg-green-500 text-white hover:bg-green-600">
                    Premium Member
                  </Badge>
                ) : (
                  <Badge variant="outline">Free Member</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Bio Section */}
      {profile.bio && (
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">About</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {profile.bio}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Travel Types Section - Filtered by Interests */}
      {matchedTravelTypes && matchedTravelTypes.length > 0 && (
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <CardTitle className="text-lg sm:text-xl">
                Travel Types & Interests
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              {matchedTravelTypes.map((travelType) => (
                <Badge
                  key={travelType._id}
                  className="bg-purple-500 text-white hover:bg-purple-600 text-xs sm:text-sm"
                >
                  {travelType.typeName}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visited Places Section */}
      {profile.visitedPlaces && profile.visitedPlaces.length > 0 && (
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <CardTitle className="text-lg sm:text-xl">
                Visited Places
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {profile.visitedPlaces.map((place, index) => (
                <div
                  key={index}
                  className="bg-muted p-2 sm:p-3 rounded-lg border border-muted-foreground/20"
                >
                  <p className="font-medium text-foreground text-sm sm:text-base">
                    {place}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
