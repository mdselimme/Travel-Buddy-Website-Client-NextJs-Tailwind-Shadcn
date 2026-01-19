/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserDashboardStats {
    overview: Overview
    travelPlansByStatus: any[]
    travelPlansOverTime: any[]
    destinationsVisited: any[]
    budgetAnalysis: BudgetAnalysis
    budgetByMonth: any[]
    travelTypeDistribution: any[]
    socialMetrics: SocialMetrics
    reviewsReceived: any[]
    upcomingTrips: UpcomingTrip[]
    tripDurationDistribution: any[]
    travelFrequencyByMonth: any[]
}

export interface Overview {
    totalTravelPlans: number
    upcomingTravelPlans: number
    completedTravelPlans: number
    cancelledTravelPlans: number
    totalCountries: number
    totalCities: number
}

export interface BudgetAnalysis {
    totalBudget: number
    averageBudgetPerTrip: number
}

export interface SocialMetrics {
    matchesSent: number
    matchesReceived: number
    matchesAccepted: number
    matchesRejected: number
    acceptanceRate: string
    averageRating: number
    totalReviews: number
}

export interface UpcomingTrip {
    _id: string
    travelTitle: string
    destination: Destination
    startDate: string
    endDate: string
    thumbnail: string
    travelPlanStatus: string
}

export interface Destination {
    city: string
    country: string
}
