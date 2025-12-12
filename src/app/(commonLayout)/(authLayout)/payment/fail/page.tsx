import PaymentFailContent from "@/components/modules/Payment/PaymentFailContent";
import { Card } from "@/components/ui/card";

import { Suspense } from "react";

export default function PaymentFailPage() {
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
      <PaymentFailContent />
    </Suspense>
  );
}
