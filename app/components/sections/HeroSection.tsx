import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Database, Settings, Mail, Download, Linkedin, Github } from 'lucide-react';
import BusinessCard from '../ui/BusinessCard';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#e0e7ff] via-[#f0fdfa] to-[#fdf2fa]" />
      <svg className="absolute left-[-100px] top-[-80px] w-[350px] h-[350px] opacity-20 z-10" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="200" fill="url(#blob1)"/>
      </svg>
      <svg className="absolute right-[-120px] bottom-[-100px] w-[300px] h-[300px] opacity-10 z-10" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="200" fill="url(#blob2)"/>
      </svg>
      
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 px-4 py-24 relative z-20">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 font-sans">
              {t('presentation.title')}
            </h1>
            <div className="flex items-center gap-3 mb-4 justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-500">{t('presentation.subtitle')}</h2>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
              <BusinessCard
                name="Mohamed Jarray"
                title={t('presentation.subtitle')}
                email="your.email@example.com"
                phone="+216 XX XXX XXX"
                website="https://your-portfolio.com"
                photoUrl="/path/to/your/avatar.jpg"
                linkedin="https://linkedin.com/in/yourprofile"
                github="https://github.com/yourusername"
              />
            </div>
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-700 font-medium">
              {t('presentation.description')}
            </p>
          </motion.div>

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

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#connect"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
            >
              <span>{t('presentation.contact')}</span>
              <Mail className="h-5 w-5 group-hover:animate-[spin_1s_ease-in-out]" />
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-500 rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-indigo-200 group relative overflow-hidden"
            >
              <span>{t('presentation.download_cv')}</span>
              <Download className="h-5 w-5 group-hover:animate-bounce" />
            </a>
          </div>
        </div>

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
  );
};