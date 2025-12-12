"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IProfile } from "@/types/profile.types";
import { Mail, Phone, MapPin, Star } from "lucide-react";
import Image from "next/image";

interface HostProfileCardProps {
  profile: IProfile;
}

export default function HostProfileCard({ profile }: HostProfileCardProps) {
  return (
    <Card className="p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Host Profile</h3>

      {/* Profile Picture */}
      <div className="mb-4">
        {profile.profileImage ? (
          <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-border">
            <Image
              src={profile.profileImage}
              alt={profile.fullName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
            <Star className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="text-center text-lg font-bold text-foreground">
        {profile.fullName}
      </h4>

      {/* Subscription Status */}
      {profile.isSubscribed && (
        <div className="flex justify-center mb-4">
          <Badge className="bg-green-600 text-white">Premium Member</Badge>
        </div>
      )}

      <Separator className="my-4" />

      {/* Contact Information */}
      <div className="space-y-3 mb-4">
        {profile.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground truncate">
                {profile.email}
              </p>
            </div>
          </div>
        )}

        {profile.contactNumber && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">
                {profile.contactNumber}
              </p>
            </div>
          </div>
        )}

        {profile.currentLocation && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">
                {profile.currentLocation}
              </p>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Bio */}
      {profile.bio && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">About</p>
          <p className="text-foreground text-sm line-clamp-3">{profile.bio}</p>
        </div>
      )}

      {/* Interests */}
      {profile.interests && profile.interests.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Interests</p>
          <div className="flex flex-wrap gap-2">
            {profile.interests.slice(0, 5).map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 5 && (
              <Badge variant="outline">
                +{profile.interests.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Visited Places */}
      {profile.visitedPlaces && profile.visitedPlaces.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Visited Places</p>
          <div className="flex flex-wrap gap-2">
            {profile.visitedPlaces.slice(0, 5).map((place, index) => (
              <Badge key={index} variant="outline">
                {place}
              </Badge>
            ))}
            {profile.visitedPlaces.length > 5 && (
              <Badge variant="outline">
                +{profile.visitedPlaces.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
