"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, AlertCircle, DollarSign, FileText } from "lucide-react";

export default function PaymentCancelContent() {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId") || "N/A";
  const message = searchParams.get("message") || "Payment was cancelled";
  const amount = searchParams.get("amount") || "0";
  const status = searchParams.get("status") || "cancelled";

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <div className="p-8 md:p-12">
          {/* Cancel Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full p-4 bg-red-100/50">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
            Payment Cancelled
          </h1>

          {/* Message */}
          <p className="text-center text-muted-foreground mb-8 text-lg">
            {message}
          </p>

          {/* Payment Details Card */}
          <div className="bg-secondary/50 rounded-lg p-6 mb-8 space-y-4">
            {/* Transaction ID */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 mt-1">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  Transaction ID
                </p>
                <p className="text-foreground font-mono text-lg break-all">
                  {transactionId}
                </p>
              </div>
            </div>

            <div className="border-t" />

            {/* Amount */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 mt-1">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  Amount
                </p>
                <p className="text-foreground font-semibold text-lg">
                  ${parseFloat(amount).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border-t" />

            {/* Status */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 mt-1">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                  <p className="text-foreground font-semibold capitalize">
                    {status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Note */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-900 dark:text-red-100">
              <strong>Payment Cancelled:</strong> Your payment was not
              completed. No charges have been made to your account. You can try
              again or contact support if you need assistance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full font-semibold py-6">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="ghost" className="w-full font-semibold py-6">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
