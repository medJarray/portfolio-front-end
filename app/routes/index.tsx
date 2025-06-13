import { motion } from 'framer-motion';
import { ArrowDownIcon, CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon, ServerIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { Mail, Download, Code2, Database, Settings, Briefcase, GraduationCap, Wrench, Users, Lightbulb, GitBranch, Ship, Cloud, Link2, BookOpen, MessageCircle, UserCheck, ListChecks, Send, Github, Linkedin } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';
import Particles from 'react-tsparticles';
import * as tsparticlesEngine from '@tsparticles/engine';
import { LinkedinLogo, WhatsappLogo, EnvelopeSimple } from 'phosphor-react';
import { Brain } from 'lucide-react';

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
      { name: 'Docker', icon: <Ship className="h-4 w-4 text-sky-400" />, desc: 'Containerization, multi-stage builds' },
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

export default function Home() {
  return (
    <>
      {/* About Me Section (Hero) */}
      <section id="home" className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        {/* Softer, elegant gradient background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#e0e7ff] via-[#f0fdfa] to-[#fdf2fa]" />
        {/* Decorative SVG Blobs (subtle) */}
        <svg className="absolute left-[-100px] top-[-80px] w-[350px] h-[350px] opacity-20 z-10" viewBox="0 0 400 400" fill="none"><circle cx="200" cy="200" r="200" fill="url(#blob1)"/></svg>
        <svg className="absolute right-[-120px] bottom-[-100px] w-[300px] h-[300px] opacity-10 z-10" viewBox="0 0 400 400" fill="none"><circle cx="200" cy="200" r="200" fill="url(#blob2)"/></svg>
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 px-4 py-24 relative z-20">
          {/* Left: Text & Skills */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center md:text-left tracking-tight text-gray-900 font-sans">
              Mohamed Jarray
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-500">Software Developer</h2>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
            <p className="text-lg md:text-xl mb-8 text-center md:text-left max-w-2xl text-gray-700 font-medium">
              Passionate software developer with a strong foundation in web development and a knack for creating innovative solutions. Skilled in modern technologies and frameworks, with a focus on delivering high-quality, maintainable code.
            </p>
            {/* Skills Cards with Lucide icons and glassmorphism */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center md:justify-start">
              <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-2xl p-5 min-w-[200px] shadow-lg hover:scale-105 hover:border-indigo-400 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2 text-indigo-500 font-bold text-lg">
                  <Code2 className="h-6 w-6" strokeWidth={2.2} /> Frontend
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 rounded-full px-3 py-1 text-sm text-indigo-700 font-semibold shadow hover:bg-indigo-200 transition">React</span>
                  <span className="bg-indigo-100 rounded-full px-3 py-1 text-sm text-indigo-700 font-semibold shadow hover:bg-indigo-200 transition">Angular</span>
                  <span className="bg-indigo-100 rounded-full px-3 py-1 text-sm text-indigo-700 font-semibold shadow hover:bg-indigo-200 transition">TS</span>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-2xl p-5 min-w-[200px] shadow-lg hover:scale-105 hover:border-teal-400 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2 text-teal-500 font-bold text-lg">
                  <Database className="h-6 w-6" strokeWidth={2.2} /> Backend
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-100 rounded-full px-3 py-1 text-sm text-teal-700 font-semibold shadow hover:bg-teal-200 transition">NestJS</span>
                  <span className="bg-teal-100 rounded-full px-3 py-1 text-sm text-teal-700 font-semibold shadow hover:bg-teal-200 transition">Spring</span>
                  <span className="bg-teal-100 rounded-full px-3 py-1 text-sm text-teal-700 font-semibold shadow hover:bg-teal-200 transition">PostgreSQL</span>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-2xl p-5 min-w-[200px] shadow-lg hover:scale-105 hover:border-pink-400 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2 text-pink-500 font-bold text-lg">
                  <Settings className="h-6 w-6" strokeWidth={2.2} /> Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-pink-100 rounded-full px-3 py-1 text-sm text-pink-700 font-semibold shadow hover:bg-pink-200 transition">K8S</span>
                  <span className="bg-pink-100 rounded-full px-3 py-1 text-sm text-pink-700 font-semibold shadow hover:bg-pink-200 transition">Docker</span>
                  <span className="bg-pink-100 rounded-full px-3 py-1 text-sm text-pink-700 font-semibold shadow hover:bg-pink-200 transition">AWS</span>
                </div>
              </div>
            </div>
            {/* Action Buttons with Lucide icons and modern style */}
            <div className="flex gap-4 mt-2">
              <motion.a 
                href="#connect" 
                className="group flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-5 w-5" />
                Get in Touch
              </motion.a>
              <motion.a 
                href="/cv.pdf" 
                download 
                className="group flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5" />
                Download CV
              </motion.a>
            </div>
          </div>
          {/* Right: Profile Photo with Glow */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-indigo-400 blur-2xl opacity-30 group-hover:opacity-60 transition" />
              <img
                src="/profile.jpg"
                alt="Mohamed Jarray"
                className="w-56 h-56 rounded-full object-cover border-4 border-white shadow-2xl bg-white/30 z-10 relative"
                style={{ filter: 'blur(0px)' }}
              />
              <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
            </div>
          </div>
        </div>
        {/* SVG Gradients for blobs */}
        <svg width="0" height="0">
          <defs>
            <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#f0fdfa" />
            </radialGradient>
            <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </radialGradient>
          </defs>
        </svg>
      </section>

      {/* Experience Section - Timeline */}
      <section id="experience" className="py-20 bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              My professional journey and achievements
            </p>
          </motion.div>
          {/* Timeline */}
          <div className="relative border-l-2 border-indigo-200 ml-6">
            {experiences.map((exp, idx) => (
              <div key={exp.title + idx} className="mb-12 ml-8 flex items-start relative">
                <span className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-400 bg-white text-indigo-500 shadow-lg ml-[-3%]">
                  <BriefcaseIcon className="h-6 w-6" />
                </span>
                <div className="bg-white rounded-xl shadow p-6 border border-indigo-50 w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{exp.title}</h3>
                  <div className="text-indigo-500 font-medium">{exp.company}</div>
                  <div className="text-gray-400 text-sm mb-2">{exp.period}</div>
                  <div className="text-gray-600">{exp.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Degrees Section - Timeline */}
      <section id="degrees" className="py-20 bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Degrees</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              My academic background
            </p>
          </motion.div>
          {/* Timeline */}
          <div className="relative border-l-2 border-pink-200 ml-6">
            {degrees.map((deg, idx) => (
              <div key={deg.title + idx} className="mb-12 ml-8 flex items-start relative">
                <span className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-pink-400 bg-white text-pink-500 shadow-lg ml-[-3%]">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div className="bg-white rounded-xl shadow p-6 border border-pink-50 w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{deg.title}</h3>
                  <div className="text-pink-500 font-medium">{deg.school}</div>
                  <div className="text-gray-400 text-sm mb-2">{deg.period}</div>
                  <div className="text-gray-600">{deg.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa] overflow-hidden">
        {/* Particles background */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-left mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Code2 className="h-7 w-7 text-indigo-400" /> Skills & Expertise
            </h2>
          </motion.div>
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
                >
                  <div className="relative bg-white/60 backdrop-blur-xl border-2 border-transparent rounded-2xl shadow-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl hover:bg-white/80 group animated-gradient-border">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center h-12 w-12 border-2 border-indigo-200 rounded-full">{theme.icon}</span>
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
                    </ul>
                    <span className="absolute top-0 right-0 m-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-500 shadow-sm animate-badge-pop">
                      {theme.title.split(' ')[0]}
                    </span>
                    {/* Animated gradient border */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent animated-gradient-border z-10" />
                  </div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </div>
          <div className="text-center text-gray-400 text-sm mt-10">
            These skills represent my technical expertise and professional capabilities, developed<br />
            through hands-on experience in production environments and successful project deliveries.
          </div>
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
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 1.2s linear infinite;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 0.8s ease-in-out infinite;
          }
          @keyframes badge-pop {
            0% { transform: scale(0.8); opacity: 0.5; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-badge-pop {
            animation: badge-pop 0.7s cubic-bezier(.68,-0.55,.27,1.55) 1;
          }
        `}</style>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-20 bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#fdf6fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-indigo-400 via-blue-300 to-pink-300 shadow-md mb-2">
                <EnvelopeSimple size={32} className="text-indigo-600" />
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's Connect</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-10 flex flex-col gap-6 border border-white/80"
          >
            <form className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="flex items-center bg-white/80 rounded-lg border border-gray-200 focus-within:border-indigo-400 transition">
                  <UserCheck className="h-5 w-5 ml-3 text-indigo-400" />
                  <input
                    type="text"
                    id="name"
                    className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 rounded-lg text-gray-900 placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center bg-white/80 rounded-lg border border-gray-200 focus-within:border-indigo-400 transition">
                  <EnvelopeSimple className="h-5 w-5 ml-3 text-indigo-400" />
                  <input
                    type="email"
                    id="email"
                    className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 rounded-lg text-gray-900 placeholder-gray-400"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="flex items-start bg-white/80 rounded-lg border border-gray-200 focus-within:border-indigo-400 transition">
                  <MessageCircle className="h-5 w-5 ml-3 mt-3 text-indigo-400" />
                  <textarea
                    id="message"
                    rows={4}
                    className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 rounded-lg text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition font-semibold flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" /> Send Message
              </motion.button>
            </form>
            {/* Social Icons */}
            <div className="flex justify-center gap-8 mt-6">
              <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer" className="group">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 hover:bg-green-200 transition shadow-lg">
                  <WhatsappLogo size={28} className="text-green-500 group-hover:scale-110 transition-transform" />
                </span>
              </a>
              <a href="mailto:youremail@email.com" className="group">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 hover:bg-indigo-200 transition shadow-lg">
                  <EnvelopeSimple size={28} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                </span>
              </a>
              <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="group">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 hover:bg-blue-200 transition shadow-lg">
                  <LinkedinLogo size={28} className="text-blue-500 group-hover:scale-110 transition-transform" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 