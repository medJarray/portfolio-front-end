import { AcademicCapIcon, BriefcaseIcon, CodeBracketIcon, CommandLineIcon, ServerIcon } from '@heroicons/react/24/outline';
import { Brain, Code2, Database, Settings, GitBranch, Cloud, Lightbulb, Users, MessageCircle, ListChecks, Terminal, Ship, Palette, Link2, Server } from 'lucide-react';

export const mockExperiences = [
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

export const mockDegrees = [
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

export const skillThemes = [
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
