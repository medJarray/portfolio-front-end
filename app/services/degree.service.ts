import { makeRequest } from '../utils/index';
import type { Degree, CreateDegree, UpdateDegree } from '../types/index';

export const degreeService = {
    /**
     * Retrieve all degrees
     * @returns Promise<Degree[]> - Array of degrees with id, createdAt, updatedAt
     * @throws ApiError - If the request fails
     */
    getDegrees: async (): Promise<Degree[]> => {
        return makeRequest<Degree[]>('/degrees');
    },

    /**
     * Retrieve a degree by its ID
     * @param id - ID of the degree
     * @returns Promise<Degree> - Degree with id, createdAt, updatedAt
     */
    getDegree: async (id: string): Promise<Degree> => {
        return makeRequest<Degree>(`/degrees/${id}`);
    },

    /**
     * Create a new degree
     * @param degree - Creation data (without id, createdAt, updatedAt)
     * @returns Promise<Degree> - Created degree with id, createdAt, updatedAt
     */
    createDegree: async (degree: CreateDegree): Promise<Degree> => {
        console.log('Creating degree:', degree);
        return makeRequest<Degree>('/degrees', {
            method: 'POST',
            body: JSON.stringify(degree),
        });
    },

    /**
     * Update an existing degree
     * @param id - ID of the degree to update
     * @param degree - Update data (optional fields)
     * @returns Promise<Degree> - Updated degree
     */
    updateDegree: async (id: string, degree: UpdateDegree): Promise<Degree> => {
        console.log('Updating degree:', { id, degree });
        return makeRequest<Degree>(`/degrees/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(degree),
        });
    },

    /**
     * Delete a degree
     * @param id - ID of the degree to delete
     * @returns Promise<void>
     */
    deleteDegree: async (id: string): Promise<void> => {
        await makeRequest<void>(`/degrees/${id}`, {
            method: 'DELETE',
        });
    },
};

export default degreeService;