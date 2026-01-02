

export interface IProfile {
    _id?: string;
    user: string;
    fullName: string;
    email: string;
    averageRating: number;
    contactNumber?: string;
    profileImage?: string;
    address?: string;
    bio?: string;
    visitedPlaces?: string[];
    isSubscribed: boolean;
    subStartDate?: Date;
    subEndDate?: Date;
    currentLocation?: string;
    interests?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}