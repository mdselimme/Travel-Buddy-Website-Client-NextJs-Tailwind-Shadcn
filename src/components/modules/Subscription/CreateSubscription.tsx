"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSubscriptionAction } from "@/actions/subscription/createSubscription";
import { toast } from "sonner";
import { useState } from "react";
import { SubscriptionPlan } from "@/types/subscription";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Zod validation schema
const subscriptionFormSchema = z.object({
  plan: z.enum([SubscriptionPlan.MONTHLY, SubscriptionPlan.YEARLY], {
    error: "Please select a subscription plan",
  }),
  price: z
    .string({ error: "price must be a string" })
    .min(1, "Price is required and must be greater than 0"),
  currency: z
    .string()
    .min(2, "Currency code must be at least 2 characters")
    .max(3, "Currency code must be at most 3 characters")
    .toUpperCase(),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export default function CreateSubscription({}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      plan: SubscriptionPlan.MONTHLY,
      price: "0",
      currency: "BDT",
    },
  });

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsSubmitting(true);

    const submitData = {
      plan: values.plan,
      price: Number(values.price),
      currency: values.currency,
    };

    console.log({ submitData });

    const result = await createSubscriptionAction(submitData);
    if (!result.success) {
      toast.error(result.message || "Error creating subscription.");
      setIsSubmitting(false);
      return;
    }
    toast.success(result.message || "Subscription created successfully.");
    router.push("/admin/dashboard/manage-subscriptions");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Subscription Plan</CardTitle>
        <CardDescription>
          Add a new subscription plan with pricing details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Plan Selection */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Plan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
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
                  <FormDescription>
                    Choose between monthly or yearly subscription
                  </FormDescription>
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
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the subscription price (must be greater than 0)
                  </FormDescription>
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
                      placeholder="BDT"
                      maxLength={3}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Enter 2-3 letter currency code (e.g., BDT, USD)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              variant="default"
              type="submit"
              className="w-full text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Subscription"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
