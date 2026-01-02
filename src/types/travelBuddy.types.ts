
export interface IInterest {
    _id: string;
    typeName: string;
}

export interface ITravelBuddyProfile {
    _id: string;
    user: string;
    fullName: string;
    interests: IInterest[];
    currentLocation: string;
    profileImage: string;
    averageRating: number;
}
