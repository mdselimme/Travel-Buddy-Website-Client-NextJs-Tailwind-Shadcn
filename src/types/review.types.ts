

export interface IReview {
    _id?: string;
    arrangedBy: string;
    travelPlan: string,
    traveler: string,
    arrangedByDescription?: string;
    arrangedByRating?: number;
    travelerRating?: number;
    travelerByDescription?: string;
    createdAt?: Date;
    updatedAt?: Date;
};