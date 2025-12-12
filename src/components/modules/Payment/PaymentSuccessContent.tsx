"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, DollarSign, FileText } from "lucide-react";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId") || "N/A";
  const message =
    searchParams.get("message") || "Payment processed successfully";
  const amount = searchParams.get("amount") || "0";
  const status = searchParams.get("status") || "success";

  const isSuccess = status.toLowerCase() === "success";

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <div className="p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`rounded-full p-4 ${
                isSuccess ? "bg-green-100/50" : "bg-yellow-100/50"
              }`}
            >
              <CheckCircle2
                className={`w-16 h-16 ${
                  isSuccess ? "text-green-600" : "text-yellow-600"
                }`}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
            Payment {isSuccess ? "Successful" : "Processing"}
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
                  Amount Paid
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
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      isSuccess ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <p className="text-foreground font-semibold capitalize">
                    {status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Note */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Note:</strong> A confirmation email has been sent to your
              registered email address. Please keep your transaction ID for
              future reference.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full font-semibold py-6">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
