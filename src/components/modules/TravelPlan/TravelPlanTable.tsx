/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";
import { ITravelType } from "@/types/travel.type";
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
import { Eye, Edit, Trash2, MoreHorizontal, Settings2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditTravelPlanModal from "./EditTravelPlanModal";
import ViewTravelPlanModal from "./ViewTravelPlanModal";
import { deleteTravelPlanAction } from "@/actions/TravelPlan/deleteTravelPlan";

interface TravelPlanTableProps {
  plans: ITravelPlan[];
  travelTypes?: ITravelType[];
  userId: string;
  onDelete?: (planId: string) => Promise<void>;
  onUpdate?: (planId: string, data: any) => Promise<void>;
}

export default function TravelPlanTable({
  plans,
  travelTypes = [],
  onDelete,
  onUpdate,
  userId,
}: TravelPlanTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewingPlan, setViewingPlan] = useState<ITravelPlan | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const getStatusBadge = (status: TravelPlanStatus) => {
    const statusConfig = {
      [TravelPlanStatus.UPCOMING]: {
        className: "bg-blue-600 text-white",
        label: "Upcoming",
      },
      [TravelPlanStatus.COMPLETED]: {
        className: "bg-green-600 text-white",
        label: "Completed",
      },
      [TravelPlanStatus.CANCELLED]: {
        className: "bg-red-600 text-white",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteTravelPlanAction(deleteId);
      toast.success("Travel plan deleted successfully");
      setDeleteId(null);

      // Call onDelete callback if provided to update parent component
      if (onDelete) {
        await onDelete(deleteId);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete plan"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!plans || plans.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-muted-foreground">No travel plans found.</p>
        <Link href="/dashboard/create-plan">
          <Button className="mt-4">Create Your First Plan</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Start Date</TableHead>
              <TableHead className="font-semibold">End Date</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {plans.map((plan) => (
              <TableRow key={plan._id} className="hover:bg-secondary/30">
                <TableCell>{getStatusBadge(plan.travelPlanStatus)}</TableCell>
                <TableCell className="font-medium">
                  {plan.travelTitle}
                </TableCell>
                <TableCell>{formatDate(plan.startDate)}</TableCell>
                <TableCell>{formatDate(plan.endDate)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setViewingPlan(plan);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>

                      {/* Show manage, edit, delete only if userId matches plan.user */}
                      {userId === plan.user && (
                        <>
                          <DropdownMenuItem>
                            <Link href={`/dashboard/my-plans/${plan._id}`}>
                              <span className="flex items-center">
                                <Settings2 className="w-4 h-4 mr-2" />
                                Manage
                              </span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingPlan(plan);
                              setEditModalOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(plan._id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Travel Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this travel plan? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      <EditTravelPlanModal
        plan={editingPlan}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        travelTypes={travelTypes}
        onSubmit={async (planId, data) => {
          if (onUpdate) {
            await onUpdate(planId, data);
          }
        }}
      />

      {/* View Modal */}
      <ViewTravelPlanModal
        plan={viewingPlan}
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />
    </>
  );
}
