"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";

// Define the schema with specific phone validation
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  // Phone regex: Allows optional +, digits, spaces, dashes in reasonable patterns
  email: z.email({ error: "Please enter a valid email address" }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactUsForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Form Submitted:", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-3xl mx-auto p-8 bg-white dark:bg-zinc-950 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl"
      >
        <div className="space-y-2 text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-sm">
            We&rsquo;d love to hear from you. Please fill out this form.
          </p>
        </div>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  className="h-11 focus-visible:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone Number */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  className="h-11 focus-visible:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself or your inquiry..."
                  className="resize-none min-h-[120px] focus-visible:ring-primary/50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full font-bold text-white shadow-md hover:shadow-lg transition-all"
        >
          Send Message
        </Button>
      </form>
    </Form>
  );
}
