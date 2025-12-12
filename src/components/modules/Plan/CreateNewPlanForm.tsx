"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Plus, Upload } from "lucide-react";
import { ITravelType } from "@/types/travel.type";
import Image from "next/image";
import { createTravelPlanAction } from "@/actions/TravelPlan/createTravelPlan";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Zod Schema
const planSchema = z.object({
  user: z.string({ error: "User ID is required & must be a string" }),
  travelTitle: z
    .string({ error: "Travel Title is required & must be a string" })
    .min(1, "Travel Title is required"),
  destination: z.object({
    city: z
      .string({ error: "City is required & must be a string" })
      .min(1, "City is required"),
    country: z
      .string({ error: "Country is required & must be a string" })
      .min(1, "Country is required"),
  }),
  startDate: z
    .string({
      error: "Start Date is required & must be a string and valid date format",
    })
    .refine(
      (date) =>
        new Date(date) instanceof Date && !isNaN(new Date(date).getTime()),
      "Start Date must be a valid date format"
    ),
  endDate: z
    .string({
      error: "End Date is required & must be a string and valid date format",
    })
    .refine(
      (date) =>
        new Date(date) instanceof Date && !isNaN(new Date(date).getTime()),
      "End Date must be a valid date format"
    ),
  budgetRange: z.object({
    min: z
      .number({ error: "Minimum budget is required & must be a number" })
      .min(0, "Minimum budget must be greater than 0"),
    max: z
      .number({ error: "Maximum budget is required & must be a number" })
      .min(0, "Maximum budget must be greater than 0"),
  }),
  travelTypes: z
    .array(
      z.string({
        error: "Each travel type must be a string & must be a valid ObjectId",
      }),
      { error: "Travel Types is required & must be an array of strings" }
    )
    .min(1, "At least one travel type is required"),
  travelDescription: z
    .string({ error: "Travel Description must be a string" })
    .optional(),
  itinerary: z
    .array(z.string({ error: "Each itinerary item must be a string" }), {
      error: "Itinerary is required & must be an array of strings",
    })
    .min(1, "At least one itinerary item is required"),
});

type PlanFormData = z.infer<typeof planSchema>;

interface CreateNewPlanFormProps {
  travelTypes?: ITravelType[];
  userId?: string;
  isLoading?: boolean;
}

export default function CreateNewPlanForm({
  travelTypes = [],
  userId,
  isLoading = false,
}: CreateNewPlanFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      user: userId,
      travelTitle: "",
      destination: {
        city: "",
        country: "",
      },
      startDate: "",
      endDate: "",
      budgetRange: {
        min: 0,
        max: 0,
      },
      travelTypes: [],
      travelDescription: "",
      itinerary: [""],
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

  const handleSubmit = async (data: PlanFormData) => {
    console.log({ data });
    setIsSubmitting(true);
    try {
      // Create FormData object for file upload
      const formData = new FormData();

      formData.append("data", JSON.stringify({ ...data, user: userId }));

      if (imageFile) {
        formData.append("file", imageFile);
      }

      const response = await createTravelPlanAction(formData);
      if (response && response.success) {
        // Reset form on success
        form.reset();
        setImagePreview(null);
        toast.success(response.message || "Travel plan created successfully!");
        router.push("/dashboard/my-plans");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error submitting form. Please try again."
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const travelTypeOptions = travelTypes || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log({ file });
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
    const input = document.getElementById("image-input") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <Card className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Create Travel Plan
          </h1>
          <p className="text-muted-foreground mt-2">
            Plan your perfect trip by providing the details below
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
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
                  <FormDescription>
                    Give your travel plan a catchy name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormItem>
              <FormLabel>Plan Image</FormLabel>
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={imagePreview}
                    alt="Plan preview"
                    fill
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
                <FormControl>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                    <label htmlFor="image-input" className="cursor-pointer">
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
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </FormControl>
              )}
              <FormDescription>
                Upload a beautiful image for your travel plan
              </FormDescription>
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
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        {...field}
                      />
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
                      <Input
                        type="date"
                        min={
                          form.watch("startDate") ||
                          new Date().toISOString().split("T")[0]
                        }
                        {...field}
                      />
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
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                        placeholder="5000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                        const typeName = travelTypeOptions.find(
                          (t) => t._id === typeId
                        )?.typeName;
                        return (
                          <Badge key={index} variant="default">
                            {typeName}
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
                      placeholder="Describe your travel plans, interests, and expectations..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional but helps find better travel buddies
                  </FormDescription>
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
                          {index === 0 && (
                            <FormLabel className="sr-only">
                              Day {index + 1}
                            </FormLabel>
                          )}
                          <FormControl>
                            <Input
                              placeholder={`Day ${
                                index + 1
                              } activity or location`}
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
                Add Day to Itinerary
              </Button>
            </FormItem>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-6"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading
                ? "Creating Plan..."
                : "Create Travel Plan"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
