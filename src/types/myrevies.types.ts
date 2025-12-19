export interface IMyReview {
    _id: string
    travelPlan: TravelPlan
    arrangedBy: ArrangedBy
    traveler: Traveler
    arrangedByRating: number
    arrangedByDescription: string
    travelerRating: number
    travelerDescription: string
    createdAt: string
    updatedAt: string
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


