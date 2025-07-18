export interface Degree {
    id: string;
    title: string;
    institution: string;
    description?: string;
    location: string;
    startDate: string;
    endDate?: string;
    degree: string;
    fieldOfStudy: string;
    grade?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDegree {
  title: string;
  institution: string;
  description?: string;
  location: string;
  startDate: string;
  endDate?: string;
  degree: string;
  fieldOfStudy: string;
  grade?: string;
}