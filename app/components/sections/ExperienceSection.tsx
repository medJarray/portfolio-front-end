import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircle, Terminal } from 'lucide-react';
import type { Experience } from '~/types/experience.type';
import LoadingSpinner from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ErrorBoundary } from './ErrorBoundary';

interface ExperienceSectionProps {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

const formatMonth = (date: Date): string => {
  const month = date.toLocaleDateString('fr-FR', { month: 'long' });
  if (month === 'juin') return 'Juin';
  if (month === 'juillet') return 'Juil';
  return month.charAt(0).toUpperCase() + month.slice(1, 3);
};

const formatDate = (date: Date): string => {
  return `${formatMonth(date)} ${date.getFullYear()}`;
};

const mockExperiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading the development of enterprise-level applications using React, Node.js, and cloud technologies.',
    icon: BriefcaseIcon,
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Agency',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple web applications for clients across various industries.',
    icon: BriefcaseIcon,
  },
  {
    title: 'Software Engineering Degree',
    company: 'University Name',
    period: '2016 - 2020',
    description: 'Bachelor of Science in Software Engineering with focus on web technologies and cloud computing.',
    icon: AcademicCapIcon,
  },
];


export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, loading, error }) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('experience.title')}</h2>
            <p className="text-xl text-gray-600">{t('experience.description')}</p>
          </div>

          <div className="relative border-l-2 border-indigo-200 ml-6">
            {mockExperiences.map((exp, idx) => (
              <motion.div
                key={exp.title + '-' + exp.company + '-' + idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 ml-8 flex items-start relative"
              >
                <span className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-400 bg-white text-indigo-500 shadow-lg ml-[-3%]">
                  <exp.icon className="h-6 w-6" />
                </span>
                <div className="bg-white rounded-xl shadow p-6 border border-indigo-50 w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{exp.title}</h3>
                  <div className="text-indigo-500 font-medium capitalize">{exp.company}</div>
                  <div className="text-gray-400 text-sm mb-2">
                    {exp.period}
                  </div>
                  <div className="text-gray-600">{exp.description}</div>
                </div>
              </motion.div>
            ))}

            {!loading && !error && experiences.map((exp, idx) => (
              <motion.div
                key={(exp.id || exp.title || 'exp') + '-' + idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 ml-8 flex items-start relative"
              >
                <span className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-400 bg-white text-indigo-500 shadow-lg ml-[-3%]">
                  <BriefcaseIcon className="h-6 w-6" />
                </span>
                <div className="bg-white rounded-xl shadow p-6 border border-indigo-50 w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{exp.title}</h3>
                  <div className="text-indigo-500 font-medium capitalize">{exp.company}</div>
                  <div className="text-gray-400 text-sm mb-2">
                    {formatDate(new Date(exp.startDate))} -{' '}
                    {exp.endDate ? formatDate(new Date(exp.endDate)) : 'Présent'}
                  </div>
                  <div className="text-gray-600 mb-4 font-mono">
                    {exp.description.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                      <div key={line + '-' + index} className="flex items-start gap-3 mb-2.5">
                        <span className="text-indigo-500 mt-1">
                          <ArrowRightCircle className="w-4 h-4" />
                        </span>
                        <span className="text-[14px] font-normal tracking-wide text-gray-700 leading-relaxed">{line}</span>
                      </div>
                    ))}
                  </div>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-amber-500">
                          <Terminal className="w-5 h-5" />
                        </span>
                        <span className="font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Stack Technique</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIdx) => (
                          <span
                            key={tech + '-' + techIdx}
                            className="inline-flex items-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-100 hover:border-indigo-200 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {loading && <LoadingSpinner message="Chargement des expériences..." />}
          {error && <ErrorMessage message={error} />}
        </div>
      </section>
    </ErrorBoundary>
  );
};