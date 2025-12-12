/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
}


export interface IPayment {
    _id: string;
    user: string;
    subscription: string;
    transactionId: string;
    invoiceUrl?: string;
    subscriptionType: string;
    subStartDate?: Date;
    subEndDate?: Date;
    paymentGatewayData?: any;
    status: PaymentStatus;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
};