"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, DollarSign, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PaymentFailContent() {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId") || "N/A";
  const message = searchParams.get("message") || "Payment failed";
  const amount = searchParams.get("amount") || "0";
  const status = searchParams.get("status") || "failed";

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <div className="p-8 md:p-12">
          {/* Fail Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full p-4 bg-red-100/50">
              <AlertTriangle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
            Payment Failed
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
                  Amount Attempted
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
                <AlertTriangle className="w-5 h-5 text-primary" />
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

          {/* Error Information */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-900 dark:text-red-100">
              <strong>Payment Error:</strong> Your payment could not be
              processed. This could be due to insufficient funds, invalid card
              details, or a temporary payment gateway issue. Please try again or
              contact support if the problem persists.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/find-travel-buddy" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Link>
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

          {/* Support Section */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-muted-foreground mb-3">Need help?</p>
            <Link href="/help">
              <Button variant="link" className="text-primary">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
