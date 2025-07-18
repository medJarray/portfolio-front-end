export const API_URL = 'http://localhost:3000/api';

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
            errorData.message || `HTTP Error ${response.status}`,
            response.status,
            errorData
        );
    }
    return response.json();
}

export async function makeRequest<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_URL}${url}`, defaultOptions);
        console.log({ response });
        return handleResponse<T>(response);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Network error or server unavailable', 0);
    }
}