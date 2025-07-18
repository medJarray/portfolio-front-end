import { makeRequest } from '../utils/index';
import type { Experience, CreateExperience, UpdateExperience } from '../types/index';

export const experienceService = {
    /**
     * Retrieve all experiences
     * @returns Promise<Experience[]> - Array of experiences with id, createdAt, updatedAt
     * @throws ApiError - If the request fails
     */
    getExperiences: async (): Promise<Experience[]> => {
        return makeRequest<Experience[]>('/experiences');
    },

    /**
     * Retrieve an experience by its ID
     * @param id - ID of the experience
     * @returns Promise<Experience> - Experience with id, createdAt, updatedAt
     */
    getExperience: async (id: string): Promise<Experience> => {
        return makeRequest<Experience>(`/experiences/${id}`);
    },

    /**
     * Create a new experience
     * @param experience - Creation data (without id, createdAt, updatedAt)
     * @returns Promise<Experience> - Expérience créée avec id, createdAt, updatedAt
     */
    createExperience: async (experience: CreateExperience): Promise<Experience> => {
        console.log('Creating experience:', experience);
        return makeRequest<Experience>('/experiences', {
            method: 'POST',
            body: JSON.stringify(experience),
        });
    },

    /**
     * Update an existing experience
     * @param id - ID of the experience to update
     * @param experience - Update data (optional fields)
     * @returns Promise<Experience> - Updated experience
     */
    updateExperience: async (id: string, experience: UpdateExperience): Promise<Experience> => {
        console.log('Updating experience:', { id, experience });
        return makeRequest<Experience>(`/experiences/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(experience),
        });
    },

    /**
     * Delete an experience
     * @param id - ID of the experience to delete
     * @returns Promise<void>
     */
    deleteExperience: async (id: string): Promise<void> => {
        await makeRequest<void>(`/experiences/${id}`, {
            method: 'DELETE',
        });
    },
};

// ====== EXPORT WITH ALIAS FOR COMPATIBILITY =====

export default experienceService;