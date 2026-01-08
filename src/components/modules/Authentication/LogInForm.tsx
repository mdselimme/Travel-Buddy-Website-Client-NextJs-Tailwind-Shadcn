"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Password from "./Password";
import { authLogIn } from "@/actions/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/authRouteUtils";

const logInSchema = z.object({
  email: z.email({ error: "Email is required." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string({ error: "Password is required." }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function LoginForm({
  redirect,
  className,
  ...props
}: React.ComponentProps<"div"> & { redirect: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof logInSchema>) => {
    const logInData = {
      email: data.email,
      password: data.password,
    };

    const result = await authLogIn(logInData);

    if (result && !result.success) {
      if (result.message.includes("not verified")) {
        toast.error(result.message || "Email not verified.");
        router.push(`/verify-email?email=${data.email}`);
        return;
      }
    }

    if (result.success) {
      toast.success(result.message || "Logged in successfully.");
      const requestedPath =
        redirect || getDefaultDashboardRoute(result?.data?.role);
      if (!result?.data?.isProfileCompleted) {
        if (isValidRedirectForRole(redirect, result.data.role)) {
          router.push(`/my-profile?redirect=${requestedPath}`);
          return;
        }
      }
      router.push(requestedPath);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} className="bg-white rounded-full" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="mb-4 underline inline-block text-primary-foreground"
            >
              Forgot your password?
            </Link>
            <Button
              type="submit"
              className="w-full text-white rounded-full cursor-pointer"
            >
              Log In
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-primary-foreground font-medium relative z-10 px-2">
            Or
          </span>
        </div>
        {/* Sign in with google button will be added  */}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
}
