

export interface IReview {
    _id?: string;
    reviewer: string;
    travelPlan: string,
    reviewed: string,
    description?: string;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
};