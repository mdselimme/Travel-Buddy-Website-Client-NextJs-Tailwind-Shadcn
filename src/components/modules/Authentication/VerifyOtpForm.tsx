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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const optSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function VerifyOtpForm({
  email,
  ...props
}: React.ComponentProps<typeof Card> & {
  email: string;
}) {
  const [confirmed, setConfirmed] = useState(true);

  const [timer, setTimer] = useState(10);
  const form = useForm<z.infer<typeof optSchema>>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      pin: "",
    },
  });
  // Send Otp in email function
  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending Otp.");
    try {
      // const res = await sendOtp({ email }).unwrap();
      // if (res.success) {
      //   toast.success("Otp Sent Successfully. ", { id: toastId });
      //   setConfirmed(true);
      // }
      setConfirmed(true);
      setTimer(10);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit otp function
  async function onSubmit(data: z.infer<typeof optSchema>) {
    console.log("otp value", {
      email,
      otp: data.pin,
    });
  }

  useEffect(() => {
    if (!email && !confirmed) {
      return;
    }
    const timerId = setInterval(() => {
      if (confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [email, confirmed]);
  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <div className="flex flex-col items-center">
          <Link href="/">
            <WebLogo />
          </Link>
        </div>
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent className="text-center mx-auto">
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
                  <FormLabel className="mb-2 text-center">
                    Enter your Otp Here
                  </FormLabel>
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
                      onClick={handleSendOtp}
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
