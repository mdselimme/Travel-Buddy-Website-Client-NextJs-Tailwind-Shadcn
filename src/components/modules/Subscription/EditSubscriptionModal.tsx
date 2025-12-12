"use client";

import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ISubscription, SubscriptionPlan } from "@/types/subscription";

interface SubscriptionWithId extends ISubscription {
  _id: string;
}

interface EditSubscriptionModalProps {
  subscription: SubscriptionWithId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: {
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
  const [editForm, setEditForm] = useState({
    plan: SubscriptionPlan.MONTHLY as SubscriptionPlan,
    price: 0,
    currency: "",
    discount: 0,
  });

  const handleSubmit = async () => {
    await onSubmit(editForm);
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

        <div className="space-y-4">
          {/* Plan Select */}
          <div className="space-y-2">
            <Label htmlFor="plan">Plan Type</Label>
            <Select
              value={editForm.plan}
              onValueChange={(value) =>
                setEditForm({ ...editForm, plan: value as SubscriptionPlan })
              }
            >
              <SelectTrigger id="plan">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SubscriptionPlan.MONTHLY}>
                  Monthly
                </SelectItem>
                <SelectItem value={SubscriptionPlan.YEARLY}>Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              min="0"
              step="0.01"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              disabled={isLoading}
            />
          </div>

          {/* Currency Input */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              type="text"
              placeholder="e.g., USD, EUR, BDT"
              value={editForm.currency}
              onChange={(e) =>
                setEditForm({ ...editForm, currency: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          {/* Discount Input */}
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              placeholder="Enter discount percentage"
              min="0"
              max="100"
              value={editForm.discount}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  discount: parseFloat(e.target.value) || 0,
                })
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Dialog Actions */}
        <div className="flex gap-4 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
