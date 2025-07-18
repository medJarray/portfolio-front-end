import { motion } from 'framer-motion';
import { Brain, Code2, Database, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Skill, CreateSkill, UpdateSkill } from '../services/api';

interface SkillFormData {
  id?: string;
  name: string;
  category: string;
  level: number;
  description: string;
}

const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'Tools & DevOps',
  'Soft Skills',
];

export function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Partial<SkillFormData>>({});

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills();
      // Filter and clean the skills data
      if (!Array.isArray(data)) {
        console.error('Invalid skills data format:', data);
        return;
      }
      const cleanedSkills = data.map(skill => ({
        ...skill,
        category: skill.category || 'Unknown',
        description: skill.description || ''
      }));
      setSkills(cleanedSkills);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleAddSkill = () => {
    setCurrentSkill({});
    setIsModalOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    // Map the skill to the form data structure
    setCurrentSkill({
      id: skill.id,
      name: skill.name || '',
      category: skill.category || 'Unknown',
      level: skill.level || 1,
      description: skill.description || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteSkill = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.deleteSkill(id);
        setSkills(skills.filter(skill => skill.id !== id));
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkill.name || !currentSkill.category || !currentSkill.level) {
      console.error('All fields are required');
      return;
    }
    try {
      if (currentSkill.id) {
        const { id, ...updateData } = currentSkill;
        await api.updateSkill(id, updateData as UpdateSkill);
      } else {
        const { id, ...createData } = currentSkill;
        await api.createSkill(createData as CreateSkill);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const getLevelLabel = (level: number | undefined) => {
    if (!level) return 'Unknown';
    
    switch (level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      default:
        return 'Unknown';
    }
  };

  const getCategoryIcon = (category: string | undefined) => {
    if (!category) {
      console.warn('Category is undefined, using default icon');
      return <Code2 className="h-6 w-6 text-indigo-400" />;
    }
    
    switch (category.toLowerCase()) {
      case 'frontend development':
        return <Code2 className="h-6 w-6 text-indigo-400" />;
      case 'backend development':
        return <Database className="h-6 w-6 text-blue-500" />;
      case 'tools & devops':
        return <Wrench className="h-6 w-6 text-indigo-500" />;
      case 'soft skills':
        return <Brain className="h-6 w-6 text-indigo-400" />;
      default:
        return <Code2 className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Compétences</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Ajouter une compétence
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compétence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{skill.category || 'Non définie'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {getLevelLabel(skill.level)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {skill.description || 'Aucune description'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-200/70 via-indigo-100/80 to-white/90 backdrop-blur-2xl">
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.28 }}
            className="bg-white/80 rounded-3xl shadow-2xl p-12 max-w-2xl w-full border border-blue-200 relative animate-fadeIn backdrop-blur-xl ring-1 ring-blue-100/40">
            {/* Barre de progression animée en haut */}
            <div className="absolute left-0 top-0 w-full h-1 overflow-hidden rounded-t-3xl">
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 animate-pulse" />
            </div>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition-colors text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-full w-11 h-11 flex items-center justify-center shadow-md bg-white/70 backdrop-blur">
              <span className="sr-only">Fermer</span>
              <svg xmlns='http://www.w3.org/2000/svg' className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="mb-12 text-center flex items-center justify-center gap-4 select-none">
              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 via-blue-400 to-indigo-500 shadow-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#6366f1" />
                </svg>
              </span>
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg font-display animate-gradient-x">
                {currentSkill.id ? 'Modifier' : 'Ajouter'} une compétence
              </span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group md:col-span-2">
                  <input
                    type="text"
                    required
                    id="name"
                    className="peer h-12 w-full border-b-2 border-blue-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-blue-400 group-hover:shadow-lg"
                    placeholder="Nom de la compétence"
                    value={currentSkill.name || ''}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                  />
                  <label htmlFor="name" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-blue-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" /><path d="M12 14v7m-4-4h8" /></svg>
                    Nom de la compétence
                  </label>
                </div>
                <div className="relative group">
                  <select
                    required
                    id="category"
                    className="peer h-12 w-full border-b-2 border-indigo-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-indigo-400 group-hover:shadow-lg"
                    value={currentSkill.category || ''}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {SKILL_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label htmlFor="category" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-indigo-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-indigo-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                    Catégorie
                  </label>
                </div>
                <div className="relative group">
                  <select
                    required
                    id="level"
                    className="peer h-12 w-full border-b-2 border-pink-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-500 bg-white/60 transition-all text-base pr-10 rounded-xl shadow-inner group-hover:border-pink-400 group-hover:shadow-lg"
                    value={currentSkill.level || ''}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, level: parseInt(e.target.value) })}
                  >
                    <option value="">Sélectionner un niveau</option>
                    <option value="1">Débutant</option>
                    <option value="2">Intermédiaire</option>
                    <option value="3">Avancé</option>
                  </select>
                  <label htmlFor="level" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-pink-500 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-pink-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Niveau
                  </label>
                </div>
                <div className="relative group md:col-span-2">
                  <textarea
                    required
                    id="description"
                    rows={3}
                    className="peer w-full border-b-2 border-indigo-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 bg-white/60 transition-all resize-none text-base pr-10 rounded-xl shadow-inner group-hover:border-indigo-400 group-hover:shadow-lg"
                    placeholder="Description"
                    value={currentSkill.description || ''}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, description: e.target.value })}
                  />
                  <label htmlFor="description" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-indigo-600 peer-focus:text-sm bg-white/80 px-1 rounded flex items-center gap-1">
                    <svg className="w-4 h-4 text-indigo-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
                    Description
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-6 mt-12">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 rounded-xl border border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100 transition-colors shadow-md font-semibold text-lg backdrop-blur"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg backdrop-blur"
                >
                  {currentSkill.id ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

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
        .group:hover .hover\:scale-\[1\.03\] {
          transform: scale(1.03);
        }
        .group:hover .hover\:bg-indigo-50\/60 {
          background-color: rgba(238, 242, 255, 0.6);
        }
        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .bg-white\/60 {
          background-color: rgba(255, 255, 255, 0.6);
        }
        .hover\:bg-white\/80:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }
        .border-indigo-200 {
          border-color: rgb(224, 231, 255);
        }
        .text-indigo-400 {
          color: rgb(129, 140, 248);
        }
        .text-indigo-500 {
          color: rgb(99, 102, 241);
        }
        .text-indigo-600 {
          color: rgb(79, 70, 229);
        }
        .from-indigo-100 {
          --tw-gradient-from: #e0e7ff;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(224, 231, 255, 0));
        }
        .to-pink-100 {
          --tw-gradient-to: #fce7f3;
        }
      `}</style>
    </div>
  );
}