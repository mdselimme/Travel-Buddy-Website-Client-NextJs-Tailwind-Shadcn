"use client";
import WebLogo from "@/assets/icons/WebLogo";
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
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const emailSchema = z.object({
  email: z.email({ error: "Email is required." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export function ForgotPasswordForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof emailSchema>) => {
    console.log(data);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <div className="flex flex-col items-center">
          <Link href="/">
            <WebLogo />
          </Link>
        </div>
        <CardTitle className="text-center font-bold text-2xl">
          Forgot your password ?
        </CardTitle>
        <CardDescription className="text-center text-base">
          Enter your valid email address to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white rounded-full"
                      autoComplete="email"
                      type="email"
                      placeholder="Enter your email here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-white rounded-full">
              Send OTP
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm mt-5">
          Remember your password?{" "}
          <Link href="/login" className="font-bold text-primary">
            Back to Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
