import { getProfileByUserId } from "@/actions/profile/getProfileByUserId";
import React from "react";
import ProfileDisplay from "../../../../../components/modules/Profile/ProfileDisplay";

const ProfileDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const profile = await getProfileByUserId(id);

  if (!profile) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-red-600">
            The profile you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileDisplay profile={profile} />;
};

export default ProfileDetailsPage;
