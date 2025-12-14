"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import EditTravelTypeModal from "./EditTravelTypeModal";
import { ITravelType } from "@/types/travel.type";
import { toast } from "sonner";
import { deleteTravelTypeAction } from "@/actions/travelType/deleteTravelType";

interface TravelTypesListProps {
  initialTravelTypes: ITravelType[];
  onRefresh?: () => void;
}

const TravelTypesList = ({
  initialTravelTypes,
  onRefresh,
}: TravelTypesListProps) => {
  const [editingType, setEditingType] = useState<ITravelType | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const result = await deleteTravelTypeAction(id);
      if (result.success) {
        toast.success(result.message || "Travel type deleted successfully!");
      }
      setDeletingId(null);
      onRefresh?.();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSuccess = () => {
    setEditingType(null);
    onRefresh?.();
  };

  return (
    <>
      <Card className="mt-8 overflow-hidden">
        <Table>
          <TableHeader className="bg-linear-to-r from-blue-600 to-blue-700">
            <TableRow className="border-none hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-700">
              <TableHead className="text-white font-semibold">
                Travel Type Name
              </TableHead>
              <TableHead className="text-white font-semibold w-32">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-50">
            {initialTravelTypes.map((type, index) => (
              <TableRow
                key={type._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors`}
              >
                <TableCell className="font-medium">{type.typeName}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingType(type)}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingId(type._id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Modal */}
      <EditTravelTypeModal
        isOpen={!!editingType}
        travelType={editingType}
        onClose={() => setEditingType(null)}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Alert Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Travel Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this travel type? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TravelTypesList;
