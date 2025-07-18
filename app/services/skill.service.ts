import { makeRequest } from '../utils/http.utils';
import type { Skill, CreateSkill, UpdateSkill } from '../types/index';

export const skillService = {
    /**
     * Retrieve all skills
     * @returns Promise<Skill[]> - Array of skills with id, createdAt, updatedAt
     * @throws ApiError - If the request fails
     */
    getSkills: async (): Promise<Skill[]> => {
        return makeRequest<Skill[]>('/skills');
    },

    /**
     * Retrieve a skill by its ID
     * @param id - ID of the skill
     * @returns Promise<Skill> - Skill with id, createdAt, updatedAt
     */
    getSkill: async (id: string): Promise<Skill> => {
        return makeRequest<Skill>(`/skills/${id}`);
    },

    /**
     * Retrieve skills filtered by category
     * @param category - Category of skills to retrieve
     * @returns Promise<Skill[]> - Array of skills in the specified category
     */
    getSkillsByCategory: async (category: string): Promise<Skill[]> => {
        return makeRequest<Skill[]>(`/skills?category=${encodeURIComponent(category)}`);
    },

    /**
     * Create a new skill
     * @param skill - Creation data (without id, createdAt, updatedAt)
     * @returns Promise<Skill> - Created skill with id, createdAt, updatedAt
     */
    createSkill: async (skill: CreateSkill): Promise<Skill> => {
        console.log('Creating skill:', skill);
        return makeRequest<Skill>('/skills', {
            method: 'POST',
            body: JSON.stringify(skill),
        });
    },

    /**
     * Update an existing skill
     * @param id - ID of the skill to update
     * @param skill - Update data (optional fields)
     * @returns Promise<Skill> - Updated skill
     */
    updateSkill: async (id: string, skill: UpdateSkill): Promise<Skill> => {
        console.log('Updating skill:', { id, skill });
        return makeRequest<Skill>(`/skills/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(skill),
        });
    },

    /**
     * Delete a skill
     * @param id - ID of the skill to delete
     * @returns Promise<void>
     */
    deleteSkill: async (id: string): Promise<void> => {
        await makeRequest<void>(`/skills/${id}`, {
            method: 'DELETE',
        });
    },
};

export default skillService;