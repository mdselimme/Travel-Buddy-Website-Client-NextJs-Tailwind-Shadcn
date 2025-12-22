import { TravelPlanStatus } from "./travel.plan.types";


export enum MatchStatus {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
};


export interface TravelPlanId {
    _id: string
    travelTitle: string;
    travelPlanStatus: TravelPlanStatus
    user: string;
}

interface IMatchProfile {
    _id: string;
    profile: {
        _id: string;
        fullName: string;
    }
}


export interface IMatch {
    _id: string;
    travelPlanId: TravelPlanId;
    senderId: IMatchProfile;
    receiverId: IMatchProfile;
    status: MatchStatus;
    createdAt?: Date;
    updatedAt?: Date;
};
