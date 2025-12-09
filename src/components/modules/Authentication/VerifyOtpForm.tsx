"use client";
import { sendOtp, verifyUser } from "@/actions/user/verifyUser";
import WebLogo from "@/assets/icons/WebLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  const [timer, setTimer] = useState(300);
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
      const res = await sendOtp(email);
      setTimer(300);
      setConfirmed(true);
      toast.success(res.message || "Otp Sent Successfully. ", { id: toastId });
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    }
  };

  // Submit otp function
  async function onSubmit(data: z.infer<typeof optSchema>) {
    const otpDate = { email: email, otp: data.pin };
    try {
      const result = await verifyUser(otpDate);
      if (result.success) {
        toast.success("Your Email Verified Successfully.");
        router.push("/login");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
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
    <>
      {confirmed ? (
        <Card {...props}>
          <CardHeader className="text-center">
            <div className="flex flex-col items-center">
              <Link href="/">
                <WebLogo />
              </Link>
            </div>
            <CardTitle className="text-xl">Enter verification code</CardTitle>
            <CardDescription>
              We sent a 6-digit code to your email.
            </CardDescription>
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
                <Button
                  type="submit"
                  className="w-full text-white rounded-full"
                >
                  Submit otp
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Your Email Is Not Verified. Verify Your Email First
            </CardTitle>
            <CardDescription>
              We will send an Otp on your <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendOtp}
              type="submit"
              className="w-full text-white rounded-full"
            >
              Send otp
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
