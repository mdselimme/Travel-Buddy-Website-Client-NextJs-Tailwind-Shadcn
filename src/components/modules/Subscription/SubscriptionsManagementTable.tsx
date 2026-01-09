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

import { ISubscription, SubscriptionPlan } from "@/types/subscription";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import EditSubscriptionModal from "./EditSubscriptionModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSubscriptionAction } from "@/actions/subscription/deleteSubscription";
import { toast } from "sonner";

interface SubscriptionWithId extends ISubscription {
  _id: string;
}

interface SubscriptionsManagementTableProps {
  subscriptions: SubscriptionWithId[];
}

const formatDate = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getPlanBadge = (plan: SubscriptionPlan) => {
  const planConfig: Record<
    SubscriptionPlan,
    { className: string; label: string }
  > = {
    [SubscriptionPlan.MONTHLY]: {
      className: "bg-blue-600 text-white",
      label: "Monthly",
    },
    [SubscriptionPlan.YEARLY]: {
      className: "bg-purple-600 text-white",
      label: "Yearly",
    },
  };

  const config = planConfig[plan];
  return <Badge className={config.className}>{config.label}</Badge>;
};

const getStatusBadge = (isDeleted?: boolean) => {
  if (isDeleted) {
    return <Badge className="bg-red-600 text-white">Deleted</Badge>;
  }
  return <Badge className="bg-green-600 text-white">Active</Badge>;
};

export default function SubscriptionsManagementTable({
  subscriptions: initialSubscriptions,
}: SubscriptionsManagementTableProps) {
  const [subscriptions, setSubscriptions] =
    useState<SubscriptionWithId[]>(initialSubscriptions);
  const [editingSubscription, setEditingSubscription] =
    useState<SubscriptionWithId | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] =
    useState<SubscriptionWithId | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (subscription: SubscriptionWithId) => {
    setEditingSubscription(subscription);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (formData: {
    plan: SubscriptionPlan;
    price: number;
    currency: string;
    discount: number;
  }) => {
    if (!editingSubscription) return;
    setIsUpdating(true);
    try {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub._id === editingSubscription._id ? { ...sub, ...formData } : sub
        )
      );
      setEditModalOpen(false);
      setEditingSubscription(null);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = (subscription: SubscriptionWithId) => {
    setSubscriptionToDelete(subscription);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!subscriptionToDelete) return;
    setIsDeleting(true);

    const result = await deleteSubscriptionAction(subscriptionToDelete._id);
    if (!result.success) {
      toast.error(result.message || "Failed to delete subscription");
      setIsDeleting(false);
      return;
    }
    if (result.success) {
      toast.success(result.message || "Subscription deleted successfully");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="font-semibold">Plan</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Currency</TableHead>
              <TableHead className="font-semibold">Discount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {subscriptions && subscriptions.length > 0 ? (
              subscriptions.map((subscription: SubscriptionWithId) => (
                <TableRow
                  key={subscription._id}
                  className="hover:bg-secondary/30"
                >
                  <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                  <TableCell className="font-semibold">
                    $
                    {subscription.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="uppercase font-medium">
                    {subscription.currency}
                  </TableCell>
                  <TableCell>
                    {subscription.discount ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {subscription.discount}%
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(subscription.isDeleted)}
                  </TableCell>
                  <TableCell>{formatDate(subscription.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditClick(subscription)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(subscription)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Soft Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No subscriptions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Subscription Modal */}
      <EditSubscriptionModal
        subscription={editingSubscription}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSubmit={handleEditSubmit}
        isLoading={isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-semibold">
                {subscriptionToDelete?.plan}
              </span>{" "}
              subscription plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Soft Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
