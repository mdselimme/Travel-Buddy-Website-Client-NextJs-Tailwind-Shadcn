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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const optSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function VerifyOtpForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(10);
  const form = useForm<z.infer<typeof optSchema>>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      pin: "",
    },
  });
  // Submit otp function
  async function onSubmit(data: z.infer<typeof optSchema>) {
    console.log("otp value", data);
  }
  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="otp-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Enter your Otp Here</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <Dot />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    {timer} seconds
                    <Button
                      //   onClick={handleSendOtp}
                      variant={"link"}
                      type="submit"
                      disabled={timer !== 0}
                      className={cn({
                        "cursor-pointer": timer === 0,
                        "text-gray-500": timer !== 0,
                      })}
                    >
                      Resend Otp
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-white rounded-full">
              Submit otp
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
