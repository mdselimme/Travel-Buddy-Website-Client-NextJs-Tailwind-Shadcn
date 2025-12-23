export interface IMyReview {
    _id: string
    travelPlan: TravelPlan
    user: ArrangedBy
    traveler: Traveler
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
    _id: string
    travelTitle: string
}

export interface ArrangedBy {
    _id: string
    profile: Profile
}

export interface Traveler {
    _id: string
    profile: Profile
}

export interface IMyTravelPlanReviews {
    _id: string
    travelPlan: TravelPlan
    user: string;
    traveler: Traveler
    rating: number
    description: string
    createdAt?: string
    updatedAt?: string
}

