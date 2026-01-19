"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/serverFetch";

interface IQueryOptions {
    limit?: number;
    page?: number;
}

export const getAllUser = async (query: IQueryOptions) => {

    try {
        const params = new URLSearchParams();
        if (query.limit) params.set("limit", query.limit.toString());
        if (query.page) params.set("page", query.page.toString());
        const paramsUrl = params.toString();
        const url = paramsUrl ? `/user?${paramsUrl}` : `/user`;
        const response = await serverFetch.get(url, {
            next: { tags: ["users"] }
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "User data no fetch.")
        }

        return data.data || []

    } catch (error: any) {
        throw new Error(error.message || "User data no fetch.")
    }
}