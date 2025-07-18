import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Experience } from '~/types/experience.type';
import type { Skill } from '~/types/skill.type';
import type { Degree } from '~/types/degree.type';
import { translateDegree, translateExperience } from '~/services/translation';

export const usePortfolioData = () => {
  const { i18n } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [dynamicDegrees, setDynamicDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiencesRes, skillsRes, degreesRes] = await Promise.all([
          fetch('http://localhost:3000/api/experiences'),
          fetch('http://localhost:3000/api/skills'),
          fetch('http://localhost:3000/api/degrees')
        ]);

        if (!experiencesRes.ok || !skillsRes.ok || !degreesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [experiencesData, skillsData, degreesData] = await Promise.all([
          experiencesRes.json(),
          skillsRes.json(),
          degreesRes.json()
        ]);

        const translatedExperiences = await Promise.all(
          experiencesData.map((exp: any) => translateExperience(exp, i18n.language))
        );

        const translatedDegrees = await Promise.all(
          degreesData.map((deg: any) => translateDegree(deg, i18n.language))
        );

        setExperiences(translatedExperiences);
        setSkills(skillsData);
        setDynamicDegrees(translatedDegrees);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  return { experiences, skills, dynamicDegrees, loading, error };
};