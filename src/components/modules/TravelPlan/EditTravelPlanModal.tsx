"use client";

import React, { useEffect, useState } from "react";
import { ITravelPlan, TravelPlanStatus } from "@/types/travel.plan.types";
import { ITravelType } from "@/types/travel.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import { getAllTravelType } from "@/actions/travelType/getAllTravelType";
import Image from "next/image";
import { travelPlanUpdateAction } from "@/actions/TravelPlan/travelPlanUpdate";

const editPlanSchema = z.object({
  travelTitle: z.string().min(1, "Travel Title is required"),
  destination: z.object({
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
  startDate: z.string(),
  endDate: z.string(),
  budgetRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }),
  travelTypes: z.array(z.string()).min(1, "Select at least one travel type"),
  travelDescription: z.string().optional(),
  itinerary: z.array(z.string()).min(1),
  travelPlanStatus: z.enum([
    TravelPlanStatus.UPCOMING,
    TravelPlanStatus.COMPLETED,
    TravelPlanStatus.CANCELLED,
  ]),
  image: z
    .any()
    .refine((file) => !file || file instanceof File, "Image must be a file")
    .optional(),
});

type EditPlanFormData = z.infer<typeof editPlanSchema>;

interface EditTravelPlanModalProps {
  plan: ITravelPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  travelTypes: ITravelType[];
  onSubmit: (planId: string, data: EditPlanFormData) => Promise<void>;
}

export default function EditTravelPlanModal({
  plan,
  open,
  onOpenChange,
}: EditTravelPlanModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [travelTypeOptions, setTravelTypeOptions] = useState<ITravelType[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeOriginalImage, setRemoveOriginalImage] = useState(false);

  const form = useForm<EditPlanFormData>({
    resolver: zodResolver(editPlanSchema),
    defaultValues: {
      travelTitle: "",
      destination: { city: "", country: "" },
      startDate: "",
      endDate: "",
      budgetRange: { min: 0, max: 0 },
      travelTypes: [],
      travelDescription: "",
      itinerary: [""],
      travelPlanStatus: TravelPlanStatus.UPCOMING,
    },
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control: form.control,
    name: "itinerary" as never,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setRemoveOriginalImage(true);
    const input = document.getElementById(
      "edit-image-input"
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  // Update form when plan changes
  useEffect(() => {
    const fetchTravelTypes = async () => {
      const allTravelTypes = await getAllTravelType();
      setTravelTypeOptions(allTravelTypes.data);
    };
    fetchTravelTypes();
    setRemoveOriginalImage(false);
    setImagePreview(null);
    setImageFile(null);
    if (plan) {
      // Extract only IDs from travelTypes array in case they are objects
      const travelTypeIds = Array.isArray(plan.travelTypes)
        ? plan.travelTypes.map((type) =>
            typeof type === "string" ? type : (type as ITravelType)._id
          )
        : [];

      form.reset({
        travelTitle: plan.travelTitle,
        destination: plan.destination,
        startDate: new Date(plan.startDate).toISOString().split("T")[0],
        endDate: new Date(plan.endDate).toISOString().split("T")[0],
        budgetRange: plan.budgetRange,
        travelTypes: travelTypeIds,
        travelDescription: plan.travelDescription || "",
        itinerary: plan.itinerary,
        travelPlanStatus: plan.travelPlanStatus,
      });
    }
  }, [plan, form]);

  const handleSubmit = async (data: EditPlanFormData) => {
    if (!plan) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      if (imageFile) {
        formData.append("file", imageFile);
      }
      const result = await travelPlanUpdateAction(plan._id, formData);
      if (result && result.success) {
        toast.success("Travel plan updated successfully!");
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error updating plan"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Travel Plan</DialogTitle>
          <DialogDescription>Update your travel plan details</DialogDescription>
        </DialogHeader>

        {plan && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Travel Title */}
              <FormField
                control={form.control}
                name="travelTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Summer Europe Tour 2024"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormItem>
                <FormLabel>Plan Image</FormLabel>
                {(!removeOriginalImage && plan?.thumbnail) || imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={
                        imagePreview ||
                        (!removeOriginalImage && plan?.thumbnail) ||
                        ""
                      }
                      alt="Plan preview"
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="eager"
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={removeImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                    <label
                      htmlFor="edit-image-input"
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          Click to upload image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                      <input
                        id="edit-image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </FormItem>

              {/* Destination */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="destination.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Budget Range */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budgetRange.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Budget ($) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budgetRange.max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Budget ($) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Travel Types */}
              <FormField
                control={form.control}
                name="travelTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Types *</FormLabel>
                    <Select
                      value={field.value[0] || ""}
                      onValueChange={(value) => {
                        if (!field.value.includes(value)) {
                          field.onChange([...field.value, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select travel types" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {travelTypeOptions.map((type) => (
                          <SelectItem key={type._id} value={type._id}>
                            {type.typeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {field.value.map((typeId, index) => {
                          const travelType = travelTypeOptions.find(
                            (t) => t._id === typeId
                          );
                          return (
                            <Badge
                              key={index}
                              variant="default"
                              className="bg-blue-600 text-white"
                            >
                              {travelType?.typeName || typeId}
                              <button
                                onClick={() =>
                                  field.onChange(
                                    field.value.filter((_, i) => i !== index)
                                  )
                                }
                                className="ml-2 hover:underline"
                              >
                                ×
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Travel Description */}
              <FormField
                control={form.control}
                name="travelDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your travel plans..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Itinerary */}
              <FormItem>
                <FormLabel>Itinerary *</FormLabel>
                <div className="space-y-3">
                  {itineraryFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                      <FormField
                        control={form.control}
                        name={`itinerary.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={`Day ${index + 1} activity`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {itineraryFields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeItinerary(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendItinerary("")}
                  className="mt-3 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Day
                </Button>
              </FormItem>

              {/* Status */}
              <FormField
                control={form.control}
                name="travelPlanStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TravelPlanStatus.UPCOMING}>
                          Upcoming
                        </SelectItem>
                        <SelectItem value={TravelPlanStatus.COMPLETED}>
                          Completed
                        </SelectItem>
                        <SelectItem value={TravelPlanStatus.CANCELLED}>
                          Cancelled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-secondary-foreground"
                >
                  {isSubmitting ? "Updating..." : "Update Plan"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
