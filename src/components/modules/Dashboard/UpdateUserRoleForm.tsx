"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { userRoleUpdateAction } from "@/actions/user/userRoleUpdate";
import { toast } from "sonner";

// Zod Schema
const updateUserRoleSchema = z.object({
  email: z.email({
    message: "User email must be a string & valid email address",
  }),
  role: z.enum(["USER", "ADMIN"], {
    message:
      "Invalid user role! Value must be from ADMIN, USER the given options.",
  }),
});

type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

export default function UpdateUserRoleForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateUserRoleInput>({
    resolver: zodResolver(updateUserRoleSchema),
    defaultValues: {
      email: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: UpdateUserRoleInput) => {
    setIsLoading(true);
    const result = await userRoleUpdateAction(data);
    if (!result.success) {
      toast.error(result.message || "Failed to update user role.");
      setIsLoading(false);
      return;
    }
    if (result.success) {
      toast.success(result.message || "User role updated successfully.");
      form.reset();
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Update User Role</CardTitle>
        <CardDescription>Change user email and assign a role</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update User Role"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
