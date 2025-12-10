
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export type IResetPasswordInput = {
    token: string;
    password: string;
}

export type IAuthLogin = {
    email: string;
    password: string;
    redirectTo?: string;
}

export type IJwtPayload = {
    fullName: string;
    userId: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}