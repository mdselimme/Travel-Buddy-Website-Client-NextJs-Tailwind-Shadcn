"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import EditUserModal from "./EditUserModal";
import Link from "next/link";

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

interface ManageUsersTableProps {
  users: User[];
}

const getRoleBadge = (role: string) => {
  const roleConfig: Record<string, { className: string; label: string }> = {
    USER: { className: "bg-blue-600 text-white", label: "User" },
    ADMIN: { className: "bg-purple-600 text-white", label: "Admin" },
    SUPER_ADMIN: { className: "bg-red-600 text-white", label: "Super Admin" },
  };

  const config = roleConfig[role] || roleConfig.USER;
  return <Badge className={config.className}>{config.label}</Badge>;
};

const getStatusBadge = (isActive: string, isVerified: boolean) => {
  if (isActive === "INACTIVE") {
    return <Badge className="bg-gray-600 text-white">Inactive</Badge>;
  }
  return isVerified ? (
    <Badge className="bg-green-600 text-white">Verified</Badge>
  ) : (
    <Badge className="bg-yellow-600 text-white">Unverified</Badge>
  );
};

export default function ManageUsersTable({
  users: initialUsers,
}: ManageUsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      // TODO: Implement delete user action
      console.log("Deleting user:", deleteId);
      setUsers(users.filter((user) => user._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (formData: {
    fullName: string;
    role: string;
    isActive: string;
  }) => {
    if (!editingUser) return;
    setIsUpdating(true);
    try {
      // TODO: Implement update user action
      console.log("Updating user:", editingUser._id, formData);

      setUsers(
        users.map((user) =>
          user._id === editingUser._id
            ? {
                ...user,
                role: formData.role as "USER" | "ADMIN" | "SUPER_ADMIN",
                isActive: formData.isActive as "ACTIVE" | "INACTIVE",
                profile: {
                  ...user.profile,
                  fullName: formData.fullName,
                },
              }
            : user
        )
      );
      setEditModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="font-semibold">Profile</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Subscription</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {users && users.length > 0 ? (
              users.map((user: User) => (
                <TableRow key={user._id} className="hover:bg-secondary/30">
                  {/* Profile Image and Name */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.profile.profileImage ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={user.profile.profileImage}
                            alt={user.profile.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-muted-foreground">
                            {user.profile.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {user.profile.fullName}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-sm">{user.email}</TableCell>

                  {/* Role */}
                  <TableCell>{getRoleBadge(user.role)}</TableCell>

                  {/* Status */}
                  <TableCell>
                    {getStatusBadge(user.isActive, user.isVerified)}
                  </TableCell>

                  {/* Subscription */}
                  <TableCell>
                    {user.profile.isSubscribed ? (
                      <Badge className="bg-blue-600 text-white">Premium</Badge>
                    ) : (
                      <Badge variant="secondary">Free</Badge>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link
                            href={`/profile/${user._id}`}
                            className="flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteId(user._id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4 justify-end">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit User Modal */}
      <EditUserModal
        user={editingUser}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSubmit={handleEditSubmit}
        isLoading={isUpdating}
      />
    </>
  );
}
