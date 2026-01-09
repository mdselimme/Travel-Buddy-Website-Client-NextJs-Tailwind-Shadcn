import { getMePayment } from "@/actions/payment/getMePayment";
import { getAllSubscription } from "@/actions/subscription/getAllSubscription";
import MySubscriptionCard from "@/components/modules/Subscription/MySubscriptionCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IPayment } from "@/types/payments.types";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Dashboard My Subscriptions || Travel Buddy`,
  description:
    "Travel Buddy My Subscriptions Page to manage your subscriptions.",
};

const formatDate = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { className: string; label: string }> = {
    PENDING: { className: "bg-yellow-500 text-white", label: "Pending" },
    PAID: { className: "bg-green-500 text-white", label: "Paid" },
    FAILED: { className: "bg-red-500 text-white", label: "Failed" },
    CANCELLED: { className: "bg-gray-500 text-white", label: "Cancelled" },
  };

  const statusKey = status?.toUpperCase?.() || "PENDING";

  const config =
    statusConfig[statusKey as keyof typeof statusConfig] ||
    statusConfig.PENDING;
  return <Badge className={config.className}>{config.label}</Badge>;
};

const MySubscriptionPage = async () => {
  const subscriptions = await getAllSubscription();
  const mePayments = await getMePayment();

  // Filter out deleted subscriptions
  const activeSubscriptions = subscriptions.filter(
    (subscription) => !subscription.isDeleted
  );

  return (
    <div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">My Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal subscription plan and billing information.
        </p>
      </div>
      <MySubscriptionCard subscriptions={activeSubscriptions} />

      {/* Payment History Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-semibold">Transaction ID</TableHead>
                <TableHead className="font-semibold">
                  Subscription Type
                </TableHead>
                <TableHead className="font-semibold">Payment Date</TableHead>
                <TableHead className="font-semibold">Start Date</TableHead>
                <TableHead className="font-semibold">End Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {mePayments && mePayments.length > 0 ? (
                mePayments.map((payment: IPayment) => (
                  <TableRow key={payment._id} className="hover:bg-secondary/30">
                    <TableCell className="font-mono text-sm">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell className="font-medium capitalize">
                      {payment.subscriptionType}
                    </TableCell>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>{formatDate(payment.subStartDate)}</TableCell>
                    <TableCell>{formatDate(payment.subEndDate)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right font-semibold">
                      $
                      {payment.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No payment records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MySubscriptionPage;
