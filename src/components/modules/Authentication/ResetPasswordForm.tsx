/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Password from "./Password";
import WebLogo from "@/assets/icons/WebLogo";
import Link from "next/link";
import { IResetPasswordInput } from "@/types/auth.types";
import { toast } from "sonner";
import { resetPasswordAction } from "@/actions/auth/forgotPassword";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z
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
    confirmPassword: z
      .string({ error: "Confirm Password is required." })
      .min(8, {
        message: "Confirm Password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({
  params,
  ...props
}: React.ComponentProps<typeof Card> & {
  params: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  // Submit otp function
  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    const resetData: IResetPasswordInput = {
      password: data.password,
      token: params?.token as string,
    };
    try {
      const result = await resetPasswordAction(resetData);
      router.push("/login");
      toast.success(result.message || "Password has been reset successfully.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password.");
    }
  }
  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <div className="flex flex-col items-center">
          <Link href="/">
            <WebLogo />
          </Link>
        </div>
        <CardTitle className="text-center font-bold text-2xl">
          Set Your New Password
        </CardTitle>
        <CardDescription>
          Set Password Within 5 minutes After Receiving the Reset Email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password
                      placeholder="Enter your new password"
                      {...field}
                      className="bg-white rounded-full"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password
                      autoComplete="confirm-password"
                      placeholder="Confirm your new password"
                      {...field}
                      className="bg-white rounded-full"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your new password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-white rounded-full py-4"
            >
              Set New Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
