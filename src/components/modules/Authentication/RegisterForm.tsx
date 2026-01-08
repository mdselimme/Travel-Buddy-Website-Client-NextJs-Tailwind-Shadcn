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
import { registerUser } from "@/actions/user/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    fullName: z.string({ error: "Full name is required." }).min(3, {
      message: "Full name must be at least 3 characters.",
    }),
    email: z.email({ error: "Email is required." }).min(2, {
      message: "Email must be at least 2 characters.",
    }),
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };
    const result = await registerUser(userData);

    if (!result.success) {
      toast.error(result.message || "Error registering user.");
      return;
    }
    if (result.success) {
      router.push("/login");
      toast.success(result.message || "Registration successful");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create Your Travel Profile</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Find your next travel buddy and explore the world together.
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white rounded-full"
                      autoComplete="full-name"
                      type="text"
                      placeholder="Enter your full name here"
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
                    <Password
                      placeholder="Enter your password"
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
                      placeholder="Confirm your password"
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
            <Button
              type="submit"
              className="w-full text-white rounded-full cursor-pointer"
            >
              Sign Up
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
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary">
          Log in
        </Link>
      </div>
    </div>
  );
}
