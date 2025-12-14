"use client";

import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { createTravelTypeAction } from "@/actions/travelType/createTravelType";
import { toast } from "sonner";
import z from "zod";
const travelTypeSchema = z.object({
  typeName: z
    .string({
      error: "Type name is required & must be a string",
    })
    .min(3, { error: "Type name must be at least 3 characters long" }),
});

type TravelTypeFormData = z.infer<typeof travelTypeSchema>;

interface AddTravelTypeFormProps {
  onSuccess?: () => void;
}

const AddTravelTypeForm = ({ onSuccess }: AddTravelTypeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TravelTypeFormData>({
    resolver: zodResolver(travelTypeSchema),
    defaultValues: {
      typeName: "",
    },
  });

  const onSubmit = async (data: TravelTypeFormData) => {
    try {
      setIsLoading(true);
      const result = await createTravelTypeAction(data);

      if (result.success) {
        toast.success(result.message || "Travel type created successfully!");
      }
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                  placeholder="Enter travel type name (e.g., Adventure, Beach, Mountain)"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-white"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Creating..." : "Create Travel Type"}
        </Button>
      </form>
    </Form>
  );
};

export default AddTravelTypeForm;
