

export enum MatchStatus {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
};


export interface TravelPlanId {
    _id: string
    travelTitle: string
}


export interface IMatch {
    _id: string;
    travelPlanId: TravelPlanId;
    senderId: string;
    receiverId: string;
    status: MatchStatus;
    createdAt?: Date;
    updatedAt?: Date;
};
