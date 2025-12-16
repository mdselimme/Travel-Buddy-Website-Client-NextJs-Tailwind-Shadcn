

export interface IReview {
    _id?: string;
    arrangedBy: string;
    travelPlan: string,
    traveler: string,
    rating: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
};