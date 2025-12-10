import { UserRole } from "./auth.types";


export enum ActiveStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
    DELETED = 'DELETED'
}

export type IRegisterInput = {
    fullName: string;
    email: string;
    password: string;
};

export type IVerifyInput = {
    email: string;
    otp: string;
};

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    isProfileCompleted: boolean;
    role: UserRole;
    isActive: ActiveStatus;
    profile?: string;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}