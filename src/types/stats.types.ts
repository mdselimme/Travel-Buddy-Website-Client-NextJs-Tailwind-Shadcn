/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdminStats {
    overview: Overview
    userGrowth: UserGrowth[]
    travelPlanGrowth: TravelPlanGrowth[]
    travelPlansByStatus: TravelPlansByStatus[]
    matchesByStatus: MatchesByStatus[]
    topDestinations: TopDestination[]
    topTravelTypes: TopTravelType[]
    revenueByPlan: RevenueByPlan[]
    revenueGrowth: RevenueGrowth[]
    paymentsByStatus: PaymentsByStatus[]
    topRatedUsers: TopRatedUser[]
    mostActiveUsers: MostActiveUser[]
}

export interface Overview {
    totalTravelPlans: number
    totalUsers: number
    totalAdmins: number
    totalRegularUsers: number
    totalSubscribedUsers: number
    totalMatches: number
    totalReviews: number
    totalRevenue: number
    pendingPayments: number
    pendingPaymentCount: number
}

export interface UserGrowth {
    count: number
    month: string
}

export interface TravelPlanGrowth {
    count: number
    month: string
}

export interface TravelPlansByStatus {
    count: number
    status: string
    [key: string]: any
}

export interface MatchesByStatus {
    count: number
    status: string
}

export interface TopDestination {
    count: number
    city: string
    country: string
}

export interface TopTravelType {
    count: number
    name: string;
}

export interface RevenueByPlan {
    count: number
    plan: string
    revenue: number
}

export interface RevenueGrowth {
    amount: number
    count: number
    month: string
}

export interface PaymentsByStatus {
    count: number
    totalAmount: number
    status: string
}

export interface TopRatedUser {
    fullName: string
    profileImage: string
    userId: string
    rating: number
    reviewCount: number
}

export interface MostActiveUser {
    travelPlanCount: number
    userId: string
    fullName: string
    profileImage: string
}
