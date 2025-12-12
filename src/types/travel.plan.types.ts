
export enum TravelPlanStatus {
    UPCOMING = "UPCOMING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

interface BudgetRange {
    min: number;
    max: number;
}

interface Destination {
    city: string;
    country: string;
}

export interface ITravelPlan {
    _id: string;
    user: string;
    travelTitle: string;
    destination: Destination;
    startDate: Date;
    endDate: Date;
    budgetRange: BudgetRange;
    travelTypes: string[];
    travelDescription?: string;
    itinerary: string[];
    thumbnail: string;
    isVisible: boolean;
    travelPlanStatus: TravelPlanStatus;
    createdAt?: Date;
    updatedAt?: Date;
};