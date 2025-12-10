/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IJwtPayload } from "@/types/auth.types";
import jwt, { JwtPayload } from "jsonwebtoken";


export const verifyAccessToken = async (token: string) => {
    try {
        const verifiedToken = jwt.verify(
            token,
            process.env.JWT_ACCESS_TOKEN_SECRET as string
        ) as JwtPayload;

        return {
            success: true,
            message: "Token is valid",
            payload: verifiedToken as IJwtPayload
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Token is invalid",
            payload: null
        };
    }
};