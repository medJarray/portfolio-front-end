// ====== EXPORTS DES SERVICES ======

import contactService from './contact.service';
import degreeService from './degree.service';
import experienceService from './experience.service';
import skillService from './skill.service';

// ====== EXPORT DES UTILITAIRES ======
export { ApiError, API_URL, makeRequest, handleResponse } from '../utils/index';

// ====== PRINCIPAL API ======

export const api = {
    // ================== EXPERIENCES ==================
    getExperiences: experienceService.getExperiences,
    getExperience: experienceService.getExperience,
    createExperience: experienceService.createExperience,
    updateExperience: experienceService.updateExperience,
    deleteExperience: experienceService.deleteExperience,

    // ================== DEGREES ==================
    getDegrees: degreeService.getDegrees,
    getDegree: degreeService.getDegree,
    createDegree: degreeService.createDegree,
    updateDegree: degreeService.updateDegree,
    deleteDegree: degreeService.deleteDegree,

    // ================== SKILLS ==================
    getSkills: skillService.getSkills,
    getSkill: skillService.getSkill,
    getSkillsByCategory: skillService.getSkillsByCategory,
    createSkill: skillService.createSkill,
    updateSkill: skillService.updateSkill,
    deleteSkill: skillService.deleteSkill,

    // ================== CONTACTS ==================
    getContacts: contactService.getContacts,
    getContact: contactService.getContact,
    createContact: contactService.createContact,
    updateContact: contactService.updateContact,
    deleteContact: contactService.deleteContact,
};