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
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";
import { Eye, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface ManageTravelPlansTableProps {
  travelPlans: ITravelPlan[];
}

const formatDate = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusBadge = (status: TravelPlanStatus) => {
  const statusConfig: Record<
    TravelPlanStatus,
    { className: string; label: string }
  > = {
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

export default function ManageTravelPlansTable({
  travelPlans: initialPlans,
}: ManageTravelPlansTableProps) {
  const [travelPlans, setTravelPlans] = useState<ITravelPlan[]>(initialPlans);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      // After successful deletion, remove from list
      setTravelPlans(travelPlans.filter((plan) => plan._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Start Date</TableHead>
              <TableHead className="font-semibold">End Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {travelPlans && travelPlans.length > 0 ? (
              travelPlans.map((plan: ITravelPlan) => (
                <TableRow key={plan._id} className="hover:bg-secondary/30">
                  <TableCell className="font-medium">
                    {plan.travelTitle}
                  </TableCell>
                  <TableCell>{formatDate(plan.startDate)}</TableCell>
                  <TableCell>{formatDate(plan.endDate)}</TableCell>
                  <TableCell>{getStatusBadge(plan.travelPlanStatus)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/travel-plans/${plan._id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteId(plan._id)}
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
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No travel plans found
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
            <AlertDialogTitle>Delete Travel Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this travel plan? This action
              cannot be undone.
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
    </>
  );
}
