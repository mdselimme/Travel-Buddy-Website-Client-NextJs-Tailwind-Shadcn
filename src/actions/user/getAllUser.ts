/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/serverFetch";

interface IQueryOptions {
    limit:number;
    page:number;
}

export const getAllUser = async (query:IQueryOptions)=>{
    
    try {
        const response = await serverFetch.get(`/user?limit=${query.limit}&page=${query.page}`);

    const data = await response.json();

    if(!response.ok || !data.success){
        throw new Error(data.message||"User data no fetch.")
    }

    return data.data || []

    } catch (error:any) {
        throw new Error(error.message||"User data no fetch.") 
    }
}