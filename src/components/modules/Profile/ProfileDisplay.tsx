"use client";

import { IProfile } from "@/types/profile.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, MapIcon, Calendar, Heart } from "lucide-react";
import Image from "next/image";

interface ProfileDisplayProps {
  profile: IProfile;
}

export default function ProfileDisplay({ profile }: ProfileDisplayProps) {
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Header Card with Profile Image and Basic Info */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex gap-6">
            {/* Profile Image */}
            <div className="shrink-0">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.fullName}
                  width={150}
                  height={150}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover border-4 border-primary"
                />
              ) : (
                <div className="w-[150px] h-[150px] bg-linear-to-br from-primary to-primary/50 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
                  {profile.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">
                {profile.fullName}
              </CardTitle>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                {profile.contactNumber && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{profile.contactNumber}</span>
                  </div>
                )}
                {profile.currentLocation && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapIcon className="w-4 h-4" />
                    <span>Currently in {profile.currentLocation}</span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {formatDate(profile.createdAt)}</span>
                </div>
              </div>

              {/* Subscription Status Badge */}
              <div className="mt-4">
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Interests Section */}
      {profile.interests && profile.interests.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <CardTitle>Interests</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge
                  key={index}
                  className="bg-purple-500 text-white hover:bg-purple-600"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visited Places Section */}
      {profile.visitedPlaces && profile.visitedPlaces.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <CardTitle>Visited Places</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile.visitedPlaces.map((place, index) => (
                <div
                  key={index}
                  className="bg-muted p-3 rounded-lg border border-muted-foreground/20"
                >
                  <p className="font-medium text-foreground">{place}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
