import type { CreateContact } from './contact.type';
import type { CreateDegree } from './degree.type';
import type { CreateExperience } from './experience.type';
import type { CreateSkill } from './skill.type';

export type { Experience, CreateExperience } from './experience.type';
export type { Degree, CreateDegree } from './degree.type';
export type { Skill, CreateSkill, SkillTheme, SkillLevels } from './skill.type';
export type { Contact, CreateContact } from './contact.type';
export type { Address } from './contact.type';

export type UpdateExperience = Partial<CreateExperience>;
export type UpdateDegree = Partial<CreateDegree>;
export type UpdateSkill = Partial<CreateSkill>;
export type UpdateContact = Partial<CreateContact>;