"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface UserProfile {
  _id?: string;
  fullName: string;
  isSubscribed: boolean;
  profileImage?: string;
}

interface User {
  _id: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  isActive: "ACTIVE" | "INACTIVE";
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
  onSubmit: (formData: {
    fullName: string;
    role: string;
    isActive: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function EditUserModal({
  user,
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: EditUserModalProps) {
  const [editForm, setEditForm] = useState({
    fullName: "",
    role: "USER",
    isActive: "ACTIVE",
  });

  useEffect(() => {
    if (user && open) {
      setEditForm({
        fullName: user.profile.fullName,
        role: user.role,
        isActive: user.isActive,
      });
    }
  }, [user, open]);

  const handleSubmit = async () => {
    await onSubmit(editForm);
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
          {/* Full Name Input */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter full name"
              value={editForm.fullName}
              onChange={(e) =>
                setEditForm({ ...editForm, fullName: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          {/* Role Select */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={editForm.role}
              onValueChange={(value) =>
                setEditForm({ ...editForm, role: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Select */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={editForm.isActive}
              onValueChange={(value) =>
                setEditForm({ ...editForm, isActive: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dialog Actions */}
        <div className="flex gap-4 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
