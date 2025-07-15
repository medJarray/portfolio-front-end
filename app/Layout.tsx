import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, Bars3Icon, XMarkIcon, CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon, ServerIcon, BriefcaseIcon, AcademicCapIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Mail, Download, Code2, Database, Settings, Briefcase, GraduationCap, Wrench, Users, Lightbulb, GitBranch, Dock, Cloud, Link2, BookOpen, MessageCircle, UserCheck, ListChecks, Send, Github, Linkedin } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';
import Particles from 'react-tsparticles';
import * as tsparticlesEngine from '@tsparticles/engine';
import { LinkedinLogo, WhatsappLogo, EnvelopeSimple } from 'phosphor-react';
import { Brain } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

const sections = [
  { id: 'home', name: 'Home' },
  { id: 'experience', name: 'Experience' },
  { id: 'skills', name: 'Skills & Expertise' },
  { id: 'connect', name: "Let's Connect" },
];

const experiences = [
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

const skills = [
  {
    category: 'Frontend Development',
    items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux'],
    icon: CodeBracketIcon,
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'],
    icon: ServerIcon,
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux'],
    icon: CommandLineIcon,
  },
  {
    category: 'Mobile Development',
    items: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    icon: DevicePhoneMobileIcon,
  },
];

const projects = [
  {
    title: 'Project 1',
    description: 'A full-stack web application built with React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: 'https://via.placeholder.com/400x300',
  },
  {
    title: 'Project 2',
    description: 'A mobile app for task management',
    technologies: ['React Native', 'Firebase'],
    image: 'https://via.placeholder.com/400x300',
  },
  {
    title: 'Project 3',
    description: 'An e-commerce platform with real-time features',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: 'https://via.placeholder.com/400x300',
  },
];

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

const skillThemes = [
  {
    title: 'Frontend Development',
    icon: <Code2 className="h-6 w-6 text-indigo-400" />,
    skills: [
      { name: 'React', icon: <Link2 className="h-4 w-4 text-sky-400" />, desc: 'Component architecture, hooks, state management' },
      { name: 'Angular', icon: <Link2 className="h-4 w-4 text-rose-400" />, desc: 'Component architecture, modules, Reactive programing' },
      { name: 'TypeScript', icon: <Link2 className="h-4 w-4 text-blue-400" />, desc: 'Type safety, interfaces, generics' },
      { name: 'Tailwind CSS', icon: <Link2 className="h-4 w-4 text-cyan-400" />, desc: 'Responsive design, custom themes' },
      { name: 'HTML/CSS', icon: <Link2 className="h-4 w-4 text-orange-400" />, desc: 'Semantic markup, animations, Grid/Flexbox' },
    ]
  },
  {
    title: 'Backend Development',
    icon: <Database className="h-6 w-6 text-blue-500" />,
    skills: [
      { name: 'Node.js', icon: <Link2 className="h-4 w-4 text-green-500" />, desc: 'REST APIs, middleware, authentication' },
      { name: 'NestJS', icon: <Link2 className="h-4 w-4 text-rose-500" />, desc: 'Microservices, Cronjobs, GraphQL API, REST API' },
      { name: 'Spring boot', icon: <Link2 className="h-4 w-4 text-emerald-400" />, desc: 'Microservices, Spring batch, REST API' },
      { name: 'PostgreSQL', icon: <Link2 className="h-4 w-4 text-blue-400" />, desc: 'SQL, indexing' },
      { name: 'MongoDB', icon: <Link2 className="h-4 w-4 text-green-400" />, desc: 'Schema design, aggregation, indexing' },
      { name: 'API Design', icon: <Link2 className="h-4 w-4 text-rose-400" />, desc: 'RESTful principles, documentation' },
    ]
  },
  {
    title: 'Tools & DevOps',
    icon: <Wrench className="h-6 w-6 text-indigo-500" />,
    skills: [
      { name: 'Git', icon: <GitBranch className="h-4 w-4 text-rose-400" />, desc: 'Version control, branching strategies' },
      { name: 'Docker', icon: <Dock className="h-4 w-4 text-sky-400" />, desc: 'Containerization, multi-stage builds' },
      { name: 'K8S', icon: <Cloud className="h-4 w-4 text-blue-400" />, desc: 'Deployments, Services, Pods, ConfigMaps, Secrets' },
      { name: 'AWS', icon: <Cloud className="h-4 w-4 text-orange-400" />, desc: 'EC2, S3, Lambda, CloudFront' },
      { name: 'CI/CD', icon: <Link2 className="h-4 w-4 text-green-400" />, desc: 'Automated testing, deployment' },
    ]
  },
  {
    title: 'Soft Skills',
    icon: <Brain className="h-6 w-6 text-indigo-400" />,
    skills: [
      { name: 'Problem Solving', icon: <Lightbulb className="h-4 w-4 text-violet-400" />, desc: 'Analytical thinking, debugging' },
      { name: 'Team Collaboration', icon: <UserCheck className="h-4 w-4 text-pink-400" />, desc: 'Code reviews, mentoring' },
      { name: 'Communication', icon: <MessageCircle className="h-4 w-4 text-blue-400" />, desc: 'Technical documentation, client interaction' },
      { name: 'Project Management', icon: <ListChecks className="h-4 w-4 text-orange-400" />, desc: 'Agile methodologies, estimation' },
    ]
  },
];

export function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Si nous sommes sur une route admin, on laisse le AdminLayout gérer l'affichage
  if (location.pathname.startsWith('/admin')) {
    return <Outlet />;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let newActiveSection = activeSection;
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            newActiveSection = section.id;
          }
        }
      });

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    let scrollTimeout: number;
    const throttledScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => scrollToSection('home')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
              >
                Mohamed Jarray
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: sections.indexOf(section) * 0.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="underline"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
              <motion.a
                href="/admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: sections.length * 0.05 }}
                className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Admin
              </motion.a>
            </nav>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    {section.name}
                  </button>
                ))}
                <a
                  href="/admin"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                >
                  Admin
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="w-full py-6 bg-gray-50 border-t border-gray-100 text-center text-gray-500 font-medium text-sm">
        © 2024 Mohamed Jarray. All rights reserved.
      </footer>
    </div>
  );
} 