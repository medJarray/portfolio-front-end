import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AcademicCapIcon, BriefcaseIcon, CodeBracketIcon, CommandLineIcon, ServerIcon } from '@heroicons/react/24/outline';
import { Brain, Code2, Database, GitBranch, Cloud, Server, Settings, Terminal, Lightbulb, Users, MessageCircle, ListChecks, Link2, Palette, Ship, Star } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';
import Particles from 'react-tsparticles';
import type { Skill } from '~/types/skill.type';
import LoadingSpinner from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface SkillsSectionProps {
  skills: Skill[];
  loading: boolean;
  error: string | null;
  language?: string;
}

const skillThemes = [
  {
    title: 'Frontend Development',
    icon: <CodeBracketIcon className="h-6 w-6 text-indigo-400" />,
    skills: [
      { name: 'React', desc: 'UI Development', icon: <Code2 className="h-5 w-5 text-blue-400" /> },
      { name: 'Next.js', desc: 'Full Stack Framework', icon: <Link2 className="h-5 w-5 text-black" /> },
      { name: 'TypeScript', desc: 'Type Safety', icon: <Code2 className="h-5 w-5 text-blue-600" /> },
      { name: 'TailwindCSS', desc: 'Styling', icon: <Palette className="h-5 w-5 text-cyan-400" /> },
      { name: 'Redux', desc: 'State Management', icon: <Database className="h-5 w-5 text-purple-400" /> },
    ],
  },
  {
    title: 'Backend Development',
    icon: <ServerIcon className="h-6 w-6 text-indigo-400" />,
    skills: [
      { name: 'Node.js', desc: 'Runtime Environment', icon: <Code2 className="h-5 w-5 text-green-500" /> },
      { name: 'Express', desc: 'Web Framework', icon: <Server className="h-5 w-5 text-gray-400" /> },
      { name: 'Python', desc: 'Programming Language', icon: <Code2 className="h-5 w-5 text-yellow-500" /> },
      { name: 'PostgreSQL', desc: 'Database', icon: <Database className="h-5 w-5 text-blue-400" /> },
      { name: 'MongoDB', desc: 'NoSQL Database', icon: <Database className="h-5 w-5 text-green-400" /> },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: <CommandLineIcon className="h-6 w-6 text-indigo-400" />,
    skills: [
      { name: 'Docker', desc: 'Containerization', icon: <Ship className="h-5 w-5 text-blue-500" /> },
      { name: 'AWS', desc: 'Cloud Platform', icon: <Cloud className="h-5 w-5 text-orange-400" /> },
      { name: 'Git', desc: 'Version Control', icon: <GitBranch className="h-5 w-5 text-orange-500" /> },
      { name: 'CI/CD', desc: 'Automation', icon: <Settings className="h-5 w-5 text-indigo-400" /> },
      { name: 'Linux', desc: 'Operating System', icon: <Terminal className="h-5 w-5 text-gray-400" /> },
    ],
  },
  {
    title: 'Soft Skills',
    icon: <Brain className="h-6 w-6 text-indigo-400" />,
    skills: [
      { name: 'Problem Solving', desc: 'Analytical thinking, debugging', icon: <Lightbulb className="h-5 w-5 text-yellow-400" /> },
      { name: 'Team Collaboration', desc: 'Code reviews, mentoring', icon: <Users className="h-5 w-5 text-blue-400" /> },
      { name: 'Communication', desc: 'Technical documentation, client interaction', icon: <MessageCircle className="h-5 w-5 text-green-400" /> },
      { name: 'Project Management', desc: 'Agile methodologies, estimation', icon: <ListChecks className="h-5 w-5 text-purple-400" /> },
      { name: 'Adaptability', desc: 'Quick learning, embracing change', icon: <Cloud className="h-5 w-5 text-indigo-400" /> },
    ],
  },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  skills, 
  loading, 
  error, 
  language = 'fr' 
}) => {
  const { t } = useTranslation();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code2 className="h-5 w-5 text-blue-400" />;
      case 'backend':
        return <Server className="h-5 w-5 text-green-400" />;
      case 'tools & devops':
        return <Settings className="h-5 w-5 text-orange-400" />;
      case 'soft skills':
        return <Brain className="h-5 w-5 text-purple-400" />;
      default:
        return <Code2 className="h-5 w-5 text-indigo-400" />;
    }
  };

  const getThemeForCategory = (category: string) => {
    return skillThemes.find(theme => 
      theme.title.toLowerCase().includes(category.toLowerCase())
    ) || skillThemes[0];
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const theme = getThemeForCategory(skill.category);
    if (!acc[theme.title]) {
      acc[theme.title] = [];
    }
    acc[theme.title].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getSkillLevelLabel = (level: number): string => {
    const labels: Record<string, Record<number, string>> = {
      fr: { 1: 'Débutant', 2: 'Intermédiaire', 3: 'Avancé' },
      en: { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' },
      ar: { 1: 'مبتدئ', 2: 'متوسط', 3: 'متقدم' }
    };
    return labels[language]?.[level] || labels['fr'][1];
  };

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          id="tsparticles-skills"
          options={{
            fullScreen: false,
            background: { color: 'transparent' },
            fpsLimit: 60,
            particles: {
              number: { value: 40, density: { enable: true, value_area: 800 } },
              color: { value: ['#6366f1', '#0ea5e9', '#f472b6', '#a7f3d0'] },
              shape: { type: 'circle' },
              opacity: { value: 0.15 },
              size: { value: 3, random: true },
              move: { enable: true, speed: 1, direction: 'none', outModes: 'out' },
              links: { enable: true, color: '#a5b4fc', opacity: 0.1, width: 1 },
            },
            detectRetina: true,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('skills.title')}</h2>
          <p className="text-xl text-gray-600">{t('skills.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillThemes.map((theme, idx) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <ParallaxTilt
                glareEnable={true}
                glareMaxOpacity={0.15}
                scale={1.04}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                className="rounded-2xl"
                glarePosition="all"
                glareBorderRadius="1rem"
                glareColor="rgba(255, 255, 255, 0.1)"
              >
                <div className="relative bg-white/60 backdrop-blur-xl border-2 border-transparent rounded-2xl shadow-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl hover:bg-white/80 group animated-gradient-border">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center h-12 w-12 border-2 border-indigo-200 rounded-full bg-white/50 backdrop-blur-sm">
                      {theme.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">{theme.title}</h3>
                  </div>
                  <ul className="space-y-2 mt-2">
                    {theme.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-start gap-3 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-indigo-50/60 hover:scale-[1.03] group"
                      >
                        <span className="mt-1 group-hover:animate-bounce-slow">{skill.icon}</span>
                        <div>
                          <span className="font-medium text-gray-800">{skill.name}</span>
                          <span className="block text-gray-500 text-sm">{skill.desc}</span>
                        </div>
                      </li>
                    ))}
                    {groupedSkills[theme.title]?.map((skill) => (
                      <li
                        key={skill.id}
                        className="flex items-start gap-3 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-indigo-50/60 hover:scale-[1.03] group"
                      >
                        <span className="mt-1 group-hover:animate-bounce-slow">{getCategoryIcon(skill.category)}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{skill.name}</span>
                            <div className="flex gap-1 relative group/level">
                              {[1, 2, 3].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= skill.level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                              <div className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/level:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                {getSkillLevelLabel(skill.level)}
                              </div>
                            </div>
                          </div>
                          <span className="block text-gray-500 text-sm">{skill.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent animated-gradient-border z-10" />
                </div>
              </ParallaxTilt>
            </motion.div>
          ))}
        </div>

        <style>{`
          .animated-gradient-border {
            border-image: linear-gradient(120deg, #a5b4fc 0%, #f9a8d4 50%, #a7f3d0 100%) 1;
            transition: border 0.4s;
          }
          .group:hover .animated-gradient-border {
            border-width: 2.5px;
            border-image: linear-gradient(90deg, #6366f1, #0ea5e9, #f472b6, #a7f3d0) 1;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 0.8s ease-in-out infinite;
          }
        `}</style>

        {loading && <LoadingSpinner message={t('skills.loading')} />}
        {error && <ErrorMessage message={t('skills.error')} />}
      </div>
    </section>
  );
};