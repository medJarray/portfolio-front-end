export interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
    description?: string;
    icon?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSkill {
  name: string;
  level: number;
  category: string;
  description?: string;
  icon?: string;
}

export interface SkillTheme {
  title: string;
  icon: React.ReactNode;
  skills: Array<{
    name: string;
    desc: string;
    icon: React.ReactNode;
  }>;
}

export interface SkillLevels {
  [key: string]: {
    [key: number]: string;
  };
}