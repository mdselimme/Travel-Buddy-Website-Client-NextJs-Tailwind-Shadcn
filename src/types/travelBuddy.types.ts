
export interface IInterest {
    _id: string
    typeName: string
}

export interface ITravelBuddyProfile {
    _id: string
    user: string
    fullName: string
    email: string
    visitedPlaces: string[]
    interests: IInterest[]
    address: string
    bio: string
    contactNumber: string
    currentLocation: string
    profileImage: string
}
