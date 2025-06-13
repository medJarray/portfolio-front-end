const API_URL = 'http://localhost:3000/api';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

interface Degree {
  id: number;
  title: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const api = {
  // Experiences
  getExperiences: async (): Promise<Experience[]> => {
    const response = await fetch(`${API_URL}/experiences`);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return response.json();
  },

  createExperience: async (experience: Partial<Experience>): Promise<Experience> => {
    const response = await fetch(`${API_URL}/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experience),
    });
    if (!response.ok) throw new Error('Failed to create experience');
    return response.json();
  },

  updateExperience: async (id: number, experience: Partial<Experience>): Promise<Experience> => {
    const response = await fetch(`${API_URL}/experiences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experience),
    });
    if (!response.ok) throw new Error('Failed to update experience');
    return response.json();
  },

  deleteExperience: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/experiences/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete experience');
  },

  // Degrees
  getDegrees: async (): Promise<Degree[]> => {
    const response = await fetch(`${API_URL}/degrees`);
    if (!response.ok) throw new Error('Failed to fetch degrees');
    return response.json();
  },

  createDegree: async (degree: Partial<Degree>): Promise<Degree> => {
    const response = await fetch(`${API_URL}/degrees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(degree),
    });
    if (!response.ok) throw new Error('Failed to create degree');
    return response.json();
  },

  updateDegree: async (id: number, degree: Partial<Degree>): Promise<Degree> => {
    const response = await fetch(`${API_URL}/degrees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(degree),
    });
    if (!response.ok) throw new Error('Failed to update degree');
    return response.json();
  },

  deleteDegree: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/degrees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete degree');
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    const response = await fetch(`${API_URL}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
  },

  createSkill: async (skill: Partial<Skill>): Promise<Skill> => {
    const response = await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return response.json();
  },

  updateSkill: async (id: number, skill: Partial<Skill>): Promise<Skill> => {
    const response = await fetch(`${API_URL}/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
    if (!response.ok) throw new Error('Failed to update skill');
    return response.json();
  },

  deleteSkill: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/skills/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete skill');
  },

  // Contact Messages
  getContacts: async (): Promise<Contact[]> => {
    const response = await fetch(`${API_URL}/contacts`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  deleteContact: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
  },
}; 