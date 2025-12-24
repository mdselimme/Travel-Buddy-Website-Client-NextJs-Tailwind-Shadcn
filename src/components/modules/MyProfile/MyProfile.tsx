"use client";
import { updateUserAction } from "@/actions/user/updateUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getInitials } from "@/types/formatter";
import { IProfile } from "@/types/profile.types";
import { ITravelType } from "@/types/travel.type";
import { IUser } from "@/types/user.types";
import { BadgeCheck, Camera, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";

interface MyProfileProps {
  profileData: IProfile;
  userInfo: IUser;
  travelTypes: ITravelType[];
}

export const profileFormSchema = z.object({
  userId: z.string({ error: "User ID must be a string of objectId" }),
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .optional(),
  contactNumber: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^01\d{9}$/, {
      message:
        "Invalid Bangladeshi phone number. It must start with '01' and be exactly 11 digits long.",
    })
    .optional(),
  address: z.string({ error: "address must be a string" }).optional(),
  visitedPlaces: z
    .string({ error: "visited places must be a string array" })
    .optional(),
  currentLocation: z
    .string({ error: "current location must be a string" })
    .optional(),
  interests: z
    .array(
      z.string({ error: "interests must be a string array & Valid Object Id" })
    )
    .min(1, { error: "Select at least one interest" })
    .optional(),
  bio: z.string({ error: "bio must be a string" }).optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

const MyProfile = ({ profileData, userInfo, travelTypes }: MyProfileProps) => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialInterests = profileData?.interests || [];

  const initialInterestNames =
    profileData?.interests
      ?.map((interestId) => {
        const travelType = travelTypes.find((t) => t._id === interestId);
        return travelType?.typeName;
      })
      .filter((name): name is string => Boolean(name)) || [];

  const [selectedInterests, setSelectedInterests] =
    useState<string[]>(initialInterestNames);

  const [selectedInterestIds, setSelectedInterestIds] =
    useState<string[]>(initialInterests);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      userId: profileData.user,
      fullName: profileData?.fullName || "",
      contactNumber: profileData?.contactNumber || "",
      address: profileData?.address || "",
      currentLocation: profileData?.currentLocation || "",
      visitedPlaces: profileData?.visitedPlaces?.join(", ") || "",
      interests: profileData?.interests || [],
      bio: profileData?.bio || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInterest = (travelTypeId: string) => {
    if (travelTypeId && !selectedInterestIds.includes(travelTypeId)) {
      const travelType = travelTypes?.find((t) => t._id === travelTypeId);
      if (travelType) {
        setSelectedInterestIds([...selectedInterestIds, travelTypeId]);
        setSelectedInterests([...selectedInterests, travelType.typeName]);
        form.setValue("interests", [...selectedInterestIds, travelTypeId]);
      }
    }
  };

  const handleRemoveInterest = (typeName: string) => {
    const index = selectedInterests.indexOf(typeName);
    if (index > -1) {
      const updatedNames = selectedInterests.filter((i) => i !== typeName);
      const updatedIds = selectedInterestIds.filter((_, i) => i !== index);
      setSelectedInterests(updatedNames);
      setSelectedInterestIds(updatedIds);
      form.setValue("interests", updatedIds);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true);
      const { visitedPlaces, ...restFormData } = data;
      const updateFormData = {
        ...restFormData,
        visitedPlaces: (visitedPlaces as string)
          .split(",")
          .map((place) => place.trim())
          .filter(Boolean),
        interests: selectedInterestIds,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(updateFormData));
      if (imageFile) {
        formData.append("file", imageFile);
      }
      const result = await updateUserAction(formData);
      if (result.success) {
        toast.success(result.message || "Profile updated successfully!");
        setPreviewImage(null);
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
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

      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isSubmitting}
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
                    <Link href="/dashboard/my-subscriptions">
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
              <Form {...form}>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  {/* Contact Number */}
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your contact number"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your address"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Current Location */}
                  <FormField
                    control={form.control}
                    name="currentLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your current location"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Visited Places */}
                  <FormField
                    control={form.control}
                    name="visitedPlaces"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visited Places</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Separate with commas"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Travel Type Interests */}
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Travel Type Interests</FormLabel>
                        <Select onValueChange={handleAddInterest}>
                          <FormControl>
                            <SelectTrigger disabled={isSubmitting}>
                              <SelectValue placeholder="Select travel type interests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {travelTypes?.map((type: ITravelType) => (
                              <SelectItem
                                key={type._id}
                                value={type._id}
                                disabled={selectedInterestIds.includes(
                                  type._id
                                )}
                              >
                                {type.typeName}
                                {selectedInterestIds.includes(type._id) && " ✓"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Selected Interests Tags */}
                        {selectedInterests.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            {selectedInterests.map((interest) => (
                              <div
                                key={interest}
                                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 font-medium"
                              >
                                {interest}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveInterest(interest)}
                                  className="hover:opacity-70 font-bold text-lg leading-none"
                                  title="Remove this interest"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        {selectedInterests.length === 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            No interests selected yet.
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself"
                            {...field}
                            disabled={isSubmitting}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-secondary"
                  >
                    {isSubmitting ? (
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
              </Form>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
