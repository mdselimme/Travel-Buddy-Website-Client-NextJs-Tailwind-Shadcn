"use client";
import { updateUserAction } from "@/actions/user/updateUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getInitials } from "@/types/formatter";
import { IProfile } from "@/types/profile.types";
import { IUser } from "@/types/user.types";
import { BadgeCheck, Camera, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  profileData: IProfile;
  userInfo: IUser;
}

const MyProfile = ({ profileData, userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);

      const formData = new FormData(e.currentTarget);

      startTransition(async () => {
        const result = await updateUserAction(formData);

        if (result.success) {
          setSuccess(result.message);
          setPreviewImage(null);
          router.refresh();
        } else {
          setError(result.message);
        }
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "User update failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  {previewImage || profileData?.profileImage ? (
                    <AvatarImage
                      src={
                        previewImage ||
                        (profileData?.profileImage as string) ||
                        ""
                      }
                      alt={profileData.fullName}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {getInitials(profileData.fullName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
              </div>

              <div className="text-center">
                <p className="font-semibold text-lg flex items-center justify-center gap-1">
                  {profileData.fullName}{" "}
                  {userInfo?.isVerified ? (
                    <span title="User is verified">
                      <BadgeCheck className="text-primary" size={15} />
                    </span>
                  ) : (
                    "Not verified"
                  )}{" "}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profileData.email}
                </p>
                {/* Subscription show  */}
                {profileData.isSubscribed ? (
                  <>
                    {userInfo?.role === "ADMIN" ||
                    userInfo?.role === "SUPER_ADMIN" ? (
                      <>
                        <p className="bg-success text-primary px-5 py-2 rounded-full text-sm text-success-foreground mt-2 inline-block">
                          No subscription needed
                        </p>
                      </>
                    ) : (
                      <>
                        {profileData?.subStartDate &&
                          profileData?.subEndDate && (
                            <div className="mt-2 space-y-1">
                              <p className="bg-primary text-secondary px-5 py-2 rounded-full text-sm text-success-foreground inline-block">
                                Active Subscription
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Valid from{" "}
                                {new Date(
                                  profileData.subStartDate
                                ).toLocaleDateString()}{" "}
                                to{" "}
                                {new Date(
                                  profileData.subEndDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col">
                    <p className="bg-destructive text-secondary px-5 py-2 rounded-full text-sm text-destructive-foreground mt-2 inline-block">
                      No active subscription
                    </p>
                    <Link href="/dashboard/subscription">
                      <Button className="mt-3 text-secondary">
                        Manage Subscription
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Common Fields for All Roles */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={profileData?.fullName || profileData.fullName}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData?.email || profileData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    defaultValue={profileData?.contactNumber || ""}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={profileData?.address || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    name="currentLocation"
                    defaultValue={profileData?.currentLocation || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitedPlaces">
                    Visited Places (Separated with commas more than one)
                  </Label>
                  <Input
                    id="visitedPlaces"
                    name="visitedPlaces"
                    defaultValue={profileData?.visitedPlaces?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">
                    Interests (Separated with commas more than one)
                  </Label>
                  <Input
                    id="interests"
                    name="interests"
                    defaultValue={profileData?.interests?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profileData?.bio || ""}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="text-secondary"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
