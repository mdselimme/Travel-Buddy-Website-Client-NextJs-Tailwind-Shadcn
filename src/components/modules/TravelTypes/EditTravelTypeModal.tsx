"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import { ITravelType } from "@/types/travel.type";
import z from "zod";
import { editTravelTypeAction } from "@/actions/travelType/editTravelType";
import { toast } from "sonner";

interface EditTravelTypeModalProps {
  isOpen: boolean;
  travelType: ITravelType | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const TravelTypeFormData = z.object({
  typeName: z
    .string({
      error: "Type name is required & must be a string",
    })
    .min(3, { error: "Type name must be at least 3 characters long" }),
});

const EditTravelTypeModal = ({
  isOpen,
  travelType,
  onClose,
  onSuccess,
}: EditTravelTypeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof TravelTypeFormData>>({
    resolver: zodResolver(TravelTypeFormData),
    defaultValues: {
      typeName: "",
    },
  });

  // Update form values when travelType changes
  useEffect(() => {
    if (travelType && isOpen) {
      form.reset({
        typeName: travelType.typeName,
      });
    }
  }, [travelType, isOpen, form]);

  const onSubmit = async (data: z.infer<typeof TravelTypeFormData>) => {
    if (!travelType) return;

    setIsLoading(true);
    const result = await editTravelTypeAction({
      travelId: travelType._id,
      typeName: data.typeName,
    });
    if (!result.success) {
      toast.error(result.message || "Failed to update travel type.");
      setIsLoading(false);
      return;
    }
    if (result.success) {
      toast.success(result.message || "Travel type updated successfully!");
    }
    onClose();
    onSuccess?.();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Travel Type</DialogTitle>
          <DialogDescription>Update the travel type name</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="typeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter travel type name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-secondary-foreground"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTravelTypeModal;
