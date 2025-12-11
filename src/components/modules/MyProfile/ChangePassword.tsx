/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { changePasswordAction } from "@/actions/auth/changePassword";

const updatePasswordSchema = z.object({
  oldPassword: z
    .string({ error: "old password required and string type." })
    .min(1, { message: "Old password is required." }),
  newPassword: z
    .string({ error: "password must be string." })
    .min(8, { message: "Password minimum 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must be contain at least 1 uppercase letter",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must be contain at least 1 lowercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must be contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must be contain at least 1 number",
    }),
});

const ChangePasswordForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    try {
      const updateData = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const result = await changePasswordAction(updateData);
      if (result?.success) {
        router.push("/my-profile");
        toast.success("Update Password Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Update Password failed.");
    }
  }
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input placeholder="write your old password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="write your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full text-white">
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default ChangePasswordForm;
