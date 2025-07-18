import type { Address, Contact, Degree, Experience, Skill } from "~/types";

const API_URL = 'http://localhost:3000/api';

type CreateExperience = Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateExperience = Partial<CreateExperience>;

type CreateDegree = Omit<Degree, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateDegree = Partial<CreateDegree>;

type CreateSkill = Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateSkill = Partial<CreateSkill>;

type CreateContact = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateContact = Partial<CreateContact>;

// ====== UTILITAIRES ======

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
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

async function makeRequest<T>(
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
    console.log({response});
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or server unavailable', 0);
  }
}

// ====== API PRINCIPAL ======

export const api = {
  // ================== EXPERIENCES ==================
  
  getExperiences: async (): Promise<Experience[]> => {
    return makeRequest<Experience[]>('/experiences');
  },

  getExperience: async (id: string): Promise<Experience> => {
    return makeRequest<Experience>(`/experiences/${id}`);
  },

  createExperience: async (experience: CreateExperience): Promise<Experience> => {
    console.log({ experience });
    return makeRequest<Experience>('/experiences', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
  },

  updateExperience: async (id: string, experience: UpdateExperience): Promise<Experience> => {
    return makeRequest<Experience>(`/experiences/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(experience),
    });
  },

  deleteExperience: async (id: string): Promise<void> => {
    await makeRequest<void>(`/experiences/${id}`, {
      method: 'DELETE',
    });
  },

  // ================== DEGREES ==================

  getDegrees: async (): Promise<Degree[]> => {
    return makeRequest<Degree[]>('/degrees');
  },

  getDegree: async (id: string): Promise<Degree> => {
    return makeRequest<Degree>(`/degrees/${id}`);
  },

  createDegree: async (degree: CreateDegree): Promise<Degree> => {
    return makeRequest<Degree>('/degrees', {
      method: 'POST',
      body: JSON.stringify(degree),
    });
  },

  updateDegree: async (id: string, degree: UpdateDegree): Promise<Degree> => {
    return makeRequest<Degree>(`/degrees/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(degree),
    });
  },

  deleteDegree: async (id: string): Promise<void> => {
    await makeRequest<void>(`/degrees/${id}`, {
      method: 'DELETE',
    });
  },

  // ================== SKILLS ==================

  getSkills: async (): Promise<Skill[]> => {
    return makeRequest<Skill[]>('/skills');
  },

  getSkill: async (id: string): Promise<Skill> => {
    return makeRequest<Skill>(`/skills/${id}`);
  },

  getSkillsByCategory: async (category: string): Promise<Skill[]> => {
    return makeRequest<Skill[]>(`/skills?category=${encodeURIComponent(category)}`);
  },

  createSkill: async (skill: CreateSkill): Promise<Skill> => {
    console.log('Creating skill:', skill);
    return makeRequest<Skill>('/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  },

  updateSkill: async (id: string, skill: UpdateSkill): Promise<Skill> => {
    console.log('Updating skill:', { id, skill });
    return makeRequest<Skill>(`/skills/${id}`, {
      method: 'PATCH', // ✅ PATCH pour correspondre au backend
      body: JSON.stringify(skill),
    });
  },

  deleteSkill: async (id: string): Promise<void> => {
    await makeRequest<void>(`/skills/${id}`, {
      method: 'DELETE',
    });
  },

  // ================== CONTACTS ==================

  getContacts: async (): Promise<Contact[]> => {
    return makeRequest<Contact[]>('/contact'); // ✅ /contact selon votre controller
  },

  getContact: async (id: string): Promise<Contact> => {
    return makeRequest<Contact>(`/contact/${id}`);
  },

  createContact: async (contact: CreateContact): Promise<Contact> => {
    return makeRequest<Contact>('/contact', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  },

  updateContact: async (id: string, contact: UpdateContact): Promise<Contact> => {
    return makeRequest<Contact>(`/contact/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(contact),
    });
  },

  deleteContact: async (id: string): Promise<void> => {
    await makeRequest<void>(`/contact/${id}`, {
      method: 'DELETE',
    });
  },
};

// ====== EXPORTS INDIVIDUELS (optionnel) ======

export const experienceApi = {
  getAll: api.getExperiences,
  getById: api.getExperience,
  create: api.createExperience,
  update: api.updateExperience,
  delete: api.deleteExperience,
};

export const degreeApi = {
  getAll: api.getDegrees,
  getById: api.getDegree,
  create: api.createDegree,
  update: api.updateDegree,
  delete: api.deleteDegree,
};

export const skillApi = {
  getAll: api.getSkills,
  getById: api.getSkill,
  getByCategory: api.getSkillsByCategory,
  create: api.createSkill,
  update: api.updateSkill,
  delete: api.deleteSkill,
};

export const contactApi = {
  getAll: api.getContacts,
  getById: api.getContact,
  create: api.createContact,
  update: api.updateContact,
  delete: api.deleteContact,
};

// ====== EXPORTS DES TYPES ======

export type {
  Experience,
  Degree,
  Skill,
  Contact,
  Address,
  CreateExperience,
  UpdateExperience,
  CreateDegree,
  UpdateDegree,
  CreateSkill,
  UpdateSkill,
  CreateContact,
  UpdateContact,
};

export { ApiError };