

export interface IReview {
    _id?: string;
    user: string;
    travelPlan: string,
    traveler: string,
    description?: string;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
};