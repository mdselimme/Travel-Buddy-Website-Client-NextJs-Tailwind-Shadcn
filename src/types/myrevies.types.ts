export interface IMyReview {
    _id: string
    travelPlan: TravelPlan
    reviewer: IReviewer
    reviewed: IReviewer
    rating: number
    description: string
    createdAt?: string
    updatedAt?: string
}

export interface Profile {
    _id: string
    fullName: string
}

export interface TravelPlan {
    _id: string;
    travelTitle: string;
}

export interface IReviewer {
    _id: string
    profile: Profile
}


export interface IMyTravelPlanReviews {
    _id: string;
    travelPlan: TravelPlan;
    reviewer: IReviewer;
    reviewed: IReviewer;
    rating: number;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

