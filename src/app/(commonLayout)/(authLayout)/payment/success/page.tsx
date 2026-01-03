import PaymentSuccessContent from "@/components/modules/Payment/PaymentSuccessContent";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Travel Buddy || Payment Successful`,
  description:
    "Travel Buddy Payment Successful Page to inform users about the success of their payment.",
};

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 flex items-center justify-center">
          <Card className="w-full max-w-2xl border-0 shadow-lg p-12 text-center">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-secondary rounded-full mx-auto mb-6" />
              <div className="h-8 bg-secondary rounded w-3/4 mx-auto mb-4" />
              <div className="h-4 bg-secondary rounded w-1/2 mx-auto" />
            </div>
          </Card>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
