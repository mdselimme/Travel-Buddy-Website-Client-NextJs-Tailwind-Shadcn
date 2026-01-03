import PaymentCancelContent from "@/components/modules/Payment/PaymentCancelContent";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Travel Buddy || Payment Canceled`,
  description:
    "Travel Buddy Payment Canceled Page to inform users about the cancellation of their payment.",
};

export default function PaymentCancelPage() {
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
      <PaymentCancelContent />
    </Suspense>
  );
}
