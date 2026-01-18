"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ActiveStatus } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";
import { userStatusUpdate } from "@/actions/user/userStatusUpdate";
import { toast } from "sonner";

// Zod Validation Schema
const editUserStatusSchema = z.object({
  isActive: z.enum(Object.values(ActiveStatus), {
    message: "Please select a valid status",
  }),
});

type EditUserStatusFormData = z.infer<typeof editUserStatusSchema>;

interface UserProfile {
  _id?: string;
  fullName: string;
  isSubscribed: boolean;
  profileImage?: string;
}

interface User {
  _id: string;
  email: string;
  role: UserRole;
  isActive: ActiveStatus;
  isVerified: boolean;
  isProfileCompleted: boolean;
  profile: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: { isActive: ActiveStatus }) => Promise<void>;
  isLoading?: boolean;
}

export default function EditUserModal({
  user,
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: EditUserModalProps) {
  const form = useForm<EditUserStatusFormData>({
    resolver: zodResolver(editUserStatusSchema),
    defaultValues: {
      isActive: user?.isActive as ActiveStatus,
    },
  });

  useEffect(() => {
    if (user && open) {
      form.reset({
        isActive: user.isActive,
      });
    }
  }, [user, open, form]);

  const handleSubmit = async (data: EditUserStatusFormData) => {
    try {
      const result = await userStatusUpdate(user!._id, data.isActive);
      if (result.success) {
        toast.success("User status updated successfully");
      }
      await onSubmit(data);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user status",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user details and permissions.
          </DialogDescription>
        </DialogHeader>

        {/* Current User Details */}
        {user && (
          <>
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Current Details
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-semibold text-foreground">{user.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={
                      user.isActive === "ACTIVE"
                        ? "bg-green-600 text-white"
                        : "bg-gray-600 text-white"
                    }
                  >
                    {user.isActive}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <Badge
                    className={
                      user.isVerified
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </Badge>
                </div>
                {user.profile.isSubscribed && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Subscription
                    </p>
                    <Badge className="bg-blue-600 text-white">
                      Premium Member
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
            <Separator />
          </>
        )}

        <div className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Status Select */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Status</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        <SelectItem value="DELETED">DELETED</SelectItem>
                        <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dialog Actions */}
              <div className="flex gap-4 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
