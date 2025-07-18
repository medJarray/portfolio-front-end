export interface Experience {
    id: string;
    title: string;
    company: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    technologies: string[];
    isCurrent?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExperience {
    title: string;
    company: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    technologies: string[];
    isCurrent?: boolean;
}