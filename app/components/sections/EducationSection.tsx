import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import type { Degree } from '~/types/degree.type';
import LoadingSpinner from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface EducationSectionProps {
  dynamicDegrees: Degree[];
  loading: boolean;
  error: string | null;
}

const degrees = [
  {
    title: 'Master of Science in Computer Science',
    school: 'University of Technology',
    period: '2020 - 2022',
    description: 'Specialized in Artificial Intelligence and Cloud Computing.'
  },
  {
    title: 'Bachelor of Software Engineering',
    school: 'Engineering School',
    period: '2016 - 2020',
    description: 'Major in Web Technologies and Distributed Systems.'
  }
];

export const EducationSection: React.FC<EducationSectionProps> = ({ 
  dynamicDegrees, 
  loading, 
  error 
}) => {
  const { t } = useTranslation();

  return (
    <section id="degrees" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('education.title')}</h2>
          <p className="text-xl text-gray-600">{t('education.description')}</p>
        </div>

        <div className="relative border-l-2 border-pink-200 ml-6">
          {degrees.map((deg, idx) => (
            <motion.div
              key={deg.title + '-' + deg.school + '-' + idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 ml-8 flex items-start relative"
            >
              <span className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-pink-400 bg-white text-pink-500 shadow-lg ml-[-3%]">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div className="bg-white rounded-xl shadow p-6 border border-pink-50 w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{deg.title}</h3>
                <div className="text-pink-500 font-medium">{deg.school}</div>
                <div className="text-gray-400 text-sm mb-2">{deg.period}</div>
                <div className="text-gray-600">{deg.description}</div>
              </div>
            </motion.div>
          ))}

          {!loading && !error && dynamicDegrees.map((deg, idx) => (
            <motion.div
              key={(deg.id || deg.degree || 'deg') + '-' + idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 ml-8 flex items-start relative"
            >
              <span className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-pink-400 bg-white text-pink-500 shadow-lg ml-[-3%]">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div className="bg-white rounded-xl shadow p-6 border border-pink-50 w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{deg.degree}</h3>
                <div className="text-pink-500 font-medium">{deg.institution}</div>
                <div className="text-gray-400 text-sm mb-2">
                  {new Date(deg.startDate).getFullYear()} -{' '}
                  {deg.endDate ? new Date(deg.endDate).getFullYear() : 'Présent'}
                </div>
                <div className="text-gray-600">{deg.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {loading && <LoadingSpinner message="Chargement des diplômes..." />}
        {error && <ErrorMessage message={error} />}
      </div>
    </section>
  );
};