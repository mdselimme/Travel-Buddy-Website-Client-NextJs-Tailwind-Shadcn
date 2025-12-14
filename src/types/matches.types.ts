

export enum MatchStatus {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
};

export interface IMatch {
    _id: string;
    travelPlanId: string;
    senderId: string;
    receiverId: string;
    status: MatchStatus;
    createdAt?: Date;
    updatedAt?: Date;
};