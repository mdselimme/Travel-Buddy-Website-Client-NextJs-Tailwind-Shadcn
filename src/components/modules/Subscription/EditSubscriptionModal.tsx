"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ISubscription, SubscriptionPlan } from "@/types/subscription";
import { updateSubscriptionAction } from "@/actions/subscription/updateSubscription";
import { toast } from "sonner";

// Zod Validation Schema
const editSubscriptionSchema = z.object({
  plan: z.enum([SubscriptionPlan.MONTHLY, SubscriptionPlan.YEARLY], {
    message: "Invalid plan type",
  }),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .refine((val) => !isNaN(val), "Price must be a valid number"),
  currency: z
    .string()
    .min(1, "Currency is required")
    .max(10, "Currency code is too long")
    .regex(/^[A-Z]{3}$/, "Currency must be a 3-letter code (e.g., USD, EUR)"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
});

type EditSubscriptionFormData = z.infer<typeof editSubscriptionSchema>;

interface SubscriptionWithId extends ISubscription {
  _id: string;
}

interface EditSubscriptionModalProps {
  subscription: SubscriptionWithId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: {
    _id: string;
    plan: SubscriptionPlan;
    price: number;
    currency: string;
    discount: number;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function EditSubscriptionModal({
  subscription,
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: EditSubscriptionModalProps) {
  const form = useForm<EditSubscriptionFormData>({
    resolver: zodResolver(editSubscriptionSchema),
    defaultValues: {
      plan: SubscriptionPlan.MONTHLY,
      price: 0,
      currency: "",
      discount: 0,
    },
  });

  // Update form when subscription changes
  useEffect(() => {
    if (subscription && open) {
      form.reset({
        plan: subscription.plan,
        price: subscription.price,
        currency: subscription.currency,
        discount: subscription.discount || 0,
      });
    }
  }, [subscription, open, form]);

  const handleSubmit = async (data: EditSubscriptionFormData) => {
    if (!subscription) return;

    try {
      const result = await updateSubscriptionAction({
        _id: subscription._id,
        plan: data.plan,
        price: data.price,
        currency: data.currency,
        discount: data.discount,
      });
      if (result.success) {
        toast.success("Subscription updated successfully");
        await onSubmit({
          _id: subscription._id,
          ...data,
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} key={subscription?._id}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Subscription</DialogTitle>
          <DialogDescription>
            Update the subscription plan details.
          </DialogDescription>
        </DialogHeader>

        {/* Current Subscription Details */}
        {subscription && (
          <>
            <Card className="p-4 bg-secondary/50">
              <h3 className="font-semibold text-foreground mb-3">
                Current Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Plan:</span>
                  <Badge className="bg-blue-600 text-white">
                    {subscription.plan === SubscriptionPlan.MONTHLY
                      ? "Monthly"
                      : "Yearly"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-semibold text-foreground">
                    $
                    {subscription.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Currency:
                  </span>
                  <span className="font-semibold text-foreground uppercase">
                    {subscription.currency}
                  </span>
                </div>
                {subscription.discount && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Discount:
                    </span>
                    <span className="font-semibold text-foreground">
                      {subscription.discount}%
                    </span>
                  </div>
                )}
              </div>
            </Card>
            <Separator />
          </>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Plan Select */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={SubscriptionPlan.MONTHLY}>
                        Monthly
                      </SelectItem>
                      <SelectItem value={SubscriptionPlan.YEARLY}>
                        Yearly
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Input */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      disabled={isLoading}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Currency Input */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g., USD, EUR, BDT"
                      disabled={isLoading}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Input */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
                      disabled={isLoading}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dialog Actions */}
            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
