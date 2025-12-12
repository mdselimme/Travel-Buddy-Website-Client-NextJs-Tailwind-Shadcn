
export enum SubscriptionPlan {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}


export interface ISubscription {
    _id: string;
    plan: SubscriptionPlan;
    price: number;
    currency: string;
    discount?: number;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}