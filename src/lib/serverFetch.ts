import { getNewAccessToken } from "@/actions/auth/refreshToken";
import { getCookie } from "./tokenHandlers";

const SERVER_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
    endpoint: string,
    options: RequestInit
): Promise<Response> => {
    const accessToken = await getCookie("accessToken");

    const makeRequest = () =>
        fetch(`${SERVER_API_URL}${endpoint}`, {
            ...options,
            credentials: "include", // ✅ cookies handled by browser
            headers: {
                ...(options.headers || {}),
                ...(accessToken
                    ? { Authorization: `${accessToken}` }
                    : {}),
            },
        });

    // First attempt
    let response = await makeRequest();

    console.log({ response })

    // Refresh ONLY on 401
    if (response.status === 401 && endpoint !== "/auth/refresh-token") {
        const refreshed = await getNewAccessToken();

        if (refreshed?.success) {
            // Retry once after refresh
            response = await makeRequest();
        }
    }

    return response;
};

export const serverFetch = {
    get: (endpoint: string, options: RequestInit = {}) =>
        serverFetchHelper(endpoint, { ...options, method: "GET" }),

    post: (endpoint: string, options: RequestInit = {}) =>
        serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: (endpoint: string, options: RequestInit = {}) =>
        serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: (endpoint: string, options: RequestInit = {}) =>
        serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: (endpoint: string, options: RequestInit = {}) =>
        serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
