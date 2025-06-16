import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    
    switch (error.response?.status) {
      case 401:
        toast.error('Session expirée. Veuillez vous reconnecter.');
        // Redirect to login or refresh token
        break;
      case 403:
        toast.error('Accès non autorisé');
        break;
      case 404:
        toast.error('Ressource non trouvée');
        break;
      case 500:
        toast.error('Erreur serveur');
        break;
      default:
        toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export interface Experience {
  id?: number;
  title: string;
  company: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  technologies?: string[];
}

export const experienceApi = {
  getAll: (): Promise<AxiosResponse<Experience[]>> => {
    return apiClient.get('/experiences');
  },

  getById: (id: number): Promise<AxiosResponse<Experience>> => {
    return apiClient.get(`/experiences/${id}`);
  },

  create: (data: Omit<Experience, 'id'>): Promise<AxiosResponse<Experience>> => {
    return apiClient.post('/experiences', data);
  },

  update: (id: number, data: Partial<Experience>): Promise<AxiosResponse<Experience>> => {
    return apiClient.patch(`/experiences/${id}`, data);
  },

  delete: (id: number): Promise<AxiosResponse<void>> => {
    return apiClient.delete(`/experiences/${id}`);
  },
};

export default apiClient;
